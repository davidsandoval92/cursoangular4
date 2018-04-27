import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  lugar: any = {};
  id: any = null;
  private searchField:FormControl;
  results$ : Observable<any>;
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http:Http) {
    this.id = this.route.snapshot.params['id'];
    if (this.id != 'new') {
      this.lugaresService.getLugar(this.id).valueChanges()
        .subscribe((lugar) => {
          this.lugar = lugar;
        });
    }
    
    const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
    .debounceTime(500)
    .switchMap(query => this.http.get(`${URL}?address=${query}`))
    .map(response => response.json())
    .map(response => response.results);
    
  }

  guardarLugar() {
    var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    this.lugaresService.obtenerGEoData(direccion)
      .subscribe((result) => {
        this.lugar.lat = result.json().results[0].geometry.location.lat;
        this.lugar.lng = result.json().results[0].geometry.location.lng;

        if (this.id != 'new') {
          this.lugaresService.editarLugar(this.lugar);
          alert('Negocio editado con exito');
        } else {
          this.lugar.id = Date.now();
          this.lugaresService.guardarLugar(this.lugar);
          alert('Negocio guardado con exito');
        }

        this.lugar = {};
      });

  }

  seleccionarDireccion(direccion){
    this.lugar.calle = direccion.address_components[1].long_name+' '+direccion.address_components[0].long_name;
    this.lugar.ciudad = direccion.address_components[4].long_name;
    this.lugar.pais = direccion.address_components[5].long_name;
  }
  ngOnInit() {
  }

}

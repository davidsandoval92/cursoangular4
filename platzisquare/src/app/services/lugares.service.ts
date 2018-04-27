import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { Http, Headers } from "@angular/http";


@Injectable()
export class LugaresService {

  constructor(private afDB: AngularFireDatabase, private http: Http) {

  }
  API_ENDPOINT = 'https://platzisquare-1523239510221.firebaseio.com';

  lugares: any = [
    { id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Floreria la gardenia' },
    { id: 2, plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita' },
    { id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices' },
    { id: 4, plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi suhiroll' },
    { id: 5, plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la gracia' },
    { id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapateria el clavo' }
  ];
  public getLugares() {
    //return this.afDB.list('lugares/');
    return this.http.get(this.API_ENDPOINT+'/.json')
    .map((resultado)=>{
      const data = resultado.json().lugares;
      return data;
    });
  }

  public buscarLugar(id) {
    return this.lugares.filter((lugar) => { return lugar.id == id })[0] || null;
  }

  public guardarLugar(lugar) {
    //this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
    const headers = new Headers({"Content-Type":"application/json"});
    return this.http.post(this.API_ENDPOINT+'/lugares.json',lugar,{headers:headers}).subscribe();
  }

  public editarLugar(lugar) {
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }

  public obtenerGEoData(direccion) {
    //http://maps.google.com/maps/api/geocode/xml?address=78-43+diagonal+70f,+Bogota,Colombia
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + direccion);
  }

  public getLugar(id) {
    return this.afDB.object('lugares/' + id);
  }


}

import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import { Observable } from "rxjs";
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn = false;
  email = null;
  loggedUser:any = {};
people: any = [
  { name: 'David Sandoval', age:66 },
  { name: 'Daniela Guzman', age:16 },
  { name: 'Alejandro Gomez', age:20 },
  { name: 'Laura Zapata', age:22 },
  { name: 'Pedro Melendez', age:11 },
  { name: 'Carolina Castellano', age:56 }
];
  constructor(private autorizacionService:AutorizacionService) {
    this.autorizacionService.isLogged().subscribe((result)=>{
      if(result && result.uid){
        this.loggedIn = true;
        setTimeout(()=>{
          this.loggedUser = this.autorizacionService.getEmail();
        },500)
        this.email = autorizacionService.getEmail();
      }else{
        this.loggedIn = false;
      }
    },(error)=>{
      this.loggedIn = false;
    })
  }

  public logout(){
    this.autorizacionService.logout();
  }

}

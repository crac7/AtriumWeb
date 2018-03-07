import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global'
import { Planificacion  } from '../models/planificacion';

@Injectable()//para utilizar en otra Clases
export class PlanificacionServices{
   public url: string;
   public token :string;
     Planificacion: Planificacion[];
     selectedPlanificacion : Planificacion;
   constructor(private _http: Http){
     this.url = Global.url;
   }


   getEmployeeList(){


    /*let headers = new Headers({'Content-Type':'application/json'});
      this.http.get(this.url+'Docentes', params ,{headers: headers})
      .map((data : Response) =>{
        return data.json() as Planificacion[];
      }).toPromise().then(x => {
        this.planificacion = x;
      })*/
    }

///Accede a local Sotrage y devuele los datos ya procesados
    getToken(){
       let token = localStorage.getItem('token');
        if(token != "undefined"){
           this.token =token;
        }else
        {
          this.token=null;
        }
         return this.token;
    }


}

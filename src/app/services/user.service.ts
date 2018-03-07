import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global'

@Injectable()//para utilizar en otra Clases
export class UserService{
   public url: string;
   public token :string;
   constructor(private _http: Http){
     this.url = Global.url;
   }
   signup(user_to_login){
     let json = JSON.stringify(user_to_login);
     let params =json;

     let headers = new Headers({'Content-Type':'application/json'});
     return this._http.post(this.url+'Docentes', params ,{headers: headers})
              .map(res => res.json());
   }
   datos(){
    let headers = new Headers({'Content-Type':'application/json',
                                'Authorization': 'bearer '+this.getToken()});

     return this._http.get(this.url+'datoDocentes' ,{headers: headers})
            .map(res => res.json());

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

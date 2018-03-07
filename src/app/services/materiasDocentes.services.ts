import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global';

import { ModelDatosDocentes }  from '../models/modelDatosDocentes'
import { ModelMateriasDocentes }  from '../models/modelMaterias';

@Injectable()//para utilizar en otra Clases
export class MateriasDocenteService{
  public url: string;
  public token :string;
  selectedMateriasDocentes : ModelMateriasDocentes;
  MateriasDocentesList : ModelMateriasDocentes[];
  /****/
  selectedDatosDocentes:ModelDatosDocentes;
    public datosDocentes: any;
  /*public cod_per:number;
  public cod_profesor:number;
  public datosDocentes:any;*/
  constructor(private _http: Http){
    this.url = Global.url;
  }

  MateriasDocentes(){
        let json = JSON.stringify(this.GetDatosdocentes());
         console.log(json);
        let params =json;

        let headers = new Headers({'Content-Type':'application/json',
                                    'Authorization': 'bearer '+this.getToken()});

        this._http.post(this.url+'Docentesmaterias', params ,{headers: headers})
              .map((data : Response) =>{
              return data.json() as ModelMateriasDocentes[];
              }).toPromise().then(x => {
              this.MateriasDocentesList = x;
        })
    }

  
  GetDatosdocentes(){

    this.datosDocentes=[{
                    cod_per:     localStorage.getItem('cod_per'),
                    let_per:       localStorage.getItem('let_per'),
                    cod_profesor:  localStorage.getItem('cod_profesor'),
                    nombre:  localStorage.getItem('nombre'),
                  }];
                //  console.log(this.datosDocentes);
       return this.datosDocentes[0];
  }


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

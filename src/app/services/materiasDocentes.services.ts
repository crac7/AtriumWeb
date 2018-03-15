import {Injectable} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Global } from './global';

import { ModelDatosDocentes }  from '../models/modelDatosDocentes'
import { ModelMateriasDocentes }  from '../models/modelMaterias';
import { ModelUnidades }  from '../models/unidades';
import {ModelAlumnCursos} from '../models/ModelAlumCursos';
@Injectable()//para utilizar en otra Clases
export class MateriasDocenteService{
  public url: string;
  public token :string;
  selectedMateriasDocentes : ModelMateriasDocentes;
  MateriasDocentesList : ModelMateriasDocentes[];
  /////Unidades///////
  selectedUnidades : ModelUnidades;
  UnidadesList : ModelUnidades[];
  /////Alumnos Curso////
  selectedAlumnCursos :  ModelAlumnCursos;
  AlumnCursosList : ModelAlumnCursos[];
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
    UnidadesDocentes(){
          let json = JSON.stringify(this.GetDatosdocentes());
        //   console.log(json);
          let params =json;

          let headers = new Headers({'Content-Type':'application/json',
                                      'Authorization': 'bearer '+this.getToken()});

          this._http.post(this.url+'Unidades', params ,{headers: headers})
                .map((data : Response) =>{
                return data.json() as ModelUnidades[];
                }).toPromise().then(x => {
                this.UnidadesList = x;
          })
      }

      AlumnosCurso(cursoDatos){
            let json = JSON.stringify(cursoDatos);
             console.log(json);
            let params =cursoDatos;

            let headers = new Headers({'Content-Type':'application/json',
                                        'Authorization': 'bearer '+this.getToken()});

            this._http.post(this.url+'AlumnosCurso', params ,{headers: headers})
                  .map((data : Response) =>{
                  return data.json() as ModelAlumnCursos[];
                  }).toPromise().then(x => {
                  this.AlumnCursosList = x;
            })
        }

        InsFaltasAtrasos(curso){

                   let json = JSON.stringify(curso);
                   let params =curso;
                      console.log(curso);
                      let headers = new Headers({'Content-Type':'application/json',
                                                  'Authorization': 'bearer '+this.getToken()});
                   return this._http.post(this.url+'InsertFaltasAtrasos', params ,{headers: headers})
                            .map(res => res.json());
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

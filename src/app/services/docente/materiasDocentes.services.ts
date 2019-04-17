import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Global } from '../global';
import { ResponseContentType } from '@angular/http';
import { ModelMateriasDocentes } from '../../models/modelMaterias';
import { ModelUnidades } from '../../models/unidades';
import { ModelAlumnCursos } from '../../models/ModelAlumCursos';
import { ModelAlumList } from '../../models/ModelAlumList';
import Swal from 'sweetalert2';

@Injectable()// para utilizar en otra Clases
export class MateriasDocenteService {
  public url: string;
  public token: string;
  selectedMateriasDocentes: ModelMateriasDocentes;
  MateriasDocentesList: ModelMateriasDocentes[];
  ///// Unidades///////
  selectedUnidades: ModelUnidades;
  UnidadesList: ModelUnidades[];
  ///// Alumnos Curso////
  selectedAlumnCursos: ModelAlumnCursos;
  AlumnCursosList: ModelAlumnCursos[];
  AlumnList: ModelAlumList[];
  /****/
  bandera: string;
  public datosDocentes: any;
  /*public cod_per:number;
  public cod_profesor:number;
  public datosDocentes:any;*/
  constructor(private _http: Http) {
    this.bandera = localStorage.getItem('bandera');
    this.url = Global.url;
  }

  MateriasDocentes(lec: string = null) {
    const json = JSON.stringify(this.GetDatosdocentes(lec));
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    this._http.post(this.url + 'Docentesmaterias', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelMateriasDocentes[];
      }).toPromise().then(x => {
        this.MateriasDocentesList = x;
      });
  }

  UnidadesDocentes() {
    const json = JSON.stringify(this.GetDatosdocentes());
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.getToken()
    });
    this._http.post(this.url + 'Unidades', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelUnidades[];
      }).toPromise().then(x => {
        this.UnidadesList = x;
      })
  }

  AlumnosCurso(cursoDatos: any) {
    const json = JSON.stringify(cursoDatos);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    this._http.post(this.url + 'AlumnosCurso', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelAlumnCursos[];
      }).toPromise().then(x => {
        this.AlumnCursosList = x;
      })
  }

  AlumnosLista(cursoDatos: any) {
    const json = JSON.stringify(cursoDatos);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    this._http.post(this.url + 'AlumnosLista', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelAlumList[];
      }).toPromise().then(x => {
        this.AlumnList = x;
      })
  }

  ConsultaRegistrado(cursoDatos: any) {
    const json = JSON.stringify(cursoDatos);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });

    return this._http.post(this.url + 'AlumnosCurso', params, { headers: headers })
      .map(res => res.json());
  }


  InsFaltasAtrasos(curso: any) {
    const json = JSON.stringify(curso);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'InsertFaltasAtrasos', params, { headers: headers })
      .map(res => res.json());
  }

  DetalleFalta(dataAlumn: any) {
    const json = JSON.stringify(dataAlumn);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'DetalleFalta', params, { headers: headers })
      .map(res => res.json());
  }

  GetDatosdocentes(lec: string = null) {
    this.datosDocentes = [{
      cod_per: localStorage.getItem('cod_per'),
      let_per: localStorage.getItem('let_per'),
      cod_profesor: localStorage.getItem('cod_profesor'),
      nombre: localStorage.getItem('nombre'),
      bandera: this.bandera === 'A' && lec != null ? lec : ''
    }];
    return this.datosDocentes[0];
  }

  GeneraPDFaltas(datos: any) {
    Swal.fire('Hey!', 'Espera unos segundo hasta que la descarga empiece', 'warning');
    const paramas = JSON.stringify(datos);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'rpt/FaltasAtrasos', paramas, { headers: headers, responseType: ResponseContentType.Blob })
      .map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' })
      });
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelHorarios } from '../../models/horarios.model';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';
import { Global } from '../global'
import { ModelLeccionarioDocente } from '../../models/leccionario.docente.models';
import { ModelLeccionarioInspector } from '../../models/LeccionaInspec.models';
import { ResponseContentType } from '@angular/http';
import Swal from 'sweetalert2';

@Injectable()
export class LeccionarioServices {
  selectedHorarios: ModelHorarios;
  HorariosList: ModelHorarios[];
  LeccionarioDocenteList: ModelLeccionarioDocente[];
  selectedLeccionarioDocenteList: ModelLeccionarioDocente;
  LeccionarioInspectorList: ModelLeccionarioInspector[];
  ModelLeccionarioInspector: any;
  public url: string;
  constructor(
    public _usuarioService: UserService,
    private _http: Http
  ) {
    this.url = Global.url;
  }

  HorariosDocentes() {
    const datos = {
      cod_emp: localStorage.getItem('cod_emp'),
      cod_per: localStorage.getItem('cod_per'),
      let_per: localStorage.getItem('let_per'),
    };
    const params = JSON.stringify(datos);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this._usuarioService.token
    });
    this._http.post(this.url + 'HorarioLecionario', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelHorarios[];
      }).toPromise().then(x => {
        this.HorariosList = x;
      })
  }

  ConsultaLeccionario(datos: any) {
    const ConLeccionarioDo = {
      cod_emp: localStorage.getItem('cod_emp'),
      cod_per: localStorage.getItem('cod_per'),
      let_per: localStorage.getItem('let_per'),
      cod_curso: datos.cod_curso,
      cod_paralelo: datos.cod_paralelo,
      cod_mat: datos.cod_mat,
      unidad: datos.unidad,
      fecha: datos.fecha,
      cod_profesor: localStorage.getItem('cod_profesor')
    }
    const params = JSON.stringify(ConLeccionarioDo);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this._usuarioService.token
    });
    this._http.post(this.url + 'ConsultaLeccionario', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelLeccionarioDocente[];
      }).toPromise().then(x => {
        this.LeccionarioDocenteList = x;
      })
  }

  InsertaLeccionario(lecionario: any) {
    const json = JSON.stringify(lecionario);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this._usuarioService.token
    });
    return this._http.post(this.url + 'InsertaLeccionario', params, { headers: headers })
      .map(res => res.json());
  }

  InsertaLeccionarioArreglo(lecionario: any) {
    const json = JSON.stringify(lecionario);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this._usuarioService.token
    });
    return this._http.post(this.url + 'InsertaLeccionarioArreglo', params, { headers: headers })
      .map(res => res.json());
  }

  ConsultaLeccionarioInspector(datos: any) {
    const ConLeccionarioDo = {
      cod_emp: localStorage.getItem('cod_emp'),
      cod_per: localStorage.getItem('cod_per'),
      let_per: localStorage.getItem('let_per'),
      cod_curso: datos.cod_curso,
      cod_paralelo: datos.cod_paralelo,
      unidad: datos.unidad,
      fecha_ini: datos.fecha,
      fecha_fin: datos.fecha_fin
    }
    const params = JSON.stringify(ConLeccionarioDo);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this._usuarioService.token
    });
    this._http.post(this.url + 'ConsultaLeccionarioInspector', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as ModelLeccionarioInspector[];
      }).toPromise().then(x => {
        this.LeccionarioInspectorList = x;
      });
  }

  GeneraPDFLecionario(datos: any) {
    Swal.fire('Hey!', 'Espera unos segundo hasta que la descarga empiece', 'warning');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this._usuarioService.token
    });
    return this._http.post(this.url + 'rpt/Leccionario', datos, { headers: headers, responseType: ResponseContentType.Blob })
      .map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' })
        });
  }
}

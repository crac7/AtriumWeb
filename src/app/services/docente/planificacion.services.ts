import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Global } from '../global'
import { Planificacion } from '../../models/planificacion';
import { DetallePlanAdmin } from '../../models/DetallePlanAdmin.models';
import { ResponseContentType } from '@angular/http';
import Swal from 'sweetalert2';

@Injectable() // para utilizar en otra Clases
export class PlanificacionServices {
  public url: string;
  public token: string;
  ListPlanificacion: Planificacion[];
  selectedPlanificacion: Planificacion;
  ListDetallePlanAdmin: DetallePlanAdmin[];
  selectedDetallePlanAdmin: DetallePlanAdmin;
  constructor(private _http: Http) {
    this.url = Global.url;
  }

  GeneraCodigo() {
    let datos: any;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.get(this.url + 'GeneraCodigo', { headers: headers })
      .map(res => {
        datos = res.json()
        return datos.cod_plan;
      });
  }

  InsertCabecera(Cabecera: any) {
    const json = JSON.stringify(Cabecera);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'InsertaCabeceraPlan', params, { headers: headers })
      .map(res => res.json());
  }

  InsertDetalle(detalle: any) {
    const json = JSON.stringify(detalle);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'InsertaDetallePlan', params, { headers: headers })
      .map(res => res.json());
  }
  ConsultaPlanAdmin(detalle: any) {
    const json = JSON.stringify(detalle);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    this._http.post(this.url + 'DetallePlanAdmin', params, { headers: headers })
      .map((data: Response) => {

        return data.json() as DetallePlanAdmin[];
      }).toPromise().then(x => {
        this.ListDetallePlanAdmin = x;
      })
  }
  ConsultaPlanDocente(detalle: any) {
    let cod_plan: any[]
    const json = JSON.stringify(detalle);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'DetallePlanAdmin', params, { headers: headers })
      .map(res => {
        //  console.log(res.json().length);
        if (res.json().length > 0) {
          cod_plan = res.json();
          if (Object.keys(cod_plan[0]).length > 1) {
            // console.log(cod_plan[0]);
            return cod_plan[0];
          }
        } else {
          return null
        }
      });
  }

  async ConsultaPlanDocenteDetalle(cod_plan: any) {
    const params = { cod_plan: cod_plan };
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    const x = await this._http.post(this.url + 'DetallePlanDocente', params, { headers: headers })
      .map((data: Response) => {
        return data.json() as Planificacion[];
      }).toPromise();
    this.ListPlanificacion = x;
  }

  GeneraPDFAdmin(datos: any) {
    Swal.fire('Hey!', 'Espera unos segundo hasta que la descarga empiece', 'warning');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });

    return this._http.post(this.url + 'rpt/PlanificacionSemanal', datos, { headers: headers, responseType: ResponseContentType.Blob })
      .map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' })
        });
  }

  SendEmail(detalle: any) {
    const json = JSON.stringify(detalle);
    const params = json;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'email', params, { headers: headers })
      .map(res => res.json());
  }

  ConsultaParalelo(detalle: any) {
    const json = JSON.stringify(detalle);
    const params = json;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'ConsultaParalelo', params, { headers: headers })
      .map(res => res.json());
  }

  InsertDuplica(detalle: any) {
    const json = JSON.stringify(detalle);
    const params = json;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'InsertDuplica', params, { headers: headers })
      .map(res => res.json());
  }

  ConsultaPlanTodos(detalle: any) {
    const json = JSON.stringify(detalle);
    const params = json;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'ConsultaTodosPlanDocente', params, { headers: headers })
      .map(res => {
        return res.json();
      });
  }

  deletePlan(detalle: any) {
    const json = JSON.stringify(detalle);
    const params = json;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'DeletePlan', params, { headers: headers })
      .map(res => res.json());
  }

  InsertaPlanificacionDiaria(datos: any) {
    const json = JSON.stringify(datos);
    const params = json;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'InsertaPlanificacionDiaria', params, { headers: headers })
      .map(res => res.json());
  }

  ConsultaPlanificacionDiaria(datos: any) {
    const json = JSON.stringify(datos);
    const params = json;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });
    return this._http.post(this.url + 'ConsultaPlanificacionDiaria', params, { headers: headers })
      .map(res => res.json());
  }
  /// Accede a local Sotrage y devuele los datos ya procesados
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

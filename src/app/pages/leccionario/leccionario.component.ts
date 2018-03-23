import { Component, OnInit } from '@angular/core';
import { MateriasDocenteService } from '../../services/materiasDocentes.services'
import * as moment from 'moment';
@Component({
  selector: 'app-leccionario',
  templateUrl: './leccionario.component.html',
  styleUrls: ['./leccionario.component.scss'],
  providers :[MateriasDocenteService]
})
export class LeccionarioComponent implements OnInit {
visible=true;
materias: Array<any>;
nombre:string;
fecha:string;
codigoPeriodo:string;
letPeriodo:string;
user:string;
  constructor(private _MateriasDocentesServices: MateriasDocenteService) { }

  ngOnInit() {

    this.fecha =moment().format('L');   //
    this._MateriasDocentesServices.MateriasDocentes('LP');
    this._MateriasDocentesServices.UnidadesDocentes();
    this.nombre=localStorage.getItem('nombre');
    this.codigoPeriodo= localStorage.getItem('cod_per'),
    this.letPeriodo= localStorage.getItem('let_per');
    this.user=localStorage.getItem('username');

  }
  Cambiamodal(){

    this.visible=false;
  }
  Atras()
  {
    this.visible=true;
  }
}

import { Component, OnInit } from '@angular/core';
//import { Planificacion  } from '../../models/planificacion';
import { NgForm } from '@angular/forms'
import { PlanificacionServices  } from '../../services/planificacion.services';
import { MateriasDocenteService } from '../../services/materiasDocentes.services'
import * as moment from 'moment';
@Component({
  selector: 'app-planifi-semanal',
  templateUrl: './planifi-semanal.component.html',
  styleUrls: ['./planifi-semanal.component.scss'],
   providers :[PlanificacionServices,MateriasDocenteService]
})
export class PlanifiSemanalComponent implements OnInit {
  visible=true;
  addtable=false;
  cursos: Array<any>;
  itemsPlan: Array<any>;
  accion:string;
  index:number;
  nombre:string;
  fecha:string;
  codigoPeriodo:string;
  letPeriodo:string;
  user:string;

  constructor(public _PlanificacionServices: PlanificacionServices,
              private _MateriasDocentesServices: MateriasDocenteService ) { }

  ngOnInit() {
    this.resetForm();
    this.ConsultaCurso();
    this.fecha =moment().format('L');   //
    this._MateriasDocentesServices.MateriasDocentes();
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

  ConsultaCurso(){
    this.cursos=   [{materia:"ENGLISH B HIGHER LEVEL / 2DO_BACHILLERATO / MIX / B"},
                   {materia:"ENGLISH B HIGHER LEVEL / 2DO_BACHILLERATO / MIX / C"},
                   {materia:"ENGLISH B HIGHER LEVEL / 2DO_BACHILLERATO / MIX / D"},
                   {materia:"ENGLISH B HIGHER LEVEL / 3RO_BACHILLERATO / MIX / D"},
                 ];

     this.itemsPlan =[];

  }
  delete(i){
     this.itemsPlan.splice(i, 1);
  }

  Edit(Itemplan,i) {
      this.accion="u";
      this._PlanificacionServices.selectedPlanificacion =Itemplan;
      this.index=i;
      console.log(this.index);
    }

  guardar(form: NgForm){
    console.log(form.value);
    this.addtable=true;

    if(this.accion==="u")
    {
      this.itemsPlan[this.index] = form.value;
    }
    else{
        this.itemsPlan.push(form.value);
    }

    this.resetForm();
  }

  resetForm(form?: NgForm) {
              this.accion=null;
              this.index=null;
              if (form != null)
                form.reset();
              this._PlanificacionServices.selectedPlanificacion = {
                destreza: '',
                anticipacion: '',
                construcion: '',
                consolidacion: '',
                recursos:'',
                evaluacion: '',
                tareas: ''
              }
      }

  /*  fecha(){
      console.log("fecha");
    }*/


  }

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

  bandera:string;
  itemsPlan: Array<any>;
  accion:string;
  index:number;
  nombre:string;
  fechain:string;
  fechafin:string;
  codigoPeriodo:string;
  letPeriodo:string;
  user:string;
  codPlan:number;
  materia:string;
  paralelo:string;
  curso:string;
  cod_curso:number;
  cod_paralelo:number;
  cod_materia:number;
  cod_profesor:string;
  titulo_unidad:string;
  nUnidaPlan:string;
  necesidad_educativa:string;
  adaptacion_aplicada:string;
  observaciones:string;
  revisado:boolean;
  fecha_revisado:string;
  usuario_revisor:string;
  aprobado:boolean;
  fecha_aprobado:string;
  usuario_aprueba:string;

  constructor(public _PlanificacionServices: PlanificacionServices,
              private _MateriasDocentesServices: MateriasDocenteService ) { }

  ngOnInit() {
    this.resetForm();
    this.ConsultaCurso();
    this.fechain =moment().format('L');   //
    this.fechafin =moment().format('L');   //
    this._MateriasDocentesServices.MateriasDocentes();
    this._MateriasDocentesServices.UnidadesDocentes();
    this.nombre=localStorage.getItem('nombre');
    this.codigoPeriodo = localStorage.getItem('cod_per'),
    this.cod_profesor =  localStorage.getItem('cod_profesor');
    this.letPeriodo= localStorage.getItem('let_per');
    this.user=localStorage.getItem('username');
    this.bandera =localStorage.getItem('bandera');

  }


  Cambiamodal(i){
    this.visible=false;
    this.materia=i.Dm;
    this.paralelo=i.Dp;
    this.curso=i.Dca;
    this.cod_curso=i.cod_curso;
    this.cod_paralelo= i.cod_paralelo;
    this.cod_materia= i.cod_materia;

    this._PlanificacionServices.GeneraCodigo().subscribe(
         response=>{
             this.codPlan=response.cod_plan;
         },
         error=>{
                  console.log(error);
            }
      );

  }


  Atras()
  {
    this.visible=true;
  }

  ConsultaCurso(){
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



    insertaCabcera(unidad:number, enviado:number=0){
    //  alert(this.titulo_unidad + this.nUnidaPlan + this.fechain +this.fechafin);
    //  console.log(Cabecera);
      const Cabecera = {
            cod_plan:  this.codPlan,
            cod_emp:    1,
            cod_per: this.codigoPeriodo,
            let_per:   this.letPeriodo,
            cod_curso:  this.cod_curso,
            cod_paralelo: this.cod_paralelo,
            cod_mat:      this.cod_materia,
            cod_profesor:  this.cod_profesor,
            unidad: unidad,
            t_unidad: this.titulo_unidad,
            fecha_ini: this.fechain,
            fecha_fin:this.fechafin,
            usuario: this.user,
            enviado: enviado,
            necesidad_educativa: this.necesidad_educativa,
            adaptacion_aplicada: this.adaptacion_aplicada,
            observaciones: '',
            revisado: 0,
            fecha_revisado: '',
            usuario_revisor: '',
            aprobado: 0,
            fecha_aprobado: '',
            usuario_aprueba: ''
         }
           console.log(Cabecera);
        this._PlanificacionServices.InsertCabecera(Cabecera).subscribe(
                   response=>{
                         console.log(response);
                   },
                   error=>{
                            console.log(error);
                      }
                );

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

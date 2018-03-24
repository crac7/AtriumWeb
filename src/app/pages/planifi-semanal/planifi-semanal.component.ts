import { Component,Renderer2, ViewChild ,ElementRef  , OnInit } from '@angular/core';
import { PlanificacionCabeceraModel  } from '../../models/planificacion.cabecera.models';
import { NgForm } from '@angular/forms'
import { PlanificacionServices  } from '../../services/planificacion.services';
import { MateriasDocenteService } from '../../services/materiasDocentes.services'
import * as moment from 'moment';
import { Planificacion  } from '../../models/planificacion';

@Component({
  selector: 'app-planifi-semanal',
  templateUrl: './planifi-semanal.component.html',
  styleUrls: ['./planifi-semanal.component.scss'],
   providers :[PlanificacionServices,MateriasDocenteService]
})
export class PlanifiSemanalComponent implements OnInit {
  @ViewChild("guardarModal") guardarModal: ElementRef;
    @ViewChild("modal") modal: ElementRef;
  public planificacionCabeceraModel: PlanificacionCabeceraModel;
  public planificacionDetalleModel:Planificacion;
  visible=true;
  addtable=false;
  bloquedoModal=false;

  bandera:string;
  itemsPlan: Array<any>;
  tablaAministrador: Array<any>;
  accion:string;
  index:number;
  indexAdmin:number;
  nombre:string;
  fechain:string;
  fechafin:string;
  codigoPeriodo:string;
  letPeriodo:string;
  user:string;
  materia:string;
  paralelo:string;
  curso:string;
  errorCabecera: Array<any>;

  constructor(public _PlanificacionServices: PlanificacionServices,
              private _MateriasDocentesServices: MateriasDocenteService,
              private renderer: Renderer2 )
              {
    this.planificacionCabeceraModel=  new PlanificacionCabeceraModel(0,0,'','',0,0,0,'',0,'','','','',0,'','','',0,'','',0,'','');
    this.planificacionDetalleModel= new Planificacion(0,0,'','','','','','','','','');
              }

  ngOnInit() {
    this.resetForm();
    this.ConsultaCurso();

    /////////
    this._MateriasDocentesServices.MateriasDocentes();
    this._MateriasDocentesServices.UnidadesDocentes();
    this.nombre=localStorage.getItem('nombre');
    this.bandera =localStorage.getItem('bandera');
    //////////model///////////
     this.IniciaCabcera();
  }
  IniciaCabcera(){
    this.planificacionCabeceraModel.cod_per =localStorage.getItem('cod_per');
    this.planificacionCabeceraModel.let_per = localStorage.getItem('let_per');
    this.planificacionCabeceraModel.usuario= localStorage.getItem('username');
    this.planificacionCabeceraModel.cod_profesor = localStorage.getItem('cod_profesor');
    this.planificacionCabeceraModel.fecha_ini =moment().format('L');
    this.planificacionCabeceraModel.fecha_fin =moment().format('L');
    this.planificacionCabeceraModel.cod_emp=1;
  }

  Cambiamodal(i){
    this.visible=false;
    this.materia=i.Dm;
    this.paralelo=i.Dp;
    this.curso=i.Dca;
    this.planificacionCabeceraModel.cod_curso=i.cod_curso[0];
    this.planificacionCabeceraModel.cod_paralelo= i.cod_paralelo;
    this.planificacionCabeceraModel.cod_mat= i.cod_materia;

    this._PlanificacionServices.GeneraCodigo().subscribe(
         response=>{
            this.planificacionCabeceraModel.cod_plan=response.cod_plan;

         },
         error=>{
                  console.log(error);
            }
      );

  }


  Atras()
  {
    this.planificacionCabeceraModel=  new PlanificacionCabeceraModel(0,0,'','',0,0,0,'',0,'','','','',0,'','','',0,'','',0,'','');
     this.IniciaCabcera();
    this.visible=true;
    this.itemsPlan =[];
      this.bloquedoModal=false;
  }

  ConsultaCurso(){
     this.itemsPlan =[];
  }
    ConsultaAdmin(){
       this._PlanificacionServices.ConsultaPlanAdmin(this.planificacionCabeceraModel).subscribe(
                  response=>{  this.tablaAministrador=response; console.log(response)},
                  error=>{ console.log(error);});

    }

  delete(i){
     this.planificacionDetalleModel.estado="E";
     this._PlanificacionServices.InsertDetalle(this.planificacionDetalleModel).subscribe(
                response=>{ this.itemsPlan.splice(i, 1);},
                error=>{ console.log(error);});

  }


EditAdmin(Itemplan,i) {
    this.tablaAministrador[i]=Itemplan;
    this.indexAdmin=i;
      }

  Edit(Itemplan,i) {
      this.accion="u";
      this.planificacionDetalleModel =Itemplan;
      this.index=i;
      console.log(this.index);
    }

  guardar(form: NgForm){
        this.planificacionDetalleModel.cod_plan=this.planificacionCabeceraModel.cod_plan;
          this.addtable=true;
            this._PlanificacionServices.InsertDetalle(this.planificacionDetalleModel).subscribe(
                       response=>{
                                   if(this.accion==="u")
                                   {
                                     this.itemsPlan[this.index] = this.planificacionDetalleModel;
                                      this.resetForm();
                                   }
                                   else{
                                       this.itemsPlan.push(response[0]);
                                       this.resetForm();
                                   }

                       },
                       error=>{
                                console.log(error);
                          }
                    );
  }



    insertaCabcera(){
        if(this.planificacionCabeceraModel.unidad===0)
        {
          this.renderer.setAttribute(this.guardarModal.nativeElement, "disabled", "true");
        }
        else
          {
            this.bloquedoModal=true;
            this.renderer.removeAttribute(this.guardarModal.nativeElement, "disabled");
            this._PlanificacionServices.InsertCabecera(this.planificacionCabeceraModel).subscribe(
                       response=>{},
                       error=>{
                              console.log(error);
                          }
                    );
            }
     this.resetForm();

    }



  resetForm(form?: NgForm) {
              this.accion=null;
              this.index=null;
              if (form != null)
                form.reset();

      this.planificacionDetalleModel= new Planificacion(0,0,'','','','','','','','','');

      }




  }

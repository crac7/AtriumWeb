import { Component,Renderer2, ViewChild ,ElementRef  , OnInit } from '@angular/core';
import { PlanificacionCabeceraModel  } from '../../models/planificacion.cabecera.models';
import { NgForm } from '@angular/forms'
import { PlanificacionServices  } from '../../services/planificacion.services';
import { MateriasDocenteService } from '../../services/materiasDocentes.services'
import * as moment from 'moment';
import { Planificacion  } from '../../models/planificacion';
//import {DetallePlanAdmin} from '../models/DetallePlanAdmin.models';

@Component({
  selector: 'app-planifi-semanal',
  templateUrl: './planifi-semanal.component.html',
  styleUrls: ['./planifi-semanal.component.scss'],
   providers :[PlanificacionServices,MateriasDocenteService]
})
export class PlanifiSemanalComponent implements OnInit {
  @ViewChild("guardarModal") guardarModal: ElementRef;
  @ViewChild("guardaTodo") guardaTodo: ElementRef;
    @ViewChild("modal") modal: ElementRef;
  ///  public DetallePlanAdminModel:  DetallePlanAdmin;
  public planificacionCabeceraModel: PlanificacionCabeceraModel;
  public planificacionDetalleModel:Planificacion;
  visible=true;
  addtable=false;
  bloquedoModal=false;
ObservacionAdmin:string;
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
    //this.DetallePlanAdminModel=
              }

  ngOnInit() {
    this.resetForm();



    /////////
    this._MateriasDocentesServices.MateriasDocentes('P');
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
    this.fechain  =moment().format('L');
    this.fechafin =moment().format('L');
    /*this.planificacionCabeceraModel.fecha_ini =moment().format('L');
      this.planificacionCabeceraModel.fecha_fin =moment().format('L');*/
    this.planificacionCabeceraModel.cod_emp=1;
  }

  Cambiamodal(i){
  // console.log(i);
    this.visible=false;
    this.materia=i.Dm;
    this.paralelo=i.Dp;
    this.curso=i.Dca;
    this.planificacionCabeceraModel.cod_curso= (this.bandera==='A')?i.cod_curso[0]:i.cod_curso;
    this.planificacionCabeceraModel.cod_paralelo= i.cod_paralelo;
    this.planificacionCabeceraModel.cod_mat= i.cod_materia;



  }


  Atras()
  {
     this._PlanificacionServices.ListDetallePlanAdmin=[];
    this.planificacionCabeceraModel=  new PlanificacionCabeceraModel(0,0,'','',0,0,0,'',0,'','','','',0,'','','',0,'','',0,'','');
     this.IniciaCabcera();
       this.planificacionDetalleModel= new Planificacion(0,0,'','','','','','','','','');
    this.visible=true;

    this._PlanificacionServices.ListPlanificacion =[];
      this.bloquedoModal=false;
      this.resetForm();
  }


    ConsultaAdmin(){
  //    this.renderer.setAttribute(this.guardaTodo.nativeElement, "disabled", "true");//Desabilita
  this.planificacionCabeceraModel.fecha_ini =this.fechain;
  this.planificacionCabeceraModel.fecha_fin =this.fechafin;
       if(this.bandera==='A'){
          this._PlanificacionServices.ConsultaPlanAdmin(this.planificacionCabeceraModel);
       }
       else
          {
              this._PlanificacionServices.ListPlanificacion =[];
           let cod_plan;
            this._PlanificacionServices.ConsultaPlanDocente(this.planificacionCabeceraModel)
                          .subscribe(response=>{
                        //    console.log(response);
                            cod_plan=response;
                            if(cod_plan!=null){
                          //
                               console.log(cod_plan.fecha_fin);
                              //console.log(moment(cod_plan.fecha_fin).format('L'));
                              this.planificacionCabeceraModel=cod_plan;
                              this._PlanificacionServices.ConsultaPlanDocenteDetalle(this.planificacionCabeceraModel.cod_plan);
                            }

                          });

          }
        this.renderer.removeAttribute(this.guardaTodo.nativeElement, "disabled");///Habilita boton de guardas
    }

  delete(cod_deta,i){
  //  this.planificacionDetalleModel.cod_deta =cod_deta;
    // this._PlanificacionServices.ListPlanificacion[i];
     this._PlanificacionServices.ListPlanificacion[i].estado="E";
     this._PlanificacionServices.InsertDetalle(this._PlanificacionServices.ListPlanificacion[i]).subscribe(
                response=>{
                    this._PlanificacionServices.ListPlanificacion.splice(i, 1);
                },
                error=>{ console.log(error);});

  }


EditAdmin(Itemplan,i) {

  this.ObservacionAdmin=Itemplan.observaciones;
   //this._PlanificacionServices.ListDetallePlanAdmin[i].observaciones=Itemplan;

    this.indexAdmin=i;
  }
GuardarModalAdmin(){

  this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].cod_profesor =localStorage.getItem('cod_profesor')
this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].usuario_revisor =localStorage.getItem('username')
this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].observaciones=this.ObservacionAdmin;
this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].fecha_revisado=moment().format('L');

this._PlanificacionServices.InsertCabecera(this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin]).subscribe(
           response=>{

           },
           error=>{
                  console.log(error);
              }
        );

}
GeneraPDF(){

  this._PlanificacionServices.GeneraPDFAdmin().subscribe(
        (res) => {
          //  saveAs(res, "myPDF.pdf"); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver

        var fileURL = URL.createObjectURL(res);
        window.open(fileURL); //if you want to open it in new tab

        }
    );
}

  Edit(Itemplan,i) {
    this.bloquedoModal=true;///Habilita modal
    this.renderer.removeAttribute(this.guardarModal.nativeElement, "disabled");///Habilita boton de guardas
      this.accion="u";/// u de update
      this.planificacionDetalleModel =Itemplan;
      this.index=i;
    }
    guardar(form: NgForm){

        this.planificacionDetalleModel.cod_plan=this.planificacionCabeceraModel.cod_plan;

         this.GuardarDetalle();


      }

    GenerarCodigo(){
      this._PlanificacionServices.ListPlanificacion=[] ;
          this._PlanificacionServices.GeneraCodigo().subscribe(
               response=>{
                 console.log(response);
                  this.planificacionCabeceraModel.cod_plan=response;
                  this.planificacionDetalleModel.cod_plan=this.planificacionCabeceraModel.cod_plan;
                  this.planificacionCabeceraModel.fecha_ini =this.fechain;
                  this.planificacionCabeceraModel.fecha_fin =this.fechafin;
                  this._PlanificacionServices.InsertCabecera(this.planificacionCabeceraModel).subscribe(
                             response=>{},
                             error=>{
                                    console.log(error);
                                }
                          );
                 });
        }

    GuardarDetalle(){
      this._PlanificacionServices.InsertDetalle(this.planificacionDetalleModel).subscribe(
                     response=>{
                                 if(this.accion==="u")
                                 {
                                   this._PlanificacionServices.ListPlanificacion[this.index] =response[0] ;

                                    this.resetForm();
                                 }
                                 else{
                                     this._PlanificacionServices.ListPlanificacion.push(response[0]);
                                     this.resetForm();
                                 }

                     },
                     error=>{
                              console.log(error);
                        }
                  );
    }


    insertaCabcera(){
    //  console.log(this.planificacionCabeceraModel.unidad);
        if(this.planificacionCabeceraModel.unidad===0)
        {
          this.renderer.setAttribute(this.guardarModal.nativeElement, "disabled", "true");//Desabilita
        }
        else
          {
            this.bloquedoModal=true;
            this.renderer.removeAttribute(this.guardarModal.nativeElement, "disabled");///Habilita boton de guardas
            if(this.planificacionCabeceraModel.cod_plan===0)
                           this.GenerarCodigo();
             else{
               this.planificacionCabeceraModel.fecha_ini =this.fechain;
               this.planificacionCabeceraModel.fecha_fin =this.fechafin;
               this._PlanificacionServices.InsertCabecera(this.planificacionCabeceraModel).subscribe(
                          response=>{},
                          error=>{
                                 console.log(error);
                             }
                       );

             }
          }

     this.resetForm();

    }

      GuardaTodo(){
        //this.insertaCabcera();
        if(this.bandera==="A")
          {    if(this._PlanificacionServices.ListDetallePlanAdmin.length>0)
              {
                this._PlanificacionServices.ListDetallePlanAdmin.map((elemen)=>{
                  elemen.cod_profesor =localStorage.getItem('cod_profesor');
                  elemen.usuario_revisor =localStorage.getItem('username')
                    elemen.observaciones=this.ObservacionAdmin;
                    elemen.fecha_revisado=moment().format('L');
                    //console.log(elemen);
                })

                this._PlanificacionServices.InsertCabecera(this._PlanificacionServices.ListDetallePlanAdmin).subscribe(
                           response=>{},
                           error=>{
                                  console.log(error);
                              }
                        );

              }
            }
            else
            {
              this.insertaCabcera();
            }
      }

  resetForm(form?: NgForm) {
              this.accion=null;
              this.index=null;
              if (form != null)
                form.reset();

      this.planificacionDetalleModel= new Planificacion(0,0,'','','','','','','','','');

      }




  }

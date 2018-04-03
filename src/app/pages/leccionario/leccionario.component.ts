import { Component, OnInit } from '@angular/core';
import { MateriasDocenteService } from '../../services/materiasDocentes.services'
import {LeccionarioServices} from '../../services/leccionario.services'
import * as moment from 'moment';
import {ModelLeccionarioDocente}  from '../../models/leccionario.docente.models';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-leccionario',
  templateUrl: './leccionario.component.html',
  styleUrls: ['./leccionario.component.scss'],
  providers :[MateriasDocenteService, LeccionarioServices, DatePipe]
})
export class LeccionarioComponent implements OnInit {
visible=true;
materias: Array<any>;
nombre:string;
fecha:string;
fechafin:string;
codigoPeriodo:string;
letPeriodo:string;
user:string;
Cabecera:Array<any>;
unidad:number;
codhorario:string;
indexEditLecionario:number;
DatosLecionarioDocen: Array<any>;
bandera:string;
accionDocente:string;
public MLeccionarioDocente:ModelLeccionarioDocente;
  constructor(private _MateriasDocentesServices: MateriasDocenteService,
              private _LeccionarioServices:LeccionarioServices,
                private datePipe: DatePipe) { }

  ngOnInit() {
  this.MLeccionarioDocente= new ModelLeccionarioDocente(0,0,0,'',0,0,0,0,'','','',false,'','','',0,'', 0,'','','','','','','');
    this.fecha =moment().format('L');   //
      this.fechafin=moment().format('L');   //
    this._MateriasDocentesServices.MateriasDocentes('L');
    this._MateriasDocentesServices.UnidadesDocentes();
    this._LeccionarioServices.HorariosDocentes();
    this.nombre=localStorage.getItem('nombre');
    this.codigoPeriodo= localStorage.getItem('cod_per'),
    this.letPeriodo= localStorage.getItem('let_per');
    this.user=localStorage.getItem('username');
    this.indexEditLecionario=0;
    this.bandera =localStorage.getItem('bandera');
  }
  Cambiamodal(i){
    this.Cabecera=[{
                     materia:i.Dm,
                     tipo:i.Dn,
                     curso:i.Dca,
                     cursoCompleto:i.Dc,
                     paralelo:i.Dp,
                     codMateria:i.cod_materia,
                     codCurso:i.cod_curso,
                     codParalelo:i.cod_paralelo,
                     nivel:i.nivel,
                     inspector:i.inspector,
                }];
    this.visible=false;

  }
        ConsultaLecionario(accion){
            let datos
            this._LeccionarioServices.LeccionarioDocenteList=[];
                 datos={
                              cod_curso:this.Cabecera[0].codCurso,
                              cod_paralelo:this.Cabecera[0].codParalelo,
                              cod_mat:this.Cabecera[0].codMateria,
                              unidad:this.unidad,
                              fecha:this.fecha
                          }

          if(accion==="P"){  this._LeccionarioServices.ConsultaLeccionario(datos);}
          if(accion==="A"){
            datos.fecha_fin=this.fechafin;
          //  console.log(datos);
            this._LeccionarioServices.ConsultaLeccionarioInspector(datos);

          }
        //  console.log(this._LeccionarioServices.LeccionarioDocenteList);
        }

        delete(i){
        //  this.planificacionDetalleModel.cod_deta =cod_deta;
          // this._PlanificacionServices.ListPlanificacion[i];
          if(confirm("¿Esta seguro de eliminar?")){
          this._LeccionarioServices.LeccionarioDocenteList[i].cod_profesor= parseInt(localStorage.getItem('cod_profesor'));
           this._LeccionarioServices.LeccionarioDocenteList[i].estado="E";
          this._LeccionarioServices.InsertaLeccionario(this._LeccionarioServices.LeccionarioDocenteList[i]).subscribe(
                      response=>{
                          this._LeccionarioServices.LeccionarioDocenteList.splice(i, 1);
                      },
                      error=>{ console.log(error);});


            }


        }

        Edit(Itemplan,i, accion="u") {
          this.accionDocente=accion;
          Itemplan.cod_profesor= localStorage.getItem('cod_profesor');
          Itemplan.estado="A";
          Itemplan.observaciones_coordinador="";
          Itemplan.observaciones_inspector="";
          Itemplan.fecha_coordinador="";
          Itemplan.fecha_inspector="";
          Itemplan.usuario_coordinador="";
          Itemplan.usuario_inspector="";
          this.MLeccionarioDocente=Itemplan;
          //this.MLeccionarioDocente.cod_profesor=416
            this.indexEditLecionario=i;
          }
    GuardarLeccionario(){


        this._LeccionarioServices.InsertaLeccionario(this.MLeccionarioDocente).subscribe(
                   response=>{
                         console.log(response.length);
                     if(response.length>0)
                      {  if(this.accionDocente==="u")
                         {
                           this._LeccionarioServices.LeccionarioDocenteList[this.indexEditLecionario] =response[0] ;

                            alert("Lecionario Actulizado :)");
                         }
                         else{
                             this._LeccionarioServices.LeccionarioDocenteList.push(response[0]);
                          ///   this.resetForm();
                             alert("Lecionario Guardado :)");
                         }

                      }

                   },
                   error=>{ console.log(error);});
    }
 GuardaTodo(){
      this.DatosLecionarioDocen=   this._LeccionarioServices.LeccionarioDocenteList;
      this.DatosLecionarioDocen.map((elemen)=>{
              elemen.cod_profesor= localStorage.getItem('cod_profesor');
              elemen.estado="A";
              elemen.observaciones_coordinador="";
              elemen.observaciones_inspector="";
              elemen.fecha_coordinador="";
              elemen.fecha_inspector="";
              elemen.usuario_coordinador="";
              elemen.usuario_inspector="";
      })

      this._LeccionarioServices.InsertaLeccionarioArreglo(this.DatosLecionarioDocen).subscribe(
                 response=>{
                    console.log(this.DatosLecionarioDocen);
                  alert("Guardo correctamente :)");
                 },
                 error=>{ console.log(error);});
 }

 GeneraPDF(i){

//  this._LeccionarioServices.LeccionarioInspectorList[i].fecha =this.datePipe.transform(this._LeccionarioServices.LeccionarioInspectorList[i].fecha, 'yyyy-dd-MM');
  console.log(this._LeccionarioServices.LeccionarioInspectorList[i]);
   this._LeccionarioServices.GeneraPDFLecionario(this._LeccionarioServices.LeccionarioInspectorList[i]).subscribe(
         (res) => {
           //  saveAs(res, "myPDF.pdf"); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver

         var fileURL = URL.createObjectURL(res);
         window.open(fileURL);

         }
     );
 }


  Atras()
  {
    this.unidad =0;
    this._LeccionarioServices.LeccionarioDocenteList=[];
    this.indexEditLecionario=0;

    this.visible=true;
  }
}

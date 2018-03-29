import { Component, OnInit } from '@angular/core';
import { MateriasDocenteService } from '../../services/materiasDocentes.services'
import {LeccionarioServices} from '../../services/leccionario.services'
import * as moment from 'moment';
import {ModelLeccionarioDocente}  from '../../models/leccionario.docente.models';
@Component({
  selector: 'app-leccionario',
  templateUrl: './leccionario.component.html',
  styleUrls: ['./leccionario.component.scss'],
  providers :[MateriasDocenteService, LeccionarioServices]
})
export class LeccionarioComponent implements OnInit {
visible=true;
materias: Array<any>;
nombre:string;
fecha:string;
codigoPeriodo:string;
letPeriodo:string;
user:string;
Cabecera:Array<any>;
unidad:number;
codhorario:string;
indexEditLecionario:number;
DatosLecionarioDocen: Array<any>;
bandera:string;

public MLeccionarioDocente:ModelLeccionarioDocente;
  constructor(private _MateriasDocentesServices: MateriasDocenteService,
              private _LeccionarioServices:LeccionarioServices) { }

  ngOnInit() {
  this.MLeccionarioDocente= new ModelLeccionarioDocente(0,0,0,'',0,0,0,0,'','','',false,'','','',0,'', 0,'','','','','','','');
    this.fecha =moment().format('L');   //
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
            this._LeccionarioServices.LeccionarioDocenteList=[];
                const datos={
                              cod_curso:this.Cabecera[0].codCurso,
                              cod_paralelo:this.Cabecera[0].codParalelo,
                              cod_mat:this.Cabecera[0].codMateria,
                              unidad:this.unidad,
                              fecha:this.fecha
                          }

          if(accion="C")  this._LeccionarioServices.ConsultaLeccionario(datos,accion);
          else
            {
               this._LeccionarioServices.ConsultaLeccionario(datos,accion).subscribe(
                       response=>{
                        //console.log(response);
                        alert("Guardo correctamente :)");
                       },
                       error=>{ console.log(error);});
          }
          console.log(this._LeccionarioServices.LeccionarioDocenteList);
        }
        Edit(Itemplan,i) {
///this.bloquedoModal=true;///Habilita modal
          //this.renderer.removeAttribute(this.guardarModal.nativeElement, "disabled");///Habilita boton de guardas
          //  this.accion="u";/// u de update
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
                    //console.log(response);
                    alert("Guardo correctamente :)");
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

  Atras()
  {
    this.unidad =0;
    this._LeccionarioServices.LeccionarioDocenteList=[];
    this.indexEditLecionario=0;
    this.visible=true;
  }
}

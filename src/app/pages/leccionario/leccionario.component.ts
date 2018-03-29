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
unidad:string;
codhorario:string;
indexEditLecionario:number;
public MLeccionarioDocente:ModelLeccionarioDocente;
  constructor(private _MateriasDocentesServices: MateriasDocenteService,
              private _LeccionarioServices:LeccionarioServices) { }

  ngOnInit() {
  this.MLeccionarioDocente= new ModelLeccionarioDocente(0,0,0,'',0,0,0,0,'','','',false,'','','',0,'',  0,'','','','','','','');
    this.fecha =moment().format('L');   //
    this._MateriasDocentesServices.MateriasDocentes('L');
    this._MateriasDocentesServices.UnidadesDocentes();
    this._LeccionarioServices.HorariosDocentes();
    this.nombre=localStorage.getItem('nombre');
    this.codigoPeriodo= localStorage.getItem('cod_per'),
    this.letPeriodo= localStorage.getItem('let_per');
    this.user=localStorage.getItem('username');

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
        ConsultaLecionario(){
                const datos={
                              cod_curso:this.Cabecera[0].codCurso,
                              cod_paralelo:this.Cabecera[0].codParalelo,
                              cod_mat:this.Cabecera[0].codMateria,
                              unidad:this.unidad,
                              fecha:this.fecha
                          }

            this._LeccionarioServices.ConsultaLeccionario(datos);
          console.log(this._LeccionarioServices.LeccionarioDocenteList);
        }
        Edit(Itemplan,i) {
///this.bloquedoModal=true;///Habilita modal
          //this.renderer.removeAttribute(this.guardarModal.nativeElement, "disabled");///Habilita boton de guardas
          //  this.accion="u";/// u de update
        this.MLeccionarioDocente=Itemplan;
            this.indexEditLecionario=i;
          }
  Atras()
  {
    this.visible=true;
  }
}

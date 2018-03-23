import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { ModelMateriasDocentes }  from '../../models/modelMaterias'
import { MateriasDocenteService } from '../../services/materiasDocentes.services'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers :[MateriasDocenteService]
})
export class TableListComponent implements OnInit {

  faltasAtraso: Array<any>;
  faltas: Array<any>;
  visible=true;
  Cabecera:Array<any>;
  nombre:string;
  fecha:string;
  codigoPeriodo:string;
  letPeriodo:string;
  user:string;
  AlumnosCurso:Array<any>;
  bandera:string;
  codProfesor:string;
  unidad:number;
  detallesMaterias:Array<any>;
  ////
  prueba:Array<any>;
  constructor(private _MateriasDocentesServices: MateriasDocenteService) {


  }

  ngOnInit() {
     this.fecha =moment().format('L');   //
     this._MateriasDocentesServices.MateriasDocentes();
     this._MateriasDocentesServices.UnidadesDocentes();
     this.nombre=localStorage.getItem('nombre');
     this.codigoPeriodo= localStorage.getItem('cod_per'),
     this.letPeriodo= localStorage.getItem('let_per');
     this.user=localStorage.getItem('username');
     this.bandera=localStorage.getItem('bandera');
     this.codProfesor=localStorage.getItem('cod_profesor')
     this.prueba=[  { name: "Falta", valor:1},
                     { name: "Atraso", valor:2},
                     { name: "Retirado",valor:3},
                     { name: "Abandono", valor:4}];

  }

  onSubmiLeccionario(){


  this.faltasAtraso=this._MateriasDocentesServices.AlumnCursosList


     for (let i in this.faltasAtraso) {
        this.faltasAtraso[i].cod_per =  2017;
        this.faltasAtraso[i].let_per =  this.letPeriodo;
        this.faltasAtraso[i].cod_curso =  this.Cabecera[0].codCurso;
        this.faltasAtraso[i].cod_paralelo =  this.Cabecera[0].codParalelo;
        this.faltasAtraso[i].cod_materia =  this.Cabecera[0].codMateria;
        this.faltasAtraso[i].unidad =     this.AlumnosCurso[0].unidad;
        this.faltasAtraso[i].fecha =      this.fecha;
        this.faltasAtraso[i].cod_profesor=this.AlumnosCurso[0].cod_profesor;
        this.faltasAtraso[i].usuario=this.user.trim();
        this.faltasAtraso[i].justifica= (this.faltasAtraso[i].justifica)? 1:0 ;
        this.faltasAtraso[i].asistencia= (this.faltasAtraso[i].asistencia)? 1:0 ;
     }
     this._MateriasDocentesServices.InsFaltasAtrasos(this.faltasAtraso).subscribe(
          response=>{


          },
          error=>{

          }
       );
    //console.log(this.faltasAtraso);

  }

  Cambiamodal(i){
   this.faltas =[  { name: "Falta", valor:1},
                   { name: "Atraso", valor:2},
                   { name: "Retirado",valor:3},
                   { name: "Abandono", valor:4}];


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
ConsultarAlumnos(unidad:number) : void{
 this.unidad=unidad;
  // console.log(this.fecha);
   this.AlumnosCurso=[{
                      cod_per: 2017,///this.codigoPeriodo,<---------------------------------canmbiar
                      let_per: this.letPeriodo,
                      cod_curso: this.Cabecera[0].codCurso,
                      cod_paralelo: this.Cabecera[0].codParalelo,
                      cod_materia: this.Cabecera[0].codMateria,
                      unidad: unidad,
                      fecha:  this.fecha,
                      cod_profesor:  this.codProfesor,
                    }]
  //console.log( this.AlumnosCurso[0]);

   this._MateriasDocentesServices.AlumnosCurso(this.AlumnosCurso[0]);
   console.log(this._MateriasDocentesServices.AlumnCursosList);

}
/*CambiaCheck(p){

   console.log(p);
}*/

DetalleAlum(codAlumno){

console.log(this.Cabecera[0]);
  const detalle = {
        cod_per:   this.codigoPeriodo,
        let_per: this.letPeriodo,
        cod_alum: codAlumno,
        cod_curso: this.Cabecera[0].codCurso[0],
        cod_paralelo:  this.Cabecera[0].codParalelo,
        cod_materia: this.Cabecera[0].codMateria,
        unidad:   this.unidad,
        fecha: this.fecha,
       cod_profesor:  this.codProfesor
    }
 console.log(detalle);

  this._MateriasDocentesServices.DetalleFalta(detalle)
            .subscribe(response => {
             console.log(response);
                  this.detallesMaterias = response;
                ////llenar arreglo
            },
            error=>{
                var erroMessage= <any> error;
                 if(erroMessage !=null){
                   var body =JSON.parse(error);
                  // this.aletErrorRegister=body.error;
                    console.log(error);
                 }
            })
  }


checkAll(ev) {
  if(this._MateriasDocentesServices.AlumnCursosList[ev].asistencia){
    this._MateriasDocentesServices.AlumnCursosList[ev].tipo_falta=0;
  }
  else{
    this._MateriasDocentesServices.AlumnCursosList[ev].tipo_falta=1;
  }

    console.log(ev);
 }



  Atras()
  {
    this.Cabecera=null;
    this.visible=true;
    this._MateriasDocentesServices.AlumnCursosList=[];
     this.fecha =moment().format('L');   //
  }

  GeneraPDF(){
    console.log("funciona");
  }

}

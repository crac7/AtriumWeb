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

  alumnos: Array<any>;
  faltas: Array<any>;
  visible=true;
  Cabecera:Array<any>;
  nombre:string;
 fecha:string;
  constructor(private _MateriasDocentesServices: MateriasDocenteService) {


  }

  ngOnInit() {
   this.fecha =moment().format('L');   //
   console.log(this.fecha);
     this._MateriasDocentesServices.MateriasDocentes();
     this.nombre=localStorage.getItem('nombre');

  }

  onSubmiLeccionario(){
    
      console.log(this.alumnos);
        /*this.alumnos =this.alumnos.map(function(i){
           console.log( i);
         return
       })*/
//console.log(this.alumnos);

      }
  Cambiamodal(i){
    this.alumnos=[];
    this.alumnos = [{ codigo: 20054914, nombre_alumno:"Sierra Saico Susan Selena" , checked:true ,motivo_atraso:"" ,cheked_juti:false  , descripciopn_juti:"" },
                    { codigo: 20054915, nombre_alumno:"Sanchez Benitez Jorge Luis" , checked:true ,motivo_atraso:"" ,cheked_juti:false , descripciopn_juti:"" },
                    { codigo: 20054916, nombre_alumno:"Gonzales Benites Jose Pablo" , checked:true ,motivo_atraso:"",cheked_juti:false  , descripciopn_juti:"" },
                    { codigo: 20054917, nombre_alumno:"Layana Molina Sara Noemi" , checked:true ,motivo_atraso:"" ,cheked_juti:false  , descripciopn_juti:""  },
                    { codigo: 20054914, nombre_alumno:"Cruz Tobar Jose Antonio" , checked:true  ,motivo_atraso:"" ,cheked_juti:false   , descripciopn_juti:"" }];

   this.faltas =[  { name: "" , valor:0},
                   { name: "Falta", valor:1},
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

  Atras()
  {
    this.Cabecera=null;
    this.visible=true;
  }


}

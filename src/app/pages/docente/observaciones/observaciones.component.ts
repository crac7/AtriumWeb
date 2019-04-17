import { Component, OnInit } from '@angular/core';
//import { MateriasDocenteService } from '../../../services/docente/materiasDocentes.services';
import { DatePipe } from '@angular/common';
import { MateriasDocenteService } from 'app/services/service.index';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html'
  //styleUrls: ['./observaciones.component.scss'],
  //providers: [/*MateriasDocenteService,*/ DatePipe]
})
export class ObservacionesComponent implements OnInit {

  visible:boolean;
  content:boolean;
  Cabecera: Array<any>;
  nombre: string;
  fecha: string;
  bandera:string;
  letPeriodo: string;
  codigoPeriodo: string;
  AlumnosLista:Array<any>;
  AlumnosDatos:Array<any>;
  unidad:number=0;
  codProfesor: string;

  constructor(private _MateriasDocentesServices: MateriasDocenteService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.visible = false;
    this.content = false;
    this.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this._MateriasDocentesServices.MateriasDocentes('O');
    this._MateriasDocentesServices.UnidadesDocentes();
    this.nombre = localStorage.getItem('nombre');
    this.letPeriodo= localStorage.getItem('let_per');
    this.codigoPeriodo= localStorage.getItem('cod_per');
    this.codProfesor=localStorage.getItem('cod_profesor');
    this.bandera = localStorage.getItem('bandera');


    console.log('nombre ', this.nombre);
    console.log('letPeriodo ', this.letPeriodo);
    console.log('codigoPeriodo ', this.codigoPeriodo);
    console.log('codProfesor ', this.codProfesor);
    console.log('bandera ', this.bandera);
  }

  Cambiamodal(i) {
    this.Cabecera = [{
      materia: i.Dm,
      tipo: i.Dn,
      curso: i.Dca,
      cursoCompleto: i.Dc,
      paralelo: i.Dp,
      codMateria: i.cod_materia,
      codCurso: i.cod_curso,
      codParalelo: i.cod_paralelo,
      nivel: i.nivel,
      inspector: i.inspector,
    }];
    this.visible = true;

    this.AlumnosLista=[{
      cod_curso: this.Cabecera[0].codCurso,
      des_paralelo: this.Cabecera[0].paralelo,
      cod_per: this.codigoPeriodo,
      let_per: this.letPeriodo
    }]

    this._MateriasDocentesServices.AlumnosLista(this.AlumnosLista[0]);

  }

  Atras(verificador: any) {
    if (verificador === true) {
      this.Cabecera = null;
      this.visible = false;
      this.content = false;
      this._MateriasDocentesServices.AlumnCursosList = [];
      this.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    } else if (verificador === false) {
      verificador = true;
    }
  }

  Agregar() {
    this.content = true;
  }

}

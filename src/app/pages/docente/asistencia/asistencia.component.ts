import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
/*import * as moment from 'moment';*/
import { DatePipe } from '@angular/common';
/*import { ModelMateriasDocentes } from  '../../../models/modelMaterias'*/
import { MateriasDocenteService } from 'app/services/service.index';
import { saveAs } from 'file-saver/FileSaver';
import Swal from 'sweetalert2'
/*import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';*/

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html'/*,
  styleUrls: ['./asistencia.component.css']*/
})

export class AsistenciaComponent implements OnInit {
  DatoPDF: Array<any>;
  faltasAtraso: Array<any>;
  faltas: Array<any>;
  visible = true;
  Cabecera: Array<any>;
  nombre: string;
  fecha: string;
  codigoPeriodo: string;
  letPeriodo: string;
  user: string;
  AlumnosCurso: Array<any>;
  bandera: string;
  codProfesor: string;
  unidad = 0;
  fecha_ini: string;
  fechafin: string;
  detallesMaterias: Array<any>;
  /*swal: SweetAlert = _swal as any;*/
  estado: string;
  prueba: Array<any>;

  constructor(private _MateriasDocentesServices: MateriasDocenteService, private datePipe: DatePipe ) {
  }

  ngOnInit() {
    this.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fecha_ini = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fechafin = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this._MateriasDocentesServices.MateriasDocentes();
    this._MateriasDocentesServices.UnidadesDocentes();
    this.nombre = localStorage.getItem('nombre');
    this.codigoPeriodo = localStorage.getItem('cod_per');
    this.letPeriodo = localStorage.getItem('let_per');
    this.user = localStorage.getItem('username');
    this.bandera = localStorage.getItem('bandera');
    this.codProfesor = localStorage.getItem('cod_profesor');
    this.prueba = [
      { name: 'Falta', valor: 1 },
      { name: 'Atraso', valor: 2 },
      { name: 'Retirado', valor: 3 },
      { name: 'Abandono', valor: 4 }
    ];
    this.estado = 'SIN CONSULTAR';
  }

  GuardaFaltas() {
    this.faltasAtraso = this._MateriasDocentesServices.AlumnCursosList
    console.log(this.faltasAtraso);
    this.faltasAtraso.map((elem) => {
      elem.cod_per = this.codigoPeriodo;
      elem.let_per = this.letPeriodo;
      elem.cod_curso = this.Cabecera[0].codCurso;
      elem.cod_paralelo = this.Cabecera[0].codParalelo;
      elem.cod_materia = this.Cabecera[0].codMateria;
      elem.unidad = this.AlumnosCurso[0].unidad;
      elem.fecha = this.fecha;
      elem.cod_profesor = this.AlumnosCurso[0].cod_profesor;
      elem.usuario = this.user.trim();
      elem.justifica = (elem.justifica) ? 1 : 0;
      elem.asistencia = (elem.asistencia) ? 1 : 0;
      if (elem.tipo_falta === 5) {
        elem.tipo_falta = 0;
      }
    });
    /*for (let i = 0 ; i <= this.faltasAtraso.length ; i ++) {
      this.faltasAtraso[i].cod_per = this.codigoPeriodo;
      this.faltasAtraso[i].let_per = this.letPeriodo;
      this.faltasAtraso[i].cod_curso = this.Cabecera[0].codCurso;
      this.faltasAtraso[i].cod_paralelo = this.Cabecera[0].codParalelo;
      this.faltasAtraso[i].cod_materia = this.Cabecera[0].codMateria;
      this.faltasAtraso[i].unidad = this.AlumnosCurso[0].unidad;
      this.faltasAtraso[i].fecha = this.fecha;
      this.faltasAtraso[i].cod_profesor = this.AlumnosCurso[0].cod_profesor;
      this.faltasAtraso[i].usuario = this.user.trim();
      this.faltasAtraso[i].justifica = (this.faltasAtraso[i].justifica) ? 1 : 0;
      this.faltasAtraso[i].asistencia = (this.faltasAtraso[i].asistencia) ? 1 : 0;
      if (this.faltasAtraso[i].tipo_falta === 5) {
        this.faltasAtraso[i].tipo_falta = 0;
      }
    }*/

    this._MateriasDocentesServices.InsFaltasAtrasos(this.faltasAtraso).subscribe(
      response => {
        this.ConsultarAlumnos();
        Swal.fire('Asistencias', 'Guardado exitosamente!', 'success');
      },
      error => {
        console.log(error);
      }
    );
  }

  Cambiamodal(i: any) {
    this.unidad = 0;
    if (this.bandera === 'A') {
      this.faltas = [{ name: 'Falta', valor: 1 },
      { name: 'Atraso', valor: 2 },
      { name: 'Retirado', valor: 3 },
      { name: 'Abandono', valor: 4 },
      { name: 'N/A', valor: 5 }];
    } else {
      this.faltas = [{ name: 'Falta', valor: 1 },
      { name: 'Atraso', valor: 2 },
      { name: 'Retirado', valor: 3 },
      { name: 'Abandono', valor: 4 },
      { name: 'N/A', valor: 5 }];
    }
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

    this.visible = false;
  }

  ConsultarAlumnos(): void {
    this.AlumnosCurso = [{
      cod_per: this.codigoPeriodo, /*this.codigoPeriodo,<---------------------------------canmbiar*/
      let_per: this.letPeriodo,
      cod_curso: this.Cabecera[0].codCurso,
      cod_paralelo: this.Cabecera[0].codParalelo,
      cod_materia: this.Cabecera[0].codMateria,
      unidad: this.unidad,
      fecha: this.fecha,
      cod_profesor: this.codProfesor
    }];
    this._MateriasDocentesServices.AlumnosCurso(this.AlumnosCurso[0]);
    this._MateriasDocentesServices.ConsultaRegistrado(this.AlumnosCurso[0]).subscribe(
      response => {
        this.estado = response[0].registro;
      },
      error => {
        // let body = JSON.parse(error);
        console.log(error);
      });
  }

  DetalleAlum(codAlumno: any) {
    const detalle = {
      cod_per: this.codigoPeriodo,
      let_per: this.letPeriodo,
      cod_alum: codAlumno,
      cod_curso: this.Cabecera[0].codCurso[0],
      cod_paralelo: this.Cabecera[0].codParalelo,
      cod_materia: this.Cabecera[0].codMateria,
      unidad: this.unidad,
      fecha: this.fecha,
      cod_profesor: this.codProfesor
    };
    this._MateriasDocentesServices.DetalleFalta(detalle)
      .subscribe(
        response => {
          this.detallesMaterias = response;
        },
        error => {
          const erroMessage = <any>error;
          if (erroMessage != null) {
            const body = JSON.parse(error);
            // this.aletErrorRegister=body.error;
            console.log(error);
          }
        });
  }

  checkAll(ev: any) {
    if (this._MateriasDocentesServices.AlumnCursosList[ev].asistencia) {
      this._MateriasDocentesServices.AlumnCursosList[ev].tipo_falta = 0;
    } else {
      this._MateriasDocentesServices.AlumnCursosList[ev].tipo_falta = 1;
    }
  }

  Atras() {
    this.Cabecera = null;
    this.visible = true;
    this._MateriasDocentesServices.AlumnCursosList = [];
    this.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fecha_ini = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fechafin = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.unidad = 0;
    this.estado = 'SIN CONSULTAR';
  }

  GeneraPDF() {
    //  this.fechafin  =this.datePipe.transform(this.fechafin, 'yyyy-MM-dd');
    Swal.fire('Hey!', 'Espera unos segundo hasta que la descarga empiece', 'warning');
    this.DatoPDF = [{
      cod_per: this.codigoPeriodo, /// this.codigoPeriodo,<---------------------------------canmbiar
      let_per: this.letPeriodo,
      cod_curso: this.Cabecera[0].codCurso,
      cod_paralelo: this.Cabecera[0].codParalelo,
      cod_materia: this.Cabecera[0].codMateria,
      unidad: this.unidad,
      fecha_ini: this.fecha_ini,
      cod_profesor: this.codProfesor,
      fecha_fin: this.fechafin
    }];
    this._MateriasDocentesServices.GeneraPDFaltas(this.DatoPDF).subscribe(
      (res) => {
        saveAs(res, `Asist_${this.Cabecera[0].curso}_${this.Cabecera[0].paralelo}.pdf`);
      }
    );
  }
}

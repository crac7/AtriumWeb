import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leccionario',
  templateUrl: './leccionario.component.html',
  styleUrls: ['./leccionario.component.scss']
})
export class LeccionarioComponent implements OnInit {
visible=true;
materias: Array<any>;
  constructor() { }

  ngOnInit() {

   this.materias=[{materia:"ENGLISH B HIGHER LEVEL / 2DO_BACHILLERATO / MIX / B"},
                  {materia:"ENGLISH B HIGHER LEVEL / 2DO_BACHILLERATO / MIX / C"},
                  {materia:"ENGLISH B HIGHER LEVEL / 2DO_BACHILLERATO / MIX / D"},
                  {materia:"ENGLISH B HIGHER LEVEL / 3RO_BACHILLERATO / MIX / D"},
                ];

  }
  Cambiamodal(){

    this.visible=false;
  }
  Atras()
  {
    this.visible=true;
  }
}

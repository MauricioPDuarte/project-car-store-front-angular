import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cadastro-menu',
  templateUrl: './cadastro-menu.component.html',
  styleUrls: ['./cadastro-menu.component.css']
})
export class CadastroMenuComponent implements OnInit {

  @Input() titulo: string;

  constructor() { }

  ngOnInit() {
  }

}

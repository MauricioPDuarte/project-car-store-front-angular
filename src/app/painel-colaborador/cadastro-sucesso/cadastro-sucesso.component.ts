import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-sucesso',
  templateUrl: './cadastro-sucesso.component.html',
  styleUrls: ['./cadastro-sucesso.component.css']
})
export class CadastroSucessoComponent implements OnInit {

  title: string;
  message: string;
  veiculoId: string;

 
  constructor(
    public dialogRef: MatDialogRef<CadastroSucessoComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.title = data.title;
      this.message = data.message;
      this.veiculoId = data.veiculoId;
     }

  close() {
    this.dialogRef.close();
  }

  verAnuncio(){
    this.router.navigate([`/veiculo/${this.veiculoId}`]);
    this.close();
  }

  cadastrarNovo() {
    this.router.navigate(['/colaborador/cadastrar-veiculo']);
    this.close();
  }

  ngOnInit() {
  }

}

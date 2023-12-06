import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  
  public exibirFormulario: boolean = false;
  public botaoFormularioTexto: string = 'Mostrar Formulario';

  public exibirLista: boolean = false;
  public botaoListaTexto: string = 'Mostrar Lista';

  public mostrarFormulario(): void {
    this.exibirFormulario = !this.exibirFormulario;
    this.botaoFormularioTexto = this.exibirFormulario ? 'Esconder Formulario' : 'Mostrar Formulario';
  }

  public mostrarLista(): void {
    this.exibirLista = !this.exibirLista;
    this.botaoListaTexto = this.exibirLista ? 'Esconder Lista' : 'Mostrar Lista';
  }
}

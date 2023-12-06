import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListagemService } from 'src/app/services/listagem.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public formulario: FormGroup;
  public mensagemUsuario: string = '';
  public textoBotao: string = 'Adicionar';

  constructor(
    private formBuilder: FormBuilder,
    private listagemService: ListagemService
  ) {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      classificacao: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.listagemService.dadoSelecionado$.subscribe((dadoSelecionado) => {
      if (dadoSelecionado) {
        this.formulario.patchValue(dadoSelecionado);
        this.textoBotao = 'Atualizar';
      } else {
        this.textoBotao = 'Adicionar';
      }
    });
  }

  public adicionarDados(): void {
    const dadosFormulario = this.formulario.value;

    if (this.formulario.valid) {
      if (this.listagemService.obterDadoSelecionado()) {
        this.listagemService.atualizarDado(this.listagemService.obterDadoSelecionado(), dadosFormulario);
        this.limparDados();
        this.mensagemUsuario = 'Dados atualizados na lista!';
      } else {        
        this.listagemService.atualizarDados([dadosFormulario]);
        this.limparDados();
        this.mensagemUsuario = 'Dados adicionados à lista!';
      }

      this.listagemService.selecionarDado(null);
    } else {
      this.mensagemUsuario = 'Por favor, preencha todos os campos!';
    }
  }

  public limparDados(): void {
    this.formulario.reset();
  }

  public limparMensagem(): void {
    this.mensagemUsuario = '';
  }
}

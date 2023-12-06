import { Component, OnInit } from '@angular/core';
import { ListagemService } from 'src/app/services/listagem.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})

export class ListaComponent implements OnInit {
  public dados: any[] = []; //aqui a variável tem a tipagem 'any' para efeitos de simplicidade, pois o correto é criar um model para tipar com os dados esperados corretos
  public dadoSelecionado: any;
  public mensagemUsuario: string = '';

  constructor(
    private listagemService: ListagemService
  ) {}

  ngOnInit() {
    this.listagemService.dados$.subscribe(dados => {
      this.dados = dados;
    });

    this.listagemService.dadoSelecionado$.subscribe(dadoSelecionado => {
      this.dadoSelecionado = dadoSelecionado;
    });
  }

  deletarDado(dado: any) {
    this.listagemService.deletarDado(dado);
    this.listagemService.selecionarDado(null);
    this.mensagemUsuario = 'Dado deletado da lista!';

    /*
      esse timeout é somente para apagar a mensagem do dado deletado
    */
    setTimeout(() => {
      this.mensagemUsuario = '';
    }, 2000);
  }

  selecionarDado(dado: any) {
    this.listagemService.selecionarDado(dado);
    this.mensagemUsuario = '';
  }
}

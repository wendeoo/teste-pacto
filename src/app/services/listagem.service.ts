import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListagemService {

  /*
    esta service é apenas um exemplo, em um cenário real o correto seria
    chamar um método que chame um endpoint para fazer a persistência dos
    dados no banco, aqui nesse caso estou apenas preenchendo um array com
    os dados para poder exibi-los na página e manipulando esses dados com
    subscribe para poder atualizar e deletar
  
  */
  constructor() { }

  /*
    utilizei o BehaviorSubject pois ele armazena o último valor que foi emitido
    e fornece esse valor pra qualquer método que se inscreva (subscribe) nele
  */

  private dadosSubject = new BehaviorSubject<any[]>([]);
  private dadoSelecionadoSubject = new BehaviorSubject<any>(null);
  public dadoSelecionado: any = null;

  /*
    retornando um Observable faço com que os métodos que consomem esse serviço
    não consigam emitir valores diretamente mas sim somente 'escutar' as alteraçoes
    nos dadoss
  */

  dados$ = this.dadosSubject.asObservable();
  dadoSelecionado$ = this.dadoSelecionadoSubject.asObservable();

  atualizarDados(novosDados: any[]) {
    const dadosAtuais = this.dadosSubject.value;
    const dadosAtualizados = [...dadosAtuais, ...novosDados];
    this.dadosSubject.next(dadosAtualizados);
  }

  deletarDado(dado: any) {
    const dadosAtuais = this.dadosSubject.value;
    const dadosAtualizados = dadosAtuais.filter(item => item !== dado);
    this.dadosSubject.next(dadosAtualizados);
  }

  atualizarDado(dadoAntigo: any, dadoAtualizado: any) {
    const dadosAtuais = this.dadosSubject.value;
    const index = dadosAtuais.indexOf(dadoAntigo);
    const dadosAtualizados = [...dadosAtuais];
    
    if (index !== -1) {
      dadosAtualizados[index] = dadoAtualizado;
      this.dadosSubject.next(dadosAtualizados);
    }
  }

  selecionarDado(dado: any) {
    this.dadoSelecionadoSubject.next(dado);
  }

  obterDadoSelecionado() {
    return this.dadoSelecionadoSubject.value;
  }
}

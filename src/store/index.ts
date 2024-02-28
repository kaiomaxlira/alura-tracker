import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONA_TAREFAS, ALTERA_TAREFAS } from './tipo-mutacoes';
import { INotificacao } from '@/interfaces/INotificacao';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from './tipo-acoes';
import http from "@/http"
import ITarefa from '@/interfaces/ITerafa';
import { EstadoProjeto, projeto } from './modulos/projetos';

export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto

}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
        projetos: []
        }
    },
    mutations: {
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]) { 
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFAS] (state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFAS] (state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
       
        [OBTER_TAREFAS] ({ commit }) {
            http.get('/tarefas')
            .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFAS, resposta.data))
        },
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERAR_TAREFA, tarefa))
        },
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
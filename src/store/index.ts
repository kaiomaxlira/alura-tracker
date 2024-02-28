import IProjeto from '@/interfaces/IProjeto';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { ADICIONA_PROJETOS, ALTERA_PROJETOS, EXCLUIR_PROJETOS, DEFINIR_PROJETOS, NOTIFICAR, DEFINIR_TAREFAS } from './tipo-mutacoes';
import { INotificacao } from '@/interfaces/INotificacao';
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, REMOVER_PROJETOS, OBTER_TAREFAS } from './tipo-acoes';
import http from "@/http"
import ITarefa from '@/interfaces/ITerafa';

interface Estado {
    projetos: IProjeto[]
    tarefas: ITarefa[]
    notificacoes: INotificacao[]

}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETOS] (state,nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETOS] (state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETOS] (state, id: string) { 
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS] (state, projetos: IProjeto[]) { 
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]) { 
            state.tarefas = tarefas
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
        [OBTER_PROJETOS] ({ commit }) {
            http.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETOS] (contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERA_PROJETOS] (contexto, projetos: IProjeto) {
            return http.put(`/projetos/${projetos.id}`,projetos)
        },
        [REMOVER_PROJETOS] ({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETOS, id))
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('/tarefas')
            .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
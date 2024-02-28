import IProjeto from "@/interfaces/IProjeto";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, REMOVER_PROJETOS } from "@/store/tipo-acoes";
import { ADICIONA_PROJETOS, ALTERA_PROJETOS, EXCLUIR_PROJETOS, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";
import http from "@/http"
import { Estado } from "@/store";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
}
}
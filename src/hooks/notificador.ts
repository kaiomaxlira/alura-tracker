import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

type Notifacador = {
    notificar: (tipo: TipoNotificacao,titulo: string, texto: string) => void
}

export default () : Notifacador => {

    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) => {
        store.commit(NOTIFICAR, {
          titulo,
          texto,
          tipo,
        })
    }

    return {
        notificar
    }
}
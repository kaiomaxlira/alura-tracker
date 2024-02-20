<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" arial-label="Formulário para criação de uam nova tarefa">
                <input type="text" class="input" palceholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column">
               <Temporizador @aoTemporizadorFinalizador="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
    name: 'FormularioTarefa',
    components: {
        Temporizador
    },
    data () {
        return {
            descricao:''
        }
    },
    methods: {
        finalizarTarefa (tempoDecorrido: number) : void {
            console.log('tempo de tarefa', tempoDecorrido)
            console.log('descrição da tarefa', this.descricao)
            this.descricao = ''
        }
    }
});
</script>


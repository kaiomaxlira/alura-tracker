<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="listaEstavazia"> Você não esta muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { OBTER_TAREFAS } from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  methods: {
/*     salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    }, */
  },
  computed: {
    listaEstavazia(): boolean {
      return this.tarefas.length == 0;
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>

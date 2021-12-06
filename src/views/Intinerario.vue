<template>

  <div class="intinerario">
    <div class="d-flex justify-content-around align-items-center gap-5 w-75">
      <div class="svg">
        <router-link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </router-link>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-5">
        <div
          ><img class="w-100" src="../assets/location.png" alt="Location"
        /></div>
        <h2
          >Intinerário: {{ idlinha }} -
          {{ intiNome }}</h2
        >
      </div>
    </div>
    <div class="table">
      <div v-if="error" class="alert alert-danger w-auto" role="alert">
         {{msgError}}
        </div>
      <app-table :bodyData="rows" :headers="header" />
    </div>
  </div>
</template>

<script>
import AppTable from "@/components/tableList.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    AppTable,
  },
  data() {
    return {
      error: false,
      msgError: '',
      rows: [],
      header: ["Parada", "Intinerario"],
      idlinha: '',
      intiNome: ''
    };
  },
  created() {},
  methods: {
    async listIntinerario(id) {
      try {
        await this.$store.dispatch("listIntinerario", id);

        this.rows = this.$store.getters.getIntinerario.ids;
        this.idlinha = this.getIntinerario.local.idlinha
        this.intiNome = this.getIntinerario.local.nome
      } catch (error) {
        this.msgError = 'Ops um erro ocorreu. Tente novamente!'
        this.alertTimer()
      }
    },
    alertTimer(){
      this.error = true
      setTimeout(() => {
          this.error = false
        }, 3000);
    },
  },
  mounted() {
    this.listIntinerario(this.id);
  },
  computed: {
    ...mapGetters(["getIntinerario"]),
    id() {
      return parseInt(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.intinerario {
  .svg {
    svg {
      width: 24px;
      height: 24px;
    }
  }
  .table {
    margin: auto;
    max-width: 50%;

    .alert {
      position: absolute;
      bottom: 15px;
      right: 15px;
      }
  }
}
</style>

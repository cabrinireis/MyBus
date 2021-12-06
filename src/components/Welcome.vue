<template>
  <div class="welcome">
    <div class="welcome_image">
      <img src="../assets/bus.png" />
    </div>
    <div class="col m-auto">
      <div class="row welcome_card">
        <div class="row">
          <button class="col welcome_card_linhas" @click="showLinhas">Linhas </button>
          <button class="col welcome_card_lotacoes" @click="showLotacao"
            >Lotações
          </button>
        <div v-if="error" class="alert alert-danger w-auto" role="alert">
         {{msgError}}
        </div>
        </div>
        <transition name="fade">

        <app-table v-if="show"  :bodyData="rows" :headers="header" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppTable from './tableList.vue'
export default {
  components: {
    AppTable,
  },

  data() {
    return {
      header: ['Id', 'Código', 'Nome', 'Intinerários'],
      error: false,
      msgError: '',
      show: false,
      rows: [],
    };
  },
  methods: {
    async showLinhas() {

        this.show = false
      try {
        await this.$store.dispatch("listaLinhas");
        this.rows = this.$store.getters.getLinhas;
        this.show = true

      } catch (error) {
        console.lotg(error);
      }
    },
    async showLotacao() {
      this.show = false
      try {
        await this.$store.dispatch("listaLotacao");
          const res = this.$store.getters.getLotacao;
        if (Array.isArray(res) ) {
          this.rows = res
          this.show = true
        }else {
          this.msgError = res
          this.alertTimer()
        }
      } catch (error) {
        this.msgError = ' Ops... Ocorreu uma falha! tente novamente!'
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


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../sass/variables';

.welcome {
  margin: auto;
  max-width: 50%;
  .welcome_image {
    max-width: 50%;
    margin: auto;
    img {
      max-width: 30%;
    }
  }

  .welcome_card {
    margin: auto;

    .welcome_card_linhas,
    .welcome_card_lotacoes {
      background-color: $color-green;
      padding: 1rem;
      border-radius: 5px;
      color: #fff;
      margin: 0.3rem;
      cursor: pointer;
      border: none;
      font-family: $font;
      font-size: 16px;
      transition: .2s;
      outline: 0;

    }
    button:hover {
      background-color: $color-green-dark;
    }

    .alert {
      position: absolute;
      bottom: 15px;
      right: 15px;
      }
  }

  .welcome_body {
    margin-top: 0.5rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

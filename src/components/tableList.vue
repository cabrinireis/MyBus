<template>
  <div class="row mt-4">
    <div class="row">
      <div class="col-md-5 mb-3 mt-3 m-auto">
            <input
               type="email"
               class="form-control"
              id="exampleFormControlInput1"
               placeholder="Buscar"
               v-model="filter_name"
              />
          </div>
    </div>
    <div class="col">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" v-for="header in headers" :key="header.id">{{
              header
            }}</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, i) in filtered" :key="i">
            <td v-for="(z, i) in Object.values(x)" :key="i">{{ z }}</td>
            <td v-if="!x.maps" class="icon" @click="setIntinerario(x.id, i)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                /></svg
            ></td>
          </tr>
        </tbody>
      </table>

      <nav
        aria-label="Page navigation example"
        class="d-flex justify-content-center"
      >
        <ul class="pagination">
          <li class="page-item"
            ><a
              class="page-link"
              href="#"
              @click.prevent="setPage(currPage - 1)"
              >Previous</a
            ></li
          >
          <li class="page-item">
            <a class="page-link" href="#">{{ currPage }}/{{ totalPage }}</a>
          </li>
          <li class="page-item"
            ><a
              class="page-link"
              href="#"
              @click.prevent="setPage(currPage + 1)"
              >Next</a
            ></li
          >
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    headers: {
      type: Array,
    },
    bodyData: {
      type: Array,
    },
  },

  data() {
    return {
      rows: [],
      countOfPage: 25,
      currPage: 1,
      filter_name: "",
    };
  },
  methods: {
    setIntinerario(x, i) {
      if (this.$route.name === "Intinerario") {
        let map = this.getIntinerario.maps[i].maps;
        window.open(`https://www.google.com/maps/?q=${map.lat},${map.lng}`);
      } else {
        this.$router.push({
          name: "Intinerario",
          params: {
            id: x,
          },
        });
      }
    },
    async showLinhas() {
      try {
        await this.$store.dispatch("listaLinhas");
        this.rows = this.$store.getters.getLinhas;
      } catch (error) {
        console.lotg(error);
      }
    },
    async showLotacao() {
      try {
        await this.$store.dispatch("listaLotacao");
        this.rows = this.$store.getters.getLotacao;
      } catch (error) {
        console.lotg(error);
      }
    },

    setPage(idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return;
      }
      this.currPage = idx;
    },
  },
  computed: {
    ...mapGetters(["getIntinerario"]),
    filtered() {
      return this.filteredRows.slice(
        this.pageStart,
        this.pageStart + this.countOfPage
      );
    },
    filteredRows() {
      var filter_name = this.filter_name.toLowerCase();
      return this.filter_name.trim() !== ""
        ? this.bodyData.filter(function (d) {
          return  d.nome ? d.nome.toLowerCase().indexOf(filter_name) > -1 :
          d.parada.toLowerCase().indexOf(filter_name) > -1;
          })
        : this.bodyData;
    },
    pageStart() {
      return (this.currPage - 1) * this.countOfPage;
    },
    totalPage() {
      return Math.ceil(this.filteredRows.length / this.countOfPage);
    },
  },
  filters: {
    orderByBusinessRules: function (data) {
      return data.slice().sort(function (a, b) {
        return a.power - b.power;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/variables";

.icon {
  cursor: pointer;
  :hover {
    fill: lighten($color-red, 50);
  }
  svg {
    width: 24px;
    height: 24px;
    fill: $color-red;
  }
}
</style>

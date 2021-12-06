import axios from "../axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    linhas: null,
    lotacao: null,
    intinerario: {},
  },
  mutations: {
    LINHAS(state, res) {
      state.linhas = res;
    },
    LOTACAO(state, res) {
      state.lotacao = res;
    },
    INTINERARIO(state, res) {
      let ids = [];
      let maps = [];
      let local = {
        codigo: res.data.codigo,
        idlinha: res.data.idlinha,
        nome: res.data.nome,
      };
      Object.keys(res.data).forEach((el, index) => {
        if (el !== "codigo" && el !== "idlinha" && el !== "nome") {
          ids.push({
            parada: index,
          });
          maps.push({ maps: res.data[index] });
        }
      });
      state.intinerario = { ids: ids, maps: maps, local: local };
    },
  },
  actions: {
    async listaLinhas({ commit }) {
      await axios.get("process.php?a=nc&p=%25&t=o").then(res => {
        commit("LINHAS", res.data);
      });
    },
    async listaLotacao({ commit }) {
      await axios.get("process.php?a=nc&p=%25&t=l").then(res => {
        commit("LOTACAO", res.data);
      });
    },

    async listIntinerario({ commit }, id) {
      await axios.get(`process.php?a=il&p=${id}`).then(res => {
        commit("INTINERARIO", res);
      });
    },
  },
  getters: {
    getLinhas: state => {
      return state.linhas;
    },
    getLotacao: state => {
      return state.lotacao;
    },
    getIntinerario: state => {
      return state.intinerario;
    },
  },
});

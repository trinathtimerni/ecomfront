// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        brands: [],
        loader: false,
    }),

    getters: {

    },

    mutations: {
        populateBrands(state, brands) {
            state.brands = brands;
        },
        LOADER(state,payload){
            state.loader = payload;
        }
    },

    actions: {
        async getBrands(ctx){
            await axios.get('api/brand').then((response) => {
                ctx.commit('populateBrands', response.data);
            })
        },
    }
}
// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        carts: [],
        cart: {},
        loader: false
    }),

    getters: {
        carts(state) {
            return state.carts;
        }
    },

    mutations: {
        populateCart(state, newProduct) {
            state.carts = newProduct;
        },
        SaveCart(state,newProduct)
        {
          state.carts.push(newProduct);
        },
        ShowCart()
        {
          state.cart = cart;
        },
        UpdateCart()
        {
        },
        LOADER(state,payload){
          state.loader = payload
        }
    },

    actions: {
        getCarts({ commit }) {
          commit('LOADER',true)
            return new Promise((resolve, reject) => {
              console.log(localStorage.getItem("guest_id"))
              let user = JSON.parse(localStorage.getItem("user_data"))
              if(user != null){
                user = user.id;
              }
                axios.post('api/product/get_products_cart',{
                    user_id: user,
                    guest_id: localStorage.getItem("guest_id")
                })
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateCart",res.data);
                  commit('LOADER',false)
            })
                .catch((error) => {
                  reject(error);
                  commit('LOADER',true)
                });
            });
          },
          AddCart({ commit }, data) {
            commit('LOADER',true)
            return new Promise((resolve, reject) => {
              axios
                .post('/api/product/add_products_cart', data)
                .then((result) => {
                  console.log(result)
                  resolve(result);
                  commit("SaveCart");
                  commit('LOADER',false)
                })
                .catch((error) => {
                  reject(error);
                  commit('LOADER',false)
                });
            });
          },
        
         
          Show({ commit }, id) {
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .post(Config.BASE_URL + "/api/cart/" + id)
                .then((result) => {
                  resolve(result);
                  commit("SHOW", result.data.cart);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          DeleteCart({ commit }, id) {
            commit('LOADER',true)
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .post("/api/product/delete_products_cart",{
                  cart_id: id
                })
                .then((result) => {
                  resolve(result);
                  commit("ShowCart", result.data.cart);
                  commit('LOADER',false)
                })
                .catch((error) => {
                  reject(error);
                  commit('LOADER',false)
                });
            });
          },
        
          UpdateCart({ commit }, data) {
            commit('LOADER',true)
            return new Promise((resolve, reject) => {
              axios
                .post('/api/product/update_products_cart', data)
                .then((result) => {
                  resolve(result);
                  commit("UpdateCart");
                  commit('LOADER',false)
                })
                .catch((error) => {
                  reject(error);
                  commit('LOADER',false)
                });
            });
          },
    }
}
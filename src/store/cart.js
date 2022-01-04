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
    },

    actions: {
        getCarts({ commit }) {
            return new Promise((resolve, reject) => {
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
            })
                .catch((error) => {
                  reject(error);
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
                })
                .catch((error) => {
                  reject(error);
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
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .post("/api/product/delete_products_cart",{
                  cart_id: id
                })
                .then((result) => {
                  resolve(result);
                  commit("ShowCart", result.data.cart);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
          UpdateCart({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post('/api/product/update_products_cart', data)
                .then((result) => {
                  resolve(result);
                  commit("UpdateCart");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
    }
}
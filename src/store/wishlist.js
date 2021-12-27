// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        wishlist: [],
    }),

    getters: {
        wishlist(state) {
            return state.wishlist;
        }
    },

    mutations: {
        populateWish(state, newWish) {
            state.wishlist = newWish;
        },
        SaveWish(state,newWish)
        {
          state.wishlist.push(newWish);
        },
        ShowWish()
        {
          
        },
        UpdateCart()
        {
        }
    },

    actions: {
        getWishlist({ commit }) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
            return new Promise((resolve, reject) => {
            //   let user = localStorage.getItem("user_data")
            //   if(user != null){
            //     user = user.id;
            //   }
                axios.get('api/get_wish_list')
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateWish",res.data);
            })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          addWish({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post('/api/wish_list', data)
                .then((result) => {
                  console.log(result)
                  resolve(result);
                  commit("SaveWish");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
          deleteWish({ commit }, id) {
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .post("/api/remove_wish_list",{
                    wishlist_id: id
                })
                .then((result) => {
                  resolve(result);
                  commit("ShowWish", result.data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
          UpdateWish({ commit }, data) {
           
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
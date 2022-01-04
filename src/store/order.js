// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        orders: [],
    }),

    getters: {
        orders(state) {
            return state.orders;
        }
    },

    mutations: {
        populateOrders(state, newOrder) {
            state.orders = newOrder;
        },
        SaveOrder(state,newOrder)
        {
          state.orders.push(newOrder);
        },
        ShowOrder()
        {
          
        }
    },

    actions: {
        getOrders({ commit }) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
            return new Promise((resolve, reject) => {
            //   let user = localStorage.getItem("user_data")
            //   if(user != null){
            //     user = user.id;
            //   }
                axios.get('api/get_orders')
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateOrders",res.data.orders.data);
            })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          getUserOrders({ commit }) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
              return new Promise((resolve, reject) => {
              //   let user = localStorage.getItem("user_data")
              //   if(user != null){
              //     user = user.id;
              //   }
                  axios.get('api/get_user_orders')
              .then(res => {
                  console.log(res.data)
                  resolve(res);
                    commit("populateOrders",res.data.orders.data);
              })
                  .catch((error) => {
                    reject(error);
                  });
              });
            },
          addOrder({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post('/api/add_order', data)
                .then((result) => {
                  console.log(result)
                  resolve(result);
                  commit("SaveOrder");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          accept({ commit }, order) {
            return new Promise((resolve, reject) => {
              axios
                .post('/api/order/accept',{
                  order_id: order.id,
                  status: order.status,
                })
                .then((result) => {
                  console.log(result)
                  resolve(result);
                  commit("ShowOrder", result.data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
          deleteOrder({ commit }, id) {
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .post("/api/remove_order",{
                    order_id: id
                })
                .then((result) => {
                  resolve(result);
                  commit("ShowOrder", result.data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
    }
}
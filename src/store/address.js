 // import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        addresses: [],
        address: []
    }),

    getters: {
        addresses(state) {
            return state.addresses;
        }
    },

    mutations: {
        populateAddress(state, newAddress) {
            state.addresses = newAddress;
        },
        SaveAddress(state,newAddress)
        {
          state.addresses.push(newAddress);
        },
        ShowAddress()
        {
          state.address = address;
        },
        EditAddress(state,id)
        {
          let address = state.addresses.find((product)=>{ product.id == id})
          state.address = address;
        },
        UpdateAddress()
        {
          
        }
    },

    actions: {
        getAddresses({ commit }) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
            return new Promise((resolve, reject) => {
              // let user = localStorage.getItem("user_data")
              // if(user != null){
              //   user = user.id;
              // }
                axios.get('api/get_delivery_addresses'
                )
            .then(res => {
                console.log(res.data)
                resolve(res);
                  commit("populateAddress",res.data);
            })
                .catch((error) => {
                  reject(error);
                });
            });
          },
          AddAddress({ commit }, data) {
            return new Promise((resolve, reject) => {
              axios
                .post('/api/add_delivery_address', data)
                .then((result) => {
                  console.log(result)
                  resolve(result);
                  commit("SaveAddress",data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
         
          GetAddressDetails({ commit }, id) {
            return new Promise((resolve, reject) => {
                  resolve(result);
                  commit("EditAddress", id);
            });
          },
          deleteAddress({ commit }, id) {
            return new Promise((resolve, reject) => {
              console.log(id);
              axios
                .post("/api/delete_delivery_address",{
                  address_id: id
                })
                .then((result) => {
                  resolve(result);
                  commit("ShowAddress", result.data);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
        
          UpdateAddress({ commit }, data) {
           
            return new Promise((resolve, reject) => {
              axios
                .post('/api/update_delivery_address', data)
                .then((result) => {
                  resolve(result);
                  commit("UpdateAddress");
                })
                .catch((error) => {
                  reject(error);
                });
            });
          },
    }
}
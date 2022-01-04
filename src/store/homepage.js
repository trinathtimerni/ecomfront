// import { axios } from "vue/types/umd";

export default {
  namespaced: true,

  state: () => ({
    user: []
  }),

  getters: {
    departments(state) {
      // console.log(state.departments)
      return state.departments;
    },
    users(state){
      return state.user;
    },
  },

  mutations: {
    populateUser(state,newUser){
      state.user = newUser;
    },
  },

  actions: {
    getUser(ctx) {
      let user = JSON.parse(localStorage.getItem("user_data"))
      ctx.commit("populateUser", user);  
    },
    async registrationUser(ctx,apiArg){
      let isSuccess = false
      await axios.post("api/client_registration",apiArg).then(response => {
        isSuccess = response.data
        console.log(response)
        return isSuccess
      })
      .catch(error => {
            isSuccess = false;
            console.log(error)
        })
      return isSuccess;
    }
  }
};

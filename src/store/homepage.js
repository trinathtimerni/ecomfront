// import { axios } from "vue/types/umd";

export default {
  namespaced: true,

  state: () => ({
    departments: [],
    hot_offers: [],
    summers: [],
    health_care: [],
    new_arrival: [],
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
    hot_offers(state){
      return state.hot_offers;
    },
    summers(state){
      return state.summers;
    },
    health_care(state){
      return state.health_care;
    },
    new_arrival(state){
      return state.new_arrival;
    }
  },

  mutations: {
    populateDepartment(state, newDepartment) {
      state.departments = newDepartment;
    },
    populateUser(state,newUser){
      state.user = newUser;
    },
    populateHotOffers(state,newHotOffer){
      state.hot_offers = newHotOffer;
    },
    populateSummers(state,newSummer){
      state.summers = newSummer;
    },
    
    populateNewArrival(state,newArrival){
      state.new_arrival = newArrival;
    },
    populateHealthCare(state,newHealthCare){
      state.health_care = newHealthCare;
    }


    // updateEmployee(state, updatedEmployee) {
    //     let empInd = state.employees.findIndex(employee => employee.id == updatedEmployee.id);
    //     state.employees[empInd].name = updatedEmployee.name;
    // },
    // addEmployee(state, newEmployee) {
    //     state.employees.push(newEmployee);
    // }
  },

  actions: {
    async getDepartments(ctx) {
      let departments = await axios.get("api/department_list").then(response => {
        ctx.commit("populateDepartment", response.data);
      });
    },
    async getSliders(ctx) {
      let isSuccess = false
      await axios.get("api/sliders").then(response => {
        isSuccess = response.data
        console.log(response)
        return isSuccess
      })
      .catch(error => {
            isSuccess = false;
            console.log(error)
        })
      return isSuccess;
    },
    async getHotOffers(ctx) {
      let isSuccess = false
      let type = "hot_offer"
      await axios.get("api/feature_products/"+type).then(response => {
        ctx.commit('populateHotOffers', response.data);
        return isSuccess
      })
      .catch(error => {
            isSuccess = false;
            console.log(error)
        })
      return isSuccess;
    },
    async getSummers(ctx) {
      let isSuccess = false
      let type = "summer"
      await axios.get("api/feature_products/"+type).then(response => {
        ctx.commit('populateSummers', response.data);
        return isSuccess
      })
      .catch(error => {
            isSuccess = false;
            console.log(error)
        })
      return isSuccess;
    },
    async getHealthCare(ctx) {
      let isSuccess = false
      let type = "health_care"
      await axios.get("api/feature_products/"+type).then(response => {
        ctx.commit('populateHealthCare', response.data);
        return isSuccess
      })
      .catch(error => {
            isSuccess = false;
            console.log(error)
        })
      return isSuccess;
    },
    async getNewArrival(ctx) {
      let isSuccess = false
      let type = "new_arrival"
      await axios.get("api/feature_products/"+type).then(response => {
        ctx.commit('populateNewArrival', response.data);
        return isSuccess
      })
      .catch(error => {
            isSuccess = false;
            console.log(error)
        })
      return isSuccess;
    },
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
    // async getEmployees(ctx, { apiArg = {}, options = {} } = {}) {
    //     let employees = await axios.post(`${this.state.host}/api/get-employees`, apiArg)
    //         .then(res => {
    //             return res.data.employees;
    //         })
    //         .catch(error => console.log(err));

    //     if (options.return) {
    //         return employees;
    //     }

    //     ctx.commit('populateEmployees', employees);
    // },

    // async saveEmployee(ctx, employee) {
    //     let isSuccess = false;

    //     let url = 'add-employee';
    //     if (employee.id != null) {
    //         url = 'update-employee'
    //     }

    //     let res = await axios.post(`${this.state.host}/api/${url}`, employee)
    //         .then(res => {
    //             if (employee.id != null) {
    //                 ctx.commit('updateEmployee', employee);
    //             }
    //             return res.data;
    //         })
    //         .catch(error => {
    //             isSuccess = false;
    //             console.log(error)
    //         })
    //     return isSuccess;
    // },
    // async deleteEmployee(ctx, employee) {
    //     let isSuccess = false;
    //     let res = await axios.post(`${this.state.host}/api/delete-employee`, employee)
    //         .then(res => {
    //             isSuccess = true;
    //             return res.data;
    //         })
    //         .catch(error => {
    //             isSuccess = false;
    //             console.log(error)
    //         })
    //     return isSuccess;
    // }
  }
};

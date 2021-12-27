// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        brand_colors: [],
        brand_delivery: [],
        loader: false,
    }),

    getters: {
        brand_colors(state) {
            return state.brand_colors;
        },
        brand_delivery(state) {
            return state.brand_delivery;
        }
    },

    mutations: {
        populateBrandColors(state, newColors) {
            state.brand_colors = newColors;
        },
        populateBrandDelivery(state, newDelivery) {
            state.brand_delivery = newDelivery;
        },
        LOADER(state,payload){
            state.loader = payload;
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
        async getBrandColors(ctx,apiArg){
            await axios.get('api/product/get_brand_colors/'+apiArg).then((response) => {
                ctx.commit('populateBrandColors', response.data);
            })
        },
        async getBrandDelivery(ctx,apiArg){
            await axios.get('api/product/get_brand_delivery/'+apiArg).then((response) => {
                ctx.commit('populateBrandDelivery', response.data);
            })
        }
    }
}
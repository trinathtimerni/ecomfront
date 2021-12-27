// import { axios } from "vue/types/umd";

export default {
    namespaced: true,

    state: () => ({
        department_colors: [],
        department_delivery: [],
        department_brands: [],
        loader: false,
    }),

    getters: {
        department_colors(state) {
            return state.department_colors;
        },
        department_delivery(state) {
            return state.department_delivery;
        },
        department_brands(state) {
            return state.department_brands;
        }
    },

    mutations: {
        populateDepartmentBrands(state, newBrands) {
            state.brands = newBrands;
        },
        populateDepartmentColors(state, newColors) {
            state.department_colors = newColors;
        },
        populateDepartmentDelivery(state, newDelivery) {
            state.department_delivery = newDelivery;
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
        async getDepartmentBrands(ctx,apiArg){
            await axios.get('api/product/get_department_brands/'+apiArg).then((response) => {
                ctx.commit('populateDepartmentBrands', response.data);
            })
        },
        async getDepartmentColors(ctx,apiArg){
            await axios.get('api/product/get_department_colors/'+apiArg).then((response) => {
                ctx.commit('populateDepartmentColors', response.data);
            })
        },
        async getDepartmentDelivery(ctx,apiArg){
            await axios.get('api/product/get_department_delivery/'+apiArg).then((response) => {
                ctx.commit('populateDepartmentDelivery', response.data);
            })
        }
    }
}
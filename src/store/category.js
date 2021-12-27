// import { axios } from "vue/types/umd";

  export default {
    namespaced: true,

    state: () => ({
        categories: [],
        category: {},
        category_colors: [],
        category_delivery: [],
        category_price: {},
        brands: [],
        cat_brands: [],
        countries: [],
        loader: false,
    }),

    getters: {
        categories(state) {
            return state.categories;
        },
        category_colors(state) {
            return state.category_colors;
        },
        cat_brands(state){
            return state.cat_brands;
        },
        category()
        {
            return state.category;
        },
        category_delivery(state) {
            return state.category_delivery;
        },
        brands(state) {
            return state.brands;
        },
        countries(state) {
            return state.countries;
        }
    },

    mutations: {
        populateCategories(state, newCategories) {
            state.categories = newCategories;
        },
        populateCategoryBrands(state, newBrands) {
            state.brands = newBrands;
        },
        populateCategoryColors(state, newColors) {
            state.category_colors = newColors;
        },
        populateCategoryDelivery(state, newDelivery) {
            state.category_delivery = newDelivery;
        },
        populateCategoryPrice(state, newPrice) {
            state.category_price = newPrice;
        },
        populateCategory(state, category_id){
            let category = state.categories.filter((product) => product.slug == category_id)
            state.category = category
        },
        populateCountries(state,newCountries){
            state.countries = newCountries;
        },
        populateCatBrands(state,newBrands){
            state.cat_brands = newBrands;
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
        async getCategories(ctx){
            ctx.commit('LOADER',true)
            let categories = await axios.get('api/all_cat_sub_chid').then((response) => {
                ctx.commit('populateCategories', response.data);
                ctx.commit('LOADER',false)
            })
        },
        async getCategoryBrands(ctx,apiArg){
            await axios.get('api/product/get_category_brands/'+apiArg).then((response) => {
                ctx.commit('populateCategoryBrands', response.data);
            })
        },
        async getCategoryColors(ctx,apiArg){
            await axios.get('api/product/get_category_colors/'+apiArg).then((response) => {
                ctx.commit('populateCategoryColors', response.data);
            })
        },
        async getCatBrands(ctx,apiArg){
            await axios.get('api/get_cat_brands/'+apiArg).then((response) => {
                console.log("cat_brands",response.data)
                ctx.commit('populateCatBrands', response.data);
            })
        },
        async getCategoryDelivery(ctx,apiArg){
            await axios.get('api/product/get_category_delivery/'+apiArg).then((response) => {
                ctx.commit('populateCategoryDelivery', response.data);
            })
        },
        async getCountries(ctx){
            await axios.get('api/get_countries').then((response) => {
                ctx.commit('populateCountries', response.data);
            })
        },

        async getCategory(ctx,apiArg){
            ctx.commit('LOADER',true)
            ctx.commit('populateCategory',apiArg)
            ctx.commit('LOADER',false)
        },
        async getCategoryPrice(ctx,apiArg)
        {
            ctx.commit('populateCategoryPrice',apiArg)
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
}
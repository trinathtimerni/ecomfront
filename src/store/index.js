import Vue from "vue";
import Vuex from "vuex";
import category from "./category"
import address from "./address"
import wishlist from "./wishlist"
import product from "./product"
import brand from "./brand"
import department from "./department"
import user from "./user"
import order from "./order"
import cart from "./cart"
import homepage from "./homepage"

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    category: category,
    product: product,
    department: department,
    brand: brand,
    order: order,
    cart: cart,
    user: user,
    address: address,
    wishlist: wishlist,
    homepage: homepage,
  }
});

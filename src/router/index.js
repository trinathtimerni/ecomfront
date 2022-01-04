import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from '../views/Layout.vue'
import DashboardLayout from "@/components/Backend/Layout/Layout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { title: "Home Layout"},
    component: App,
    children: [
      {
        meta: { title: "Home"},
        path: "/",
        component: Home,
      },
      {
        path: '/login',
        name: 'LoginPage',
        component: () => import('../views/loginPage.vue')
      },
      {
        path: '/signup',
        name: 'SignupPage',
        component: () => import('../views/SignupPage.vue')
      },
      {
        path: '/reset',
        name: 'ResetPasswordPage',
        component: () => import('../views/ResetPasswordPage.vue')
      },
      {
        path: '/category/:id?',
        props: true,
        name: 'CategoryViewPage',
        component: () => import('../views/CategoryViewPage.vue'),
        meta: {
          title: 'Wedevs Category Page',
        }
      },
      {
        path: '/category_product/:id?',
        props: true,
        name: 'CategoryProduct',
        component: () => import('../views/CategoryProduct.vue'),
        meta: {
          title: 'Wedevs Category Product',
        }
      },
      
      {
        path: '/product_info/:id?',
        name: 'Product',
        component: () => import('../views/Product.vue')
      },
      {
        path: '/login_state',
        name: 'LoginState',
        component: () => import('../views/LoginStatePage.vue')
      },
      {
        path: '/checkout',
        name: 'CheckoutPage',
        component: () => import('../views/CheckoutPage.vue')
      },
      {
        path: '/click_collect',
        name: 'ClickCollect',
        component: () => import('../views/ClickCollectPage.vue')
      },
      {
        path: '/account',
        name: 'AccountPage',
        meta: { title: "Account", requiresAuth: true },
        component: () => import('../views/AccountPage.vue')
      },
      {
        path: '/my_details',
        name: 'MyDetails',
        meta: { title: "Mydetails", requiresAuth: true },
        component: () => import('../views/MyDetailsPage.vue')
      },
      {
        path: '/address_book',
        name: 'AddressBook',
        meta: { title: "Address Book", requiresAuth: true },
        component: () => import('../views/AddressBookPage.vue')
      },
      {
        path: '/my_orders',
        name: 'MyOrders',
        meta: { title: "My Orders", requiresAuth: true },
        component: () => import('../views/OrdersPage.vue')
      }
    // component: Home,
    // meta: {
    //   title: 'ClassyPicker',
    // },
    ]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
    // redirect: "/dashboard/products",
    children: [
      {
        meta: { title: "Product", requiresAuth: true, is_admin: true },
        path: "/dashboard/products",
        name: "productList",
        component: () => import('../views/Backend/Products/Index.vue')
      },
      {
        meta: { title: "Add Product", requiresAuth: true, is_admin: true },
        path: "/dashboard/add_product",
        name: "AddProduct",
        component: () => import('../views/Backend/Products/Add.vue')
      },
      {
        meta: { title: "Edit Product", requiresAuth: true, is_admin: true },
        path: "/dashboard/edit_product/:id?",
        name: "EditProduct",
        component: () => import('../views/Backend/Products/Update.vue')
      },
      {
        meta: { title: "Category", requiresAuth: true, is_admin: true },
        path: "/dashboard/categories",
        name: "categoryList",
        component: () => import('../views/Backend/Categories/Index.vue')
      },
      {
        meta: { title: "Add Category", requiresAuth: true, is_admin: true },
        path: "/dashboard/add_category",
        name: "AddCategory",
        component: () => import('../views/Backend/Categories/Add.vue')
      },
      {
        meta: { title: "Edit Category", requiresAuth: true, is_admin: true },
        path: "/dashboard/edit_category/:id?",
        name: "EditCategory",
        component: () => import('../views/Backend/Categories/Update.vue')
      },
      {
        meta: { title: "Orders", requiresAuth: true, is_admin: true },
        path: "/dashboard/orders",
        name: "orderList",
        component: () => import('../views/Backend/Orders/Index.vue')
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,  
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("auth_token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user_data"));
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user.user_type == 1) { //admin check
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("auth_token") == null) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   NProgress.set(0.1)
//   next()
// })
// router.afterEach(() => {
//   setTimeout(() => NProgress.done(), 500)
// })

export default router

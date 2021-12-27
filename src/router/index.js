import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from '../views/Layout.vue'

Vue.use(VueRouter)
// let Picker = ()=>import("../components/helpers/Loader.vue")
// Vue.component("loading", Picker)

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
          title: 'ClassyPicker Category Page',
        }
      },
      {
        path: '/category_product/:id?',
        props: true,
        name: 'CategoryProduct',
        component: () => import('../views/CategoryProduct.vue'),
        meta: {
          title: 'ClassyPicker Category Product',
        }
      },
      {
        path: '/department_product/:id?',
        props: true,
        name: 'DepartmentProduct',
        component: () => import('../views/DepartmentProduct.vue'),
        meta: {
          title: 'ClassyPicker Department Product',
        }
      },
      {
        path: '/brand_product/:id?',
        props: true,
        name: 'BrandProduct',
        component: () => import('../views/BrandProduct.vue'),
        meta: {
          title: 'ClassyPicker Brand Product',
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
        path: '/add_address',
        name: 'AddAddress',
        meta: { title: "Add Address", requiresAuth: true },
        component: () => import('../views/AddAddressPage.vue')
      },
      {
        path: '/edit_address/:id?',
        name: 'EditAddress',
        meta: { title: "Edit Address", requiresAuth: true },
        component: () => import('../views/EditAddressPage.vue')
      },
      {
        path: '/personal_details',
        name: 'PersonalDetails',
        meta: { title: "Personal Details", requiresAuth: true },
        component: () => import('../views/PersonalDetailsPage.vue')
      },
      {
        path: '/edit_password',
        name: 'EditPassword',
        meta: { title: "Edit Password", requiresAuth: true },
        component: () => import('../views/EditPasswordPage.vue')
      },
      {
        path: '/wish_list',
        name: 'WishList',
        meta: { title: "Wish List", requiresAuth: true },
        component: () => import('../views/WishListPage.vue')
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
    path: '/offers',
    name: 'Offer',
    component: () => import('../views/Offer.vue')
  },
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
        next();
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

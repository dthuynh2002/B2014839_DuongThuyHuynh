import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import AdminLayout from '~/layouts/AdminLayout.vue';
import FormLayout from '~/layouts/FormLayout.vue';
import Home from '~/pages/home/index.vue'
import Search from '~/pages/search/index.vue'
import Detail from '~/pages/detail/index.vue'
import User from '~/pages/user/index.vue'
import Admin from '~/pages/admin/index.vue'
import Product from '~/pages/admin/product/index.vue'
import Edit from '~/pages/admin/edit/index.vue'
import Image from '~/pages/admin/image/index.vue'
import Login from '~/pages/form/login.vue'
import RegisterVue from "~/pages/form/register.vue";
import { useStore } from "vuex";

const requireAdmin = (to, from, next) => {
  const store = useStore();
  const isNV = store.state.nhanvien.isLoggIn
  if (isNV) {
    next()
  } else {
    next({ path: '/login/admin' })
  }
};

const requireLogin = (to, from, next) => {
  const store = useStore();
  const isNV = store.state.khachhang.isLoggIn
  if (isNV) {
    next()
  } else {
    next({ path: '/login' })
  }
};

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "detail/:MSHH",
        name: "detail",
        component: Detail
      },
      {
        path: "search/:TenHH",
        name: "search",
        component: Search
      }
    ]
  },
  {
    path: '/',
    component: FormLayout,
    children: [
      {
        path: "login",
        children: [
          {
            path: 'admin',
            name: 'loginAdmin',
            component: Login
          },
          {
            path: '',
            name: 'login',
            component: Login
          },
        ]
      },
      {
        path: "register",
        name: "register",
        component: RegisterVue,
      },
    ]
  },
  {
    path: '/user/:id',
    component: DefaultLayout,
    beforeEnter: requireLogin,
    children: [
      {
        path: "",
        name: "user",
        component: User,
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAdmin,
    children: [
      {
        path: "",
        name: "order management",
        component: Admin,
      },
      {
        path: "product",
        name: "product",
        component: Product,
      },
      {
        path: "edit/:MSHH",
        name: "edit",
        component: Edit,
      },
      {
        path: "image/:MSHH",
        name: "image",
        component: Image,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

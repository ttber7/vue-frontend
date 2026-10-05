import { createRouter, createWebHistory } from 'vue-router';
import { checkLogin, checkRole } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/services',
      name: 'Services',
      component: () => import('../views/Services.vue')
    },
    {
      path: '/detail/:id',
      name: 'Detailed',
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Create new account',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/forgot-password',
      name: 'Forgotten account',
      component: () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/timkiem',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/productManagement',
      name: 'Product Management',
      component: () => import('../views/ProductManagement.vue'),
      meta: { requiresAuth: true } // Cho phép cả Admin và User thường đã đăng nhập
    },
    {
      path: '/categoriesManagement',
      name: 'Category Management',
      component: () => import('../views/CategoriesManagement.vue'),
      meta: { requiresAuth: true, role: 'admin' } // Chỉ riêng Admin
    },
    {
      path: '/403',
      name: 'Forbidden',
      component: () => import('../views/403.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!checkLogin()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      const requiredRole = (to.meta.requiredRole || to.meta.role) as string | undefined;
      if (requiredRole) {
        const userRole = checkRole();
        if (userRole !== requiredRole) {
          next({ path: '/403' });
          return;
        }
      }
      next();
    }
  } else {
    next();
  }
});

export default router;

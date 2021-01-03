import { createRouter, createWebHistory } from 'vue-router'



const routes = [{
  path: '',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  component: () =>
    import('views/home/home.vue'),
},
{
  path: '/category',
  name: 'Category',
  component: () =>
    import('views/category/category.vue'),
},
{
  path: '/cart',
  name: 'Cart',
  component: () =>
    import('views/cart/cart.vue'),
},
{
  path: '/profile',
  name: 'Profile',
  component: () =>
    import('views/profile/profile.vue'),
},
{
  path: '/detail/:iid',
  name: 'Detail',
  component: () =>
    import('views/detail/detail.vue'),
}

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

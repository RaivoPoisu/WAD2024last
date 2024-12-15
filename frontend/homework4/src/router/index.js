import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Contact from '../components/Contact.vue';
import Post from '../components/Post.vue';
import AddPost from '../components/AddPost.vue';


const routes = [
    { path: '/', redirect: '/login' }, //default redirection to login page
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/post/:id', name: 'Post', component: Post, meta: { requiresAuth: true } },
    { path: '/add-post', name: 'AddPost', component: AddPost },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protect router from unauthuarized users
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');
  } else if (to.path === '/' && !loggedIn) {
    next('/login'); // Kui marsruut on "/" ja pole sisselogitud, suunab login lehele 
  } else {
    next();
  }
});

export default router;

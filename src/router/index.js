import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import NinetiesView from '../views/NinetiesView.vue';
import MilleniumView from '../views/MilleniumView.vue';
import RoyalView from '../views/RoyalView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/90',
    name: '90s',
    component: NinetiesView,
    children: [
      {
        path: 'r/:r',
        component: NinetiesView,
        children: [
          {
            path: 'post/:id',
            component: NinetiesView,
          },
        ],
      },
    ],
  },
  {
    path: '/2000',
    name: '2000s',
    component: MilleniumView,
    children: [
      {
        path: 'r/:r',
        component: MilleniumView,
        children: [
          {
            path: 'post/:id',
            component: MilleniumView,
          },
        ],
      },
    ],
  },
  {
    path: '/royal',
    name: 'royal',
    component: RoyalView,
    children: [
      {
        path: 'r/:r',
        component: RoyalView,
        children: [
          {
            path: 'post/:id',
            component: RoyalView,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

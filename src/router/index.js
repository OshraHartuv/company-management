import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CompView from '../views/CompView.vue';
import EmpApp from '../views/emp/EmpApp.vue';
import DepApp from '../views/dep/DepApp.vue';
import EmpEdit from '../views/emp/EmpEdit.vue';
import DepEdit from '../views/dep/DepEdit.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/comp/:id',
            name: 'comp',
            component: CompView,
            children: [
                {
                    path: 'emp',
                    name: 'empApp',
                    component: EmpApp,
                    children: [
                        { path: 'edit', name: 'empEdit', component: EmpEdit },
                    ],
                },
                {
                    path: 'dep',
                    name: 'depApp',
                    component: DepApp,
                    children: [
                        { path: 'edit', name: 'depEdit', component: DepEdit },
                    ],
                },
            ],
        },
    ],
});

export default router;

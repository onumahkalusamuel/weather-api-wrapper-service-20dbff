import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import IndexPage from "./views/IndexPage.vue";

const routes: RouteRecordRaw[] = [{path: '', component: IndexPage, name: 'index'}]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

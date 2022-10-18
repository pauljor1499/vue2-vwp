import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage/Login.vue";
import RegistrationPage from "../views/RegistrationPage/Registration.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        component: LoginPage,
    },

    {
        path: "/register",
        component: RegistrationPage,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

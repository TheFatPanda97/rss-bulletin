import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Home from "../views/Home";
import About from "../views/About";
import Event from "../views/Event";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/event/:id",
        name: "Event",
        component: Event,
        beforeEnter: async (to, _, next) => {
            if (store.state.general.length === 0) {
                await store.dispatch("bindGeneral");
            }

            let tempEvent = store.state.general.find(
                (event) => event.id === to.params.id
            );

            if (tempEvent) next();
            else next({ name: "Home" });
        },
    },
    {
        path: "*",
        redirect: { name: "Home" },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// firebase.auth().onAuthStateChanged((user) => {
//     console.log("On Auth State Changed");
//     if (!user) {
//         console.log("no user")
//         // router.push({name: "Home"})
//     } else {
//         console.log("session user -> " + user.email);
//         router.replace({name: "About"})
//     }
// });

export default router;

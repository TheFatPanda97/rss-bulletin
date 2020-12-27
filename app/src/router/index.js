import Vue from "vue";
import VueRouter from "vue-router";
// import Test from "../views/Signin";
import Home from "../views/Home";
import About from "../views/About";
import Event from "../views/Event";
import store from "../store/index";
// import Test from "../views/Loading";
// import firebase from "firebase/app";
// import "firebase/auth";

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
        path: "/event/:id",
        component: Event, 
        beforeEnter: async (to, from, next) => {
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

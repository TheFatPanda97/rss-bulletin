import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../db";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        general: [],
        amu: [],
        workshop: [],
        counter: 0,
    },

    mutations: {
        ...vuexfireMutations,
        increment(state) {
            state.counter++;
        },
    },

    actions: {
        bindGeneral: firestoreAction(({ bindFirestoreRef }) => {
            // return the promise returned by `bindFirestoreRef`
            return bindFirestoreRef("general", db.collection("general"));
        }),
        
    },
});

export default store;

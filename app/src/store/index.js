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
        currEventCards: []
    },

    mutations: {
        ...vuexfireMutations,
    },

    actions: {
        bindGeneral: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef("general", db.collection("general"));
        }),
        bindAMU: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef("amu", db.collection("amu"));
        }),
        bindWorkshop: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef("workshop", db.collection("workshop"));
        }),
    },
});

export default store;

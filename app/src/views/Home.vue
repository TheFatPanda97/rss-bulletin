<template>
    <div>
        <v-tabs v-model="tab" align-with-title dark background-color="#00204E">
            <v-tab>All</v-tab>
            <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-tab v-bind="attrs" v-on="on">
                        Dropdown
                    </v-tab>
                </template>

                <v-list>
                    <v-list-item>
                        <v-btn>Shawn</v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-tabs>
        <p>{{ $store.state.count }}</p>
        <v-btn @click="$store.commit('increment')">
            increment
        </v-btn>
        <v-btn @click="addDocument">add new document</v-btn>
        <v-row>
            <event-card></event-card>
        </v-row>
    </div>
</template>
<script>
import { db } from "../db";
import EventCard from "../components/EventCard";

export default {
    data() {
        return {
            tab: 0,
        };
    },
    components: {
        "event-card": EventCard,
    },
    methods: {
        addDocument() {
            db.collection("workshops").add({
                name: "Paris",
                slogan: "La Ville lumière",
            });
        },
    },
};
</script>

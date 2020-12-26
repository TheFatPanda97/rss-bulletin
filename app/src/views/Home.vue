<template>
    <div>
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

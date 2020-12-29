<template>
    <div>
        <v-tabs v-model="tab" align-with-title dark background-color="#00204E">
            <v-tab>General</v-tab>
            <v-tab>Workshop</v-tab>
            <v-tab>AMU</v-tab>
        </v-tabs>
        <v-container fluid>
            <v-btn @click="getUrl">Get URL</v-btn>
            <v-row>
                <v-col v-for="eventCard in eventCards" cols="4" :key="eventCard.id">
                    <event-card
                        :title="eventCard.title"
                        :date="eventCard.date"
                        :time="eventCard.time"
                        :imgSrc="eventCard.imgSrc"
                        :id="eventCard.id"
                    ></event-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { db, storage } from "../db";
import EventCard from "../components/EventCard";

export default {
    data() {
        return {
            tab: 0,
            eventCards: [],
            loading: true,
        };
    },
    async mounted() {
        await this.$store.dispatch("bindGeneral");
        this.eventCards = this.$store.state.general;
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
        getUrl() {
            storage
                .ref("general/image.png")
                .getDownloadURL()
                .then(function(url) {
                    console.log(url);
                });
        },
    },
    watch: {
        async tab(currTab) {
            switch (currTab) {
                case 0:
                    if (this.$store.state.general.length === 0) {
                        await this.$store.dispatch("bindGeneral");
                    }
                    this.eventCards = this.$store.state.general;
                    break;
                case 1:
                    if (this.$store.state.amu.length === 0) {
                        await this.$store.dispatch("bindAMU");
                    }
                    this.eventCards = this.$store.state.amu;

                    break;
                case 2:
                    if (this.$store.state.workshop.length === 0) {
                        await this.$store.dispatch("bindWorkshop");
                    }
                    this.eventCards = this.$store.state.workshop;
                    break;
            }
        },
    },
};
</script>

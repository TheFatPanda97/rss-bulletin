<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col v-for="eventCard in $store.state.currEventCards" cols="4" :key="eventCard.id">
                    <event-card
                        :title="eventCard.title"
                        :date="eventCard.date"
                        :time="eventCard.time"
                        :imgSrc="eventCard.imgSrc"
                        :id="eventCard.id"
                        :category="eventCard.category"
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
            loading: true,
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
        getUrl() {
            storage
                .ref("general/image.png")
                .getDownloadURL()
                .then(function(url) {
                    console.log(url);
                });
        },
    },
};
</script>

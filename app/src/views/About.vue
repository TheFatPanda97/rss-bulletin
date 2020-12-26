<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p>{{ documents }}</p>
        <v-btn @click="logout">logout</v-btn>
    </div>
</template>

<script>
import { db } from "../db";
import firebase from "firebase/app";
import "firebase/auth";

export default {
    data() {
        return {
            documents: [],
        };
    },

    firestore: {
        documents: db.collection("users"),
    },

    methods: {
        async logout() {
            try {
                await firebase.auth().signOut();
                this.$router.push({ name: "Home" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

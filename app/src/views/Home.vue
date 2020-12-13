<template>
    <div>
        <section id="firebaseui-auth-container"></section>
        <p>{{ secret }}</p>
        <button @click="generate()">generate hash</button>
    </div>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import bcrypt from "bcryptjs";

export default {
    data() {
        return {
            secret: "",
        };
    },
    mounted() {
        let ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start("#firebaseui-auth-container", {
            signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
            signInSuccessUrl: "/about",
        });
    },
    methods: {
        generate() {
            bcrypt.hash("12345", 10, (err, hash) => {
                this.secret = hash;
                bcrypt.compare("12345", hash, function(err, res) {
                    console.log(res);
                });
            });
        },
    },
};
</script>

<template>
    <div>
        <v-btn @click="signin">login with google</v-btn>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
    data() {
        return {
            user: null,
        };
    },
    beforeCreate() {
        if (localStorage.getItem("onSignIn") === "true") {
            // This gives you a Google Access Token. You can use it to access the Google API.
            localStorage.setItem("onSignIn", "false");
            this.$router.push({ name: "About" });
        }
    },
    methods: {
        signin() {
            localStorage.setItem("onSignIn", "true");
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        },
    },
};
</script>

<style>
.mdl-button--raised.mdl-button--colored {
    background: blueviolet;
    /* min-width: 100%; */
    margin: 0px;
}
.firebaseui-form-actions {
    text-align: center;
}
</style>

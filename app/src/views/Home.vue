<template>
	<div>
		<section id="firebaseui-auth-container"></section>
	</div>
</template>

<script>
import firebase from "firebase/app"
import * as firebaseui from "firebaseui" 
import "firebase/auth"
import "firebaseui/dist/firebaseui.css";

export default {
	mounted() {
		let ui = new firebaseui.auth.AuthUI(firebase.auth());
		ui.start("#firebaseui-auth-container", {
            signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
            signInSuccessUrl: "/about"
		});
	},
};
</script>
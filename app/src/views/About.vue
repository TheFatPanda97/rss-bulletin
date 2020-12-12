<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ documents }}</p>
  </div>
</template>

<script>
import { db } from "../db"; 

export default {
	data() {
		return {
			documents: [],
		};
	},

	firestore: {
		documents: db.collection("users"),
	},
};
</script>

<template>
	<v-app
		style="background-image: url('https://semester.ly/static/img/splash/grey.png')"
	>
		<v-app-bar app color="#00204E" dark flat fixed>
			<div
				class="d-flex align-center"
				@click="$router.push({ name: 'Home' })"
				style="cursor: pointer"
			>
				<v-img
					alt="RSS Bulletin Logo"
					class="mx-2"
					contain
					src="./assets/toolbar-logo.png"
					transition="scale-transition"
					width="40"
				/>

				<v-img
					v-if="notMobile"
					alt="Vuetify Name"
					contain
					min-width="100"
					src="./assets/toolbar-text.png"
					width="100"
					class="mr-2"
				/>
			</div>
			<v-text-field
				class="rounded-lg ml-4 mr-4"
				flat
				hide-details
				label="Search"
				prepend-inner-icon="mdi-magnify"
				solo-inverted
				single-line
				clearable
			>
			</v-text-field>
			<v-btn
				v-if="notMobile"
				class="text-capitalize"
				@click="snackbar = true"
				color="#00204E"
				elevation="0"
			>
				<v-icon left dark> mdi-heart </v-icon>
				Saved Events
			</v-btn>
			<v-btn
				class="text-capitalize"
				color="#00204E"
				@click="snackbar = true"
				elevation="0"
			>
				<v-icon left dark> mdi-account-circle </v-icon>
				Sign In
			</v-btn>
			<template v-slot:extension v-if="$route.path === '/'">
				<v-tabs
					v-model="tab"
					class="position: fixed; top:0"
					dark
					background-color="#00204E"
				>
					<v-tab class="ml-auto">General</v-tab>
					<v-tab>AMU</v-tab>
					<v-tab class="mr-auto">Workshop</v-tab>
				</v-tabs>
			</template>
		</v-app-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
		<v-snackbar class="snackbar-wrapper" v-model="snackbar" absolute>
			Still working on it 😅, stay tuned!

			<template v-slot:action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			tab: 0,
			snackbar: false,
		};
	},
	async mounted() {
		await this.$store.dispatch("bindGeneral");
		this.$store.state.currEventCards = this.$store.state.general;
	},
	computed: {
		notMobile() {
			switch (this.$vuetify.breakpoint.name) {
				case "xs":
					return false;
				default:
					return true;
			}
		},
	},
	watch: {
		async tab(currTab) {
			switch (currTab) {
				case 0:
					if (this.$store.state.general.length === 0) {
						await this.$store.dispatch("bindGeneral");
					}
					this.$store.state.currEventCards = this.$store.state.general;
					break;
				case 1:
					if (this.$store.state.amu.length === 0) {
						await this.$store.dispatch("bindAMU");
					}
					this.$store.state.currEventCards = this.$store.state.amu;
					break;
				case 2:
					if (this.$store.state.workshop.length === 0) {
						await this.$store.dispatch("bindWorkshop");
					}
					this.$store.state.currEventCards = this.$store.state.workshop;
					break;
			}
		},
	},
};
</script>
<style scoped>
.snackbar-wrapper {
	position: fixed;
	height: 100%;
	width: 100%;
	pointer-events: none;
	top: 0;
	left: 0;
	z-index: 3;
}
</style>

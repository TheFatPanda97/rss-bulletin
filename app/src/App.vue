<template>
	<v-app
		style="background-image: url('https://semester.ly/static/img/splash/grey.png')"
	>
		<v-app-bar v-if="!hide" app color="#00204E" dark flat fixed>
			<div
				class="d-flex align-center"
				@click="$router.push({ name: 'Home' })"
				style="cursor: pointer"
			>
				<v-img
					v-if="notMobile"
					alt="RSS Bulletin Logo"
					class="mx-2"
					contain
					src="./assets/toolbar-logo.png"
					transition="scale-transition"
					width="40"
				/>

				<v-img
					alt="Vuetify Name"
					contain
					min-width="100"
					src="./assets/toolbar-text.png"
					width="100"
					class="mr-2"
				/>
			</div>
			<v-autocomplete
				v-if="notMobile"
				v-model="selectedEvent"
				@change="goToEvent"
				clearable
				:loading="loading"
				:items="items"
				:search-input.sync="search"
				prepend-inner-icon="mdi-magnify"
				cache-items
				class="mx-4"
				flat
				hide-no-data
				hide-details
				label="Search"
				solo-inverted
			></v-autocomplete>

			<v-spacer v-if="!notMobile"></v-spacer>

			<v-btn
				v-if="!notMobile"
				@click="hide = true"
				fab
				dark
				small
				color="#00204E"
				elevation="0"
			>
				<v-icon dark>
					mdi-magnify
				</v-icon>
			</v-btn>

			<v-btn
				class="text-capitalize"
				@click="snackbar = true"
				color="#00204E"
				elevation="0"
			>
				<v-icon v-if="notMobile" left dark> mdi-heart </v-icon>
				Saved
			</v-btn>
			<v-btn
				class="text-capitalize"
				color="#00204E"
				@click="snackbar = true"
				elevation="0"
			>
				<v-icon v-if="notMobile" left dark> mdi-account-circle </v-icon>
				Login
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
		<v-app-bar v-else app color="#00204E" dark flat fixed>
			<v-autocomplete
				v-model="selectedEvent"
				@change="goToEvent"
				autofocus
				clearable
				:loading="loading"
				:items="items"
				:search-input.sync="search"
				prepend-inner-icon="mdi-magnify"
				cache-items
				flat
				hide-no-data
				hide-details
				label="Search"
				solo-inverted
			></v-autocomplete>
			<v-btn
				class="text-capitalize"
				color="#00204E"
				@click="hide = false"
				elevation="0"
			>
				Cancel
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
			search: null,
			selectedEvent: null,
			loading: false,
			items: [],
			hide: false,
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
		async search(val) {
			val && val !== this.selectedEvent && this.querySelections(val);
		},
	},
	methods: {
		async querySelections(val) {
			this.loading = true;

			let remainingPromises = [];
			if (this.$store.state.general.length === 0) {
				remainingPromises.push(this.$store.dispatch("bindGeneral"));
			}

			if (this.$store.state.amu.length === 0) {
				remainingPromises.push(this.$store.dispatch("bindAMU"));
			}

			if (this.$store.state.workshop.length === 0) {
				remainingPromises.push(this.$store.dispatch("bindWorkshop"));
			}

			await Promise.all(remainingPromises);

			this.items = [
				...this.$store.state.general,
				...this.$store.state.amu,
				...this.$store.state.workshop,
			].filter((event) => {
				return event.title.toLowerCase().includes(val.toLowerCase());
			});

			for (let i = 0; i < this.items.length; i++) {
				this.items[i] = {
					text: this.items[i].title,
					value: JSON.stringify({
						id: this.items[i].id,
						category: this.items[i].category,
					}),
				};
			}

			this.loading = false;
		},
		goToEvent() {
			if (!this.selectedEvent) {
				return;
			}
			let { id, category } = JSON.parse(this.selectedEvent);

			if (id === this.$route.params.id) {
				return;
			}

			this.$router.push({
				name: "Event",
				params: { id, category },
			});
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

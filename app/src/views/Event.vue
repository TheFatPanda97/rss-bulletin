<template>
	<v-container>
		<v-card v-if="eventDetail">
			<v-container class="pt-0">
				<v-row style="background-color: #FCFBFB">
					<v-col class="pa-0" cols="12" md="8">
						<v-img
							:src="
								eventDetail.imgSrc
									? eventDetail.imgSrc
									: '../assets/load.png'
							"
							lazy-src="../assets/load.png"
							height="350"
						>
							<template v-slot:placeholder>
								<v-row
									class="fill-height ma-0"
									align="center"
									justify="center"
								>
									<v-progress-circular
										indeterminate
										color="grey lighten-5"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-col>
					<v-col cols="12" md="4" style="position: relative; min-height:250px">
						<v-col>
							<p>
								{{ eventDetail.date }}
							</p>
							<p class="text-subtitle-1 font-weight-medium">
								{{ eventDetail.title }}
							</p>
							<p>Location: {{ eventDetail.location }}</p>
						</v-col>
						<v-col style="position: absolute; bottom: 0; left: 0">
							<v-btn block dark color="#0E8548" @click="snackbar = true">
								Save
							</v-btn>
						</v-col>
					</v-col>
				</v-row>
				<v-row style="border-top: 0.1px solid grey;">
					<v-col>
						{{ eventDetail.description }}
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-skeleton-loader
			v-else
			type="card-avatar, article, actions"
		></v-skeleton-loader>
		<v-snackbar class="snackbar-wrapper" v-model="snackbar" absolute>
			Still working on it 😅, stay tuned!

			<template v-slot:action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>
<script>
export default {
	data() {
		return {
			snackbar: false,
		};
	},
	methods: {
		goToHome() {
			this.$router.push({ name: "Home" });
		},
	},
	created() {
		switch (this.$route.params.category) {
			case "general":
				if (this.$store.state.general.length === 0) {
					this.$store.dispatch("bindGeneral");
				}
				break;
			case "amu":
				if (this.$store.state.amu.length === 0) {
					this.$store.dispatch("bindAMU");
				}
				break;
			case "workshop":
				if (this.$store.state.workshop.length === 0) {
					this.$store.dispatch("bindWorkshop");
				}
				break;
			default:
				this.goToHome();
				break;
		}
	},
	computed: {
		eventDetail() {
			let tempEvent;
			switch (this.$route.params.category) {
				case "general":
					if (this.$store.state.general.length === 0) {
						return undefined;
					} else {
						tempEvent = this.$store.state.general.find(
							(event) => event.id === this.$route.params.id
						);
					}
					break;
				case "amu":
					if (this.$store.state.amu.length === 0) {
						return undefined;
					} else {
						tempEvent = this.$store.state.amu.find(
							(event) => event.id === this.$route.params.id
						);
					}
					break;
				case "workshop":
					if (this.$store.state.workshop.length === 0) {
						return undefined;
					} else {
						tempEvent = this.$store.state.workshop.find(
							(event) => event.id === this.$route.params.id
						);
					}
					break;
				default:
					this.goToHome();
					break;
			}

			return tempEvent ? tempEvent : this.goToHome();
		},
	},
};
</script>

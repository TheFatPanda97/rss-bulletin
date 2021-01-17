<template>
	<div style="height: 100%">
		<v-hover v-slot="{ hover }">
			<v-card
				:elevation="hover ? 6 : 2"
				class="transition-swing"
				style="cursor:pointer"
				height="100%"
			>
				<v-img
					class="white--text align-end"
					height="200px"
					@click="goToPage"
					:src="imgSrc"
					style="position: relative"
				>
					<v-btn
						@click.stop="test"
						fab
						small
						dark
						color="#5B7CF0"
						style="position: absolute; bottom: 10px; right: 10px; z-index: 10"
					>
						<v-icon>
							mdi-heart-outline
						</v-icon>
					</v-btn>
				</v-img>

				<div @click="goToPage">
					<v-card-subtitle class="font-weight-bold pb-0" style="color: #5B7CF0">
						{{ formatDate(startDate, startTime) }} -
						{{ formatDate(endDate, endTime) }}
					</v-card-subtitle>
					<v-card-title class="mb-2 pt-1" style="word-break: normal">
						{{ title }}
					</v-card-title>
				</div>
			</v-card>
		</v-hover>
		<v-snackbar class="snackbar-wrapper" v-model="snackbar" absolute>
			Still working on it 😅, stay tuned!

			<template v-slot:action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>
<script>
import { DateTime } from "luxon";
export default {
	data() {
		return {
			snackbar: false,
		};
	},
	props: {
		title: String,
		imgSrc: String,
		startDate: String,
		endDate: String,
		startTime: String,
		endTime: String,
		id: String,
		category: String,
	},
	methods: {
		goToPage() {
			this.$router.push({
				name: "Event",
				params: { id: this.id, category: this.category },
			});
		},
		test() {
			this.snackbar = true;
		},
		formatDate(date, time) {
			return DateTime.fromISO(`${date}T${time}`).toFormat("LLL t");
		},
	},
};
</script>

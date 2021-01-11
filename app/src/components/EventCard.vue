<template>
	<v-hover v-slot="{ hover }">
		<v-card
			:elevation="hover ? 6 : 2"
			class="transition-swing"
			style="cursor:pointer"
			@click="goToPage"
			height="100%"
		>
			<v-img
				class="white--text align-end"
				height="200px"
				:src="imgSrc"
				style="position: relative"
			>
				<v-btn
					fab
					small
					dark
					color="#5B7CF0"
					style="position: absolute; bottom: 10px; right: 10px"
				>
					<v-icon>
						mdi-heart-outline
					</v-icon>
				</v-btn>
			</v-img>
			<v-card-subtitle class="font-weight-bold pb-0" style="color: #5B7CF0">
				{{ date }} {{ time }}
			</v-card-subtitle>
			<v-card-title class="mb-2 pt-1" style="word-break: normal">
				{{ title }}
			</v-card-title>
		</v-card>
	</v-hover>
</template>
<script>
export default {
	props: {
		title: String,
		imgSrc: String,
		date: String,
		time: String,
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
	},
};
</script>
<style scoped>
.truncate {
	/* width: 100px !important; */
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>

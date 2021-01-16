<template>
	<v-container>
		<v-card class="pa-5">
			<h1 style="text-align: center">Create a Event</h1>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field
					v-model="title"
					label="Title"
					:rules="[(v) => !!v || 'Title is required']"
				></v-text-field>

				<v-combobox
					v-model="platform"
					name="platform"
					:items="platformItems"
					label="Platform"
					:rules="[(v) => !!v || 'Platform is required']"
				></v-combobox>

				<v-text-field
					v-model="location"
					label="Location"
					:rules="[(v) => !!v || 'Location is required']"
				></v-text-field>

				<v-row align="center" class="px-3">
					<p style="color: #727272" class="ma-0">Start:</p>
					<v-btn
						@click="showPicker('sd')"
						width="130px"
						class="ma-2"
						:outlined="!showStartDate"
						color="indigo"
						dark
					>
						{{ startDate || "Date" }}
					</v-btn>
					<v-btn
						@click="showPicker('st')"
						width="130px"
						class="ma-2"
						:outlined="!showStartTime"
						color="indigo"
						dark
					>
						{{ startTime || "Time" }}
					</v-btn>
				</v-row>
				<v-row align="center" class="px-3">
					<p style="color: #727272" class="ma-0 pr-2">End:</p>
					<v-btn
						@click="showPicker('ed')"
						width="130px"
						class="ma-2"
						:outlined="!showEndDate"
						color="indigo"
						dark
					>
						{{ endDate || "Date" }}
					</v-btn>
					<v-btn
						@click="showPicker('et')"
						width="130px"
						class="ma-2"
						:outlined="!showEndTime"
						color="indigo"
						dark
					>
						{{ endTime || "Time" }}
					</v-btn>
				</v-row>

				<div v-if="showStartDate" class="my-3">
					<h2>Start:</h2>
					<v-date-picker
						v-model="startDate"
						show-current
						:max="endDate"
					></v-date-picker>
				</div>
				<div v-if="showEndDate" class="my-5">
					<h2>End:</h2>
					<v-date-picker
						v-model="endDate"
						show-current
						:min="startDate"
					></v-date-picker>
				</div>
				<div v-if="showStartTime" class="my-3">
					<h2>Start:</h2>
					<v-time-picker v-model="startTime" :max="endTime"></v-time-picker>
				</div>
				<div v-if="showEndTime" class="my-3">
					<h2>End:</h2>
					<v-time-picker v-model="endTime" :min="startTime"></v-time-picker>
				</div>

				<v-file-input
					show-size
					label="Upload title image"
					truncate-length="20"
					prepend-icon="mdi-camera"
					:rules="[
						(value) =>
							(value && value.size < 1000000) ||
							'Image size should be less than 1 MB!',
					]"
				></v-file-input>

				<v-textarea
					v-model="description"
					name="description"
					label="Description"
					auto-grow
					:rules="[(v) => !!v || 'Description is required']"
				></v-textarea>

				<v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
					Validate
				</v-btn>

				<v-btn color="error" class="mr-4" @click="reset">
					Reset Form
				</v-btn>

				<v-btn color="warning" @click="resetValidation">
					Reset Validation
				</v-btn>
			</v-form>

			<div v-html="html"></div>
		</v-card>
	</v-container>
</template>
<script>
import showdown from "showdown";

export default {
	data: () => ({
		valid: true,
		title: null,
		platform: null,
		location: null,
		description: null,
		startDate: null,
		endDate: null,
		startTime: null,
		endTime: null,
		platformItems: ["Item 1", "Item 2", "Item 3", "Item 4"],
		showStartDate: false,
		showEndDate: false,
		showStartTime: false,
		showEndTime: false,
		html: "",
	}),

	methods: {
		validate() {
			console.log(this.$refs.form.validate());
			let converter = new showdown.Converter();
			this.html = converter.makeHtml(this.description).replace(/\\/g, "</br>");
			console.log(this.html);
			console.log(this.startDate, this.endDate);
		},
		reset() {
			this.$refs.form.reset();
		},
		resetValidation() {
			this.$refs.form.resetValidation();
		},
		showPicker(whichPicker) {
			switch (whichPicker) {
				case "sd":
					this.showStartDate = !this.showStartDate;
					this.showEndDate = false;
					this.showStartTime = false;
					this.showEndTime = false;
					break;
				case "ed":
					this.showStartDate = false;
					this.showEndDate = !this.showEndDate;
					this.showStartTime = false;
					this.showEndTime = false;
					break;
				case "st":
					this.showStartDate = false;
					this.showEndDate = false;
					this.showStartTime = !this.showStartTime;
					this.showEndTime = false;
					break;
				case "et":
					this.showStartDate = false;
					this.showEndDate = false;
					this.showStartTime = false;
					this.showEndTime = !this.showEndTime;
					break;
			}
		},
	},
};
</script>

<template>
	<v-container>
		<v-card class="pa-5">
			<h1 style="text-align: center">Create an Event</h1>
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
					label="Location/Link"
					:rules="[(v) => !!v || 'Location is required']"
				></v-text-field>

				<v-select
					v-model="category"
					name="category"
					:items="categoryItems"
					label="Category"
					:rules="[(v) => !!v || 'Category is required']"
				></v-select>

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
					v-model="imgFile"
					show-size
					label="Upload title image"
					truncate-length="20"
					prepend-icon="mdi-camera"
					:rules="[(v) => v || 'Image is required']"
				></v-file-input>

				<v-row>
					<v-col cols="12" sm="6">
						<v-textarea
							class="pt-0"
							v-model="description"
							name="description"
							label="Description"
							auto-grow
							:rules="[(v) => !!v || 'Description is required']"
						></v-textarea>
					</v-col>
					<v-col cols="12" sm="6" class="pb-8">
						<div
							style="border: 1px #727272 solid; height: 100%; min-height: 100px"
							class="pa-1"
							v-html="preview"
						></div>
					</v-col>
				</v-row>

				<v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
					Submit
				</v-btn>

				<v-btn color="error" class="mr-4" @click="reset">
					Reset Form
				</v-btn>
				<v-btn @click="uploadImg">
					upload
				</v-btn>
				<v-btn @click="compressImg">
					compress
				</v-btn>
			</v-form>
			<p>{{ progress }}</p>
		</v-card>
	</v-container>
</template>
<script>
import showdown from "showdown";
import { db, storage } from "../db";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

export default {
	data: () => ({
		valid: true,
		title: null,
		platform: null,
		location: null,
		description: "",
		startDate: null,
		endDate: null,
		startTime: null,
		category: null,
		endTime: null,
		imgFile: null,
		platformItems: ["Zoom", "Gather.town", "Other"],
		categoryItems: ["General", "AMU", "Workshop"],
		showStartDate: false,
		showEndDate: false,
		showStartTime: false,
		showEndTime: false,
		progress: 0,
	}),

	methods: {
		async submit() {
			if (this.$refs.form.validate()) {
				let converter = new showdown.Converter();
                let htmlDescription = converter.makeHtml(this.description);
                
				await this.compressImg();
                let imgSrc = await this.uploadImg();
                
				const data = {
					title: this.title,
					description: htmlDescription,
					category: this.category.toLowerCase(),
					startDate: this.startDate,
					endDate: this.endDate,
					startTime: this.startTime,
					endTime: this.endTime,
					imgSrc,
					location: this.location,
					platform: this.platform,
				};

				try {
					await db
						.collection(this.category.toLowerCase())
						.doc(data.id)
						.set(data);
					console.log("added file");
				} catch (e) {
					console.log(e);
				}
			}
		},
		reset() {
			this.$refs.form.reset();
		},
		async uploadImg() {
			console.log(this.imgFile);
			let storageRef = storage.ref();
			let imgRef = storageRef.child(
				`${this.category.toLowerCase()}/${uuidv4()}.${this.imgFile.name
					.split(".")
					.pop()}`
			);
			try {
				await imgRef.put(this.imgFile);
				return await imgRef.getDownloadURL();
			} catch (e) {
				console.log(e);
			}
		},
		async compressImg() {
			const options = {
				maxSizeMB: 1,
				onProgress: (val) => (this.progress = val),
			};

			try {
				let compressedImg = await imageCompression(this.imgFile, options);
				this.imgFile = compressedImg;
			} catch (e) {
				console.log(e);
			}
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
	computed: {
		preview() {
			let converter = new showdown.Converter();
			let temp = converter.makeHtml(this.description);
			if (temp) return temp.replace(/\\/g, "<br>");
			else return "";
		},
	},
	watch: {
		startDate(val) {
			if (!this.endDate) this.endDate = val;
		},
		startTime(val) {
			if (!this.endTime) this.endTime = val;
		},
	},
};
</script>

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
                            <v-btn block dark color="#0E8548">
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
        <p v-else>loading</p>
    </v-container>
</template>
<script>
export default {
    async created() {
        let tempEvent;
        switch (this.$route.params.category) {
            case "general":
                if (this.$store.state.general.length === 0) {
                    await this.$store.dispatch("bindGeneral");
                }

                tempEvent = this.$store.state.general.find(
                    (event) => event.id === this.$route.params.id
                );

                if (!tempEvent) this.$router.push({ name: "Home" });

                break;
            default:
                this.$router.push({ name: "Home" });
                break;
        }
    },
    computed: {
        eventDetail() {
            return this.$store.state.general.find(
                (event) => event.id === this.$route.params.id
            );
        },
    },
    watch: {
        "$store.state.general": function (newVal) {
            if (newVal.length != 0) {
                let tempEvent = this.$store.state.general.find(
                    (event) => event.id === this.$route.params.id
                );

                if (!tempEvent) this.$router.push({ name: "Home" });
            }
        },
    },
};
</script>

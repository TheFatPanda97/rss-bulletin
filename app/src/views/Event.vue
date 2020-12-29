<template>
    <v-container>
        <v-card>
            <v-container class="pt-0">
                <v-row style="background-color: #FCFBFB">
                    <v-col class="pa-0">
                        <v-img
                            :src="
                                eventDetail.imgSrc
                                    ? eventDetail.imgSrc
                                    : '../assets/load.png'
                            "
                            lazy-src="../assets/load.png"
                            max-height="400"
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
                    <v-col
                        cols="12"
                        sm="12"
                        md="4"
                        style="position: relative; min-height:250px"
                    >
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
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            eventDetail: this.$store.state.general.find(
                (event) => event.id === this.$route.params.id
            ),
        };
    },
};
</script>

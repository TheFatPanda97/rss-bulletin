<template>
    <v-hover v-slot="{ hover }">
        <v-card
            max-width="400"
            :elevation="hover ? 6 : 2"
            class="transition-swing"
            style="cursor:pointer"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <v-card-actions class="pa-0">
                    <v-container class="pb-0">
                        <v-row justify="end">
                            <v-col cols="2">
                                <v-btn fab small dark color="#5B7CF0">
                                    <v-icon>
                                        mdi-heart-outline
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-actions>
            </v-img>
            <v-card-title>Top 10 Australian beaches</v-card-title>
            <v-card-subtitle class="font-weight-bold" style="color: #5B7CF0">
                <p>Thu, Dec 31, 2020 10:00 PM EST</p>
            </v-card-subtitle>
        </v-card>
    </v-hover>
</template>

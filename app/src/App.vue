<template>
    <v-app
        style="background-image: url('https://semester.ly/static/img/splash/grey.png')"
    >
        <v-app-bar app color="#00204E" dark flat>
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
            <v-btn v-if="notMobile" class="text-capitalize" color="#00204E" elevation="0">
                <v-icon left dark> mdi-heart </v-icon>
                Saved Events
            </v-btn>
            <v-btn class="text-capitalize" color="#00204E" elevation="0">
                <v-icon left dark> mdi-account-circle </v-icon>
                Sign In
            </v-btn>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            tab: 0,
        };
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
    }
};
</script>

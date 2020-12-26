<template>
    <v-app>
        <v-app-bar app color="#00204E" dark>
            <div
                class="d-flex align-center"
                @click="$router.push({ name: 'Home' })"
                style="cursor: pointer"
            >
                <v-img
                    alt="RSS Bulletin Logo"
                    class="mr-2"
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
                />
            </div>

            <template v-slot:extension v-if="this.$router.currentRoute.path === '/'">
                <v-tabs v-model="tab" align-with-title>
                    <v-tab>All</v-tab>
                    <v-menu open-on-hover bottom offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-tab v-bind="attrs" v-on="on">
                                Dropdown
                            </v-tab>
                        </template>

                        <v-list>
                            <v-list-item>
                                <v-btn>Shawn</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-tabs>
            </template>

            <v-text-field
                class="rounded-lg ml-4"
                flat
                hide-details
                hint="Search"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn>Hello</v-btn>
            <v-btn>Hello</v-btn>
            <v-btn>Hello</v-btn>
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
};
</script>

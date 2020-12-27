<template>
    <v-container>
        <v-card>
            <v-container class="pt-0">
                <v-row style="background-color: #FCFBFB">
                    <v-col class="pa-0">
                        <v-img
                            src="https://picsum.photos/id/11/500/300"
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
                                Jan 07
                            </p>
                            <p class="text-subtitle-1 font-weight-medium">
                                A FEMINIST'S GUIDE TO BOTANY: Online Botanical Painting
                                Session
                            </p>
                            <p>Platform: Zoom</p>
                        </v-col>
                        <v-col style="position: absolute; bottom: 0; left: 0">
                            <v-btn block dark color="#617DEF">
                                Save
                            </v-btn>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row style="border-top: 0.1px solid grey;">
                    <v-col>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                        pretium justo. Nulla facilisi. Nunc risus justo, interdum a odio
                        facilisis, auctor cursus eros. Quisque vitae mauris dapibus,
                        euismod mauris ac, laoreet urna. Ut erat metus, ullamcorper quis
                        vulputate eu, commodo vel ligula. Donec in leo dui. Etiam vitae
                        sodales ipsum. Etiam non massa sagittis, pulvinar dui sit amet,
                        feugiat lacus. Aenean a arcu augue. Curabitur vehicula placerat
                        lorem convallis dictum. Nulla tempus ex sit amet pharetra
                        imperdiet. Duis et sapien nulla. Quisque id dolor et justo rhoncus
                        facilisis. Curabitur mattis, nulla vel dignissim iaculis, tellus
                        nisi consequat magna, at pharetra risus elit euismod dui. Nulla
                        laoreet ante justo, quis eleifend eros convallis ut. Suspendisse
                        posuere ante ut accumsan accumsan. Aenean elementum nisi volutpat
                        libero dapibus fringilla. Donec eu nulla laoreet, interdum ex eu,
                        fringilla nisl. Integer in neque euismod, feugiat lectus et,
                        vestibulum purus. Curabitur consectetur nec nisi vitae tempus.
                        Duis lorem dui, interdum ut dictum sed, porttitor vitae tortor.
                        Vestibulum at tempus diam. Orci varius natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus. Nullam orci lorem,
                        egestas sit amet porttitor eget, luctus at dui. In hac habitasse
                        platea dictumst. Suspendisse vehicula facilisis arcu, nec semper
                        magna malesuada nec. Aenean eu orci enim. Proin pretium metus eu
                        urna bibendum, pellentesque iaculis magna suscipit. Quisque
                        lacinia magna in augue dignissim dapibus. Aenean fermentum
                        volutpat ultrices. In tellus augue, pretium eget mi sit amet,
                        dapibus sollicitudin odio. Fusce ullamcorper finibus nisi, nec
                        eleifend sapien gravida eu. Sed vel arcu a ipsum fermentum
                        tincidunt. Etiam in neque scelerisque orci vehicula aliquam a quis
                        risus. Curabitur at ante a eros egestas vehicula pulvinar eu mi.
                        Vivamus et risus rhoncus sem tincidunt aliquet vel at tortor. Nam
                        vitae enim quis ligula blandit ornare. Integer at orci ac urna
                        pharetra dapibus ut vel ligula. Fusce ac ultrices nisi, non
                        dignissim ante. Mauris viverra dui non ex egestas fringilla. Etiam
                        lobortis lorem nec sollicitudin sodales. Nulla id tincidunt est,
                        ac luctus tortor. Proin ac ex ut velit mattis egestas. Orci varius
                        natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec dignissim tincidunt dapibus. Proin orci
                        ipsum, tincidunt sit amet turpis eget, pretium elementum lectus.
                        Etiam id varius augue. Sed a neque et elit bibendum egestas.
                        Maecenas nisl nulla, faucibus in tristique nec, ultrices et quam.
                        Quisque porta tellus vel viverra ultricies. Phasellus sed sem non
                        nibh fringilla tincidunt. Donec vitae mattis dui. Curabitur ornare
                        mollis ligula sed euismod. Praesent ultricies sem mauris, vel
                        accumsan ex tempus in. Cras malesuada, nisi sit amet condimentum
                        tempus, odio lorem dictum felis, commodo faucibus felis lectus vel
                        nibh. Vivamus commodo in est finibus dapibus. Phasellus a sem sit
                        amet lacus finibus egestas sit amet at nisl. Aliquam egestas eros
                        ac mauris malesuada faucibus. Sed eu ipsum at enim efficitur
                        sagittis eu at magna. Morbi et ligula a urna iaculis efficitur.
                        Vestibulum sagittis sollicitudin tortor id congue.
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
            imgLoaded: false,
        };
    },
};
</script>

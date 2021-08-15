<template>
    <v-app-bar
        id="default-app-bar"
        app
        absolute
        class="v-bar--underline"
        color="transparent"
        :clipped-left="$vuetify.rtl"
        :clipped-right="!$vuetify.rtl"
        height="70"
        flat
    >
        <v-app-bar-nav-icon
            class="hidden-md-and-up"
            @click="SET_DRAWER(!GET_DRAWER)"
        />

        <default-drawer-toggle class="hidden-sm-and-down" />

        <v-toolbar-title class="font-weight-light text-h5" v-text="name" />

        <v-spacer />

        <default-search class="hidden-sm-and-down" />

        <default-go-home />

        <default-notifications />

        <default-account />
    </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
    name: "Headers",

    data() {
        return {
            name: "Dashboard"
        };
    },
    mounted() {
        console.log(this.$store.state.home.drawer);
    },

    computed: {
        ...mapGetters("home", ["GET_DRAWER"]),
        ...mapState("home", [
            // map this.count to store.state.count
            "drawer"
        ])
    },

    methods: {
        ...mapMutations("home", ["SET_DRAWER"])
    }
};
</script>

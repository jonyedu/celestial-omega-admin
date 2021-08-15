<template>
    <v-btn class="ml-3 mr-4" elevation="1" fab small @click="SET_MINI(!mini)">
        <v-icon>
            {{ mini ? "mdi-format-list-bulleted" : "mdi-dots-vertical" }}
        </v-icon>
    </v-btn>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
    name: "DefaultDrawerToggle",
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters("home", {
            mini: "GET_MINI"
        }),
    },
    methods: {
        ...mapMutations("home", ["SET_MINI"])
    }
};
</script>

<template>
    <v-btn class="ml-3 mr-4" elevation="1" fab small @click="mini = !mini">
        <v-icon>
            {{ mini ? "mdi-format-list-bulleted" : "mdi-dots-vertical" }}
        </v-icon>
    </v-btn>
</template>

<script>
import { sync } from "vuex-pathify";
export default {
    name: "DefaultDrawerToggle",
    data() {
        return {};
    },
    computed: {
        mini: sync("app/mini")
    }
};
</script>

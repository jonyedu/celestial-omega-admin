<template>
  <v-snackbar :timeout="timeout" bottom right :color="color" v-model="show">
    <v-icon large color="green darken-2"> mdi-check </v-icon>
    <span>{{ text_error }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="show = false"> X </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "AppSnackbar",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    show: {
      type: Boolean,
      default: false,
    },
    text_error: {
      type: String,
      default: "",
    },
    timeout: {
      type: Number,
      default: 2000,
    },
  },
  // props: {
  //   color: {
  //     type: String,
  //     default: "primary",
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   text_error: {
  //     type: String,
  //     default: "",
  //   },
  //   timeout: {
  //     type: Number,
  //     default: 2000,
  //   },
  // },
  data: function () {
    return {
      show: this.show,
    };
  },
  // watch: {
  //   show: function (newVal, oldVal) {
  //     this.snackbarData = !this.snackbarDatanewVal;
  //   },
  // },
};
</script>
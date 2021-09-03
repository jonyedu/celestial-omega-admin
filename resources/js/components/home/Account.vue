<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list :tile="false" flat nav>
      <app-bar-item to="">
        <v-list-item-title v-text="'Perfil'" />
      </app-bar-item>

      <v-divider class="mb-2 mt-2" />

      <app-bar-item >
        <v-list-item-title @click="logout" v-text="'Cerrar sesión'" />
      </app-bar-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "DefaultAccount",

  data: () => ({}),
  methods: {
    logout() {
      alert("entra");
      let that = this;
      let url = "/logout";
      axios
        .post(url, this.user)
        .then(function (response) {
          location.replace("/login")
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

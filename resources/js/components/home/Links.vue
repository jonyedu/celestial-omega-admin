<template>
  <v-container>
    <v-row align="center">
      <v-col
        v-for="(link, i) in links"
        :key="i"
        class="ml-5 text-center"
        cols="2"
        md="auto"
      >
        <v-btn
          :color="link.color"
          class="ma-2 white--text"
          fab
          x-small
          :href="link.url"
          target="_blank"
          ><v-icon>{{ link.icono }} </v-icon>
        </v-btn>
        <br />
        <a
          :href="link.url"
          :color="link.color"
          class="
            text-decoration-none text-uppercase text-caption
            font-weight-regular
          "
          rel="noopener"
          target="_blank"
          v-text="link.descripcion"
        />
      </v-col>

      <v-spacer class="hidden-sm-and-down" />

      <v-col class="mt-5" cols="12" md="auto">
        <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
          &copy; {{ new Date().getFullYear() }}, Derechos Reservados
          <a href="codevesolut.com" class="text-decoration-none"
            ><strong>CodevSolut</strong></a
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.getRedSocial();
  },
  name: "Links",

  data: () => ({
    links: [],
    // links: [
    //   {
    //     href: "https://www.facebook.com/celestial.omega.944",
    //     icon: "mdi-facebook",
    //     text: "Facebook",
    //     color: "light-blue darken-4",
    //   },
    //   {
    //     href: "https://www.youtube.com/channel/UCOjh_XOXLigAsMc3sMOKZlQ",
    //     icon: "mdi-youtube",
    //     text: "Youtube",
    //     color: "red",
    //   },
    //   {
    //     href: "https://www.instagram.com/celestialomegatv/",
    //     icon: "mdi-instagram",
    //     text: "Instagram",
    //     color: "accent",
    //   },
    //   {
    //     href: "https://api.whatsapp.com/send?phone=593997760413&text=Hola%20hermanos%20necesito%20oracion%20",
    //     icon: "mdi-whatsapp",
    //     text: "Whatsapp",
    //     color: "teal",
    //   },
    // ],
  }),
  methods: {
    getRedSocial() {
      let that = this;
      let url = "/red_social";
      axios
        .get(url)
        .then(function (response) {
          that.links = response.data.redes_sociales;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
a
  color: inherit !important
</style>

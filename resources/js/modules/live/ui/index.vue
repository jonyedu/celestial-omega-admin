<template>
  <div>
    <template>
      <div>
        <v-alert
          elevation="2"
          dismissible
          transition="scale-transition"
          v-model="show"
          type="success"
        >
          {{ text_error }}
        </v-alert>
      </div>
    </template>
    <v-data-table
      :headers="headers"
      :items="lives"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mantenimiento de Live</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog persistent v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo Item
              </v-btn>
            </template>
            <v-card :loading="isUpdating">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <!-- Fecha -->
                      <v-col lg="6" sm="6" md="5">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.fecha"
                              :rules="fechaRules"
                              label="Fecha"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.fecha"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <!-- Hora -->
                      <v-col lg="6" sm="6" md="5">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="editedItem.hora"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.hora"
                              :rules="horaRules"
                              label="Hora"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu"
                            v-model="editedItem.hora"
                            full-width
                            format="24hr"
                            @click:minute="$refs.menu.save(editedItem.hora)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                      <!-- Nombre -->
                      <v-col cols="4" sm="6" md="4">
                        <v-text-field
                          required
                          :counter="30"
                          :rules="nombreRules"
                          v-model="editedItem.nombre"
                          label="Nombre"
                          hint="Es obligatorio tener el nombre del Live."
                        ></v-text-field>
                      </v-col>
                      <!-- Descripciòn -->
                      <v-col cols="4" sm="6" md="4">
                        <v-text-field
                          :counter="100"
                          :rules="descripcionRules"
                          v-model="editedItem.descripcion"
                          label="Descripciòn"
                          hint="Es obligatorio llevar descripcion."
                        ></v-text-field>
                      </v-col>
                      <!-- Red Social -->
                      <v-col cols="4" sm="6" md="4">
                        <v-autocomplete
                          v-model="editedItem.red_social_id"
                          :items="redes_sociales"
                          small-chips
                          color="blue-grey lighten-2"
                          label="Red Social"
                          item-text="descripcion"
                          item-value="red_social_id"
                        >
                          <template v-slot:selection="data">
                            <v-chip close @click:close="remove()">
                              <v-avatar left>
                                <v-icon
                                  small
                                  class="mr-2"
                                  :color="data.item.color"
                                >
                                  {{ data.item.icono }}
                                </v-icon>
                              </v-avatar>
                              {{ data.item.descripcion }}
                            </v-chip>
                          </template>
                          <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                              <v-list-item-content
                                v-text="data.item"
                              ></v-list-item-content>
                            </template>
                            <template v-else>
                              <v-list-item-avatar>
                                <v-icon
                                  small
                                  class="mr-2"
                                  :color="data.item.color"
                                >
                                  {{ data.item.icono }}
                                </v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title
                                  v-html="data.item.descripcion"
                                ></v-list-item-title>
                              </v-list-item-content>
                            </template>
                          </template>
                        </v-autocomplete>
                      </v-col>
                      <!-- Url -->
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          :counter="100"
                          :rules="urlRules"
                          v-model="editedItem.url"
                          label="Url"
                          hint="Es obligatorio llevar descripcion."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estás segura de que quieres eliminar esta Live?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.icono="{ item }">
        <v-icon small class="mr-2" :color="item.color">
          {{ item.icono }}
        </v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getLive"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
  </v-data-table>
</template>
<script>
export default {
  name: "MantenimientoLive",

  data: () => ({
    isUpdating: false,

    nombreRules: [
      (v) => !!v || "Título es requerido",
      (v) =>
        (v && v.length <= 30) || "El título debe tener menos de 30 caracteres",
    ],
    descripcionRules: [
      (v) => !!v || "Descripción es requerido",
      (v) =>
        (v && v.length <= 100) ||
        "El Descripción debe tener menos de 30 caracteres",
    ],
    urlRules: [(v) => !!v || "Url es requerido"],
    redSocialRules: [(v) => !!v || "Red Social es requerido"],
    fechaRules: [(v) => !!v || "Fecha es requerido"],
    horaRules: [(v) => !!v || "Hora es requerido"],
    menu2: false,
    menu: false,
    valid: true,
    text_error: "",
    show: false,
    color: "",
    model: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Fecha", value: "fecha" },
      { text: "Hora", value: "hora" },
      { text: "Nombre", value: "nombre" },
      { text: "Descripciòn", value: "descripcion" },
      { text: "Url", value: "url" },
      { text: "Icono", value: "icono" },
      { text: "Opciones", value: "actions", sortable: false },
    ],

    redes_sociales: [],
    lives: [],
    editedIndex: -1,
    editedItem: {
      fecha: "",
      hora: null,
      live_id: 0,
      nombre: "",
      descripcion: "",
      red_social_id: 0,
      url: "",
    },
    defaultItem: {
      fecha: "",
      hora: null,
      live_id: 0,
      nombre: "",
      descripcion: "",
      url: "",
      red_social_id: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getLive();
    this.getRedSocial();
  },

  methods: {
    remove() {
      this.editedItem.red_social_id = 0;
    },
    getRedSocial() {
      this.isUpdating = true;
      let that = this;
      let url = "/red_social";
      axios
        .get(url)
        .then(function (response) {
          that.redes_sociales = response.data.redes_sociales;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(function () {
          that.isUpdating = false;
        });
    },
    getLive() {
      this.isUpdating = true;
      let that = this;
      let url = "/live";
      axios
        .get(url)
        .then(function (response) {
          that.lives = response.data.lives;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(function () {
          that.isUpdating = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.lives.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.lives.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.isUpdating = true;
      let that = this;
      let url = "/live/" + this.editedItem.live_id;
      axios
        .delete(url, this.editedItem)
        .then(function () {
          that.$refs.form.reset();
          that.$refs.form.resetValidation();
          that.text_error = "Se ha eliminado correctamente";
          that.show = true;
          that.color = "green";
          that.getLive();
          that.closeDelete();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(function () {
          that.isUpdating = false;
        });
    },

    close() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        this.isUpdating = true;
        let that = this;
        let url = "";
        if (this.editedIndex > -1) {
          //modificar
          url = "/live/" + this.editedItem.live_id;
          axios
            .put(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha modificado correctamente";
              that.show = true;
              that.color = "green";
              that.getLive();
              that.close();
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(function () {
              that.isUpdating = false;
            });
        } else {
          //guardar
          url = "/live";
          axios
            .post(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha guardado correctamente";
              that.show = true;
              that.color = "green";
              that.getLive();
              that.close();
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(function () {
              that.isUpdating = false;
            });
        }
      }
    },
  },
};
</script>
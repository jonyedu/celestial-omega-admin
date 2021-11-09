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
      :items="musicas"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mantenimiento de Música</v-toolbar-title>
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
                      <!-- Genero Musical -->
                      <v-col cols="4" sm="6" md="4">
                        <v-autocomplete
                          v-model="editedItem.genero_musical_id"
                          :items="musicas"
                          small-chips
                          color="blue-grey lighten-2"
                          label="Categoría Musical"
                          item-text="genero_musical"
                          item-value="genero_musical_id"
                        >
                        <template v-slot:selection="data">
                            <v-chip close @click:close="remove()">
                              {{ data.item.genero_musical }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                      </v-col>
                      <!-- Descripción -->
                      <v-col cols="4" sm="6" md="4">
                        <v-text-field
                          required
                          :counter="30"
                          :rules="descripcionRules"
                          v-model="editedItem.descripcion"
                          label="Descripción"
                          hint="Es obligatorio tener la descripcion de la Música."
                        ></v-text-field>
                      </v-col>
                      <!-- Url -->
                      <v-col cols="4" sm="6" md="4">
                        <v-text-field
                          :counter="100"
                          :rules="urlRules"
                          v-model="editedItem.url"
                          label="Url"
                          hint="Es obligatorio llevar url."
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
                >¿Estás segura de que quieres eliminar esta Música?</v-card-title
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
        <v-btn color="primary" @click="getMusica"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
  </v-data-table>
</template>
<script>
export default {
  name: "MantenimientoMusica",

  data: () => ({
    isUpdating: false,

    descripcionRules: [
      (v) => !!v || "Descripción es requerido",
      (v) =>
        (v && v.length <= 30) || "La descripción debe tener menos de 30 caracteres",
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
      { text: "Genero Musical", value: "genero_musical" },
      { text: "Descripciòn", value: "descripcion" },
      { text: "Url", value: "url" },
      { text: "Opciones", value: "actions", sortable: false },
    ],

    musicas: [],
    editedIndex: -1,
    editedItem: {
      musica_id: 0,
      genero_musical_id: 0,
      genero_musical: 0,
      descripcion: "",
      url: "",
    },
    defaultItem: {
      musica_id: 0,
      genero_musical_id: 0,
      genero_musical: 0,
      descripcion: "",
      url: "",
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
    this.getMusica();
  },

  methods: {
    remove() {
      this.editedItem.genero_musical_id = 0;
    },
    getMusica() {
      this.isUpdating = true;
      let that = this;
      let url = "/musica";
      axios
        .get(url)
        .then(function (response) {
          that.musicas = response.data.musicas;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(function () {
          that.isUpdating = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.musicas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.musicas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.isUpdating = true;
      let that = this;
      let url = "/musica/" + this.editedItem.musica_id;
      axios
        .delete(url, this.editedItem)
        .then(function () {
          that.$refs.form.reset();
          that.$refs.form.resetValidation();
          that.text_error = "Se ha eliminado correctamente";
          that.show = true;
          that.color = "green";
          that.getMusica();
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
          url = "/musica/" + this.editedItem.musica_id;
          axios
            .put(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha modificado correctamente";
              that.show = true;
              that.color = "green";
              that.getMusica();
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
          url = "/musica";
          axios
            .post(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha guardado correctamente";
              that.show = true;
              that.color = "green";
              that.getMusica();
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
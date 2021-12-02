<template>
  <div>
    <v-snackbar timeout="2000" bottom right :color="color" v-model="show">
      <v-icon large color="green darken-2"> mdi-check </v-icon>
      <span>{{ text_error }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="show = false">
          X
        </v-btn>
      </template>
    </v-snackbar>
    <v-data-table
      :headers="headers"
      :items="carruseles"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.src="{ item }">
        <v-img max-height="50" max-width="140" :src="item"></v-img>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mantenimiento de Carrusel</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog persistent v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <!-- Carrusel -->
                      <v-col cols="12" sm="12" md="12">
                        <v-file-input
                          hint="Es obligatorio llevar una imagen."
                          :rules="imagenRules"
                          v-model="files"
                          show-size
                          @change="onFileSelected"
                          @click:clear="clearImagen"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Clic para seleccionar la galería"
                          prepend-icon="mdi-camera"
                          label="Carrusel"
                          counter
                        >
                          <template v-slot:selection="{ text }">
                            <v-chip small label color="primary">
                              {{ text }}
                            </v-chip>
                          </template>
                        </v-file-input>
                      </v-col>
                      <!-- Para ver la Imagen -->
                      <template v-if="editedItem.src != ''">
                        <v-sheet class="mx-auto" max-width="450">
                          <v-slide-group show-arrows>
                            <v-slide-item v-slot="{ active, toggle }">
                              <v-img
                                max-height="50"
                                max-width="140"
                                :src="editedItem.src"
                              >
                                <v-icon
                                  color="red"
                                  class="ml-16 mt-9"
                                  :input-value="active"
                                  small
                                  @click="deleteImagenes(index)"
                                >
                                  mdi-delete
                                </v-icon>
                              </v-img>
                            </v-slide-item>
                          </v-slide-group>
                        </v-sheet>
                      </template>
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
                >¿Estás segura de que quieres eliminar esta
                galería?</v-card-title
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
      <!-- Botones de Editar e Eliminar -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="blue">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" color="red">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getCarrusel"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: "MantenimientoCarrusel",
  data: () => ({
    imagenRules: [(v) => !!v || "Imagen es requerido"],
    valid: true,
    text_error: "",
    show: false,
    color: "",
    model: null,
    prueba: null,
    switch1: true,
    files: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Imagen", value: "src" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    carruseles: [],
    customers: [],
    editedIndex: -1,
    editedItem: {
      carrusel_id: 0,
      src: "",
    },
    defaultItem: {
      carrusel_id: 0,
      src: "",
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
    this.getCarrusel();
  },

  methods: {
    deleteImagenes(index) {
      this.editedItem.imagenes[index].delete = true;
      this.editedItem.imagenes[index].status = false;
    },
    clearImagen() {
      //this.editedItem.imagenes = [];
    },
    setImagenMain(imagen) {
      //console.log(imagen);
      this.editedItem.src = imagen.src;
    },
    onFileSelected() {
      let that = this;
      console.log(this.files);
      if (this.files != null) {
        var file = this.files;
        if (
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg"
        ) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            that.editedItem.src = e.target.result;
          };
        } else {
          // this.showNotificationProgress(
          //   "Advertencia al cargar la imagen",
          //   "Solo imagenes de formato: .jpeg, .jpg, .png son permitidos!",
          //   "warning"
          // );
        }
      }
    },
    getCarrusel() {
      let that = this;
      let url = "/carrusel";
      axios
        .get(url)
        .then(function (response) {
          that.carruseles = response.data.carruseles;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    editItem(item) {
      this.files = this.$global.dataURLtoFile(item.src, item.titulo);
      item.imagenes = [];
      this.editedIndex = this.carruseles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.carruseles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let that = this;
      let url = "/carrusel/" + this.editedItem.carrusel_id;
      axios
        .delete(url, this.editedItem)
        .then(function () {
          that.text_error = "Se ha eliminado correctamente";
          that.show = true;
          that.color = "green";
          that.getCarrusel();
          that.closeDelete();
        })
        .catch((error) => {
          console.error(error);
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
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        let that = this;
        let url = "";
        if (this.editedIndex > -1) {
          //modificar
          url = "/carrusel/" + this.editedItem.carrusel_id;
          axios
            .put(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha modificado correctamente";
              that.show = true;
              that.color = "green";
              that.getCarrusel();
              that.close();
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          //guardar
          url = "/carrusel";
          axios
            .post(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha guardado correctamente";
              that.show = true;
              that.color = "green";
              that.getCarrusel();
              that.close();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    },
  },
};
</script>
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
      :items="galerias"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.src="{ item }">
        <v-img max-height="50" max-width="140" :src="item"></v-img>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mantenimiento de Galería</v-toolbar-title>
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
                      <!-- Título -->
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field
                          required
                          :counter="30"
                          :rules="tituloRules"
                          v-model="editedItem.titulo"
                          label="Título"
                          hint="Es obligatorio tener el título de la galería."
                        ></v-text-field>
                      </v-col>
                      <!-- Sub Título -->
                      <v-col cols="12" sm="6" md="7">
                        <v-text-field
                          :counter="100"
                          :rules="subTituloRules"
                          v-model="editedItem.sub_titulo"
                          label="Sub Título"
                          hint="Es obligatorio llevar sub título."
                        ></v-text-field>
                      </v-col>
                      <!-- Tamaño -->
                      <v-col cols="6" sm="6" md="6">
                        <v-select
                          :items="[4, 5, 6, 12]"
                          label="Tamaño"
                          required
                          v-model="editedItem.flex"
                        ></v-select>
                      </v-col>
                      <!-- Galería -->
                      <v-col cols="6" sm="6" md="6">
                        <v-file-input
                          v-model="files"
                          show-size
                          @change="onFileSelected"
                          @click:clear="clearImagen"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Clic para seleccionar la galería"
                          prepend-icon="mdi-camera"
                          label="Galería"
                          multiple
                          counter
                        >
                          <template v-slot:selection="{ text }">
                            <v-chip small label color="primary">
                              {{ text }}
                            </v-chip>
                          </template>
                        </v-file-input>
                      </v-col>
                      <!-- Esto es para mostrar las imagenes en la galeria -->
                      <template>
                        <v-sheet class="mx-auto" max-width="450">
                          <v-slide-group show-arrows>
                            <v-slide-item
                              v-for="(imagen, index) in editedItem.imagenes"
                              :key="index"
                              v-slot="{ active, toggle }"
                            >
                              <template v-if="imagen.status">
                                <v-img
                                  max-height="50"
                                  max-width="140"
                                  :src="imagen.src"
                                >
                                  <!-- key -->
                                  <v-icon
                                    color="blue"
                                    active-class="purple white--text"
                                    class="ml-5 mt-9"
                                    :input-value="active"
                                    small
                                    v-on:click="setImagenMain(imagen)"
                                    @click="toggle"
                                  >
                                    mdi-key
                                  </v-icon>
                                  <!-- delete -->
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
                              </template>
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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getGaleria"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: "MantenimientoGaleria",
  data: () => ({
    tituloRules: [
      (v) => !!v || "Título es requerido",
      (v) =>
        (v && v.length <= 30) || "El título debe tener menos de 30 caracteres",
    ],
    subTituloRules: [
      (v) => !!v || "Sub Título es requerido",
      (v) =>
        (v && v.length <= 100) || "El título debe tener menos de 30 caracteres",
    ],
    valid: true,
    text_error: "",
    show: false,
    color: "",
    model: null,
    prueba: null,
    switch1: true,
    files: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Título", value: "titulo", },
      { text: "Sub Título", value: "sub_titulo" },
      { text: "Flex", value: "flex" },
      { text: "Imagen", value: "src" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    galerias: [],
    customers: [],
    editedIndex: -1,
    editedItem: {
      galeria_id: 0,
      titulo: "",
      sub_titulo: "",
      flex: 6,
      src: "",
      imagenes: [],
    },
    defaultItem: {
      galeria_id: 0,
      titulo: "",
      sub_titulo: "",
      flex: 6,
      src: "",
      imagenes: [],
    },
  }),

  computed: {
    formTitle() {
      //return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
    },
    totalItems() {
      //return this.$store.getters.totalItems;
    },
    rowsPerPageItems() {
      console.log(this.$store);
      //return this.$store.getters.general.rowsPerPageItems;
    },
    pagination: {
      get: function () {
        return this.$store.getters.pagination;
      },
      set: function (value) {
        console.log(value);
        this.$store.dispatch("general/getCustomers", value);
      },
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    pagination: {
      handler() {
        this.loading = true;
        this.$store
          .dispatch("general/getCustomers", this.page)
          .then((result) => {
            this.loading = false;
          });
      },
      update() {
        console.log("update");
        this.loading = true;
        this.$store
          .dispatch("general/getCustomers", this.page)
          .then((result) => {
            this.loading = false;
          });
      },
      deep: true,
    },
  },

  created() {
    this.getGaleria();
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
      //this.editedItem.imagenes = [];
      let that = this;
      if (this.files.length > 0) {
        this.files.forEach(function callback(file, index) {
          if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg"
          ) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              let object = {};
              object.galeria_id = that.editedItem.galeria_id;
              object.imagen_id = index;
              object.src = e.target.result;
              object.status = true;
              that.editedItem.imagenes.push(object);
            };
          } else {
            this.showNotificationProgress(
              "Advertencia al cargar la imagen",
              "Solo imagenes de formato: .jpeg, .jpg, .png son permitidos!",
              "warning"
            );
          }
        });
      }
    },
    getGaleria() {
      let that = this;
      let url = "/galeria";
      axios
        .get(url)
        .then(function (response) {
          that.galerias = response.data.galerias;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getImagenPorPoceso() {
      let that = this;
      let url = "/imagen/get-imagen-por-proceso/1/" + this.editedItem.galeria_id;
      axios
        .get(url)
        .then(function (response) {
          that.editedItem.imagenes = response.data.imagenes;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    editItem(item) {      
      item.imagenes = [];
      this.editedIndex = this.galerias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.getImagenPorPoceso();
    },

    deleteItem(item) {
      this.editedIndex = this.galerias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let that = this;
      let url = "/galeria/" + this.editedItem.galeria_id;
      axios
        .delete(url, this.editedItem)
        .then(function () {
          that.$refs.form.reset();
          that.$refs.form.resetValidation();
          that.text_error = "Se ha eliminado correctamente";
          that.show = true;
          that.color = "green";
          that.getGaleria();
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
        let that = this;
        let url = "";
        if (this.editedIndex > -1) {
          //modificar
          url = "/galeria/" + this.editedItem.galeria_id;
          axios
            .put(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha modificado correctamente";
              that.show = true;
              that.color = "green";
              that.getGaleria();
              that.close();
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          //guardar
          url = "/galeria";
          axios
            .post(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha guardado correctamente";
              that.show = true;
              that.color = "green";
              that.getGaleria();
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
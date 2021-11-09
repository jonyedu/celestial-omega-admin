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
      :items="generos_musicales"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mantenimiento de Genero Musical</v-toolbar-title>
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
                      <!-- Descripciòn -->
                      <v-col cols="4" sm="6" md="4">
                        <v-text-field
                          :counter="100"
                          :rules="descripcionRules"
                          v-model="editedItem.descripcion"
                          label="Descripción"
                          hint="Es obligatorio llevar descripcion."
                        ></v-text-field>
                      </v-col>
                      <!-- Abreviatura -->
                      <v-col cols="4" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.abreviatura"
                          label="Abreviatura"
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
                >¿Estás segura de que quieres eliminar este Genero Musical?</v-card-title
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
        <v-btn color="primary" @click="getGeneroMusical"> Reset </v-btn>
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

    descripcionRules: [
      (v) => !!v || "Descripción es requerido",
      (v) =>
        (v && v.length <= 100) ||
        "El Descripción debe tener menos de 30 caracteres",
    ],
    
    
    valid: true,
    text_error: "",
    show: false,
    color: "",
    model: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Descripcion", value: "descripcion" },
      { text: "Abreviatura", value: "abreviatura" },
      { text: "Opciones", value: "actions", sortable: false },
    ],

    generos_musicales: [],
    editedIndex: -1,
    editedItem: {   
      genero_musical_id: 0,  
      descripcion: "",      
      abreviatura: "",
    },
    defaultItem: {
      genero_musical_id: 0,  
      descripcion: "",      
      abreviatura: "",
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
    this.getGeneroMusical();
  },

  methods: {
    remove() {
      this.editedItem.genero_musical_id = 0;
    },
    getGeneroMusical() {
      this.isUpdating = true;
      let that = this;
      let url = "/genero_musical";
      axios
        .get(url)
        .then(function (response) {
          that.generos_musicales = response.data.generos_musicales;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(function () {
          that.isUpdating = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.generos_musicales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.generos_musicales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.isUpdating = true;
      let that = this;
      let url = "/genero_musical/" + this.editedItem.genero_musical_id;
      axios
        .delete(url, this.editedItem)
        .then(function () {
          that.$refs.form.reset();
          that.$refs.form.resetValidation();
          that.text_error = "Se ha eliminado correctamente";
          that.show = true;
          that.color = "green";
          that.getGeneroMusical();
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
          url = "/genero_musical/" + this.editedItem.genero_musical_id;
          axios
            .put(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha modificado correctamente";
              that.show = true;
              that.color = "green";
              that.getGeneroMusical();
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
          url = "/genero_musical";
          axios
            .post(url, this.editedItem)
            .then(function () {
              that.$refs.form.reset();
              that.$refs.form.resetValidation();
              that.text_error = "Se ha guardado correctamente";
              that.show = true;
              that.color = "green";
              that.getGeneroMusical();
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
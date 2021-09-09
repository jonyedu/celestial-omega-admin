(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/programa/ui/index.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/programa/ui/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "MantenimientoPrograma",
  data: function data() {
    return {
      tituloRules: [function (v) {
        return !!v || "Título es requerido";
      }, function (v) {
        return v && v.length <= 30 || "El título debe tener menos de 30 caracteres";
      }],
      subTituloRules: [function (v) {
        return !!v || "Sub Título es requerido";
      }, function (v) {
        return v && v.length <= 100 || "El título debe tener menos de 30 caracteres";
      }],
      fechaRules: [function (v) {
        return !!v || "Fecha es requerido";
      }],
      horaInicioRules: [function (v) {
        return !!v || "Hora Inicio es requerido";
      }],
      horaFinRules: [function (v) {
        return !!v || "Hora Fin es requerido";
      }],
      menu2: false,
      menu: false,
      menu3: false,
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
      headers: [{
        text: "Fecha",
        value: "fecha"
      }, {
        text: "Hora Inicio",
        value: "hora_inicio"
      }, {
        text: "Hora Fin",
        value: "hora_fin"
      }, {
        text: "Título",
        value: "titulo"
      }, {
        text: "Sub Título",
        value: "sub_titulo"
      }, {
        text: "Flex",
        value: "flex"
      }, {
        text: "Imagen",
        value: "src"
      }, {
        text: "Opciones",
        value: "actions",
        sortable: false
      }],
      programas: [],
      editedIndex: -1,
      editedItem: {
        programa_id: 0,
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
        titulo: "",
        sub_titulo: "",
        flex: 6,
        src: "",
        imagenes: []
      },
      defaultItem: {
        programa_id: 0,
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
        titulo: "",
        sub_titulo: "",
        flex: 6,
        src: "",
        imagenes: []
      }
    };
  },
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
    }
  },
  watch: {
    dialog: function dialog(val) {
      val || this.close();
    },
    dialogDelete: function dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  created: function created() {
    this.getPrograma();
  },
  methods: {
    deleteImagenes: function deleteImagenes(index) {
      this.editedItem.imagenes[index]["delete"] = true;
      this.editedItem.imagenes[index].status = false;
      console.log(this.editedItem.imagenes);
    },
    clearImagen: function clearImagen() {//this.editedItem.imagenes = [];
    },
    setImagenMain: function setImagenMain(imagen) {
      //console.log(imagen);
      this.editedItem.src = imagen.src;
    },
    onFileSelected: function onFileSelected() {
      //this.editedItem.imagenes = [];
      var that = this;

      if (this.files.length > 0) {
        this.files.forEach(function callback(file, index) {
          if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (e) {
              var object = {};
              object.programa_id = that.editedItem.programa_id;
              object.imagen_id = index;
              object.src = e.target.result;
              object.status = true;
              that.editedItem.imagenes.push(object);
            };
          } else {
            /* this.showNotificationProgress(
              "Advertencia al cargar la imagen",
              "Solo imagenes de formato: .jpeg, .jpg, .png son permitidos!",
              "warning"
            ); */
          }
        });
      }
    },
    getPrograma: function getPrograma() {
      var that = this;
      var url = "/programa";
      axios.get(url).then(function (response) {
        that.programas = response.data.programas;
      })["catch"](function (error) {
        console.error(error);
      });
    },
    editItem: function editItem(item) {
      this.editedIndex = this.programas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem: function deleteItem(item) {
      this.editedIndex = this.programas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm: function deleteItemConfirm() {
      var that = this;
      var url = "/programa/" + this.editedItem.programa_id;
      axios["delete"](url, this.editedItem).then(function () {
        that.$refs.form.reset();
        that.$refs.form.resetValidation();
        that.text_error = "Se ha eliminado correctamente";
        that.show = true;
        that.color = "green";
        that.getPrograma();
        that.closeDelete();
      })["catch"](function (error) {
        console.error(error);
      });
    },
    close: function close() {
      var _this = this;

      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.$nextTick(function () {
        _this.editedItem = Object.assign({}, _this.defaultItem);
        _this.editedIndex = -1;
      });
    },
    closeDelete: function closeDelete() {
      var _this2 = this;

      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialogDelete = false;
      this.$nextTick(function () {
        _this2.editedItem = Object.assign({}, _this2.defaultItem);
        _this2.editedIndex = -1;
      });
    },
    save: function save() {
      if (this.$refs.form.validate()) {
        var that = this;
        var url = "";

        if (this.editedIndex > -1) {
          //modificar
          url = "/programa/" + this.editedItem.programa_id;
          axios.put(url, this.editedItem).then(function () {
            that.$refs.form.reset();
            that.$refs.form.resetValidation();
            that.text_error = "Se ha modificado correctamente";
            that.show = true;
            that.color = "green";
            that.getPrograma();
            that.close();
          })["catch"](function (error) {
            console.error(error);
          });
        } else {
          //guardar
          url = "/programa";
          axios.post(url, this.editedItem).then(function () {
            that.$refs.form.reset();
            that.$refs.form.resetValidation();
            that.text_error = "Se ha guardado correctamente";
            that.show = true;
            that.color = "green";
            that.getPrograma();
            that.close();
          })["catch"](function (error) {
            console.error(error);
          });
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/programa/ui/index.vue?vue&type=template&id=dacc711a&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/programa/ui/index.vue?vue&type=template&id=dacc711a& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      [
        _c(
          "div",
          [
            _c(
              "v-alert",
              {
                attrs: {
                  elevation: "2",
                  dismissible: "",
                  transition: "scale-transition",
                  type: "success"
                },
                model: {
                  value: _vm.show,
                  callback: function($$v) {
                    _vm.show = $$v
                  },
                  expression: "show"
                }
              },
              [_vm._v("\n        " + _vm._s(_vm.text_error) + "\n      ")]
            )
          ],
          1
        )
      ],
      _vm._v(" "),
      _c("v-data-table", {
        staticClass: "elevation-1",
        attrs: {
          headers: _vm.headers,
          items: _vm.programas,
          "sort-by": "calories"
        },
        scopedSlots: _vm._u([
          {
            key: "item.src",
            fn: function(ref) {
              var item = ref.item
              return [
                _c("v-img", {
                  attrs: { "max-height": "50", "max-width": "140", src: item }
                })
              ]
            }
          },
          {
            key: "top",
            fn: function() {
              return [
                _c(
                  "v-toolbar",
                  { attrs: { flat: "" } },
                  [
                    _c("v-toolbar-title", [
                      _vm._v("Mantenimiento de Programa")
                    ]),
                    _vm._v(" "),
                    _c("v-divider", {
                      staticClass: "mx-4",
                      attrs: { inset: "", vertical: "" }
                    }),
                    _vm._v(" "),
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c(
                      "v-dialog",
                      {
                        attrs: { persistent: "", "max-width": "500px" },
                        scopedSlots: _vm._u([
                          {
                            key: "activator",
                            fn: function(ref) {
                              var on = ref.on
                              var attrs = ref.attrs
                              return [
                                _c(
                                  "v-btn",
                                  _vm._g(
                                    _vm._b(
                                      {
                                        staticClass: "mb-2",
                                        attrs: { color: "primary", dark: "" }
                                      },
                                      "v-btn",
                                      attrs,
                                      false
                                    ),
                                    on
                                  ),
                                  [
                                    _vm._v(
                                      "\n              Nuevo Item\n            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ]),
                        model: {
                          value: _vm.dialog,
                          callback: function($$v) {
                            _vm.dialog = $$v
                          },
                          expression: "dialog"
                        }
                      },
                      [
                        _vm._v(" "),
                        _c(
                          "v-card",
                          [
                            _c("v-card-title", [
                              _c("span", { staticClass: "text-h5" }, [
                                _vm._v(_vm._s(_vm.formTitle))
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "v-form",
                              {
                                ref: "form",
                                attrs: { "lazy-validation": "" },
                                model: {
                                  value: _vm.valid,
                                  callback: function($$v) {
                                    _vm.valid = $$v
                                  },
                                  expression: "valid"
                                }
                              },
                              [
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-container",
                                      [
                                        _c(
                                          "v-row",
                                          [
                                            _c(
                                              "v-col",
                                              {
                                                attrs: {
                                                  cols: "12",
                                                  sm: "6",
                                                  md: "6",
                                                  lg: "6",
                                                  xl: "6"
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-menu",
                                                  {
                                                    attrs: {
                                                      "close-on-content-click": false,
                                                      "nudge-right": 40,
                                                      transition:
                                                        "scale-transition"
                                                    },
                                                    scopedSlots: _vm._u([
                                                      {
                                                        key: "activator",
                                                        fn: function(ref) {
                                                          var on = ref.on
                                                          var attrs = ref.attrs
                                                          return [
                                                            _c(
                                                              "v-text-field",
                                                              _vm._g(
                                                                _vm._b(
                                                                  {
                                                                    attrs: {
                                                                      rules:
                                                                        _vm.fechaRules,
                                                                      label:
                                                                        "Fecha",
                                                                      "prepend-icon":
                                                                        "mdi-calendar",
                                                                      readonly:
                                                                        ""
                                                                    },
                                                                    model: {
                                                                      value:
                                                                        _vm
                                                                          .editedItem
                                                                          .fecha,
                                                                      callback: function(
                                                                        $$v
                                                                      ) {
                                                                        _vm.$set(
                                                                          _vm.editedItem,
                                                                          "fecha",
                                                                          $$v
                                                                        )
                                                                      },
                                                                      expression:
                                                                        "editedItem.fecha"
                                                                    }
                                                                  },
                                                                  "v-text-field",
                                                                  attrs,
                                                                  false
                                                                ),
                                                                on
                                                              )
                                                            )
                                                          ]
                                                        }
                                                      }
                                                    ]),
                                                    model: {
                                                      value: _vm.menu2,
                                                      callback: function($$v) {
                                                        _vm.menu2 = $$v
                                                      },
                                                      expression: "menu2"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(" "),
                                                    _c("v-date-picker", {
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          _vm.menu2 = false
                                                        }
                                                      },
                                                      model: {
                                                        value:
                                                          _vm.editedItem.fecha,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.editedItem,
                                                            "fecha",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "editedItem.fecha"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                attrs: {
                                                  cols: "6",
                                                  sm: "3",
                                                  md: "3",
                                                  lg: "3",
                                                  xl: "3"
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-menu",
                                                  {
                                                    ref: "menu",
                                                    attrs: {
                                                      "close-on-content-click": false,
                                                      "nudge-right": 40,
                                                      "return-value":
                                                        _vm.editedItem
                                                          .hora_inicio,
                                                      transition:
                                                        "scale-transition",
                                                      "offset-y": "",
                                                      "max-width": "290px",
                                                      "min-width": "290px"
                                                    },
                                                    on: {
                                                      "update:returnValue": function(
                                                        $event
                                                      ) {
                                                        return _vm.$set(
                                                          _vm.editedItem,
                                                          "hora_inicio",
                                                          $event
                                                        )
                                                      },
                                                      "update:return-value": function(
                                                        $event
                                                      ) {
                                                        return _vm.$set(
                                                          _vm.editedItem,
                                                          "hora_inicio",
                                                          $event
                                                        )
                                                      }
                                                    },
                                                    scopedSlots: _vm._u([
                                                      {
                                                        key: "activator",
                                                        fn: function(ref) {
                                                          var on = ref.on
                                                          var attrs = ref.attrs
                                                          return [
                                                            _c(
                                                              "v-text-field",
                                                              _vm._g(
                                                                _vm._b(
                                                                  {
                                                                    attrs: {
                                                                      rules:
                                                                        _vm.horaInicioRules,
                                                                      label:
                                                                        "Hora Inicio",
                                                                      "prepend-icon":
                                                                        "mdi-clock-time-four-outline",
                                                                      readonly:
                                                                        ""
                                                                    },
                                                                    model: {
                                                                      value:
                                                                        _vm
                                                                          .editedItem
                                                                          .hora_inicio,
                                                                      callback: function(
                                                                        $$v
                                                                      ) {
                                                                        _vm.$set(
                                                                          _vm.editedItem,
                                                                          "hora_inicio",
                                                                          $$v
                                                                        )
                                                                      },
                                                                      expression:
                                                                        "editedItem.hora_inicio"
                                                                    }
                                                                  },
                                                                  "v-text-field",
                                                                  attrs,
                                                                  false
                                                                ),
                                                                on
                                                              )
                                                            )
                                                          ]
                                                        }
                                                      }
                                                    ]),
                                                    model: {
                                                      value: _vm.menu,
                                                      callback: function($$v) {
                                                        _vm.menu = $$v
                                                      },
                                                      expression: "menu"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(" "),
                                                    _vm.menu
                                                      ? _c("v-time-picker", {
                                                          attrs: {
                                                            "full-width": "",
                                                            format: "24hr"
                                                          },
                                                          on: {
                                                            "click:minute": function(
                                                              $event
                                                            ) {
                                                              return _vm.$refs.menu.save(
                                                                _vm.editedItem
                                                                  .hora_inicio
                                                              )
                                                            }
                                                          },
                                                          model: {
                                                            value:
                                                              _vm.editedItem
                                                                .hora_inicio,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                _vm.editedItem,
                                                                "hora_inicio",
                                                                $$v
                                                              )
                                                            },
                                                            expression:
                                                              "editedItem.hora_inicio"
                                                          }
                                                        })
                                                      : _vm._e()
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                attrs: {
                                                  cols: "6",
                                                  sm: "3",
                                                  md: "3",
                                                  lg: "3",
                                                  xl: "3"
                                                }
                                              },
                                              [
                                                _c(
                                                  "v-menu",
                                                  {
                                                    ref: "menu3",
                                                    attrs: {
                                                      "close-on-content-click": false,
                                                      "nudge-right": 40,
                                                      "return-value":
                                                        _vm.editedItem.hora_fin,
                                                      transition:
                                                        "scale-transition",
                                                      "offset-y": "",
                                                      "max-width": "290px",
                                                      "min-width": "290px"
                                                    },
                                                    on: {
                                                      "update:returnValue": function(
                                                        $event
                                                      ) {
                                                        return _vm.$set(
                                                          _vm.editedItem,
                                                          "hora_fin",
                                                          $event
                                                        )
                                                      },
                                                      "update:return-value": function(
                                                        $event
                                                      ) {
                                                        return _vm.$set(
                                                          _vm.editedItem,
                                                          "hora_fin",
                                                          $event
                                                        )
                                                      }
                                                    },
                                                    scopedSlots: _vm._u([
                                                      {
                                                        key: "activator",
                                                        fn: function(ref) {
                                                          var on = ref.on
                                                          var attrs = ref.attrs
                                                          return [
                                                            _c(
                                                              "v-text-field",
                                                              _vm._g(
                                                                _vm._b(
                                                                  {
                                                                    attrs: {
                                                                      rules:
                                                                        _vm.horaFinRules,
                                                                      label:
                                                                        "Hora Fin",
                                                                      "prepend-icon":
                                                                        "mdi-clock-time-four-outline",
                                                                      readonly:
                                                                        ""
                                                                    },
                                                                    model: {
                                                                      value:
                                                                        _vm
                                                                          .editedItem
                                                                          .hora_fin,
                                                                      callback: function(
                                                                        $$v
                                                                      ) {
                                                                        _vm.$set(
                                                                          _vm.editedItem,
                                                                          "hora_fin",
                                                                          $$v
                                                                        )
                                                                      },
                                                                      expression:
                                                                        "editedItem.hora_fin"
                                                                    }
                                                                  },
                                                                  "v-text-field",
                                                                  attrs,
                                                                  false
                                                                ),
                                                                on
                                                              )
                                                            )
                                                          ]
                                                        }
                                                      }
                                                    ]),
                                                    model: {
                                                      value: _vm.menu3,
                                                      callback: function($$v) {
                                                        _vm.menu3 = $$v
                                                      },
                                                      expression: "menu3"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(" "),
                                                    _vm.menu3
                                                      ? _c("v-time-picker", {
                                                          attrs: {
                                                            "full-width": "",
                                                            format: "24hr"
                                                          },
                                                          on: {
                                                            "click:minute": function(
                                                              $event
                                                            ) {
                                                              return _vm.$refs.menu3.save(
                                                                _vm.editedItem
                                                                  .hora_fin
                                                              )
                                                            }
                                                          },
                                                          model: {
                                                            value:
                                                              _vm.editedItem
                                                                .hora_fin,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                _vm.editedItem,
                                                                "hora_fin",
                                                                $$v
                                                              )
                                                            },
                                                            expression:
                                                              "editedItem.hora_fin"
                                                          }
                                                        })
                                                      : _vm._e()
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "4" } },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    required: "",
                                                    counter: 30,
                                                    rules: _vm.tituloRules,
                                                    label: "Título",
                                                    hint:
                                                      "Es obligatorio tener el título de la Programa."
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editedItem.titulo,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editedItem,
                                                        "titulo",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editedItem.titulo"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "8" } },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    counter: 100,
                                                    rules: _vm.subTituloRules,
                                                    label: "Sub Título",
                                                    hint:
                                                      "Es obligatorio llevar sub título."
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editedItem.sub_titulo,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editedItem,
                                                        "sub_titulo",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editedItem.sub_titulo"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "12" } },
                                              [
                                                _c("v-select", {
                                                  attrs: {
                                                    items: [4, 5, 6, 12],
                                                    label: "Tamaño",
                                                    required: ""
                                                  },
                                                  model: {
                                                    value: _vm.editedItem.flex,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editedItem,
                                                        "flex",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editedItem.flex"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "12" } },
                                              [
                                                _c("v-file-input", {
                                                  attrs: {
                                                    "show-size": "",
                                                    accept:
                                                      "image/png, image/jpeg, image/bmp",
                                                    placeholder:
                                                      "Clic para seleccionar la Programa",
                                                    "prepend-icon":
                                                      "mdi-camera",
                                                    label: "Programa",
                                                    multiple: "",
                                                    counter: ""
                                                  },
                                                  on: {
                                                    change: _vm.onFileSelected,
                                                    "click:clear":
                                                      _vm.clearImagen
                                                  },
                                                  scopedSlots: _vm._u([
                                                    {
                                                      key: "selection",
                                                      fn: function(ref) {
                                                        var text = ref.text
                                                        return [
                                                          _c(
                                                            "v-chip",
                                                            {
                                                              attrs: {
                                                                small: "",
                                                                label: "",
                                                                color: "primary"
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                            " +
                                                                  _vm._s(text) +
                                                                  "\n                          "
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      }
                                                    }
                                                  ]),
                                                  model: {
                                                    value: _vm.files,
                                                    callback: function($$v) {
                                                      _vm.files = $$v
                                                    },
                                                    expression: "files"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            [
                                              _c(
                                                "v-sheet",
                                                {
                                                  staticClass: "mx-auto",
                                                  attrs: { "max-width": "450" }
                                                },
                                                [
                                                  _c(
                                                    "v-slide-group",
                                                    {
                                                      attrs: {
                                                        "show-arrows": ""
                                                      }
                                                    },
                                                    _vm._l(
                                                      _vm.editedItem.imagenes,
                                                      function(imagen, index) {
                                                        return _c(
                                                          "v-slide-item",
                                                          {
                                                            key: index,
                                                            scopedSlots: _vm._u(
                                                              [
                                                                {
                                                                  key:
                                                                    "default",
                                                                  fn: function(
                                                                    ref
                                                                  ) {
                                                                    var active =
                                                                      ref.active
                                                                    var toggle =
                                                                      ref.toggle
                                                                    return [
                                                                      imagen.status
                                                                        ? [
                                                                            _c(
                                                                              "v-img",
                                                                              {
                                                                                attrs: {
                                                                                  "max-height":
                                                                                    "50",
                                                                                  "max-width":
                                                                                    "140",
                                                                                  src:
                                                                                    imagen.src
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "v-icon",
                                                                                  {
                                                                                    staticClass:
                                                                                      "ml-5 mt-9",
                                                                                    attrs: {
                                                                                      color:
                                                                                        "blue",
                                                                                      "active-class":
                                                                                        "purple white--text",
                                                                                      "input-value": active,
                                                                                      small:
                                                                                        ""
                                                                                    },
                                                                                    on: {
                                                                                      click: [
                                                                                        function(
                                                                                          $event
                                                                                        ) {
                                                                                          return _vm.setImagenMain(
                                                                                            imagen
                                                                                          )
                                                                                        },
                                                                                        toggle
                                                                                      ]
                                                                                    }
                                                                                  },
                                                                                  [
                                                                                    _vm._v(
                                                                                      "\n                                  mdi-key\n                                "
                                                                                    )
                                                                                  ]
                                                                                ),
                                                                                _vm._v(
                                                                                  " "
                                                                                ),
                                                                                _c(
                                                                                  "v-icon",
                                                                                  {
                                                                                    staticClass:
                                                                                      "ml-16 mt-9",
                                                                                    attrs: {
                                                                                      color:
                                                                                        "red",
                                                                                      "input-value": active,
                                                                                      small:
                                                                                        ""
                                                                                    },
                                                                                    on: {
                                                                                      click: function(
                                                                                        $event
                                                                                      ) {
                                                                                        return _vm.deleteImagenes(
                                                                                          index
                                                                                        )
                                                                                      }
                                                                                    }
                                                                                  },
                                                                                  [
                                                                                    _vm._v(
                                                                                      "\n                                  mdi-delete\n                                "
                                                                                    )
                                                                                  ]
                                                                                )
                                                                              ],
                                                                              1
                                                                            )
                                                                          ]
                                                                        : _vm._e()
                                                                    ]
                                                                  }
                                                                }
                                                              ],
                                                              null,
                                                              true
                                                            )
                                                          }
                                                        )
                                                      }
                                                    ),
                                                    1
                                                  )
                                                ],
                                                1
                                              )
                                            ]
                                          ],
                                          2
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-card-actions",
                              [
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { color: "blue darken-1", text: "" },
                                    on: { click: _vm.close }
                                  },
                                  [
                                    _vm._v(
                                      "\n                Cancel\n              "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { color: "blue darken-1", text: "" },
                                    on: { click: _vm.save }
                                  },
                                  [_vm._v(" Save ")]
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-dialog",
                      {
                        attrs: { "max-width": "500px" },
                        model: {
                          value: _vm.dialogDelete,
                          callback: function($$v) {
                            _vm.dialogDelete = $$v
                          },
                          expression: "dialogDelete"
                        }
                      },
                      [
                        _c(
                          "v-card",
                          [
                            _c("v-card-title", { staticClass: "text-h5" }, [
                              _vm._v(
                                "¿Estás segura de que quieres eliminar esta\n              Programa?"
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "v-card-actions",
                              [
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { color: "blue darken-1", text: "" },
                                    on: { click: _vm.closeDelete }
                                  },
                                  [_vm._v("Cancel")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { color: "blue darken-1", text: "" },
                                    on: { click: _vm.deleteItemConfirm }
                                  },
                                  [_vm._v("OK")]
                                ),
                                _vm._v(" "),
                                _c("v-spacer")
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ]
            },
            proxy: true
          },
          {
            key: "item.actions",
            fn: function(ref) {
              var item = ref.item
              return [
                _c(
                  "v-icon",
                  {
                    staticClass: "mr-2",
                    attrs: { small: "" },
                    on: {
                      click: function($event) {
                        return _vm.editItem(item)
                      }
                    }
                  },
                  [_vm._v(" mdi-pencil ")]
                ),
                _vm._v(" "),
                _c(
                  "v-icon",
                  {
                    attrs: { small: "" },
                    on: {
                      click: function($event) {
                        return _vm.deleteItem(item)
                      }
                    }
                  },
                  [_vm._v(" mdi-delete ")]
                )
              ]
            }
          },
          {
            key: "no-data",
            fn: function() {
              return [
                _c(
                  "v-btn",
                  {
                    attrs: { color: "primary" },
                    on: { click: _vm.getPrograma }
                  },
                  [_vm._v(" Reset ")]
                )
              ]
            },
            proxy: true
          }
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/modules/programa/ui/index.vue":
/*!****************************************************!*\
  !*** ./resources/js/modules/programa/ui/index.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_dacc711a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=dacc711a& */ "./resources/js/modules/programa/ui/index.vue?vue&type=template&id=dacc711a&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/modules/programa/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_dacc711a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_dacc711a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/modules/programa/ui/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/modules/programa/ui/index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/modules/programa/ui/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/programa/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/modules/programa/ui/index.vue?vue&type=template&id=dacc711a&":
/*!***********************************************************************************!*\
  !*** ./resources/js/modules/programa/ui/index.vue?vue&type=template&id=dacc711a& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_dacc711a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=dacc711a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/programa/ui/index.vue?vue&type=template&id=dacc711a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_dacc711a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_dacc711a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
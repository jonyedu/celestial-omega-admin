(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/carrusel/ui/index.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/carrusel/ui/index.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "MantenimientoCarrusel",
  data: function data() {
    return {
      imagenRules: [function (v) {
        return !!v || "Imagen es requerido";
      }],
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
      headers: [{
        text: "Imagen",
        value: "src"
      }, {
        text: "Opciones",
        value: "actions",
        sortable: false
      }],
      carruseles: [],
      customers: [],
      editedIndex: -1,
      editedItem: {
        carrusel_id: 0,
        src: ""
      },
      defaultItem: {
        carrusel_id: 0,
        src: ""
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
    this.getCarrusel();
  },
  methods: {
    deleteImagenes: function deleteImagenes(index) {
      this.editedItem.imagenes[index]["delete"] = true;
      this.editedItem.imagenes[index].status = false;
    },
    clearImagen: function clearImagen() {//this.editedItem.imagenes = [];
    },
    setImagenMain: function setImagenMain(imagen) {
      //console.log(imagen);
      this.editedItem.src = imagen.src;
    },
    onFileSelected: function onFileSelected() {
      var that = this;
      console.log(this.files);

      if (this.files != null) {
        var file = this.files;

        if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
          var reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = function (e) {
            that.editedItem.src = e.target.result;
          };
        } else {// this.showNotificationProgress(
          //   "Advertencia al cargar la imagen",
          //   "Solo imagenes de formato: .jpeg, .jpg, .png son permitidos!",
          //   "warning"
          // );
        }
      }
    },
    getCarrusel: function getCarrusel() {
      var that = this;
      var url = "/carrusel";
      axios.get(url).then(function (response) {
        that.carruseles = response.data.carruseles;
      })["catch"](function (error) {
        console.error(error);
      });
    },
    editItem: function editItem(item) {
      this.files = this.$global.dataURLtoFile(item.src, item.titulo);
      item.imagenes = [];
      this.editedIndex = this.carruseles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem: function deleteItem(item) {
      this.editedIndex = this.carruseles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm: function deleteItemConfirm() {
      var that = this;
      var url = "/carrusel/" + this.editedItem.carrusel_id;
      axios["delete"](url, this.editedItem).then(function () {
        that.text_error = "Se ha eliminado correctamente";
        that.show = true;
        that.color = "green";
        that.getCarrusel();
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
          url = "/carrusel/" + this.editedItem.carrusel_id;
          axios.put(url, this.editedItem).then(function () {
            that.$refs.form.reset();
            that.$refs.form.resetValidation();
            that.text_error = "Se ha modificado correctamente";
            that.show = true;
            that.color = "green";
            that.getCarrusel();
            that.close();
          })["catch"](function (error) {
            console.error(error);
          });
        } else {
          //guardar
          url = "/carrusel";
          axios.post(url, this.editedItem).then(function () {
            that.$refs.form.reset();
            that.$refs.form.resetValidation();
            that.text_error = "Se ha guardado correctamente";
            that.show = true;
            that.color = "green";
            that.getCarrusel();
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/carrusel/ui/index.vue?vue&type=template&id=1c457bad&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/carrusel/ui/index.vue?vue&type=template&id=1c457bad& ***!
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
      _c(
        "v-snackbar",
        {
          attrs: { timeout: "2000", bottom: "", right: "", color: _vm.color },
          scopedSlots: _vm._u([
            {
              key: "action",
              fn: function(ref) {
                var attrs = ref.attrs
                return [
                  _c(
                    "v-btn",
                    _vm._b(
                      {
                        attrs: { color: "pink", text: "" },
                        on: {
                          click: function($event) {
                            _vm.show = false
                          }
                        }
                      },
                      "v-btn",
                      attrs,
                      false
                    ),
                    [_vm._v("\n        X\n      ")]
                  )
                ]
              }
            }
          ]),
          model: {
            value: _vm.show,
            callback: function($$v) {
              _vm.show = $$v
            },
            expression: "show"
          }
        },
        [
          _c("v-icon", { attrs: { large: "", color: "green darken-2" } }, [
            _vm._v(" mdi-check ")
          ]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.text_error))])
        ],
        1
      ),
      _vm._v(" "),
      _c("v-data-table", {
        staticClass: "elevation-1",
        attrs: {
          headers: _vm.headers,
          items: _vm.carruseles,
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
                      _vm._v("Mantenimiento de Carrusel")
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
                        attrs: { persistent: "", "max-width": "1000px" },
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
                                                  sm: "12",
                                                  md: "12"
                                                }
                                              },
                                              [
                                                _c("v-file-input", {
                                                  attrs: {
                                                    hint:
                                                      "Es obligatorio llevar una imagen.",
                                                    rules: _vm.imagenRules,
                                                    "show-size": "",
                                                    accept:
                                                      "image/png, image/jpeg, image/bmp",
                                                    placeholder:
                                                      "Clic para seleccionar la galería",
                                                    "prepend-icon":
                                                      "mdi-camera",
                                                    label: "Carrusel",
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
                                            _vm.editedItem.src != ""
                                              ? [
                                                  _c(
                                                    "v-sheet",
                                                    {
                                                      staticClass: "mx-auto",
                                                      attrs: {
                                                        "max-width": "450"
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-slide-group",
                                                        {
                                                          attrs: {
                                                            "show-arrows": ""
                                                          }
                                                        },
                                                        [
                                                          _c("v-slide-item", {
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
                                                                      _c(
                                                                        "v-img",
                                                                        {
                                                                          attrs: {
                                                                            "max-height":
                                                                              "50",
                                                                            "max-width":
                                                                              "140",
                                                                            src:
                                                                              _vm
                                                                                .editedItem
                                                                                .src
                                                                          }
                                                                        },
                                                                        [
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
                                                                                    _vm.index
                                                                                  )
                                                                                }
                                                                              }
                                                                            },
                                                                            [
                                                                              _vm._v(
                                                                                "\n                                mdi-delete\n                              "
                                                                              )
                                                                            ]
                                                                          )
                                                                        ],
                                                                        1
                                                                      )
                                                                    ]
                                                                  }
                                                                }
                                                              ],
                                                              null,
                                                              false,
                                                              3068244976
                                                            )
                                                          })
                                                        ],
                                                        1
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ]
                                              : _vm._e()
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
                                "¿Estás segura de que quieres eliminar esta\n              galería?"
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
                    attrs: { small: "", color: "blue" },
                    on: {
                      click: function($event) {
                        return _vm.editItem(item)
                      }
                    }
                  },
                  [_vm._v("\n        mdi-pencil\n      ")]
                ),
                _vm._v(" "),
                _c(
                  "v-icon",
                  {
                    attrs: { small: "", color: "red" },
                    on: {
                      click: function($event) {
                        return _vm.deleteItem(item)
                      }
                    }
                  },
                  [_vm._v("\n        mdi-delete\n      ")]
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
                    on: { click: _vm.getCarrusel }
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
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/modules/carrusel/ui/index.vue":
/*!****************************************************!*\
  !*** ./resources/js/modules/carrusel/ui/index.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_1c457bad___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=1c457bad& */ "./resources/js/modules/carrusel/ui/index.vue?vue&type=template&id=1c457bad&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/modules/carrusel/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_1c457bad___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_1c457bad___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/modules/carrusel/ui/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/modules/carrusel/ui/index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/modules/carrusel/ui/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/carrusel/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/modules/carrusel/ui/index.vue?vue&type=template&id=1c457bad&":
/*!***********************************************************************************!*\
  !*** ./resources/js/modules/carrusel/ui/index.vue?vue&type=template&id=1c457bad& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_1c457bad___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=1c457bad& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/carrusel/ui/index.vue?vue&type=template&id=1c457bad&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_1c457bad___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_1c457bad___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
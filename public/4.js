(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/genero_musical/ui/index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/genero_musical/ui/index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "MantenimientoLive",
  data: function data() {
    return {
      isUpdating: false,
      descripcionRules: [function (v) {
        return !!v || "Descripción es requerido";
      }, function (v) {
        return v && v.length <= 100 || "El Descripción debe tener menos de 30 caracteres";
      }],
      valid: true,
      text_error: "",
      show: false,
      color: "",
      model: null,
      dialog: false,
      dialogDelete: false,
      headers: [{
        text: "Descripcion",
        value: "descripcion"
      }, {
        text: "Abreviatura",
        value: "abreviatura"
      }, {
        text: "Opciones",
        value: "actions",
        sortable: false
      }],
      generos_musicales: [],
      editedIndex: -1,
      editedItem: {
        genero_musical_id: 0,
        descripcion: "",
        abreviatura: ""
      },
      defaultItem: {
        genero_musical_id: 0,
        descripcion: "",
        abreviatura: ""
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
    this.getGeneroMusical();
  },
  methods: {
    remove: function remove() {
      this.editedItem.genero_musical_id = 0;
    },
    getGeneroMusical: function getGeneroMusical() {
      this.isUpdating = true;
      var that = this;
      var url = "/genero_musical";
      axios.get(url).then(function (response) {
        that.generos_musicales = response.data.generos_musicales;
      })["catch"](function (error) {
        console.error(error);
      })["finally"](function () {
        that.isUpdating = false;
      });
    },
    editItem: function editItem(item) {
      this.editedIndex = this.generos_musicales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem: function deleteItem(item) {
      this.editedIndex = this.generos_musicales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm: function deleteItemConfirm() {
      this.isUpdating = true;
      var that = this;
      var url = "/genero_musical/" + this.editedItem.genero_musical_id;
      axios["delete"](url, this.editedItem).then(function () {
        that.$refs.form.reset();
        that.$refs.form.resetValidation();
        that.text_error = "Se ha eliminado correctamente";
        that.show = true;
        that.color = "green";
        that.getGeneroMusical();
        that.closeDelete();
      })["catch"](function (error) {
        console.error(error);
      })["finally"](function () {
        that.isUpdating = false;
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
        this.isUpdating = true;
        var that = this;
        var url = "";

        if (this.editedIndex > -1) {
          //modificar
          url = "/genero_musical/" + this.editedItem.genero_musical_id;
          axios.put(url, this.editedItem).then(function () {
            that.$refs.form.reset();
            that.$refs.form.resetValidation();
            that.text_error = "Se ha modificado correctamente";
            that.show = true;
            that.color = "green";
            that.getGeneroMusical();
            that.close();
          })["catch"](function (error) {
            console.error(error);
          })["finally"](function () {
            that.isUpdating = false;
          });
        } else {
          //guardar
          url = "/genero_musical";
          axios.post(url, this.editedItem).then(function () {
            that.$refs.form.reset();
            that.$refs.form.resetValidation();
            that.text_error = "Se ha guardado correctamente";
            that.show = true;
            that.color = "green";
            that.getGeneroMusical();
            that.close();
          })["catch"](function (error) {
            console.error(error);
          })["finally"](function () {
            that.isUpdating = false;
          });
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/genero_musical/ui/index.vue?vue&type=template&id=e6b627a6&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/genero_musical/ui/index.vue?vue&type=template&id=e6b627a6& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
          items: _vm.generos_musicales,
          "sort-by": "calories"
        },
        scopedSlots: _vm._u([
          {
            key: "top",
            fn: function() {
              return [
                _c(
                  "v-toolbar",
                  { attrs: { flat: "" } },
                  [
                    _c("v-toolbar-title", [
                      _vm._v("Mantenimiento de Genero Musical")
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
                          { attrs: { loading: _vm.isUpdating } },
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
                                                  cols: "4",
                                                  sm: "6",
                                                  md: "4"
                                                }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    counter: 100,
                                                    rules: _vm.descripcionRules,
                                                    label: "Descripción",
                                                    hint:
                                                      "Es obligatorio llevar descripcion."
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editedItem
                                                        .descripcion,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editedItem,
                                                        "descripcion",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editedItem.descripcion"
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                attrs: {
                                                  cols: "4",
                                                  sm: "6",
                                                  md: "4"
                                                }
                                              },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "Abreviatura"
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.editedItem
                                                        .abreviatura,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.editedItem,
                                                        "abreviatura",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "editedItem.abreviatura"
                                                  }
                                                })
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
                                "¿Estás segura de que quieres eliminar este Genero Musical?"
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
            key: "item.icono",
            fn: function(ref) {
              var item = ref.item
              return [
                _c(
                  "v-icon",
                  {
                    staticClass: "mr-2",
                    attrs: { small: "", color: item.color }
                  },
                  [_vm._v("\n        " + _vm._s(item.icono) + "\n      ")]
                )
              ]
            }
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
                    on: { click: _vm.getGeneroMusical }
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

/***/ "./resources/js/modules/genero_musical/ui/index.vue":
/*!**********************************************************!*\
  !*** ./resources/js/modules/genero_musical/ui/index.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_e6b627a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=e6b627a6& */ "./resources/js/modules/genero_musical/ui/index.vue?vue&type=template&id=e6b627a6&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/modules/genero_musical/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_e6b627a6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_e6b627a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/modules/genero_musical/ui/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/modules/genero_musical/ui/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/modules/genero_musical/ui/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/genero_musical/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/modules/genero_musical/ui/index.vue?vue&type=template&id=e6b627a6&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/modules/genero_musical/ui/index.vue?vue&type=template&id=e6b627a6& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e6b627a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=e6b627a6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/genero_musical/ui/index.vue?vue&type=template&id=e6b627a6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e6b627a6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_e6b627a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
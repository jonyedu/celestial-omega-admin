(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/dashboard/ui/index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/dashboard/ui/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex_pathify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex-pathify */ "./node_modules/vuex-pathify/dist/vuex-pathify.esm.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Utilities


var lineSmooth = vue__WEBPACK_IMPORTED_MODULE_1___default.a.chartist.Interpolation.cardinal({
  tension: 0
});
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "DashboardView",
  data: function data() {
    return {
      charts: [],
      stats: []
    };
  },
  created: function created() {
    this.getDashboard();
  },
  methods: {
    getDashboard: function getDashboard() {
      var that = this;
      var url = "/dashboard/get-dashboard";
      axios.get(url).then(function (response) {
        that.stats = response.data.stats;
        that.charts = response.data.charts;
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/dashboard/ui/index.vue?vue&type=template&id=a00f1b90&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/modules/dashboard/ui/index.vue?vue&type=template&id=a00f1b90& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
function objectWithoutProperties(obj, exclude) {
  var target = {}
  for (var k in obj)
    if (
      Object.prototype.hasOwnProperty.call(obj, k) &&
      exclude.indexOf(k) === -1
    )
      target[k] = obj[k]
  return target
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { id: "dashboard-view", fluid: "", tag: "section" } },
    [
      _c(
        "v-row",
        [
          _c(
            "v-col",
            { attrs: { cols: "12" } },
            [
              _c(
                "v-row",
                _vm._l(_vm.charts, function(chart, i) {
                  return _c(
                    "v-col",
                    {
                      key: "chart-" + i,
                      attrs: { cols: "12", md: "6", lg: "4" }
                    },
                    [
                      _c("material-chart-card", {
                        attrs: {
                          color: chart.color,
                          data: chart.data,
                          options: chart.options,
                          "responsive-options": chart.responsiveOptions,
                          title: chart.title,
                          type: chart.type
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "subtitle",
                              fn: function() {
                                return [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "font-weight-light text--secondary"
                                    },
                                    [
                                      _c("div", {
                                        domProps: {
                                          innerHTML: _vm._s(chart.subtitle)
                                        }
                                      })
                                    ]
                                  )
                                ]
                              },
                              proxy: true
                            },
                            {
                              key: "actions",
                              fn: function() {
                                return [
                                  _c(
                                    "v-icon",
                                    {
                                      staticClass: "mr-1",
                                      attrs: { small: "" }
                                    },
                                    [_vm._v(" mdi-clock-outline ")]
                                  ),
                                  _vm._v(" "),
                                  _c("span", {
                                    staticClass:
                                      "text-caption grey--text font-weight-light",
                                    domProps: {
                                      textContent: _vm._s(chart.time)
                                    }
                                  })
                                ]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          true
                        )
                      })
                    ],
                    1
                  )
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.stats, function(ref, i) {
            var actionIcon = ref.actionIcon
            var actionText = ref.actionText
            var rest = objectWithoutProperties(ref, [
              "actionIcon",
              "actionText"
            ])
            var attrs = rest
            return _c(
              "v-col",
              { key: i, attrs: { cols: "12", md: "6", lg: "4" } },
              [
                _c(
                  "material-stat-card",
                  _vm._b(
                    {
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "actions",
                            fn: function() {
                              return [
                                _c("v-icon", {
                                  staticClass: "mr-2",
                                  attrs: { small: "" },
                                  domProps: { textContent: _vm._s(actionIcon) }
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "text-truncate" }, [
                                  _vm._v(
                                    "\n            " +
                                      _vm._s(actionText) +
                                      "\n          "
                                  )
                                ])
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        true
                      )
                    },
                    "material-stat-card",
                    attrs,
                    false
                  )
                )
              ],
              1
            )
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/modules/dashboard/ui/index.vue":
/*!*****************************************************!*\
  !*** ./resources/js/modules/dashboard/ui/index.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_a00f1b90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=a00f1b90& */ "./resources/js/modules/dashboard/ui/index.vue?vue&type=template&id=a00f1b90&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/modules/dashboard/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_a00f1b90___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_a00f1b90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/modules/dashboard/ui/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/modules/dashboard/ui/index.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/modules/dashboard/ui/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/dashboard/ui/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/modules/dashboard/ui/index.vue?vue&type=template&id=a00f1b90&":
/*!************************************************************************************!*\
  !*** ./resources/js/modules/dashboard/ui/index.vue?vue&type=template&id=a00f1b90& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_a00f1b90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=a00f1b90& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/modules/dashboard/ui/index.vue?vue&type=template&id=a00f1b90&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_a00f1b90___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_a00f1b90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#42A5F6",
                secondary: "#050B1F",
                accent: "#204165"
            },
            dark: {
                primary: "#50778D",
                secondary: "#0B1C3D",
                accent: "#204165"
            }
        }
    },
    icons: {
        iconfont: "mdi" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    }
};

export default new Vuetify(opts);

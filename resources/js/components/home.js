import Vue from 'vue';


Vue.component(
    "default-headers",
    require("@/layouts/home/components/Headers").default
);

Vue.component(
    "default-drawer",
    require("@/layouts/home/components/Drawer").default
);

Vue.component(
    "default-view",
    require("@/layouts/home/components/View").default
);

Vue.component(
    "default-footer",
    require("@/layouts/home/components/Footer").default
);

//Componentes Hijos para el headers
Vue.component(
    "default-drawer-toggle",
    require("@/components/home/DrawerToggle").default
);

Vue.component(
    "default-search",
    require("@/components/home/Search").default
);

Vue.component(
    "default-go-home",
    require("@/components/home/GoHome").default
);

Vue.component(
    "default-notifications",
    require("@/components/home/Notifications").default
);

Vue.component(
    "default-account",
    require("@/components/home/Account").default
);

//Componentes Hijos para el drawer
Vue.component(
    "default-drawer-header",
    require("@/components/home/DrawerHeader").default
);
Vue.component(
    "default-list",
    require("@/components/home/List").default
);
Vue.component(
    "default-list-group",
    require("@/components/home/ListGroup").default
);
Vue.component(
    "default-list-item",
    require("@/components/home/ListItem").default
);

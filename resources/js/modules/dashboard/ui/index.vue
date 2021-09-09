<template>
  <v-container id="dashboard-view" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="(chart, i) in charts"
            :key="`chart-${i}`"
            cols="12"
            md="6"
            lg="4"
          >
            <material-chart-card
              :color="chart.color"
              :data="chart.data"
              :options="chart.options"
              :responsive-options="chart.responsiveOptions"
              :title="chart.title"
              :type="chart.type"
            >
              <template #subtitle>
                <div class="font-weight-light text--secondary">
                  <div v-html="chart.subtitle" />
                </div>
              </template>

              <template #actions>
                <v-icon class="mr-1" small> mdi-clock-outline </v-icon>

                <span
                  class="text-caption grey--text font-weight-light"
                  v-text="chart.time"
                />
              </template>
            </material-chart-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        v-for="({ actionIcon, actionText, ...attrs }, i) in stats"
        :key="i"
        cols="12"
        md="6"
        lg="4"
      >
        <material-stat-card v-bind="attrs">
          <template #actions>
            <v-icon class="mr-2" small v-text="actionIcon" />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template>
        </material-stat-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import { get } from "vuex-pathify";
import Vue from "vue";

const lineSmooth = Vue.chartist.Interpolation.cardinal({
  tension: 0,
});

export default {
  name: "DashboardView",

  data: () => ({
    charts: [],
    stats: [],
  }),
  created() {
    this.getDashboard();
  },
  methods: {
    getDashboard() {
      let that = this;
      let url = "/dashboard/get-dashboard";
      axios
        .get(url)
        .then(function (response) {
          that.stats = response.data.stats;
          that.charts = response.data.charts;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

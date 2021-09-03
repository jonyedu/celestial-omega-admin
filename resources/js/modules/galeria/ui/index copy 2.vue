<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :options.sync="pagination"
      :server-items-length="totalDesserts"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.neo_reference_id }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.designation }}</td>
        <td class="text-xs-center">{{ props.item.nasa_jpl_url }}</td>
        <td class="text-xs-center">{{ props.item.absolute_magnitude_h }}</td>
        <td class="text-xs-center">
          {{ props.item.estimated_diameter.kilometers.estimated_diameter_min }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: "Galería",
  data() {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {},
      headers: [
        { text: "Neo Reference ID", value: "neo_reference_id" },
        { text: "Name", value: "name" },
        { text: "Designation", value: "designation" },
        { text: "Nasa jpl Url", value: "nasa_jpl_url" },
        { text: "Absolute Magnitude_h", value: "absolute_magnitude_h" },
        {
          text: "Estimated Diameter (KM min)",
          value: "estimated_diameter.kilometers.estimated_diameter_min",
        },
      ],
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then((data) => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.getDataFromApi().then((data) => {
      this.desserts = data.items;
      this.totalDesserts = data.total;
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        var local_pagination = this.pagination;
        var local_loading = this.loading;
        let items = this.getDesserts().then(function (items) {
          const total = items.length;

          if (local_pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy];
              const sortB = b[sortBy];

              if (descending) {
                if (sortA < sortB) return 1;
                if (sortA > sortB) return -1;
                return 0;
              } else {
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0;
              }
            });
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
          }

          setTimeout(() => {
            local_loading = false;
            resolve({
              items,
              total,
            });
          }, 1000);
        });
      });
    },
    getDesserts() {
      return axios
        .get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
        .then(function (response) {
          var result = response.data.near_earth_objects;
          return result;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
  },
};
</script>

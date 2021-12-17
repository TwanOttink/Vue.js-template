<template>
  <div class="text-center ma-2">
    <v-snackbar right :timeout="timeout" v-model="show" :color="color">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "notification",
  data() {
    return {
      show: false,
      message: "",
      color: "grey",
      timeout: 2000,
    };
  },
  mounted() {
    this.$root.$on("notify", (params) => {
      this.createNotification(params);
    });
  },
  methods: {
    createNotification(params) {
      if (params.message) {
        this.message = params.message;
      }
      if (params.color) {
        this.color = params.color;
      }
      this.show = true
    },
  },
};
</script>
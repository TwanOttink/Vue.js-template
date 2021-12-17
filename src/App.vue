<template>
  <v-app>
    <v-app-bar app color="primary">
      <img alt="TO logo"
           src="./assets/fox-logo.png"
           style="height: 50px"
      />

      <v-btn to="/" class="mr-2 ml-4  primary">
        <v-icon class="mr-2">mdi-home</v-icon>
        <span class="mr-2">Home</span>
      </v-btn>

      <v-btn to="/About" class="mr-2 ml-4  primary">
        <v-icon class="mr-2">mdi-information-outline</v-icon>
        <span class="mr-2">About</span>
      </v-btn>

      <div v-if="$store.state.isLoggedIn">
        <v-btn to="/Games" class="mr-2 ml-4  primary">
          <v-icon class="mr-2">mdi-gamepad-square-outline</v-icon>
          <span class="mr-2">Games</span>
        </v-btn>
        <v-btn to="/Users" class="mr-2 ml-4  primary">
          <v-icon class="mr-2">mdi-account-group</v-icon>
          <span class="mr-2">Users</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div v-if="!$store.state.isLoggedIn">
        <v-btn to="/Login" class="mr-2 ml-2  primary">
          <span class="mr-2">Login</span>
        </v-btn>
<!--        <v-btn to="/Register" class="mr-2 ml-2  orange">-->
<!--          <span class="mr-2">Register</span>-->
<!--        </v-btn>-->
      </div>
      <div v-if="$store.state.isLoggedIn">
        <v-btn class="mr-2 ml-2 red">
          {{ $store.state.user.name }}
        </v-btn>
        <v-btn class="mr-2 ml-2 orange" @click="logout">
          <span class="mr-2">Logout</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
      <snackbar />
    </v-main>
  </v-app>
</template>
<script>
import Snackbar from './components/Snackbar.vue';

export default {
  name: 'App',
  components: {
    Snackbar,
  },
mounted() {
    this.getUser()
},
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$root.$emit("notify", { message: 'Je bent uitgelogd', color: "warning"});
    },
    getUser() {
      this.$store.dispatch('getUser')
    }
  },

  data: () => ({
    //
  }),
};
</script>

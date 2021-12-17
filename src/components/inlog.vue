<template>
  <v-card class="mx-auto" style="width: 50%; margin: 5% 0 0 0;">
    <v-card-title class="text-h5 pb-5 lighten-2">
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
            label="E-mail"
            prepend-icon="mdi-account-circle"
            v-model="email"
        />
        <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="pw"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off' "
            @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <!-- <v-btn color="success">Register</v-btn> -->
      <v-btn color="info" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Inlog",

  data () {
    return {
      showPassword: false,
      email: '',
      pw: ''
    }
  },
  methods: {
    login() {
      // this.$refs.form.validate();

      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: this.email,
      //     password: this.pw
      //   })
      // };
      // fetch("http://127.0.0.1:8000/api/auth/login", requestOptions)
      //     .then(response => response.json())
      //     .then(data => {
      //       if(data.success === true){
      //         console.log("wat een loser");
      //         localStorage.setItem("token", data.user.access_token);
      //         localStorage.setItem("name", data.user.name);
      //         localStorage.setItem("email", data.user.email);
      //       }
      //       console.log(data);
      //       // if (data.user) {
      //       //   localStorage.setItem("token", data.user.access_token);
      //       //   this.$router.push('/');
      //       //   this.$store.commit('login', {email : data.user.email, name : data.user.name});
      //       // }
      //     });
      this.$store.dispatch("login", {
        email : this.email,
        password : this.pw,
      }).then((res) => {
        console.log(res)
        this.$root.$emit("notify", { message: 'Je bent ingelogd', color: "success"});
        this.$router.push('/');
      }).catch((err) => {
        console.log(err)
        this.$root.$emit("notify", { message: 'Je bent niet ingelogd', color: "error"});
      });
    }
  }
}
</script>

<style scoped>

</style>
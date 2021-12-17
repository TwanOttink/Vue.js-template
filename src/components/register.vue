<template>
  <v-card class="mx-auto" style="width: 50%; margin: 5% 0 0 0;">
    <v-card-title class="text-h5 pb-5 lighten-2">
      <h1>Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
            label="Username"
            prepend-icon="mdi-account-circle"
            v-model="name"
        />
        <v-text-field
            label="E-mail"
            prepend-icon="mdi-email"
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
        <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password Confirmation"
            v-model="pw_con"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off' "
            @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <!-- <v-btn color="success">Register</v-btn> -->
      <v-btn color="info" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Register",

  data () {
    return {
      showPassword: false,
      name: '',
      email: '',
      pw: '',
      pw_con: ''
    }
  },
  methods: {
    register() {
      // this.$refs.form.validate();

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.pw,
          password_confirmation: this.pw_con,
        })
      };
      fetch("http://127.0.0.1:8000/api/auth/signup", requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.success === true){
              // this.$store.commit('login', {email : data.data.email, name : data.data.name});
              // this.$router.push(this.$route.query.redirect || '/')
              console.log("Registreren is gelukt!");
              this.$router.push(this.$route.query.redirect || '/Login');
            }
            console.log(data);
          });
    }
  }
}
</script>

<style scoped>

</style>
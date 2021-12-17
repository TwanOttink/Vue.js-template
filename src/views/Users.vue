<template>
  <v-data-table
      :headers="headers"
      :items="users"
  >
    <template v-slot:item.created_at="{ item }">
      <span>{{ new Date(item.created_at).toLocaleString() }}</span>
    </template>
    <template v-slot:item.updated_at="{ item }">
      <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "Users",

  data() {
    return {
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Email', value: 'email'},
        {text: 'Email Verified', value: 'email_verified_at'},
        {text: 'Created at', value: 'created_at'},
        {text: 'Updated at', value: 'updated_at'}
      ],
      users: [],
    }
  },
  mounted: function () {
    let access_token = localStorage.getItem("token")
    axios.get('http://127.0.0.1:8000/api/users', {headers: {'Authorization': `Bearer ${access_token}`}})
        .then(response => {
          this.users = response.data
          console.log(this.users)
        })
        .catch(function (error) {
          console.log(error);
        })
  }
}
</script>

<style scoped>

</style>
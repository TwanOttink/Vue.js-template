<template>
  <v-data-table
      :headers="headers"
      :items="games"
  >
<!--    de code hieronder maakt van json datum een fatsoenlijke datum-->
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
  name: "Games",

  data() {
    return {
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Developer', value: 'developer'},
        {text: 'Publisher', value: 'publisher'},
        {text: 'Created at', value: 'created_at'},
        {text: 'Updated at', value: 'updated_at'}
      ],
      games: []
    }
  },
  mounted: function () {
    let access_token = localStorage.getItem("token")
    axios.get('http://127.0.0.1:8000/api/games', {headers: {'Authorization': `Bearer ${access_token}`}})
        .then(response => {
          this.games = response.data
          console.log(this.games)
        })
        .catch(function (error) {
          console.log(error);
        })
  }
}
</script>

<style scoped>

</style>
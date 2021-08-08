<template>
  <div class="container">
    <p v-if="$auth.loggedIn">
      Hello {{ $auth.user }}
      <img :src="$auth.user.avatar" alt="" />
	  <button @click="logout">thoast</button>
    </p>
    <p v-if="!$auth.loggedIn">
      Please sign in
    </p>
  </div>
</template>

<script>

export default {
  middleware: 'auth',
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push({ path: '/login' })
    }
	},
}
</script>
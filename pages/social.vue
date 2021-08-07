<template>
  <div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  
  auth: 'guest',

  async created() {
    if(this.$route.query.token)
      await this.$auth.strategy.token.set(this.$route.query.token)
    this.$router.push({ path: '/' })
  }
}
</script>
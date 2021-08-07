<template>
  <div>
    <div class="border-b my-10 flex justify-center">
      <div class="-m-3 block text-lg w-max bg-white">Đăng nhập bằng</div>
    </div>
    <div class="flex justify-between">
      <button
        class="flex-1 m-2 bg-blue-600 text-white px-5 py-3 hover:bg-blue-800"
        @click="facebook"
      >
        <font-awesome-icon :icon="['fab', 'facebook']" /> Facebook
      </button>

      <button
        class="flex-1 m-2 border text-black px-5 py-3 hover:bg-gray-100"
        @click="google"
      >
        <font-awesome-icon :icon="['fab', 'google']" /> Google
      </button>

      <!-- <button
        class="flex-1 m-2 bg-gray-600 text-white px-5 py-3 hover:bg-gray-800"
      >
        <font-awesome-icon :icon="['fab', 'github']" /> Github
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  components: true,
  methods: {
    loginWith() {
      this.$notify({
        type: 'success',
        duration: 5000,
        title: 'Đang đăng nhập vui lòng chờ trong giây lát',
      })
    },

    async facebook() {
      this.loginWith()
      const res = await this.$axios.$get('auth/facebook')
      window.location = res
    },

    async google() {
      this.loginWith()
      const res = await this.$axios.$get('auth/google')
      window.location = res
    },
  },
}
</script>
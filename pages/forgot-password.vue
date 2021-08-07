<template>
  <div class="h-screen">
    <div class="flex h-full w-full justify-center items-center">
      <div class="flex-0 border w-full w-full md:max-w-lg p-5">
        <div class="text-center">
          <NuxtLink to="/">
            <img src="/auth.png" class="inline" alt="" />
          </NuxtLink>
          <div class="text-2xl mt-5 mb-10 tracking-wider">QUÊN MẬT KHẨU</div>
        </div>

        <form>
          <div class="my-5">
            <input
              v-model="user.email"
              class="
                border
                px-4
                py-3
                block
                w-full
                rounded-md
                focus:outline-none
                focus:ring-2 focus:ring-blue-200
                focus:border-transparent
                shadow-md
                focus:shadow-none
              "
              type="email"
              placeholder="Nhập địa chỉ email"
              autocomplete="off"
            />
            <div
              v-if="user.email === '' && invalid"
              class="text-sx text-red-400 my-3 mx-2"
            >
              Vui lòng nhập địa chỉ email.
            </div>
          </div>

          <button
            type="submit"
            class="bg-blue-400 text-white text-xl p-3 w-full hover:bg-blue-600"
            @click.prevent="login"
          >
            QUÊN MẬT KHẨU
          </button>
        </form>
        <div class="flex justify-between items-center mt-4 text-blue-500">
          <NuxtLink to="/login"> Đăng nhập </NuxtLink>

          <NuxtLink to="/register"> Tạo tài khoản </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  auth: 'guest',

  data() {
    return {
      invalid: false,
      user: {
        email: '',
      },
      error: '',
    }
  },

  methods: {
    isValid(input) {
      for (const field in input) {
        if (input[field] === '') {
          this.invalid = true
          return false
        }
      }
      return true
    },

    async login() {
      if (this.isValid(this.user))
        try {
          const res = await this.$auth.login({ data: this.user })
          if (res.data.status) this.$router.push({ path: '/' })
          else
            this.$notify({
              type: 'warn',
              duration: 5000,
              title: 'Thông tin tài khoản hoặc mật khẩu không chính xác',
            })
        } catch (err) {
          this.error = ''

          for (const error in err.response.data.errors)
            this.error += err.response.data.errors[error]

          this.$notify({
            type: 'error',
            duration: 5000,
            title: this.error,
          })
        }
    },
  },
}
</script>

<template>
  <div class="h-screen">
    <div class="flex h-full w-full justify-center items-center">
      <div class="flex-0 border w-full w-full md:max-w-lg p-5">
        <div class="text-center">
          <NuxtLink to="/">
            <img src="/auth.png" class="inline" alt="" />
          </NuxtLink>
          <div class="text-2xl mt-5 mb-10 tracking-wider">TRANG ĐĂNG KÝ</div>
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

          <div class="my-5">
            <input
              v-model="user.name"
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
              placeholder="Nhập họ và tên"
              autocomplete="off"
            />
            <div
              v-if="user.name === '' && invalid"
              class="text-sx text-red-400 my-3 mx-2"
            >
              Vui lòng nhập họ và tên.
            </div>
          </div>

          <div class="my-5">
            <input
              v-model="user.password"
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
              type="password"
              placeholder="Nhập mật khẩu"
            />
            <div
              v-if="user.password === '' && invalid"
              class="text-sx text-red-400 my-3 mx-2"
            >
              Vui lòng nhập mật khẩu.
            </div>
          </div>

          <div class="my-5">
            <input
              v-model="user.password_confirmation"
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
              type="password"
              placeholder="Nhập lại mật khẩu"
              autocomplete="off"
            />
            <div
              v-if="user.password_confirmation === '' && invalid"
              class="text-sx text-red-400 my-3 mx-2"
            >
              Vui lòng nhập xác thực mật khẩu.
            </div>
          </div>

          <button
            type="submit"
            class="bg-blue-400 text-white text-xl p-3 w-full hover:bg-blue-600"
            @click.prevent="register"
          >
            ĐĂNG KÝ
          </button>
        </form>
        <div class="flex justify-end items-center mt-4">
          <span>
            Đã có tài khoản ?
            <NuxtLink to="/login" class="text-blue-500"> Đăng nhập </NuxtLink>
          </span>
        </div>
        <Social />
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
        name: '',
        password: '',
        password_confirmation: '',
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

    async register() {
      if (this.isValid(this.user))
        try {
          const res = await this.$axios.$post('register', this.user)
          if (res.status)
            this.$auth
              .login({ data: this.user })
              .then(() => this.$router.push({ path: '/' }))
        } catch (err) {
          this.error = ''

          for (const error in err.response.data.errors)
            this.error += err.response.data.errors[error] + '<br />'

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

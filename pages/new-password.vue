<template>
  <div class="h-screen">
    <div class="flex h-full w-full justify-center items-center">
      <div class="flex-0 border w-full w-full md:max-w-lg p-5">
        <div class="text-center">
          <NuxtLink to="/">
            <img src="/auth.png" class="inline" alt="" />
          </NuxtLink>
          <div class="text-2xl mt-5 mb-10 tracking-wider">ĐẶT MẬT KHẨU MỚI</div>
        </div>

        <form>
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
              placeholder="Nhập mật khẩu mới"
              autocomplete="off"
            />
            <div v-if="invalid" class="text-sx text-red-400 my-3 mx-2">
              <p v-if="user.password === ''">Vui lòng nhập mật khẩu mới.</p>
              <p v-if="user.password.length < 6">
                Mật khẩu mới phải chứa ít nhất 6 ký tự.
              </p>
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
              placeholder="Nhập lại mật khẩu mới"
              autocomplete="off"
            />
            <div v-if="invalid" class="text-sx text-red-400 my-3 mx-2">
              <p v-if="user.password_confirmation === ''">
                Vui lòng nhập mật khẩu mới.
              </p>
              <p v-if="user.password_confirmation.length < 6">
                Xác nhận mật khẩu mới phải chứa ít nhất 6 ký tự.
              </p>
              <p v-if="user.password_confirmation !== user.password">
                Xác nhân mật khẩu không trùng khớp với mật khẩu mới.
              </p>
            </div>
          </div>

          <button
            type="submit"
            class="bg-blue-400 text-white text-xl p-3 w-full hover:bg-blue-600"
            @click.prevent="new_password"
          >
            ĐẶT MẬT KHẨU
          </button>
        </form>
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
        password: '',
        password_confirmation: '',
      },
      error: '',
    }
  },

  created() {
    if (!this.$route.query.token) this.$router.push({ path: '/login' })
  },
  methods: {
    isValid(input) {
      for (const field in input) {
        if (input[field] === '' || input[field].length < 6) {
          this.invalid = true
          return false
        }
      }

      if (this.user.password !== this.user.password_confirmation) return false

      return true
    },

    async new_password() {
      if (this.isValid(this.user))
        try {
          if (this.$route.query.token) {
            await this.$auth.strategy.token.set(this.$route.query.token)
            await this.$auth.fetchUser()
            await this.$axios.$put(
              `user/${this.$auth.user.id}/new_password`,
              this.user
            )
            this.$notify({
              type: 'success',
              duration: 5000,
              title: 'Đặt mật khẩu thành công vui lòng nhớ mật khẩu của bạn',
            })

            this.$router.push({ path: '/' })
          }
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

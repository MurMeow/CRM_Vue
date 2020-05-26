<template>
  <div>
    <form class="card auth-card" @submit.prevent="SubmitHandler">
      <div class="card-content">

        <div class="card-titleWithSwitch">
          <span class="card-title">{{'HomeAccounting' | localize}}</span>

          <div class="switch">
            <label @click="updateLocale">
              English
              <input type="checkbox" v-model="isRuLocale">
              <span class="lever"></span>
              Русский
            </label>
          </div>
        </div>

        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small class="helper-text invalid"
                 v-if="$v.email.$dirty && !$v.email.required"
          >{{'EmailFieldMustNotBeEmpty' | localize}}</small>
          <small class="helper-text invalid"
                 v-else-if="$v.email.$dirty && !$v.email.email"
          >{{'EnterValidEmail' | localize}}</small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"

          >
          <label for="password">{{'Password' | localize}}</label>
          <small class="helper-text invalid"
                 v-if="$v.password.$dirty && !$v.password.required"
          >
            {{'EnterPassword' | localize}}
          </small>
          <small class="helper-text invalid"
                 v-else-if="$v.password.$dirty && !$v.password.minLength"
          >
            {{'PasswordMustBeAtLeast' | localize}} {{$v.password.$params.minLength.min}} {{'Symbols' | localize}} {{'NowHeIs' | localize}} {{password.length}}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            {{'SignIn' | localize}}
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          {{'NoAccount' | localize}}?
          <router-link to="/register">{{'SignUp' | localize}}</router-link>
        </p>
      </div>
    </form>

  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '../utils/messages'
import { mapActions } from 'vuex'

export default {
  name: 'login',
  metaInfo () {
    return {
      title: this.$title('Login')
    }
  },
  data: () => ({
    email: '',
    password: '',
    isRuLocale: localStorage.getItem('locale') === 'ru-RU' || localStorage.getItem('locale') === null
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    updateLocale () {
      this.isRuLocale ? localStorage.setItem('locale', 'en-US') : localStorage.setItem('locale', 'ru-RU')
    },
    ...mapActions(['updateInfo']),
    async SubmitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        await this.updateInfo({
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        await this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style>
  .card-titleWithSwitch {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

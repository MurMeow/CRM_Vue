<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
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
      <div class="input-field">
        <input
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          id="name"
          type="text"
          v-model.trim="name"
        >
        <label for="name">{{'Name' | localize}}</label>
        <small class="helper-text invalid"
               v-if="$v.name.$dirty && !$v.name.required"
        >
          {{'EnterYourName' | localize}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>{{'IAgreeWithTheRules' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{'SignUp' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'AlreadyHaveAnAccount' | localize}}?
        <router-link to="/login">{{'SignIn' | localize}}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo () {
    return {
      title: this.$title('Register')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
    isRuLocale: localStorage.getItem('locale') === 'ru-RU' || localStorage.getItem('locale') === null
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  mounted () {
  },
  methods: {
    updateLocale () {
      this.isRuLocale ? localStorage.setItem('locale', 'en-US') : localStorage.setItem('locale', 'ru-RU')
    },
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        locale: this.isRuLocale ? 'ru-RU' : 'en-US'
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
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

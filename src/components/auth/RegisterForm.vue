<template>
  <form @submit.prevent="handleRegister">
    <input type="name" v-model="name" placeholder="Nombre">
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Contraseña">
    <button type="submit">Registrarse</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const name = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

const handleRegister = async () => {
  error.value = null
  const success = await auth.register(name.value, email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Error al registrar el usuario'
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>

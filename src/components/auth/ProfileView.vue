<template>
  <h1>Perfil del Usuario</h1>
  <div class="profile-view" v-if="isAuthenticated">
    <div class="profile-data">
      <h1>Hola {{ user.name }}!</h1>
      <ul>
        <li>Email: {{ user.email }}</li>
        <li>ID: {{ user.id }}</li>
      </ul>
    </div>

    <h2>Actualizar Perfil</h2>
    <form @submit.prevent="handleUpdateProfile">
      <input
        type="text"
        v-model="name"
        placeholder="Nombre"
        class="input-field"
      >
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="input-field"
      >
      <input
        type="password"
        v-model="password"
        placeholder="Contraseña"
        class="input-field"
      >
      <button type="submit" class="update-btn">Actualizar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <router-link to="/investments" class="investments-link">
      Gestionar mis inversiones →
    </router-link>
  </div>

  <div v-else>
    <p>No estás autenticado. Por favor, inicia sesión.</p>
    <router-link to="/auth/login" class="login-link">Login</router-link>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const user = computed(() => auth.user);
const isAuthenticated = computed(() => auth.isAuthenticated);

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);

watch(user, (newUser) => {
  if (newUser) {
    name.value = newUser.name || '';
    email.value = newUser.email || '';
    password.value = '';
  }
}, { immediate: true });

const handleUpdateProfile = async () => {
  error.value = null;
  if (!user.value?.id) {
    error.value = 'Usuario no autenticado';
    return;
  }

  const updatedUser = {
    id: user.value.id,
    name: name.value,
    email: email.value,
    password: password.value || undefined,
  };

  const success = await auth.updateProfile(updatedUser);
  if (!success) error.value = 'Error al actualizar';
};
</script>

<style scoped>
.profile-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-data {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.investments-link {
  display: block;
  margin-top: 30px;
  color: #0d6efd;
  text-decoration: none;
  font-weight: 500;
}

.investments-link:hover {
  text-decoration: underline;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.update-btn {
  background: #0d6efd;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.update-btn:hover {
  background: #0b5ed7;
}

.error {
  color: red;
  margin-top: 10px;
}

.login-link {
  color: #0d6efd;
  text-decoration: underline;
  cursor: pointer;
}

.no-alerts {
  color: #6c757d;
  text-align: center;
  margin-top: 15px;
}
</style>

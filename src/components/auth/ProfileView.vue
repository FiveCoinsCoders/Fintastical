<template>
  <div class="profile-view" v-if="isAuthenticated">
    <div class="profile-container">
      <div class="profile-data">
        <p>Hello {{ user.name }}!</p>
        <ul>
  <li data-testid="user-email">{{ user.email }}</li>
  <li data-testid="user-id">User ID: {{ user.id }}</li>
</ul>

        <router-link to="/investments" class="investments-link">My investments</router-link>
      </div>
      <h2>Profile Update</h2>
      <form v-if="isAuthenticated" class="update-form" @submit.prevent="handleUpdateProfile">

        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" placeholder="Nombre" class="input-field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Email" class="input-field">
        <label for="password">Password</label>
        <div class="password-field">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" placeholder="Contraseña" class="input-field">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" @click="togglePasswordVisibility"></i>
        </div>
        <button type="submit" class="update-btn">Save Changes</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
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
const showPassword = ref(false);

watch(user, (newUser) => {
  if (newUser) {
    name.value = newUser.name || '';
    email.value = newUser.email || '';
    password.value = newUser.password || '';
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

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.profile-view {
  max-width: 35vw;
  margin: 5rem auto;

}

.profile-data {
  position: absolute;
  background: var(--purple-light);
  padding: 3rem;
  border-radius: 0px 20px 80px 0;
  margin-bottom: 30px;
  top: 140px;
  left: 0;
  height: 33rem;
  width: 23rem;
  box-shadow: -7px 8px 19px -3px var(--purple-gray);
}

.profile-data::before {
  content: '\f007';
  font-family: 'Font Awesome 5 Free';
  font-weight: 100;
  transform: translateX(-50%);
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: 0;
  left: 50%;
  font-size: 4rem;
  color: inherit;
  display: inline-flex;
  border-radius: 56%;
  border: 2px solid var(--purple-dark);
  width: 8rem;
  height: 8rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem ;
}

.profile-data p{
  font-size: 2rem;
}

.profile-data ul {
  margin: 2rem 0;
}

.profile-data ul li {
  font-family: "InstrumentSans", sans-serif;
  font-size: 1.3rem;
}

label{
  font-family: "Nunito", sans-serif;
  font-size: 1.2rem;
}
.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ced4da;
  border-radius: 1.5rem;
}

.password-field {
  position: relative;
}

.password-field .input-field {
  padding-right: 40px;
}

.password-field i {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--purple-dark);
}

.update-form {
  margin: 4rem 0;
}

.update-btn {
  background-color: var(--purple-dark);
  color: var(--purple-light);
  padding: 1rem 2rem;
  border-radius: 5rem;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
  width: 100%;
  margin: 3rem 0;
}

.update-btn:hover {
  background-color:var(--purple);
  color: var(--purple-light);
}

.error {
  color: red;
  margin-top: 10px;
}

.investments-link {
  display: block;
  margin-top: 30px;
  background-color: var(--purple-light);
  color: var(--purple);
  border: 2px solid var(--purple);
  padding: 1rem 2rem;
  border-radius: 1rem 1rem 5rem 0;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.investments-link:hover {
  background-color: var(--purple);
  color: var(--purple-light);

  border: 2px solid var(--purple);
  transform: scale(1.1);
}

.no-alerts {
  color: #6c757d;
  text-align: center;
  margin-top: 15px;
}

</style>

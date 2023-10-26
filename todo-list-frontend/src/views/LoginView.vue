<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input
        v-model="user.email"
        type="text"
        placeholder="Seu email"
        class="input-field"
      >
      <input
        v-model="user.password"
        type="password"
        placeholder="Sua senha"
        class="input-field"
      >
      <button type="submit" class="login-button">
        Login
      </button>
      <router-link to="/signup" class="signup-link">Cadastro</router-link>
    </form>

    <!-- Mensagem de erro -->
    <p v-if="loginError" class="error-message">{{ loginError }}</p>
  </div>
</template>

<script setup>
import http from '@/services/http.js';
import {reactive, ref} from 'vue';
import {useAuth} from '@/stores/auth.js';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

const user = reactive({
  email: 'joaoVictor@gmail.com',
  password: 'Teste@12345*'
});

const loginError = ref(null);

async function login() {
  try {
    loginError.value = null; // Limpe qualquer mensagem de erro anterior

    const { data } = await http.post('auth/login', user);
    console.log('Resposta do servidor:', data);
    auth.setToken(data.token);
    auth.setUser(data.user);
    router.push({ name: 'dashboard' });
  } catch (error) {
    console.log(error?.response?.data);
    loginError.value = 'Credenciais de login inválidas. Por favor, tente novamente.';
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.signup-link {
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.error-message {
  color: #ff0000;
  font-weight: bold;
  margin-top: 10px;
}
</style>

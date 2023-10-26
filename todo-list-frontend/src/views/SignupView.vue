<template>
  <div class="registration-page">
    <div class="registration-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="register">
      <div class="input-group">
        <label for="name">Seu nome:</label>
        <input v-model="user.name" type="text" id="name" class="input-field" required>
      </div>
      <div class="input-group">
        <label for="email">Seu email:</label>
        <input v-model="user.email" type="text" id="email" class="input-field" required>
      </div>
      <div class="input-group">
        <label for="password">Sua senha:</label>
        <input v-model="user.password" type="password" id="password" class="input-field" required>
      </div>
      <div class="input-group">
        <label for="cpf">Seu CPF:</label>
        <input v-model="user.cpf" type="text" id="cpf" class="input-field" required>
      </div>
      <div class="input-group">
        <label for="phone">Seu telefone:</label>
        <input v-model="user.phone" type="text" id="phone" class="input-field" required>
      </div>
      <button type="submit" class="register-button">Cadastrar</button>
    </form>

    <VerificationPopup
      v-if="showVerificationPopup"
      @verify="verifySMSCode"
      @cancel="closeVerificationPopup"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import VerificationPopup from "@/components/VerificationPopup.vue";
import http from '@/services/http.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const errorMessage = ref('');

const user = ref({
  name: 'João Victor Martins Silva Fernandes',
  email: 'joaoVictor@gmail.com',
  password: 'Teste@12345*',
  cpf: '126.601.746-10',
  phone: '+5531997042924'
});

const showVerificationPopup = ref(false);

const openVerificationPopup = () => {
  showVerificationPopup.value = true;
};

const verifySMSCode = async (verificationCode) => {
  try {
    const response = await http.post('auth/verify', { email: user.value.email, code: verificationCode });
    if (response.data === true) {
      showVerificationPopup.value = false;
      router.push({ name: 'login' });
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};

const closeVerificationPopup = () => {
  showVerificationPopup.value = false;
};

const register = async () => {
  try {
    const { data } = await http.post('auth/singup', user.value);
    console.log('Resposta do servidor:', data);
    openVerificationPopup();
  } catch (error) {
    errorMessage.value = 'Erro ao cadastrar. Por favor, verifique seus dados e tente novamente.';
    console.log(error?.response?.data);
  }
};
</script>

<style scoped>
.registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.registration-container {
  width: 400px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
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

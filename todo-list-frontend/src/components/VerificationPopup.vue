<template>
  <div class="popup-overlay">
    <div class="popup-content">
      <h2>Verificação por SMS</h2>
      <p>Insira o código SMS enviado para o seu telefone.</p>
      <input v-model="verificationCode" type="text" placeholder="Código de Verificação" class="input-field" required>
      <button @click="verifyCode" class="verify-button">Verificar</button>
      <button @click="cancel" class="cancel-button">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      verificationCode: '',
    };
  },
  methods: {
    verifyCode() {
      this.$emit('verify', this.verificationCode);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Garante que a largura inclui preenchimento e borda */
}

.verify-button,
.cancel-button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.verify-button {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s;
}

.verify-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #999;
}
</style>

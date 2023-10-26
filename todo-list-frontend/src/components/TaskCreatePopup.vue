<template>
    <div class="task-create-popup">
      <h2>Criar Nova Tarefa</h2>
      <form @submit.prevent="createTask">
        <div class="input-group">
          <label for="name">Nome da Tarefa:</label>
          <input v-model="newTask.name" type="text" id="name" required>
        </div>
        <div class="input-group">
          <label for="description">Descrição:</label>
          <textarea v-model="newTask.description" id="description" required></textarea>
        </div>
        <div class="input-group">
          <label for="category">Categoria:</label>
          <input v-model="newTask.category" type="text" id="category" required>
        </div>
        <div class="button-group">
          <button type="submit" class="create-button">Criar Tarefa</button>
          <button @click="cancel" class="cancel-button">Cancelar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTask: {
          name: '',
          description: '',
          category: '',
        },
      };
    },
    methods: {
      createTask() {
        this.$emit('save', this.newTask);
        this.clearForm();
      },
      cancel() {
        this.$emit('cancel');
        this.clearForm();
      },
      clearForm() {
        this.newTask.name = '';
        this.newTask.description = '';
        this.newTask.category = '';
      },
    },
  };
  </script>
  
  
  <style scoped>

.create-butto{
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #0056b3;
}
.task-create-popup {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.input-group {
  margin-right: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
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

  
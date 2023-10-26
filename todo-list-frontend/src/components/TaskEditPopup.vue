<template>
  <div class="task-edit-popup">
    <h2>Editar Tarefa</h2>
    <form @submit.prevent="saveTask">
      <label for="edited-name">Nome:</label>
      <input id="edited-name" v-model="editedTask.name" class="input-field">

      <label for="edited-description">Descrição:</label>
      <textarea id="edited-description" v-model="editedTask.description" class="textarea-field"></textarea>

      <div class="button-group">
        <button type="submit" class="save-button">Salvar</button>
        <button @click="cancelEdit" class="cancel-button">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      editedTask: { ...this.task },
    };
  },
  watch: {
    task: {
      handler(newTask) {
        this.editedTask.name = newTask.name;
        this.editedTask.description = newTask.description;
      },
      deep: true,
    },
  },
  methods: {
    saveTask() {
      this.$emit('save', this.editedTask);
      this.$emit('cancel');
    },
    cancelEdit() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.button-group {
  width: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.task-edit-popup {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-top: 10px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.save-button,
.cancel-button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s;
}

.save-button:hover {
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

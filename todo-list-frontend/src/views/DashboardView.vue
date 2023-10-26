<template>
  <div class="container">
    <h1>Lista de Tarefas</h1>

    <button @click="openAddTaskPopup" class="add-task-button">Adicionar Tarefa</button>

    <table class="task-table">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Remove</th> <!-- Adicionando a coluna "Remove" -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" class="task-item">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.category.name }}</td>
          <td>
            <button
              @click="toggleTaskStatus(task)"
              :class="[task.status ? 'completed' : 'todo']">
              {{ task.status ? "completed" : "Todo" }}
            </button>
            </td>
          <td>
            <button @click="openEditPopup(task)">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
          </td>
          <td>
            <button @click="deleteTask(task.id)">
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Página Anterior</button>
      <span>Página {{ currentPage }}</span>
      <button @click="nextPage" :disabled="tasks.length < itemsPerPage">Próxima Página</button>
    </div>
  </div>
  <div v-if="showEditPopup" class="popup-overlay">
    <task-edit :task="editedTask" @save="saveEditedTask" @cancel="cancelEditTask" />
  </div>
  <div v-if="showAddTaskPopup" class="popup-overlay">
    <task-create @save="createTask" @cancel="cancelAddTask" />
  </div>
</template>


<script>
import TaskEdit from '@/components/TaskEditPopup.vue';
import TaskCreate from '@/components/TaskCreatePopup.vue';
import { useAuth } from '@/stores/auth.js';
import http from '@/services/http.js';

export default {
  components: {
    'task-edit': TaskEdit,
    'task-create': TaskCreate,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      tasks: [],
      showEditPopup: false,
      editedTask: null,
      showAddTaskPopup: false,
    };
  },
  methods: {
    async createTask(newTask) {
      try {
        const auth = useAuth();
        const token = auth.token.token
        console.log(newTask);

        const data = {
          userId: auth.user.id,
          name: newTask.name,
          description: newTask.description,
          category: newTask.category,
        };
        const response = await http.post('task/create', data, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        if (this.tasks.length < this.itemsPerPage) {
          this.tasks.push(response.data);
          this.showAddTaskPopup = false;
        }
        this.showAddTaskPopup = false;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTasks() {
      try {
        const auth = useAuth();
        const token = auth.token.token;
        
        const response = await http.get(`task/findTasks/${this.currentPage}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(taskId) {
      try {
        const auth = useAuth();
        const token = auth.token.token;
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);

          await http.delete(`task/delete/${taskId}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
          this.fetchTasks(this.currentPage);
        }
      } catch (error) {
        console.error(error);
      }
    },

    openEditPopup(task) {
      this.editedTask = { ...task };
      this.showEditPopup = true;
    },

    async saveEditedTask(editedTask) {
    try {
      const auth = useAuth();
      const token = auth.token.token;
      const data = {
        name: editedTask.name,
        description: editedTask.description,
      };
      await http.put(`task/update/${editedTask.id}`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      this.showEditPopup = false;
      this.fetchTasks(this.currentPage);
    } catch (error) {
      console.error(error);
    }
    },

    async updateTaskStatus(task) {
    try {
      const auth = useAuth();
      const token = auth.token.token;
      const updatedTask = { ...task };

      await http.patch(`task/changeStatus/${updatedTask.id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      this.fetchTasks(this.currentPage);
    } catch (error) {
      console.error(error);
    }
  },

  async toggleTaskStatus(task) {
      task.status = !task.status; 
      await this.updateTaskStatus(task); 
    },

  openAddTaskPopup() {
      this.showAddTaskPopup = true;
    },
    
  cancelAddTask() {
    this.showAddTaskPopup = false;
  },
  cancelEditTask() {
    this.showEditPopup = false;
  },

  cancelEdit() {
    this.showEditPopup = false;
  },
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchTasks(this.currentPage);
    }
  },
  nextPage() {
    this.currentPage++;
    this.fetchTasks(this.currentPage);
  },
  },
  created() {
    this.fetchTasks(this.currentPage);
  },
};
</script>
<style>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .task-table {
    width: 100%;
    border-collapse: collapse;
  }

  .task-table th,
  .task-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    vertical-align: middle;
  }

  .task-table th {
    background-color: #f2f2f2;
  }

  .task-table th:nth-child(1) {
    width: 25%;
  }

  .task-table th:nth-child(2) {
    width: 20%;
  }

  .task-table th:nth-child(3),
  .task-table th:nth-child(4),
  .task-table th:nth-child(5) {
    width: 15%;
  }

  .task-table .task-item {
    background-color: #fff;
  }

  .task-table .task-item:nth-child(even) {
    background-color: #f2f2f2;
  }

  .task-table input[type="checkbox"] {
    transform: scale(1.5);
  }

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

  .popup-overlay form {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 400px;
    padding: 20px;
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

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    margin: 0 10px;
  }

  .add-task-button {
  margin-left: auto;
  margin-bottom: 20px;
  }

  .completed {
    background-color: #4caf50;
    color: #ffffff;
  }
</style>


<template>
  <div>
    <header class="header">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li v-if="!auth.isAuthenticated">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      </li>
    </ul>
    <template v-if="auth.isAuthenticated">
      <p>Olá {{ auth.userName }}</p>
      <button @click="logout">Logout</button>
    </template>
  </header>
  <router-view />
  </div>
</template>

<script setup>
import { useAuth } from '@/stores/auth.js';

const auth = useAuth();

function logout() {
  auth.clear();
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;

    li {
      font-size: 16px;
    }

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    font-size: 16px;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

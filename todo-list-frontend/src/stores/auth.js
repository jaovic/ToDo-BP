import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import http from '@/services/http.js'
import { useRouter } from 'vue-router';

export const useAuth = defineStore('auth', () => {
  const token = ref(JSON.parse(localStorage.getItem('token')))
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const router = useRouter();

  function setToken(tokenValue) {
    localStorage.setItem('token', JSON.stringify(tokenValue))
    token.value = tokenValue
  }
  function setUser(userValue) {
    localStorage.setItem('user', JSON.stringify(userValue))
    user.value = userValue
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value
  })

  const userName = computed(() => {
    if (user.value) {
      return user.value.name
    }
    return ''
  })

  async function checkToken() {
    try {
      const tokenAuth = 'bearer ' + token.value.token
      const { data } = await http.get('auth/verifyToken', {
        headers: {
          Authorization: tokenAuth
        }
      })

      return data
    } catch (error) {
      console.log(error.response.data)
    }
  }

  function clear() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = ''
    user.value = ''

    router.push({ name: 'home' });
  }
  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    isAuthenticated,
    userName,
    clear,

  }
})

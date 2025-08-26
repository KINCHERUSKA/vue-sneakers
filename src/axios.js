import axios from 'axios'

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: 'https://localhost:7018',
  withCredentials: true, // Для работы с куками
})

// Получаем токен из хранилища
const getToken = () => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
}

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Обрабатываем ответы и обновление токена
api.interceptors.response.use(
  (response) => {
    // Проверяем наличие нового access токена
    const newAccessToken = response.headers['x-new-access-token']

    if (newAccessToken) {
      console.log('🔄 Получен новый access токен')

      // Определяем, где хранить токен
      const storage = localStorage.getItem('accessToken') ? localStorage : sessionStorage

      // Сохраняем новый токен
      storage.setItem('accessToken', newAccessToken)

      // Обновляем заголовок для будущих запросов
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
    }

    return response
  },
  (error) => {
    // Обработка ошибок авторизации
    if (error.response?.status === 401) {
      console.log('❌ Сессия завершена: очищаем токены')

      // Очищаем хранилище
      localStorage.removeItem('accessToken')
      sessionStorage.removeItem('accessToken')

      // Удаляем заголовок авторизации
      delete api.defaults.headers.common['Authorization']

      // Перенаправляем на страницу входа (если не находимся там уже)
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error)
  },
)

export default api

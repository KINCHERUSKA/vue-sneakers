import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      items: [],
      card: [],
      newItems: [],
      popularItems: [],
      favorites: [],
      isLogged: false,
    }
  },
  mutations: {
    setLog(state, status) {
      state.isLogged = status
    },
    setItems(state, items) {
      state.items = items
    },

    // Главная страница
    setNewItems(state, items) {
      state.newItems = items
    },
    setPopularItems(state, item) {
      state.popularItems = item
    },

    //Закладки
    updateItem(state, { id, updates }) {
      const item = state.items.find((item) => item.id === id)
      if (item) {
        Object.assign(item, updates)
      }

      // Также обновляем в newItems/popularItems если нужно
      state.newItems = state.newItems.map((i) => (i.id === id ? { ...i, ...updates } : i))
      state.popularItems = state.popularItems.map((i) => (i.id === id ? { ...i, ...updates } : i))
    },

    setFavorites(state, favorites) {
      state.favorites = favorites

      const favIds = new Set(favorites.map((fav) => fav.parentId))
      state.items = state.items.map((item) => ({
        ...item,
        isFavorite: favIds.has(item.id),
        favoriteId: favorites.find((f) => f.parentId === item.id)?.id || null,
      }))
    },

    addToFavorites(state, { favoriteId, productId }) {
      state.favorites.push({ id: favoriteId, parentId: productId })
    },

    // Удаление из закладок
    removeFromFavorites(state, favoriteId) {
      state.favorites = state.favorites.filter((item) => item.id !== favoriteId)
    },

    //Корзина
    setCard(state, cardItems) {
      state.card = cardItems

      const prdIdIsIn = new Set(cardItems.map((item) => item.parentId))
      state.items = state.items.map((item) => ({
        ...item,
        isAdded: prdIdIsIn.has(item.id),
      }))
    },

    addToCard(state, { orderId, productId }) {
      state.card.push({ id: orderId, parentId: productId })
    },

    removeFromCard(state, orderId) {
      state.card = state.card.filter((item) => item.id !== orderId)
    },
  },
  actions: {
    // Проверка пользователя
    /*     async tokenChek({ commit }) {
      try {
      } catch (err){
        console.log('Ощибка авторизации')
      }
    }, */

    //получение поп товаров
    async fetchPopular({ commit }) {
      try {
        const { data } = await axios.get(`https://localhost:7018/featuredProducts/popular?limit=4`)
        commit('setPopularItems', data)
      } catch (err) {
        console.log('Ошибка при загрузке данных:', err)
      }
    },

    //получение новинок
    async fetchNew({ commit }) {
      try {
        const { data } = await axios.get(
          `https://localhost:7018/featuredProducts/new?limit=4&days=30`,
        )
        commit('setNewItems', data)
      } catch (err) {
        console.log('Ошибка при загрузке данных:', err)
      }
    },

    //Получение данных
    async fetchItems({ commit }) {
      try {
        const { data } = await axios.get('https://e0c9bc90f123d6dd.mokky.dev/sale')
        const items = data.map((obj) => ({
          ...obj,
          isFavorite: false,
          favoriteId: null,
          isAdded: false,
        }))
        commit('setItems', items)
      } catch (err) {
        console.log('Ошибка при загрузке данных:', err)
      }
    },

    //Работа с закладками
    async fetchFavorites({ commit }) {
      try {
        const { data } = await axios.get('https://e0c9bc90f123d6dd.mokky.dev/favorites')
        commit('setFavorites', data)
      } catch (err) {
        console.error('Ошибка при загрузке избранного:', err)
      }
    },

    async addToFavorite({ commit, state }, item) {
      try {
        const existingFavorite = state.favorites.find((fav) => fav.parentId === item.id)

        if (!existingFavorite) {
          // Добавляем в закладки
          const { data } = await axios.post('https://e0c9bc90f123d6dd.mokky.dev/favorites', {
            parentId: item.id,
          })
          commit('addToFavorites', {
            favoriteId: data.id,
            productId: item.id,
          })
          commit('updateItem', {
            id: item.id,
            updates: {
              isFavorite: true,
              favoriteId: data.id,
            },
          })
        } else {
          // Удаляем из закладок
          await axios.delete(`https://e0c9bc90f123d6dd.mokky.dev/favorites/${existingFavorite.id}`)
          commit('removeFromFavorites', existingFavorite.id)
          commit('updateItem', {
            id: item.id,
            updates: {
              isFavorite: false,
              favoriteId: null,
            },
          })
        }
      } catch (err) {
        console.error('Ошибка при работе с избранным:', err)
      }
    },

    //Работа с корзиной
    async fetchCard({ commit }) {
      try {
        const { data } = await axios.get('https://e0c9bc90f123d6dd.mokky.dev/orders')
        commit('setCard', data)
      } catch (err) {
        console.error('Ошибка при загрузке корзины:', err)
      }
    },

    async addToCard({ commit, state }, item) {
      try {
        const existingOrder = state.card.find((order) => order.parentId === item.id)
        if (!existingOrder) {
          const { data } = await axios.post('https://e0c9bc90f123d6dd.mokky.dev/orders', {
            parentId: item.id,
          })
          commit('addToCard', {
            orderId: data.id,
            productId: item.id,
          })
          commit('updateItem', {
            id: item.id,
            updates: { isAdded: true },
          })
        } else {
          await axios.delete(`https://e0c9bc90f123d6dd.mokky.dev/orders/${existingOrder.id}`)
          commit('removeFromCard', existingOrder.id)
          commit('updateItem', {
            id: item.id,
            updates: { isAdded: false },
          })
        }
      } catch (err) {
        console.error('Ошибка при работе с избранным:', err)
      }
    },
  },
})

/* function getRandomItems(array, count) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
} */

export default store

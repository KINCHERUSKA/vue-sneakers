import { createStore } from 'vuex'
import api from '@/axios'

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
    },

    addToFavorites(state, item) {
      state.favorites.push(item)
    },

    // Удаление из закладок
    removeFromFavorites(state, favoriteId) {
      state.favorites = state.favorites.filter((item) => item.id !== favoriteId)
    },

    //Корзина
    setCard(state, cardItems) {
      state.card = cardItems

      /*       const prdIdIsIn = new Set(cardItems.map((item) => item.parentId))
      state.items = state.items.map((item) => ({
        ...item,
        isAdded: prdIdIsIn.has(item.id),
      })) */
    },

    addToCard(state, item) {
      state.card.push(item)
    },

    removeFromCard(state, orderId) {
      state.card = state.card.filter((item) => item.id !== orderId)
    },
  },
  actions: {
    // Проверка пользователя
    async tokenChek({ commit }) {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')

        if (!token) {
          commit('setLog', false)
          return
        }

        await api.get('/auth/test-login') // ✅ Используем api
        commit('setLog', true)
      } catch (err) {
        if (err.response) {
          const status = err.response.status
          const data = err.response.data

          if (status === 401) {
            commit('setLog', false)
          }
        }
      }
    },

    //получение поп товаров
    async fetchPopular({ commit }) {
      try {
        // ✅ Используем api вместо axios
        const { data } = await api.get('/featuredProducts/popular?limit=4')
        commit('setPopularItems', data)
      } catch (err) {
        console.log('Ошибка при загрузке данных:', err)
      }
    },

    //получение новинок
    async fetchNew({ commit }) {
      try {
        // ✅ Используем api вместо axios
        const { data } = await api.get('/featuredProducts/new?limit=4&days=30')
        commit('setNewItems', data)
      } catch (err) {
        console.log('Ошибка при загрузке данных:', err)
      }
    },

    //Получение данных

    //Работа с закладками
    async fetchFavorites({ commit }) {
      try {
        const { data } = await api.get('/favoriteProducts')
        commit('setFavorites', data)
        console.log(data)
      } catch (err) {
        console.error('Ошибка при загрузке избранного:', err)
      }
    },

    async addToFavorite({ commit, state }, item) {
      try {
        if (!item.isFavirite) {
          const { data } = await api.post(
            `https://localhost:7018/favoriteProducts?productId=${item.id}`,
          )
          commit('addToFavorites', {
            item: item,
          })
          commit('updateItem', {
            id: item.id,
            updates: {
              isFavirite: true,
            },
          })
        } else {
          // Удаляем из закладок
          await api.delete(`/favoriteProducts/${item.id}`)
          commit('removeFromFavorites', item.id)
          commit('updateItem', {
            id: item.id,
            updates: {
              isFavirite: false,
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
        const { data } = await api.get('https://localhost:7018/cart')
        commit('setCard', data)
      } catch (err) {
        console.error('Ошибка при загрузке корзины:', err)
      }
    },

    async addToCard({ commit, state }, item, quantity) {
      try {
        if (!item.isAdded) {
          if (quantity === null) {
            quantity = 1
          }
          const { data } = await api.post(
            `https://localhost:7018/cart?productId=${item.id}&quantity=${quantity}`,
          )
          commit('addToCard', {
            item: item,
          })
          commit('updateItem', {
            id: item.id,
            updates: { isAdded: true },
          })
        } else {
          // Удаляем из закладок
          await api.delete(`https://localhost:7018/cart/${item.id}`)
          commit('removeFromCard', item.id)
          commit('updateItem', {
            id: item.id,
            updates: {
              isFavirite: false,
            },
          })
        }
      } catch (err) {
        console.error('Ошибка при работе с избранным:', err)
      }

      try {
        const existingOrder = state.card.find((order) => order.parentId === item.id)
        if (!existingOrder) {
          const { data } = await axios.post('https://e0c9bc90f123d6dd.mokky.dev/orders', {
            parentId: item.id,
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

export default store

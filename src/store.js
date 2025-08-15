import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      items: [],
      card: [],
      newItems: [],
      popularItems: [],
    }
  },
  mutations: {
    setItems(state, items) {
      state.items = items
    },
    setNewItems(state, items) {
      state.newItems = items
    },
    setPopularItems(state, items) {
      state.popularItems = items
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
      state.items = state.items.map((item) => {
        const favorite = favorites.find((f) => f.parentId === item.id)
        return {
          ...item,
          isFavorite: !!favorite,
          favoriteId: favorite?.id || null,
        }
      })
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

    async fetchHomePage({ commit }) {
      commit('setNewItems', getRandomItems(this.state.items, 4))
      commit('setPopularItems', getRandomItems(this.state.items, 4))
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

    async addToFavorite({ commit }, item) {
      try {
        if (!item.isFavorite) {
          const { data } = await axios.post('https://e0c9bc90f123d6dd.mokky.dev/favorites', {
            parentId: item.id,
          })
          commit('updateItem', {
            id: item.id,
            updates: {
              isFavorite: true,
              favoriteId: data.id,
            },
          })
        } else {
          await axios.delete(`https://e0c9bc90f123d6dd.mokky.dev/favorites/${item.favoriteId}`)
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

function getRandomItems(array, count) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

export default store

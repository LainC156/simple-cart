require('./bootstrap')

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: require('./routes.js')
})

const store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        orders: {}
    },
    mutations: {
        updateProducts(state, products) {
            state.products = products
            console.log('init products: ', state.products)
        },
        addToCart(state, product) {
            let productInCartIndex = state.cart.findIndex(
                item => item.slug === product.slug
            )
            if (productInCartIndex !== -1) {
                state.cart[productInCartIndex].quantity++
                return;
            }

            product.quantity = 1;
            state.cart.push(product)
        },
        removeFromCart(state, index) {
            state.cart.splice(index, 1)
        },
        updateOrder(state, order) {
            state.order = order
        },
        updateCart(state, cart) {
            state.cart = cart
        }
    },
    actions: {
        getCategories({ commit }) {
            axios.get('/api/products')
                .then((response) => {
                    console.log('data: ', response.data)
                    commit('updateProducts', response.data)
                })
                .catch((error) => console.error(error))
        },
        clearCart({ commit }) {
            commit('updateCart', [])
        }
    }
})

const app = new Vue({
    router,
    store,
    el: "#app",
    created() {
        store.dispatch('getCategories')
            .then(_ => { })
            .catch((error) => console.log(error))
    }
})
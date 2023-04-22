import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    currentAuth: false,
    currentMail: null,
    currentUser: null,
    currentCartLength: 0,
    currentCart: null,
    currentName: null,
    currentLastName: null,
    currentToken: null,
    currentFilterMenu: null,
    currentWishList: null,
  },
  plugins: [createPersistedState()],
  mutations: {
    setCurrentWishList(state, wishList) {
      state.currentWishList = wishList;
    },
    setCurrentCart(state, cart) {
      state.currentCart = cart;
    },
    setCurrentFilterMenu(state, filterMenu) {
      state.currentFilterMenu = filterMenu;
    },
    setCurrentMail(state, mail) {
      state.currentMail = mail;
    },
    setCurrentAuth(state, auth) {
      state.currentAuth = auth;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setCurrentCartLength(state, cartLength) {
      state.currentCartLength = cartLength;
    },
    setCurrentName(state, name) {
      state.currentName = name;
    },
    setCurrentLastName(state, lastName) {
      state.currentLastName = lastName;
    },
    setCurrentToken(state, token) {
      state.currentToken = token;
    },
    logout(state) {
      state.currentAuth = null;
    },
  },
});

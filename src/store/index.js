import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    currentAuth: false,
    currentMail: null,
    currentUser: null,
    currentCartLength: 0,
    currentName: null,
    currentLastName: null,
  },
  plugins: [createPersistedState()],
  mutations: {
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
    logout(state) {
      state.currentAuth = null;
    },
  },
});

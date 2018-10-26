import * as firebase from 'firebase';

export default {
  state: {
    user: null
  },

  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      const registeredMeetups = state.user.registeredMeetups;
      if (registeredMeetups.findIndex(meetupId => meetupId === id) >= 0) {
        return;
      }

      registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },

    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;

      registeredMeetups.splice(
        registeredMeetups.findIndex(meetupId => meetupId === payload),
        1
      );

      Reflect.deleteProperty(state.user.fbKeys, payload);
    },

    setUser(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      firebase
        .database()
        .ref(`/users/${getters.user.id}`)
        .child('/registrations')
        .push(payload)
        .then(data => {
          commit('registerUserForMeetup', { id: payload, fbKey: data.key });
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
    },

    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }

      const fbKey = user.fbKeys[payload];

      firebase
        .database()
        .ref(`/users/${user.id}/registrations`)
        .child(fbKey)
        .remove()
        .then(() => {
          commit('unregisterUserFromMeetup', payload);
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
    },

    signUpUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };

          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },

    signInUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };

          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.error(error);
        });
    },

    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      });
    },

    fetchUserData({ commit, getters }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref(`/users/${getters.user.id}/registrations/`)
        .once('value')
        .then(data => {
          const values = data.val();
          let registeredMeetups = [];
          let fbKeys = {};
          for (let key in values) {
            if (values.hasOwnProperty(key)) {
              registeredMeetups.push(values[key]);
              fbKeys[values[key]] = key;
            }
          }

          const user = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: fbKeys
          };

          commit('setUser', user);
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          console.error(error);
        });
    },

    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    }
  },

  getters: {
    user(state) {
      return state.user;
    }
  }
};

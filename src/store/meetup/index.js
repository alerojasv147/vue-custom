import * as firebase from 'firebase';

export default {
  state: {
    loadedMeetups: []
  },

  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },

    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },

    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(
        meetup => meetup.id === payload.id
      );

      if (payload.title) {
        meetup.title = payload.title;
      }

      if (payload.description) {
        meetup.description = payload.description;
      }

      if (payload.date) {
        meetup.date = payload.date;
      }
    }
  },

  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              meetups.push({
                id: key,
                title: obj[key].title,
                location: obj[key].location,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                date: obj[key].date,
                creatorId: obj[key].creatorId
              });
            }
          }

          commit('setLoadedMeetups', meetups);
          commit('setLoading', false);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },

    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      };

      let imageUrl = '';
      let key = '';

      // Reach out to firebase and store it
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase
            .storage()
            .ref(`meetups/${key}.${ext}`)
            .put(payload.image);
        })
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then(downloadUrl => {
          imageUrl = downloadUrl;
          return firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imageUrl: downloadUrl });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
          });
        })
        .catch(error => console.log(error));
    },

    updateMeetup({ commit }, payload) {
      commit('setLoading', true);

      const meetup = {};

      if (payload.title) {
        meetup.title = payload.title;
      }

      if (payload.description) {
        meetup.description = payload.description;
      }

      if (payload.date) {
        meetup.date = payload.date;
      }

      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(meetup)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetup', payload);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
    }
  },

  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },

    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },

    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => meetup.id === meetupId);
      };
    }
  }
};

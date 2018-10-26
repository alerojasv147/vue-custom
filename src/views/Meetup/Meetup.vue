<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
        >
        </v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>

            <template v-if="userIsCreator">
              <v-spacer></v-spacer>

              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>

          <v-card-media
              :src="meetup.imageUrl"
              height="400px"
          >
          </v-card-media>

          <v-card-text>
            <div class="info--text">{{ meetup.date }} - {{ meetup.location }}</div>

            <template v-if="userIsCreator">
              <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>

              <app-edit-meetup-time-dialog :meetup="meetup"></app-edit-meetup-time-dialog>
            </template>

            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>

          <v-card-actions v-if="userIsAuthenticated && !userIsCreator">
            <v-spacer></v-spacer>
            <app-register-dialog :meetup-id="meetup.id"></app-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Meetup',

  props: ['id'],

  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id) || {};
    },

    userIsAuthenticated() {
      return !!this.$store.getters.user;
    },

    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }

      return this.$store.getters.user.id === this.meetup.creatorId;
    },

    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
</style>

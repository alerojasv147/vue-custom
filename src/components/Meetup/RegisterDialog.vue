<template>
  <v-dialog
      persistent
      max-width="350px"
      v-model="registerDialog"
  >
    <v-btn slot="activator" color="accent">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline">
              {{ userIsRegistered ? 'Unregister from Meetup?' : 'Register for Meetup?'  }}
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  color="red darken-1"
                  flat
                  @click="registerDialog = false"
              >
                Cancel
              </v-btn>

              <v-btn
                  color="green darken-1"
                  flat
                  @click="onConfirm"
              >
                Confirm
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RegisterDialog',

  props: ['meetupId'],

  data() {
    return {
      registerDialog: false
    };
  },

  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(
          meetupId => meetupId === this.meetupId
        ) >= 0
      );
    }
  },

  methods: {
    onConfirm() {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId);
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId);
      }
    }
  }
};
</script>

<style scoped>
</style>

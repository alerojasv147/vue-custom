<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/new" class="info" >Organize Meetups</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
              v-for="meetup in meetups"
              :key="meetup.id"
              :src="meetup.imageUrl"
              @click="onLoadMeetup(meetup.id)"
          >
            <v-layout align-end justify-center row fill-height>
              <div class="title">
                {{ meetup.title }}
              </div>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },

    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push(`/meetups/${id}`);
    }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 2em;
  color: white;
  padding: 8px;
}
</style>

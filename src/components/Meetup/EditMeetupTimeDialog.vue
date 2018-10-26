<template>
  <v-dialog
      persistent
      max-width="350px"
      v-model="editDialog"
  >
    <v-btn
        slot="activator"
        color="accent"
    >
      Edit Time
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline">Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions>
              <template>
                <v-spacer></v-spacer>

                <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="editDialog = false"
                >
                  Close
                </v-btn>

                <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="onSaveChanges"
                >
                  Save
                </v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditMeetupTimeDialog',

  props: ['meetup'],

  data() {
    return {
      editDialog: false,
      editableTime: null,
      date: null
    };
  },

  methods: {
    onSaveChanges() {
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: `${this.date} - ${this.editableTime}`
      });
    }
  },

  created() {
    this.editableTime = this.meetup.date.slice(
      this.meetup.date.lastIndexOf('-') + 2
    );

    this.date = this.meetup.date.slice(0, this.meetup.date.lastIndexOf(' - '));
  }
};
</script>

<style scoped>
</style>

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
      Edit Date
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline">Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
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
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditMeetupDateDialog',

  props: ['meetup'],

  data() {
    return {
      editDialog: false,
      editableDate: null,
      time: null
    };
  },

  methods: {
    onSaveChanges() {
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        date: `${this.editableDate} - ${this.time}`
      });
    }
  },

  created() {
    this.editableDate = this.meetup.date.slice(
      0,
      this.meetup.date.lastIndexOf(' - ')
    );

    this.time = this.meetup.date.slice(this.meetup.date.lastIndexOf('-') + 2);
  }
};
</script>

<style scoped>
</style>

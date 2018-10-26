<template>
  <v-dialog
      persistent
      max-width="350px"
      v-model="editDialog"
  >
    <v-btn
        fab
        slot="activator"
        color="accent"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline">Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                  id="title"
                  name="title"
                  label="Title"
                  v-model="editableTitle"
                  required
              >
              </v-text-field>

              <v-text-field
                  id="description"
                  name="description"
                  label="Description"
                  v-model="editableDescription"
                  multi-line
                  rows="5"
                  required
              >
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  flat
                  @click="editDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  flat
                  @click="onSaveChanges"
              >
                Save
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
  name: 'EditMeetupDetailsDialog',

  props: ['meetup'],

  data() {
    return {
      editDialog: false,
      editableTitle: this.meetup.title,
      editableDescription: this.meetup.description
    };
  },

  methods: {
    onSaveChanges() {
      if (!this.editableTitle.trim() || !this.editableDescription.trim()) {
        return;
      }

      this.editDialog = false;
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        title: this.editableTitle,
        description: this.editableDescription
      });
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a new Meetup</h2>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                  id="title"
                  name="title"
                  label="Title"
                  v-model="title"
                  required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                  id="location"
                  name="location"
                  label="Location"
                  v-model="location"
                  required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                  raised
                  class="primary"
                  @click="onPickFile"
              >
                Upload Image
              </v-btn>
              <input
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                  hidden
              />
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                  id="description"
                  name="description"
                  label="Description"
                  v-model="description"
                  multi-line
                  rows="5"
                  required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h3>Choose a Date & Time</h3>
            </v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-menu
                  ref="menuDate"
                  :close-on-content-click="false"
                  v-model="menuDate"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
              >
                <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                ></v-text-field>
                <v-date-picker v-model="date" @input="$refs.menuDate.save(date)"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-menu
                  ref="menuTime"
                  :close-on-content-click="false"
                  v-model="menuTime"
                  :nudge-right="40"
                  :return-value.sync="time"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
              >
                <v-text-field
                    slot="activator"
                    v-model="time"
                    label="Time"
                    prepend-icon="mdi-clock-outline"
                    readonly
                ></v-text-field>
                <v-time-picker
                    v-if="menuTime"
                    v-model="time"
                    full-width
                    @change="$refs.menuTime.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                  class="primary"
                  type="submit"
                  :disabled="!formIsValid"
              >
                Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CreateMeetup',
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: null,
      time: null,
      menuDate: false,
      menuTime: false,
      image: null
    };
  },

  computed: {
    formIsValid() {
      return (
        !!this.title && !!this.location && !!this.imageUrl && !!this.description
      );
    }
  },

  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }

      if (!this.image) {
        return;
      }

      const newMeetup = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: `${this.date} - ${this.time}`
      };
      this.$store.dispatch('createMeetup', newMeetup);
      this.$router.push('/meetups');
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename && filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file');
      }

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

<style scoped>
</style>

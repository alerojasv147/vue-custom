<template>
  <v-progress-linear
      v-model="progress"
      :active="loading"
  ></v-progress-linear>
</template>

<script>
export default {
  name: 'Loading',

  data() {
    return {
      progress: 0
    };
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },

  watch: {
    loading: function(newValue) {
      if (newValue) {
        console.log('loading in progress');
        this.progress = 0;
        while (this.progress < 99) {
          this.progress++;
        }
      } else {
        console.log('loading finished');
        this.progress = 100;
      }
    }
  }
};
</script>

<style scoped>
</style>

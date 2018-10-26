<template>
  <v-alert
      type="error"
      @input="onClose"
      :value="true"
      dismissible
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',

  props: ['text'],

  methods: {
    onClose() {
      this.$emit('dismissed');
    }
  }
};
</script>

<style scoped>
</style>

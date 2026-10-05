<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Aktivitas</h2>
      </div>
      <div class="card-body">
        <table id="datatablesActivities"></table>
      </div>
    </div>
  </div>
</template>

<script>
import activityComponent from '../../../api/component/activityComponent.js'; // sesuaikan dengan path file activityComponent.js

export default {
  components: {},
  setup() {
    return activityComponent.setup();
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>

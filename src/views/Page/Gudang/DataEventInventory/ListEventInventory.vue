<template>
    <div class="container-xl px-4 mt-n10">
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h2>Event List</h2>
        </div>
        <div class="card-body">
          <table id="datatablesSimpleEvent"></table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import InventoryDataEventComponent from '../../../../api/component/InventoryDataEventComponent'; // Adjust path accordingly
  
  export default {
    setup() {
    const {
        events
    } = InventoryDataEventComponent.setup();

    return {
        events
    };
  },
  };
  </script>
  
<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Inventory</h2>
        <button class="btn btn-primary" @click="addDataTransfer">Tambah Data</button>
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>

    <!-- Modal for Adding Inventory -->
    <div class="modal fade" id="inventoryModal" tabindex="-1" aria-labelledby="inventoryModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="inventoryModalLabel">Add Inventory</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createInventoryHandler(currentInventory)">
              <div class="mb-3">
                <label for="inventoryStatus" class="form-label">Status</label>
                <select class="form-control" id="inventoryStatus" v-model="currentInventory.status" required>
                  <option disabled value="">Please select one</option>
                  <option value="from warehouse">From Warehouse</option>
                  <option value="to warehouse">To Warehouse</option>
                  <option value="event to event">Event to Event</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="orderIdFrom" class="form-label">Order ID From</label>
                <multiselect
                  v-model="currentInventory.order_id_from"
                  :options="orders"
                  :disabled="currentInventory.status === 'from warehouse'"
                  :custom-label="(option) => option.order_name"
                  placeholder="Select an order"
                  track-by="uuid"
                  label="order_name"
                ></multiselect>
              </div>
              <div class="mb-3">
                <label for="orderIdTo" class="form-label">Order ID To</label>
                <multiselect
                  v-model="currentInventory.order_id_to"
                  :options="orders"
                  :disabled="currentInventory.status === 'to warehouse'"
                  :custom-label="(option) => option.order_name"
                  placeholder="Select an order"
                  track-by="uuid"
                  label="order_name"
                ></multiselect>
              </div>
              <div class="mb-3">
                <label for="note" class="form-label">Note</label>
                <textarea class="form-control" id="note" v-model="currentInventory.note"></textarea>
              </div>
              <div v-for="(item, index) in currentInventory.items" :key="index" class="row mb-1">
                <div class="col-6">
                  <label class="form-label">Item ID</label>
                  <select class="form-control" v-model="item.item_id" required>
                    <option value="" disabled selected>Pilih item</option>
                    <option v-for="inventory in inventoryList" :key="inventory.uuid" :value="inventory.uuid">
                      {{ inventory.name }}
                    </option>
                  </select>
                </div>
                <div class="col-4">
                  <label class="form-label">Quantity</label>
                  <input type="number" class="form-control" v-model="item.quantity" required />
                </div>
                <div class="col-2 d-flex align-items-end">
                  <button
                    type="button"
                    class="btn btn-danger mx-3 fw-bold"
                    style="font-size: 30px; height: 40px; width: 40px"
                    @click="removeItem(index)"
                    v-if="currentInventory.items.length > 1"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary mx-3"
                    style="font-size: 30px; height: 40px; width: 40px"
                    @click="addItem"
                  >
                    +
                  </button>
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Request Inventory -->
    <div class="modal fade" id="requestModal" tabindex="-1" aria-labelledby="requestModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="requestModalLabel">Request Inventory</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleRequest">
              <div v-for="(item, index) in requestItems" :key="index" class="row mb-1">
                <div class="col-6">
                  <label class="form-label">Item ID</label>
                  <select class="form-control" v-model="item.item_id" required>
                    <option value="" disabled selected>Pilih item</option>
                    <option v-for="inventory in inventoryList" :key="inventory.uuid" :value="inventory.uuid">
                      {{ inventory.name }}
                    </option>
                  </select>
                </div>
                <div class="col-4">
                  <label class="form-label">Quantity</label>
                  <input type="number" class="form-control" v-model="item.quantity" required />
                </div>
                <div class="col-2 d-flex align-items-end">
                  <button
                    type="button"
                    class="btn btn-danger mx-3 fw-bold"
                    style="font-size: 30px; height: 40px; width: 40px"
                    @click="removeRequestItem(index)"
                    v-if="requestItems.length > 1"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary mx-3"
                    style="font-size: 30px; height: 40px; width: 40px"
                    @click="addRequestItem"
                  >
                    +
                  </button>
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import InventoryTransferEventComponent from '../../../../api/component/InventoryTransferEventComponent';

export default {
  components: {
    Multiselect,
  },
  setup() {
    const {
      addDataTransfer,
      orders,
      inventories,
      events,
      inventoryList,
      currentInventory,
      createInventoryHandler,
      addItem,
      removeItem,
      deleteInventoryHandler, // Ensure delete handler is included
      requestItems,
      addRequestItem,
      removeRequestItem,
      handleRequest,
    } = InventoryTransferEventComponent.setup();

    return {
      addDataTransfer,
      inventories,
      orders,
      events,
      inventoryList,
      currentInventory,
      createInventoryHandler,
      addItem,
      removeItem,
      deleteInventoryHandler, // Ensure delete handler is returned
      requestItems,
      addRequestItem,
      removeRequestItem,
      handleRequest,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>

<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Inventory</h2>
        <button class="btn btn-primary" @click="openAddModal">Add Inventory</button>
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>

    <!-- Modal for Adding Inventory -->
    <div
      class="modal fade"
      id="addInventoryModal"
      tabindex="-1"
      aria-labelledby="addInventoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addInventoryModalLabel">Add Inventory</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addInventoryHandler">
              <div v-for="(item, index) in newInventoryItems" :key="index" class="row mb-1">
                <div class="col-4">
                  <label class="form-label">Inventory Name</label>
                  <input type="text" class="form-control" v-model="item.name" required />
                </div>
                <div class="col-3">
                  <label class="form-label">Quantity</label>
                  <input type="number" class="form-control" v-model="item.quantity" required />
                </div>
                <div class="col-3">
                  <label class="form-label">Status</label>
                  <select class="form-control" v-model="item.status" required>
                    <option value="" disabled selected>Pilih status</option>
                    <option value="available">Available</option>
                    <option value="depleted">Depleted</option>
                  </select>
                </div>
                <div class="col-2 d-flex align-items-end">
                  <button
                    type="button"
                    class="btn btn-danger mx-3 fw-bold"
                    style="font-size: 30px; height: 40px; width: 40px"
                    @click="removeNewInventoryItem(index)"
                    v-if="newInventoryItems.length > 1"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary mx-3"
                    style="font-size: 30px; height: 40px; width: 40px"
                    @click="addNewInventoryItem"
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

    <!-- Modal for Editing Inventory -->
    <div
      class="modal fade"
      id="editInventoryModal"
      tabindex="-1"
      aria-labelledby="editInventoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editInventoryModalLabel">Edit Inventory</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateInventoryHandler">
              <div class="row mb-1">
                <div class="col-4">
                  <label class="form-label">Inventory Name</label>
                  <input type="text" class="form-control" v-model="currentInventory.name" required />
                </div>
                <div class="col-3">
                  <label class="form-label">Quantity</label>
                  <input type="number" class="form-control" v-model="currentInventory.quantity" required />
                </div>
                <div class="col-3">
                  <label class="form-label">Status</label>
                  <select class="form-control" v-model="currentInventory.status" required>
                    <option value="" disabled selected>Pilih status</option>
                    <option value="available">Available</option>
                    <option value="depleted">Depleted</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryDataComponent from '../../../../api/component/InventoryDataComponent'; // Adjust the path to your InventoryDataComponent file

export default {
  components: {},
  setup() {
    const {
      newInventoryItems,
      currentInventory,
      openAddModal,
      openEditModal,
      addNewInventoryItem,
      removeNewInventoryItem,
      addInventoryHandler,
      updateInventoryHandler,
    } = InventoryDataComponent.setup();

    return {
      newInventoryItems,
      currentInventory,
      openAddModal,
      openEditModal,
      addNewInventoryItem,
      removeNewInventoryItem,
      addInventoryHandler,
      updateInventoryHandler,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>

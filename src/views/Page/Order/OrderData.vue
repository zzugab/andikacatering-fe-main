<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Order</h2>

        <div class="d-flex align-items-center gap-2">
          <select
            class="form-select"
            style="width: 150px;"
            v-model="selectedMonth"
          >
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >
              {{ month }}
            </option>
          </select>

          <input
            type="number"
            class="form-control"
            style="width: 120px;"
            v-model="selectedYear"
            placeholder="Tahun"
            min="2000"
            max="2100"
          />

          <button
            type="button"
            class="btn btn-primary"
            @click="filterOrders"
          >
            Tampilkan
          </button>

          <router-link
            class="btn btn-primary"
            :class="{ active: $route.path.startsWith('/app/order') }"
            to="/app/order/addOrder"
          >
            Tambah Order
          </router-link>
        </div>
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>

    <!-- Modal for Adding/Editing Order -->
    <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="orderModalLabel">
              {{ currentOrder && currentOrder.uuid ? "Edit Order" : "Add Order" }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="currentOrder && currentOrder.uuid ? updateOrderHandler(currentOrder.uuid, currentOrder) : createOrderHandler(currentOrder)">
              <div class="mb-3">
                <label for="orderName" class="form-label">Name</label>
                <input type="text" class="form-control" id="orderName" v-model="currentOrder.order_name" required />
              </div>
              <div class="mb-3">
                <label for="orderDate" class="form-label">Date</label>
                <input type="date" class="form-control" id="orderDate" v-model="currentOrder.event_date" required />
              </div>
              <div class="mb-3">
                <label for="orderStatus" class="form-label">Status</label>
                <input type="text" class="form-control" id="orderStatus" v-model="currentOrder.status" required />
              </div>
              <div class="mb-3">
                <label for="orderCustomer" class="form-label">Customer</label>
                <input type="text" class="form-control" id="orderCustomer" v-model="currentOrder.customer.name" required />
              </div>
              <button type="submit" class="btn btn-primary">
                {{ currentOrder && currentOrder.uuid ? "Update" : "Add" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderComponent from '../../../api/component/orderComponent.js';

export default {
  components: {},
  setup() {
    return orderComponent.setup();
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
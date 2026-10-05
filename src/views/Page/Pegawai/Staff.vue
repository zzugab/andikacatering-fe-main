<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Staff</h2>
        <button class="btn btn-primary" @click="openAddModal">Tambah Data</button>
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>

    <!-- Modal for Adding/Editing Staff -->
    <div class="modal fade" id="staffModal" tabindex="-1" aria-labelledby="staffModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staffModalLabel">
              {{ currentStaff && currentStaff.uuid ? 'Edit Staff' : 'Tambah Staff' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form
              @submit.prevent="
                currentStaff && currentStaff.uuid
                  ? updateStaffHandler(currentStaff.uuid, currentStaff)
                  : createStaffHandler(currentStaff)
              "
            >
              <div class="mb-3">
                <label for="staffName" class="form-label">Nama</label>
                <input type="text" class="form-control" id="staffName" v-model="currentStaff.name" required />
              </div>
              <div class="mb-3">
                <label for="staffPhoneNumber" class="form-label">Nomor Telepon</label>
                <input
                  type="text"
                  class="form-control"
                  id="staffPhoneNumber"
                  v-model="currentStaff.phone_number"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                {{ currentStaff && currentStaff.uuid ? 'Update' : 'Tambah' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import staffComponent from '../../../api/component/staffComponent'; // sesuaikan dengan path file staffComponent.js

export default {
  components: {},
  setup() {
    return staffComponent.setup();
  },
};
</script>
<style scoped>
/* Add custom styles here if needed */
</style>

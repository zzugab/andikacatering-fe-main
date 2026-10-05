<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Pegawai</h2>
        <button class="btn btn-primary" @click="openAddModal">Tambah Data</button>
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>

    <!-- Modal for Adding Employee -->
    <div
      class="modal fade"
      id="addEmployeeModal"
      tabindex="-1"
      aria-labelledby="addEmployeeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addEmployeeModalLabel">Tambah Pegawai</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createEmployeeHandler(currentEmployee)">
              <div class="mb-3">
                <label for="addEmployeeName" class="form-label">Nama</label>
                <input type="text" class="form-control" id="addEmployeeName" v-model="currentEmployee.name" required />
              </div>
              <div class="mb-3">
                <label for="addEmployeeUsername" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="addEmployeeUsername"
                  v-model="currentEmployee.username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="addEmployeeEmail" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="addEmployeeEmail"
                  v-model="currentEmployee.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="addEmployeePassword" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="addEmployeePassword"
                  v-model="currentEmployee.password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="addEmployeeRole" class="form-label">Role</label>
                <select class="form-control" id="addEmployeeRole" v-model="currentEmployee.role_id" required>
                  <option disabled value="" selected>Pilih Role</option>
                  <option v-for="role in roles" :key="role.uuid" :value="role.uuid">
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="addEmployeePhoneNumber" class="form-label">Nomor Telepon</label>
                <input
                  type="text"
                  class="form-control"
                  id="addEmployeePhoneNumber"
                  v-model="currentEmployee.phone_number"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Tambah</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Editing Employee -->
    <div
      class="modal fade"
      id="editEmployeeModal"
      tabindex="-1"
      aria-labelledby="editEmployeeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editEmployeeModalLabel">Edit Pegawai</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateEmployeeHandler(currentEmployee.uuid, currentEmployee)">
              <div class="mb-3">
                <label for="editEmployeeName" class="form-label">Nama</label>
                <input type="text" class="form-control" id="editEmployeeName" v-model="currentEmployee.name" required />
              </div>
              <div class="mb-3">
                <label for="editEmployeeUsername" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="editEmployeeUsername"
                  v-model="currentEmployee.username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editEmployeeEmail" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="editEmployeeEmail"
                  v-model="currentEmployee.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="editEmployeeRole" class="form-label">Role</label>
                <select class="form-control" id="editEmployeeRole" v-model="currentEmployee.role_id" required>
                  <option disabled value="" selected>Pilih Role</option>
                  <option v-for="role in roles" :key="role.uuid" :value="role.uuid">
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editEmployeePhoneNumber" class="form-label">Nomor Telepon</label>
                <input
                  type="text"
                  class="form-control"
                  id="editEmployeePhoneNumber"
                  v-model="currentEmployee.phone_number"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Changing Password -->
    <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="passwordModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updatePasswordHandler">
              <div class="mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  v-model="currentPassword"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import employeeComponent from '../../../api/component/employeeComponent.js'; // sesuaikan dengan path file employeeComponent.js

export default {
  components: {},
  setup() {
    return employeeComponent.setup();
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>

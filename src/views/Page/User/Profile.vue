<template>
  <div class="nav-fixed">
    <NavbarDashboard />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <main>
          <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-2">
            <div class="container-xl px-4">
              <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto mt-4">
                    <h1 class="page-header-title">
                      <div class="page-header-icon">
                        <i data-feather="activity"></i>
                      </div>
                      User Profile
                    </h1>
                    <div class="page-header-subtitle">Manage your profile information and settings</div>
                  </div>
                </div>

              </div>
            </div>
          </header>
          <div class="row px-5 py-3">
            <div class="col-lg-8">
              <div class="card border-0 shadow-sm">
                <!-- Profile Content -->
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-12">
                      <!-- Status Badge -->
                      <div class="mb-4">
                        <span :class="['badge', user.is_active ? 'bg-success' : 'bg-danger']">
                          {{ user.is_active ? 'Active' : 'Inactive' }}
                        </span>
                      </div>

                      <!-- User Details -->
                      <div class="user-details">

                        <div class="mb-3 p-3 bg-light rounded-3">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-person-badge fs-4 me-3"></i>
                            <div>
                              <small class="text-muted d-block">Username</small>
                              <strong>{{ user.name }}</strong>
                            </div>
                          </div>
                        </div>
                        <div class="mb-3 p-3 bg-light rounded-3">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-person-badge fs-4 me-3"></i>
                            <div>
                              <small class="text-muted d-block">Username</small>
                              <strong>{{ user.username }}</strong>
                            </div>
                          </div>
                        </div>

                        <div class="mb-3 p-3 bg-light rounded-3">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-person-badge fs-4 me-3"></i>
                            <div>
                              <small class="text-muted d-block">Role</small>
                              <strong>{{ user.role?.name }}</strong>
                            </div>
                          </div>
                        </div>

                        <div class="mb-3 p-3 bg-light rounded-3">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-envelope fs-4 me-3"></i>
                            <div>
                              <small class="text-muted d-block">Email</small>
                              <strong>{{ user.email }}</strong>
                            </div>
                          </div>
                        </div>

                        <div class="mb-3 p-3 bg-light rounded-3">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-telephone fs-4 me-3"></i>
                            <div>
                              <small class="text-muted d-block">Phone</small>
                              <strong>{{ user.phone_number }}</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Action Buttons -->
                      <div class="mt-4 d-flex justify-content-end">
                        <button @click="showEditModal" class="btn btn-primary d-flex align-items-center">
                          <i class="bi bi-pencil-square me-2"></i>
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
        <footer class="footer-admin mt-auto footer-light">
          <div class="container-xl px-4">
            <div class="row">
              <div class="col-md-6 small">Copyright &copy; Your Website 2021</div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Privacy Policy</a>
                &middot;
                <a href="#!">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>

  <!-- Edit Profile Modal -->
  <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProfile">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="user.name" required />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="user.username" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email" required />
            </div>
            <div class="mb-3">
              <label for="phone_number" class="form-label">Phone</label>
              <input type="text" class="form-control" id="phone_number" v-model="user.phone_number" required />
            </div>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../Components/Sidebar.vue';
import NavbarDashboard from '../../Components/NavbarDasboard.vue';
import userInfoComponent from '../../../api/component/userInfoComponent';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js';

export default {
  components: {
    Sidebar,
    NavbarDashboard,
  },
  name: 'UserProfile',
  setup() {
    const { user, fetchUserInfo, handleUpdateProfile } = userInfoComponent.setup();

    return {
      user,
      fetchUserInfo,
      handleUpdateProfile,
    };
  },
  methods: {
    showEditModal() {
      const modal = new bootstrap.Modal(document.getElementById('editProfileModal'));
      modal.show();
    },
    async updateProfile() {
      await this.handleUpdateProfile();
      const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
      modal.hide();
    },
  },
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css');
@import url('https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css');
@import url('../../../assets/css/styles.css');
</style>

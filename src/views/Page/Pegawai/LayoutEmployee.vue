<template>
  <div class="nav-fixed">
    <NavbarDashboard />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <main>
          <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div class="container-xl px-4">
              <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto mt-4">
                    <h1 class="page-header-title">
                      <div class="page-header-icon">
                        <i data-feather="activity"></i>
                      </div>
                      Data Karyawan
                    </h1>
                    <div class="page-header-subtitle">Example dashboard overview and content summary</div>
                  </div>
                </div>
              </div>
              <div>
                <ul class="nav nav-pills bg-white rounded">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'staff',
                        'text-white': activeTab === 'staff',
                        'text-dark': activeTab !== 'staff',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'staff'"
                    >
                      Data Staff
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'employee',
                        'text-white': activeTab === 'employee',
                        'text-dark': activeTab !== 'employee',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'employee'"
                      v-if="userRole === 'Superadmin'"
                    >
                      Data Karyawan
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{
                        active: activeTab === 'activity',
                        'text-white': activeTab === 'activity',
                        'text-dark': activeTab !== 'activity',
                      }"
                      href="#"
                      @click.prevent="activeTab = 'activity'"
                      v-if="userRole === 'Superadmin'"
                    >
                      Data Aktivitas
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="tab-content mt-3">
            <div v-if="activeTab === 'employee' && userRole === 'Superadmin'">
              <Employee />
            </div>
            <div v-if="activeTab === 'staff'">
              <Staff />
            </div>
            <div v-if="activeTab === 'activity' && userRole === 'Superadmin'">
              <Activities />
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
</template>

<script>
import { getUserRole } from '../../../api/services/userInfoService';
import Employee from './Employee.vue';
import Staff from './Staff.vue';
import Activities from './Activities.vue';
import Sidebar from '../../Components/Sidebar.vue';
import NavbarDashboard from '../../Components/NavbarDasboard.vue';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js';

export default {
  components: {
    Sidebar,
    NavbarDashboard,
    Employee,
    Staff,
    Activities,
  },
  data() {
    return {
      activeTab: 'employee',
      userRole: null, // Tambahkan properti untuk menyimpan informasi akun
    };
  },
  async created() {
    try {
      // Panggil getuserRole untuk mendapatkan informasi akun
      const response = await getUserRole();
      this.userRole = response;

      // Tentukan tab aktif berdasarkan role
      if (this.userRole === 'Superadmin') {
        if (this.$route.name === 'Employee') {
          this.activeTab = 'employee';
        } else {
          this.activeTab = 'attendance';
        }
      } else {
        this.activeTab = 'staff';
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  },
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css');
@import url('https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css');
@import url('../../../assets/css/styles.css');
</style>

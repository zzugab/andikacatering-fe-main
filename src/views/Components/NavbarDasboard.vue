<!-- File: src/components/NavbarDashboard.vue -->
<template>
  <nav class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
    id="sidenavAccordion">
    <!-- Navbar Brand-->
    <!-- * * Tip * * You can use text or an image for your navbar brand.-->
    <!-- * * * * * * When using an image, we recommend the SVG format.-->
    <!-- * * * * * * Dimensions: Maximum height: 32px, maximum width: 240px-->
    <img src="../../assets/img/andika.svg" class="ps-3" style="height: 50%;" alt="Logo-andika" srcset="">
    <a class="navbar-brand pe-3 ps-4 ps-lg-2" href="/app/dashboard">Cloud Catering</a>
    <!-- Navbar Search Input-->
    <!-- * * Note: * * Visible only on and above the lg breakpoint-->
    <!-- Sidenav Toggle Button-->
    <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle">
      <i data-feather="menu"></i>
    </button>

    <!-- Navbar Items-->
    <ul class="navbar-nav align-items-center ms-auto">
      <!-- User Dropdown-->
      <li class="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
        <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage"
          href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false"><img class="img-fluid"
            src="../../assets/assets/img/illustrations/profiles/profile-1.png" /></a>
        <div class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
          aria-labelledby="navbarDropdownUserImage">
          <h6 class="dropdown-header d-flex align-items-center">
            <img class="dropdown-user-img" src="../../assets/assets/img/illustrations/profiles/profile-1.png" />
            <div class="dropdown-user-details">
              <div class="dropdown-user-details-name">{{ userName }}</div>
              <div class="dropdown-user-details-email">{{ userRole }}</div>
            </div>
          </h6>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/app/user/profile">
            <div class="dropdown-item-icon">
              <i data-feather="settings"></i>
            </div>
            Account
          </a>
          <a class="dropdown-item" href="#!" @click.prevent="logout">
            <div class="dropdown-item-icon"><i data-feather="log-out"></i></div>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import CredentialsUser from '../../api/utils/credentialsUser';
import 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js';
import '../../assets/js/scripts';

export default {
  data() {
    return {
      userName: null,
      userRole: null,
    };
  },
  mounted() {
    feather.replace();
  },
  async created() {
      const name = CredentialsUser.getNameUser();
      const role = CredentialsUser.getRoleUser();
      this.userName = name;
      this.userRole = role;
  },
  methods: {
    logout() {
      this.$router.push({ name: 'Logout' });
    },
  },
};
</script>

<style>
@import url('../../assets/css/styles.css');
</style>

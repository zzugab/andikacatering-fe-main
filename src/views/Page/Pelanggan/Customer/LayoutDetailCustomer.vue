<template>
  <div class="nav-fixed">
    <NavbarDasboard />
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
                        <i data-feather="shopping-cart"></i>
                      </div>
                      Detail Pelanggan
                    </h1>
                    <div class="page-header-subtitle">Detailed view of the order</div>
                  </div>
                </div>
                <nav class="mt-4 rounded" aria-label="breadcrumb">
                  <ol class="breadcrumb px-3 py-2 rounded mb-0">
                    <li class="breadcrumb-item">
                      <a href="/app/pelanggan/customer">Customers</a>
                    </li>
                    <li class="breadcrumb-item active">Customer Detail</li>
                  </ol>
                </nav>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <div class="col-lg-6 mb-2">
              <div class="card">
                <div class="card-header bg-gray">
                  <h2 class="mb-0">Customer Information</h2>
                </div>
                <div class="card-body">
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <th scope="row" style="width: 30%">Name</th>
                        <td>{{ customersDetail.name }}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone 1</th>
                        <td>{{ customersDetail.phone_number_1 }}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone 2</th>
                        <td>{{ customersDetail.phone_number_2 }}</td>
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        <td>{{ customersDetail.address }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Order Information</h2>
              </div>
              <div class="card-body">
                <table id="datatablesSimpleDetailCustomer"></table>
              </div>
            </div>
          </div>
        </main>
        <footer class="footer-admin mt-auto footer-light">
          <div class="container-xl px-4">
            <div class="row">
              <div class="col-md-6 small">Copyright &copy; Your Website 2021</div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Privacy Policy</a> &middot;
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
import customerComponent from '../../../../api/component/customerComponent';
import Sidebar from '../../../Components/Sidebar.vue';
import NavbarDasboard from '../../../Components/NavbarDasboard.vue';

export default {
  components: {
    NavbarDasboard,
    Sidebar,
  },
  setup() {
    const { customersDetail } = customerComponent.setup();
    return {
      customersDetail,
    };
  },
  // setup() {
  //   return customerComponent.setup();
  // },
};
</script>

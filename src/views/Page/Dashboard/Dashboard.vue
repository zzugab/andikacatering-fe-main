<!-- File: src/components/Dashboard.vue -->
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
                      Dashboard
                    </h1>
                    <div class="page-header-subtitle">
                      Example dashboard overview and content summary
                    </div>
                  </div>
                  <div class="col-12 col-xl-auto mt-4">
                    <div class="input-group input-group-joined border-0" style="width: 16.5rem">
                      <span class="input-group-text"><i class="text-primary" data-feather="calendar"></i></span>
                      <input class="form-control ps-0 pointer" ref="litepickerRange"
                        placeholder="Select date range..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <!-- Example Colored Cards for Dashboard Demo-->
            <div class="row">
              <!-- Monthly Earnings (Total DP) -->
              <div class="col-lg-6 col-xl-4 mb-4">
                <div class="card bg-primary text-white h-100">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="me-3">
                        <div class="text-white-75 small">Total DP Collected</div>
                        <div class="text-lg fw-bold">Rp. {{ dashboardData.totalDP ? dashboardData.totalDP.toLocaleString() : 0}}</div>
                      </div>
                      <i class="feather-xl text-white-50" data-feather="calendar"></i>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Annual Earnings (Total Expenses) -->
              <div class="col-lg-6 col-xl-4 mb-4">
                <div class="card bg-warning text-white h-100">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="me-3">
                        <div class="text-white-75 small">Total Expenses</div>
                        <div class="text-lg fw-bold">Rp. {{ dashboardData.totalExpense ?
                          dashboardData.totalExpense.toLocaleString() : 0 }}</div>
                      </div>
                      <i class="feather-xl text-white-50" data-feather="dollar-sign"></i>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Task Completion (Payment Gap) -->
              <div class="col-lg-6 col-xl-4 mb-4">
                <div class="card bg-success text-white h-100">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="me-3">
                        <div class="text-white-75 small">Payment Gap</div>
                        <div class="text-lg fw-bold">Rp. {{ dashboardData.paymentGap ?
                          dashboardData.paymentGap.toLocaleString() : 0 }}</div>
                      </div>
                      <i class="feather-xl text-white-50" data-feather="check-square"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-xxl-4 col-xl-12 mb-4">
                <div class="card h-100">
                  <div class="card-body h-100 p-5">
                    <div class="row align-items-center">
                      <div class="col-xl-8 col-xxl-12">
                        <div class="text-center text-xl-start text-xxl-center mb-4 mb-xl-0 mb-xxl-4">
                          <h1 class="text-primary">Selamat Datang !</h1>
                          <p class="text-gray-700 mb-0">
                            Cloud Catering manajemen catering yang mudah dan cepat!!
                          </p>
                        </div>
                      </div>
                      <div class="col-xl-4 col-xxl-12 text-center">
                        <img class="img-fluid" src="../../../assets/assets/img/illustrations/at-work.svg"
                          style="max-width: 26rem" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 mb-4">
                <div class="card card-header-actions h-100">
                  <div class="card-header">
                    List Acara
                  </div>
                  <div class="card-body">
                    <!-- Check if there are orders and render them -->
                    <div v-if="dashboardData.order && dashboardData.order.length > 0" class="timeline timeline-xs">
                      <div v-for="order in dashboardData.order" :key="order.uuid" class="timeline-item">
                        <div class="timeline-item-marker">
                          <div class="timeline-item-marker-text" style="width: 200px;">{{ convertDate(order.event_date)  }} - {{  order.event_time ? order.event_time : "00:00" }}</div>
                          <div class="timeline-item-marker-indicator bg-green"></div>
                        </div>
                        <div class="timeline-item-content">
                          
                          <a class="fw-bold text-dark" href="#!">{{ order.order_name }}</a>
                          , {{ order.customer.name }} 
                          
                        </div>
                      </div>
                    </div>
                    <!-- Display a message if there are no orders -->
                    <div v-else class="timeline-item">
                      <div class="timeline-item-content">
                        Tidak Ada Event
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
              <div class="col-md-6 small">
                Copyright &copy; Andika Sari Catering 2024
              </div>
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
import { ref, onMounted } from 'vue';
import Sidebar from "../../Components/Sidebar.vue";
import Litepicker from 'litepicker';
import 'litepicker/dist/plugins/ranges.js';
import 'litepicker/dist/css/litepicker.css';
import NavbarDashboard from "../../Components/NavbarDasboard.vue";
import DashboardComponent from '../../../api/component/dashboardComponent.js';
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js";

export default {
  components: {
    NavbarDashboard,
    Sidebar,
  },
  setup() {
    
    const convertDate = (dateString) => {
      const date = new Date(dateString);
      const dayNames = [
          "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
      ];
      const dayName = dayNames[date.getDay()];
      const day = date.getDate().toString().padStart(2, '0');
      const monthNames = [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
          "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${dayName}, ${day} ${month} ${year}`;
    };

    const { dashboardData, filters, applyFilters } = DashboardComponent.setup();
    const litepickerRange = ref(null);

    onMounted(() => {
      if (litepickerRange.value) {
        new Litepicker({
          element: litepickerRange.value,
          singleMode: false,
          numberOfMonths: 2,
          numberOfColumns: 2,
          format: "YYYY-MM-DD",
          plugins: ['ranges'],
          setup: (picker) => {
            picker.on('selected', (date1, date2) => {
              filters.event_date_start = date1.format("YYYY-MM-DD");
              filters.event_date_end = date2.format("YYYY-MM-DD");
              applyFilters(); // Pastikan fungsi ini memperbarui dashboardData
            });
          }
        });
      }
    });
    return { convertDate, dashboardData, filters, applyFilters, litepickerRange };
  },
}; 

</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css");
@import url("../../../assets/css/styles.css");
</style>

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
                        <i data-feather="calendar"></i>
                      </div>
                      Daftar Jadwal Pertemuan
                    </h1>
                    <div class="page-header-subtitle">
                      Kelola jadwal pertemuan Anda dengan filter yang fleksibel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <!-- Filter Section -->
            <div class="card mb-4">
              <div class="card-header">Filter Jadwal Pertemuan</div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-3">
                    <label for="filterTitle" class="form-label">Judul</label>
                    <input type="text" id="filterTitle" class="form-control" v-model="filters.title"
                      placeholder="Masukkan judul" />
                  </div>
                  <div class="col-md-3">
                    <label for="filterDate" class="form-label">Tanggal</label>
                    <input type="date" id="filterDate" class="form-control" v-model="filters.event_date_start" />
                  </div>
                  <div class="col-md-3">
                    <label for="filterStatus" class="form-label">Status</label>
                    <select id="filterStatus" class="form-control" v-model="filters.status">
                      <option value="" disabled selected>Pilih Status</option> <!-- Placeholder option -->
                      <option value="done">Selesai</option>
                      <option value="ongoing">Berlangsung</option>
                      <option value="upcoming">Akan Datang</option>
                    </select>
                  </div>

                  <div class="col-md-3">
                    <label for="filterLocation" class="form-label">Lokasi</label>
                    <input type="text" id="filterLocation" class="form-control" v-model="filters.location"
                      placeholder="Masukkan lokasi" />
                  </div>
                </div>
                <div class="row g-3 mt-3">
                  <div class="col-md-12 text-end">
                    <button class="btn btn-primary mx-2" @click="applyFilters">
                      Terapkan Filter
                    </button>
                    <button class="btn btn-secondary" @click="clearFilters">
                      Bersihkan Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table Section -->
            <div class="card mb-4">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2>Data Jadwal Pertemuan</h2>
                <button class="btn btn-primary" @click="openAddModal">
                  Tambah Jadwal
                </button>
              </div>
              <div class="card-body">
                <table id="datatablesSimple"></table>
              </div>
            </div>

            <!-- Modal for Adding/Editing Schedule -->
            <div class="modal fade" id="scheduleModal" tabindex="-1" aria-labelledby="scheduleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="scheduleModalLabel">
                      {{
                        currentSchedule && currentSchedule.uuid
                          ? "Edit Jadwal"
                          : "Tambah Jadwal"
                      }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="
                      currentSchedule && currentSchedule.uuid
                        ? updateMeetingScheduleHandler(
                          currentSchedule.uuid,
                          currentSchedule
                        )
                        : createMeetingScheduleHandler(currentSchedule)
                      ">
                      <div class="mb-3">
                        <label for="scheduleTitle" class="form-label">Judul</label>
                        <input type="text" class="form-control" id="scheduleTitle" v-model="currentSchedule.title"
                          required />

                        <label for="scheduleDate" class="form-label">Tanggal</label>
                        <input type="date" class="form-control" id="scheduleDate" v-model="currentSchedule.date"
                          required />
                        <div>
                          <label for="scheduleStartTime" class="form-label">Waktu Mulai</label>
                          <input type="time" class="form-control" id="scheduleStartTime"
                            v-model="currentSchedule.start_time" @input="validateTime" required />

                          <label for="scheduleEndTime" class="form-label">Waktu Selesai</label>
                          <input type="time" class="form-control" id="scheduleEndTime" :min="currentSchedule.start_time"
                            v-model="currentSchedule.end_time" @input="validateTime" required />

                          <p v-if="error" class="mx-1 my-1 text-danger">{{ errorMessage }}</p>
                        </div>
                        <label for="scheduleLocation" class="form-label">Lokasi</label>
                        <input type="text" class="form-control" id="scheduleLocation" v-model="currentSchedule.location"
                          required />

                        <label for="scheduleNote" class="form-label">Catatan</label>
                        <textarea class="form-control" id="scheduleNote" v-model="currentSchedule.note"></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        {{
                          currentSchedule && currentSchedule.uuid
                            ? "Update"
                            : "Tambah"
                        }}
                      </button>
                    </form>
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
                Copyright &copy; Your Website 2021
              </div>
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
import meetingScheduleComponent from "../../../api/component/meetingScheduleComponent"; // Sesuaikan dengan path yang benar
import Sidebar from "../../Components/Sidebar.vue";
import NavbarDashboard from "../../Components/NavbarDasboard.vue";

export default {
  components: {
    NavbarDashboard,
    Sidebar,
  },
  setup() {
    const {
      validateTime,
      meetingSchedules,
      currentSchedule,
      filters,
      openAddModal,
      applyFilters,
      clearFilters,
      createMeetingScheduleHandler,
      updateMeetingScheduleHandler,
      deleteMeetingScheduleHandler,
      error,
      errorMessage,
    } = meetingScheduleComponent.setup();

    return {
      validateTime,
      error,
      errorMessage,
      meetingSchedules,
      currentSchedule,
      filters,
      openAddModal,
      applyFilters,
      clearFilters,
      createMeetingScheduleHandler,
      updateMeetingScheduleHandler,
      deleteMeetingScheduleHandler,
    };
  },
};
</script>
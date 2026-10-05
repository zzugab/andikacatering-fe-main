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
                          <!-- svg tetap -->
                        </div>
                        Tambah Order
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </header>
  
            <!-- Main page content-->
            <div class="container-xl px-4 mt-n10">
              <div class="card">
                <div class="card-header border-bottom">
                  <div class="nav nav-pills nav-justified flex-column flex-xl-row nav-wizard" id="cardTab" role="tablist">
                    <a class="nav-item nav-link active" id="step1-tab" href="#step1" data-bs-toggle="tab" role="tab" aria-controls="step1" aria-selected="true">
                      <div class="wizard-step-icon">1</div>
                      <div class="wizard-step-text">
                        <div class="wizard-step-text-name">Data Diri</div>
                        <div class="wizard-step-text-details">Informasi Umum</div>
                      </div>
                    </a>
                    <a class="nav-item nav-link" id="step2-tab" href="#step2" data-bs-toggle="tab" role="tab" aria-controls="step2" aria-selected="false">
                      <div class="wizard-step-icon">2</div>
                      <div class="wizard-step-text">
                        <div class="wizard-step-text-name">Perencanaan Kegiatan</div>
                        <div class="wizard-step-text-details">Keterangan</div>
                      </div>
                    </a>
                  </div>
                </div>
  
                <div class="card-body">
                  <div class="tab-content" id="cardTabContent">
                    <!-- Step 1 -->
                    <div class="tab-pane py-xl-3 fade active show" id="step1" role="tabpanel" aria-labelledby="step1-tab">
                      <form @submit.prevent="nextStep">
                        <div class="mb-3 position-relative">
                          <label class="small mb-1" for="customer_name">
                            Name
                          </label>

                          <input
                            class="form-control"
                            id="customer_name"
                            v-model="formData.customer_name"
                            @input="searchCustomerName"
                            autocomplete="off"
                            required
                          />

                          <!-- List customer -->
                          <div
                            v-if="showCustomerSuggestions && customerSuggestions.length > 0"
                            class="list-group position-absolute w-100"
                            style="z-index: 1000;"
                          >
                            <button
                              v-for="customer in customerSuggestions"
                              :key="customer.uuid"
                              type="button"
                              class="list-group-item list-group-item-action"
                              @click="selectCustomer(customer)"
                            >
                              <strong>{{ customer.name }}</strong>

                              <small
                                v-if="customer.phone_number_1"
                                class="d-block text-muted"
                              >
                                {{ customer.phone_number_1 }}
                              </small>
                            </button>
                          </div>
                        </div>

                        <div class="mb-3">
                          <label class="small mb-1" for="phone_number_1">Phone Number 1</label>
                          <input
                            class="form-control" id="phone_number_1" v-model="formData.phone_number_1" />
                        </div>

                        <div class="mb-3">
                          <label class="small mb-1" for="phone_number_2">Phone Number 2</label>
                          <input
                            class="form-control" id="phone_number_2" v-model="formData.phone_number_2" />
                        </div>

                        <div class="mb-3">
                          <label class="small mb-1" for="address">Address</label>
                          <input
                            class="form-control" id="address" v-model="formData.address" />
                        </div>
  
                        <div class="d-flex justify-content-center">
                          <button class="btn btn-primary mt-3" type="submit">Next</button>
                        </div>
                      </form>
                    </div>
  
                    <!-- Step 2 -->
                    <div class="tab-pane py-xl-3 fade" id="step2" role="tabpanel" aria-labelledby="step2-tab">
                      <form @submit.prevent="submitForm">

                        <div class="mb-3">
                          <label class="small mb-1" for="location">Location</label>
                          <input class="form-control" id="location" v-model="formData.location" />
                        </div>
  
                        <div class="row gx-3">
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="eventDate">Event Date</label>
                            <input class="form-control" id="eventDate" type="date" v-model="formData.event_date" required />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="eventTime">Event Time</label>
                            <input class="form-control" id="eventTime" type="time" v-model="formData.event_time" />
                          </div>
                        </div>
  
                        <div class="mb-3">
                          <label class="small mb-1" for="portion">Portion</label>
                          <input
                            class="form-control"
                            id="portion"
                            v-model="formData.portion"
                          />
                        </div>
  
                        <div class="mb-3">
                          <label class="small mb-1" for="note">Note</label>
                          <textarea class="form-control" id="note" v-model="formData.note"></textarea>
                        </div>
  
                        <div class="mb-3">
                          <label class="small mb-1" for="status">Status</label>
                          <select class="form-control" id="status" v-model="formData.status" required>
                            <option value="" disabled>Pilih Status</option>
                            <option value="booking">Pemesanan</option>
                            <option value="confirmed">Dikonfirmasi</option>
                            <option value="preparing">Sedang Dipersiapkan</option>
                            <option value="ready_for_delivery">Siap Dikirim</option>
                            <option value="delivered">Telah Dikirim</option>
                            <option value="event_in_progress">Acara Sedang Berlangsung</option>
                            <option value="event_completed">Acara Selesai</option>
                            <option value="refund">Pengembalian Dana</option>
                            <option value="event_finish">Acara Berakhir</option>
                          </select>
                        </div>
  
                        <div class="row gx-3">
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="akadStart">Akad Start</label>
                            <input class="form-control" id="akadStart" type="time" v-model="formData.akad_start" />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="akadEnd">Akad End</label>
                            <input class="form-control" id="akadEnd" type="time" v-model="formData.akad_end" />
                          </div>
                        </div>
  
                        <div class="row gx-3">
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="resepsiStart">Resepsi Start</label>
                            <input class="form-control" id="resepsiStart" type="time" v-model="formData.resepsi_start" />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="resepsiEnd">Resepsi End</label>
                            <input class="form-control" id="resepsiEnd" type="time" v-model="formData.resepsi_end" />
                          </div>
                        </div>

                        <div class="mb-3">
                          <label class="small mb-1" for="nuance">Nuance</label>
                          <input class="form-control" id="nuance" v-model="formData.nuance" />
                        </div>
  
                        <div class="row gx-3">
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="generalBuffet">General Buffet</label>
                            <input class="form-control" id="generalBuffet" v-model="formData.general_buffet" />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="vipBuffet">VIP Buffet</label>
                            <input class="form-control" id="vipBuffet" v-model="formData.vip_buffet" />
                          </div>
                        </div>
  
                        <div class="row gx-3">
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="vipTable">VIP Table</label>
                            <input class="form-control" id="vipTable" v-model="formData.vip_table" />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="weddingFoodTable">Wedding Food Table</label>
                            <input class="form-control" id="weddingFoodTable" v-model="formData.wedding_food_table" />
                          </div>
                        </div>
  
                        <div class="row gx-3">
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="akadTable">Akad Table</label>
                            <input class="form-control" id="akadTable" v-model="formData.akad_table" />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label class="small mb-1" for="receptionTable">Reception Table</label>
                            <input class="form-control" id="receptionTable" v-model="formData.reception_table" />
                          </div>
                        </div>
  
                        <div class="mb-3">
                          <label class="small mb-1" for="forNaib">For Naib</label>
                          <input class="form-control" id="forNaib" v-model="formData.for_naib" />
                        </div>
  
                        <div class="mb-3">
                          <label class="small mb-1" for="ayamBekakak">Ayam Bekakak Nasi Punar</label>
                          <select class="form-control" id="ayamBekakak" v-model="formData.ayam_bekakak_nasi_punar">
                            <option value="" disabled>Pilih opsi</option>
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                          </select>
                        </div>
  
                        <div class="mb-3">
                          <label class="small mb-1" for="micaForBesan">Mica for Besan</label>
                          <select class="form-control" id="micaForBesan" v-model="formData.mica_for_besan">
                            <option value="" disabled>Pilih opsi</option>
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                          </select>
                        </div>
  
                        <div class="d-flex justify-content-center">
                          <button class="btn btn-light mt-3" type="button" @click="prevStep">Previous</button>
                          <button class="btn btn-success mt-3" type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </template>



<script>
import Sidebar from "../../Components/Sidebar.vue";
import NavbarDashboard from "../../Components/NavbarDasboard.vue";
import { orderAddEditComponent } from "../../../api/component/orderAddEditComponent.js";
export default {
    components: {
        NavbarDashboard,
        Sidebar,
    },
    setup() {
        return orderAddEditComponent.setup();
    },
};
</script>

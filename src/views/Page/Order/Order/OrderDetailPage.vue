<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="mb-0"><i class="fas fa-info-circle me-2"></i>Informasi Pelanggan</h2>
      </div>
      <div class="card-body">
        <!-- Customer Information -->
        <div class="customer-info mb-4 pb-3 border-bottom">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Nama Pelanggan:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ currentOrder.customer?.name || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Nomor HP 1:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ currentOrder.customer?.phone_number_1 || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Nomor HP 2:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ currentOrder.customer?.phone_number_2 || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Alamat:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ currentOrder.customer?.address || 'Belum Diisi' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="mb-0"><i class="fas fa-info-circle me-2"></i>Informasi Order</h2>
        <button class="btn btn-primary" @click="openOrderDetailModal">
          <i class="fas fa-edit me-2"></i>Edit Order
        </button>
      </div>
      <div class="card-body">
        <!-- Customer Information -->
        <!-- Event Information -->
        <div class="event-info mb-4 pb-3 border-bottom">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Nomor Order:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.order_name || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Status Order:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ terjemahkanStatusOrder(infoOrder?.status )|| 'Belum Diisi' }}
              </div>
            </div>
            <!-- Location -->
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Lokasi Acara:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.location || 'Belum Diisi' }}
              </div>
            </div>

            <!-- Event Date -->
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Tanggal Acara:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.event_date || 'Belum Diisi' }}
              </div>
            </div>

            <!-- Event Time -->
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Waktu Acara:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.event_time || 'Belum Diisi' }}
              </div>
            </div>

            <!-- Portion -->
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Porsi:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.portion || 'Belum Diisi' }}
              </div>
            </div>

            <!-- Additional Details -->
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Waktu Akad:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.akad_start || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Waktu Akad:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.akad_end || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Waktu Mulai Resepsi :</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.resepsi_start || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Waktu Selesai Resepsi:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.resepsi_end || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Nuansa:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.nuance || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Buffet Umum:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.general_buffet || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Buffet VIP:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.vip_buffet || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Meja VIP:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.vip_table || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Meja Hidangan Pernikahan:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.wedding_food_table || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Meja Akad:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.akad_table || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Meja Resepsi:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.reception_table || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Untuk Naib:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.for_naib || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Ayam Bekakak Nasi Punar:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.ayam_bekakak_nasi_punar || 'Belum Diisi' }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label"><strong>Mika untuk Besan:</strong></label>
              <div class="p-2 border rounded bg-light">
                {{ infoOrder?.mica_for_besan || 'Belum Diisi' }}
              </div>
            </div>

          </div>
          <label class="form-label"><strong>Catatan:</strong></label>
          <div class="p-2 border rounded bg-light">
            {{ currentOrder.note }}
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="mb-0"><i class="fas fa-info-circle me-2"></i>Informasi Pembayaran</h2>
      </div>
      <div class="card-body">
        <!-- Payment Information -->
        <div class="payment-info">
          <div class="mb-3">
            <label class="form-label"><strong>Status Pembayaran:</strong></label>
            <div class="p-2 border rounded bg-light">
              {{ terjemahkanStatus(currentPayment?.status) }}
            </div>
          </div>
        </div>
      </div>
    </div>





    <!-- Modal for Editing Order -->
    <div class="modal fade" id="openOrderDetailModal" tabindex="-1" aria-labelledby="openOrderDetailModal"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="openOrderDetailModal">Ubah Pesanan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
          </div>

          <div class="modal-body">
            <!-- SESUAIKAN DATA DENGAN ADD FORM, STRUKTUR TETAP -->
            <form @submit.prevent="updateOrderDetail(infoOrder)">
              <div class="mb-3">
                <!-- Baris pertama -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="orderStatus" class="form-label">Status Pesanan</label>
                    <select id="orderStatus" class="form-control" v-model="infoOrder.status" required>
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

                  <div class="col-md-6 mb-2">
                    <label for="orderLocation" class="form-label">Lokasi</label>
                    <input type="text" class="form-control" id="orderLocation" v-model="infoOrder.location" required />
                  </div>
                </div>

                <!-- Baris kedua -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="orderEventDate" class="form-label">Tanggal Acara</label>
                    <input type="date" class="form-control" id="orderEventDate" v-model="infoOrder.event_date"
                      required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="orderEventTime" class="form-label">Waktu Acara</label>
                    <input type="time" class="form-control" id="orderEventTime" v-model="infoOrder.event_time"
                      required />
                  </div>
                </div>

                <!-- Baris ketiga -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="orderPortion" class="form-label">Porsi Acara</label>
                    <input type="text" class="form-control" id="orderPortion" v-model="infoOrder.portion" required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="orderNote" class="form-label">Catatan Acara</label>
                    <textarea class="form-control" id="orderNote" v-model="infoOrder.note" required></textarea>
                  </div>
                </div>

                <!-- Baris keempat -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="akadStart" class="form-label">Mulai Akad</label>
                    <input type="time" class="form-control" id="akadStart" v-model="infoOrder.akad_start" required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="akadEnd" class="form-label">Selesai Akad</label>
                    <input type="time" class="form-control" id="akadEnd" v-model="infoOrder.akad_end" required />
                  </div>
                </div>

                <!-- Baris kelima -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="resepsiStart" class="form-label">Mulai Resepsi</label>
                    <input type="time" class="form-control" id="resepsiStart" v-model="infoOrder.resepsi_start"
                      required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="resepsiEnd" class="form-label">Selesai Resepsi</label>
                    <input type="time" class="form-control" id="resepsiEnd" v-model="infoOrder.resepsi_end" required />
                  </div>
                </div>

                <!-- Baris keenam -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="nuance" class="form-label">Nuansa</label>
                    <input type="text" class="form-control" id="nuance" v-model="infoOrder.nuance" required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="generalBuffet" class="form-label">Buffet Umum</label>
                    <input type="text" class="form-control" id="generalBuffet" v-model="infoOrder.general_buffet"
                      required />
                  </div>
                </div>

                <!-- Baris ketujuh -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="vipBuffet" class="form-label">Buffet VIP</label>
                    <input type="text" class="form-control" id="vipBuffet" v-model="infoOrder.vip_buffet" required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="vipTable" class="form-label">Meja VIP</label>
                    <input type="text" class="form-control" id="vipTable" v-model="infoOrder.vip_table" required />
                  </div>
                </div>

                <!-- Baris kedelapan -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="weddingFoodTable" class="form-label">Meja Hidangan Pernikahan</label>
                    <input type="text" class="form-control" id="weddingFoodTable"
                      v-model="infoOrder.wedding_food_table" required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="akadTable" class="form-label">Meja Akad</label>
                    <input type="text" class="form-control" id="akadTable" v-model="infoOrder.akad_table" required />
                  </div>
                </div>

                <!-- Baris kesembilan -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="receptionTable" class="form-label">Meja Resepsi</label>
                    <input type="text" class="form-control" id="receptionTable" v-model="infoOrder.reception_table"
                      required />
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="forNaib" class="form-label">Untuk Naib</label>
                    <input type="text" class="form-control" id="forNaib" v-model="infoOrder.for_naib" required />
                  </div>
                </div>

                <!-- Baris kesepuluh -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="ayamBekakakNasiPunar" class="form-label">Ayam Bekakak Nasi Punar</label>
                    <select class="form-control" v-model="infoOrder.ayam_bekakak_nasi_punar" required>
                      <option value="" disabled>Pilih Opsi</option>
                      <option value="iya">Iya</option>
                      <option value="tidak">Tidak</option>
                    </select>
                  </div>

                  <div class="col-md-6 mb-2">
                    <label for="micaForBesan" class="form-label">Mika untuk Besan</label>
                    <select class="form-control" v-model="infoOrder.mica_for_besan" required>
                      <option value="" disabled>Pilih Opsi</option>
                      <option value="iya">Iya</option>
                      <option value="tidak">Tidak</option>
                    </select>
                  </div>
                </div>

                <!-- Baris terakhir -->
                <!-- <div class="row">
                  <div class="col-md-6 mb-2">
                    <label for="orderPaymentInformation" class="form-label">Informasi Pembayaran</label>
                    <select id="orderPaymentInformation" class="form-control" v-model="currentPayment.status">
                      <option value="" disabled>Pilih Status</option>
                      <option value="not finished">Belum Selesai</option>
                      <option value="completed">Selesai</option>
                      <option value="refund">Pengembalian Dana</option>
                      <option value="cancelled">Dibatalkan</option>
                    </select>
                  </div>
                </div> -->
              </div>

              <button type="submit" class="btn btn-primary">Perbarui</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import orderDetailComponent from '../../../../api/component/orderDetailComponent';
// Multiselect tidak dipakai lagi setelah diganti ke <select>, jadi dihapus impor-nya
import { getStatusDescription } from '../../../../api/helpers/orderStatus';

export default {
  setup() {
    return orderDetailComponent.setup();
  },
};
</script>

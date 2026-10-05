<template>
  <div class="container px-4 mt-n10">
    <form @submit.prevent="submitData">
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center text-white">
          <h3>Data Paket</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
            <tr>
              <th>Tipe Paket</th>
              <th>Name</th>
              <th>Porsi</th>
              <th>Catatan</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(paket, index) in packageItems" :key="paket.uuid || index">
              <td>
                <input v-model="paket.uuid" type="hidden">
                <select v-model="paket.type" class="form-control"
                        @change="handleTypePaket($event.target.value, index)">
                  <option disabled selected value="null">Silahkan Pilih Tipe Menu</option>
                  <option value="Paket Utama">Paket Catering</option>
                  <option value="Paket Nasi Box">Paket Nasi Box</option>
                </select>
              </td>
              <td>
                <multiselect v-model="paket.package_id" :custom-label="uuid => (pkgByIdPackage(uuid)?.name || '')"
                             :options="optionsByType(paket.type).map(o => String(o.uuid))" placeholder="Pilih Paket"/>
              </td>
              <td>
                <input :id="`PorsiPaket${index}`" v-model.number="paket.portion" class="form-control" min="0"
                       placeholder="Masukkan Porsi" required type="number"/>
              </td>
              <td>
                <textarea v-model="paket.details" class="form-control" placeholder="Masukkan Deskripsi"></textarea>
              </td>
              <!-- <div>{{ paket.price }}</div> -->
              <input :id="`HargaPaket${index}`" v-model="paket.price" type="hidden">
              <td>
                <button class="btn btn-primary btn-sm mx-1" type="button" @click="tambahPaket">+</button>
                <button class="btn btn-danger btn-sm" type="button" @click="deletePaket(index)">-</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header bg-light">
          <div class="d-flex justify-content-between align-items-center">
            <h3>Data Menu (Paket)</h3>
            <div class="justify-content-end">
              <button class="btn btn-primary" type="button" @click="submitPaketMenu">Data Menu Paket</button>
            </div>
            <!-- Teleport modal ke <body> agar tidak ketutup layout parent -->
            <teleport to="body">
              <div v-if="showPaketPopup" class="modal-mask" @click.self="closePaketPopup">
                <div class="modal-container">
                  <div class="modal-header">
                    <h5>Daftar Menu Paket</h5>
                    <button class="btn-close" type="button" @click="closePaketPopup">×</button>
                  </div>

                  <div class="modal-body">
                    <div v-if="loadingPopup">Memuat...</div>

                    <div v-else-if="popupError" class="text-danger">{{ popupError }}</div>

                    <ul v-else class="menu-list">
                      <li v-for="item in listMenuPakagePopUp" :key="item.uuid || item.menu_id" class="menu-row">
                        <span class="menu-name">{{ item.name }}</span>

                        <!-- toggle editable: 0/1 -->
                        <label class="switch">
                          <input v-model="item.status" :false-value="0" :true-value="1" type="checkbox"/>
                          <span class="slider"></span>
                        </label>
                      </li>
                    </ul>
                  </div>

                  <div class="modal-footer">
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-primary" @click="savePopupMenus">Simpan</button>
                    </div>
                  </div>
                </div>
              </div>
            </teleport>
          </div>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Kategori</th>
              <th>Tipe</th>
              <th>Porsi</th>
              <th>Catatan</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="itemsPackages.length > 0">
              <tr v-for="(menuPackage, index) in itemsPackages" :key="index">
                <input v-model="menuPackage.uuid" type="hidden">
                <td><input v-model="menuPackage.menu.name" class="form-control" readonly type="text"/></td>
                <td>
                  <input v-if="menuPackage.menu.type" v-model="menuPackage.menu.type" class="form-control" readonly
                         type="text"/>
                  <span v-else>Category not available</span>
                </td>
                <input v-model="menuPackage.package_id" type="hidden"/>
                <td><input v-model="menuPackage.category.name" class="form-control" readonly type="text"/></td>
                <td>
                  <input :value="menuPackage.portion === 0 ? null : menuPackage.portion" class="form-control"
                         placeholder="Masukkan Porsi"
                         type="text"
                         @input="menuPackage.portion = $event.target.value ? Number($event.target.value) : null"/>
                </td>
                <td><input v-model="menuPackage.details" class="form-control" placeholder="Masukkan Detail"
                           type="text"/></td>
              </tr>
            </template>
            <tr v-else>
              <td class="text-center" colspan="7">Belum Ada Paket Yang dipilih</td>
            </tr>
            </tbody>


          </table>
        </div>
      </div>


      <div class="card mb-4">
        <div class="card-header bg-light">
          <h3>Data Menu Costum</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
            <tr>
              <th>Tipe</th>
              <th>Menu</th>
              <th>Porsi</th>
              <th>Detail</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in menuItemsCostum" :key="index">
              <td>
                <select v-if="item.selectedMenu" v-model="item.selectedMenu.type" class="form-control"
                        @change="handleNonPaket(item?.selectedMenu?.type)">
                  <option disabled value="">Silahkan Pilih Tipe Menu</option>
                  <option value="Buffet">Buffet</option>
                  <option value="Foodstall">Foodstall</option>
                </select>
                <select v-else v-model="item.type" class="form-control" @change="handleNonPaket(item.type)">
                  <option disabled selected value=null>Silahkan Pilih Tipe Menu</option>
                  <option value="Buffet">Buffet</option>
                  <option value="Foodstall">Foodstall</option>
                </select>
              </td>
              <td>
                <multiselect v-model="item.selectedMenu" :options="item.selectedMenu?.type ? filteredByType : filteredByType"
                             label="name" placeholder="Pilih Menu" track-by="menu_id"/>

                <input :id="`HargaMenuCostum${index}`" :value="item.menu?.price || 0" type="hidden"/>
              </td>
              <td>
                <input :id="`PorsiMenuCostum${index}`" v-model.number="item.portion" class="form-control"
                       placeholder="Masukkan Porsi" type="number"/>
              </td>
              <td>
                <input v-model="item.details" class="form-control" placeholder="Masukkan Deskripsi" type="text"/>
              </td>
              <td>
                <button class="btn btn-primary btn-sm mx-1" type="button" @click="tambahMenuNonPaket">+</button>
                <button class="btn btn-danger btn-sm" @click="deleteMenuNonPaket(index)">-</button>
              </td>
            </tr>

            </tbody>

          </table>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header bg-light">
          <h3>Total Harga</h3>
        </div>
        <div class="card-body">
          <div class="mt-3">
            <label class="form-label">Harga</label>
            <input v-model="TotalCurrentPrice" class="form-control mb-2" disabled>
          </div>

          <div>
            <input v-model="listPayment.uuid" type="hidden">
            <div class="mb-3">
              <label class="form-label">Biaya Lainnya</label>
              <div v-for="(other, index) in listPayment.others" :key="index" class="row g-2 mb-2">
                <div class="col-md-4">
                  <select id="otherType" v-model="other.type" class="form-select">
                    <option disabled selected value=null>Pilih tipe biaya lainnya</option>
                    <option value="increase">Tambahan</option>
                    <option value="decrease">Potongan</option>
                  </select>
                </div>
                <input v-model="listPayment.others.uuid" type="hidden">

                <div class="col-md-3">
                  <input :id="`otherPrice${index}`" v-model.number="other.price" class="form-control" placeholder="Jumlah"
                         type="number">
                </div>
                <div class="col-md-3">
                  <input v-model="other.details" class="form-control" placeholder="Keterangan" type="text">
                </div>
                <div class="col-md-2 d-flex justify-content-end">
                  <button class="btn btn-primary btn-sm mx-1" type="button" @click="tambahBiayaLain()">+</button>
                  <button class="btn btn-danger btn-sm" type="button" @click="hapusBiayaLain(index)">-</button>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Total Harga</label>
              <!-- <pre>{{ TotalPrizeFormatted }}</pre> -->
              <input id="TotalHarga" v-model="listPayment.total_price" class="form-control" readonly type="text"/>
            </div>


          </div>


        </div>


      </div>

      <div class="text-center mt-4">
        <button class="btn btn-success" type="submit">Submit Data</button>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import menuItemsComponent from "../../../../api/component/menuItemsComponent";

export default {
  components: {
    Multiselect,
  },
  setup() {

    return menuItemsComponent.setup();
  },


};
</script>

<style scoped>
.card-header {
  font-weight: bold;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.table .form-control {
  text-align: center;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  /* tinggi supaya di atas semuanya */
}

.modal-container {
  width: 560px;
  max-width: 94vw;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .2);
  overflow: hidden;
}

.modal-header,
.modal-footer {
  padding: 12px 16px;
  display: flex;
  align-items: center;
}

.modal-header {
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.modal-footer {
  justify-content: center;
  border-top: 1px solid #eee;
}

.modal-body {
  padding: 12px 16px;
  max-height: 60vh;
  overflow: auto;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #f0f0f0;
}

.menu-name {
  font-weight: 500;
}

.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: not-allowed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ddd;
  transition: .2s;
  border-radius: 22px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  top: 3px;
  background: white;
  transition: .2s;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
}

input:checked + .slider {
  background: #16a34a;
}

input:checked + .slider:before {
  transform: translateX(16px);
}

.btn-close {
  background: transparent;
  border: 0;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
</style>

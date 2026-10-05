<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>Data Menu</h2>
        <button class="btn btn-primary" @click="openAddModal">
          Tambah Data
        </button>
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>
  </div>
  <!-- Modal for Adding/Editing Menu -->
  <div class="modal fade" id="menuModal" tabindex="-1" aria-labelledby="menuModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="menuModalLabel">
            {{ currentMenu && currentMenu.uuid ? "Edit Menu" : "Add Menu" }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="
            currentMenu && currentMenu.uuid
              ? updateMenuHandler(currentMenu.uuid, currentMenu)
              : createMenuHandler(currentMenu)
            ">
            <div class="mb-3">
              <label for="menuImage" class="form-label">Gambar Menu</label>
              <input type="file" class="form-control" id="menuImage" @change="handleImageChange" accept="image/*" />
            </div>
            <div class="mb-3">
              <label for="menuName" class="form-label">Nama Menu</label>
              <input type="text" class="form-control" id="menuName" v-model="currentMenu.name" required />
            </div>
            <div class="mb-3">
              <label for="menuPrice" class="form-label">Harga</label>
              <input type="text" class="form-control" id="menuPrice" v-model="formattedPrice" required />
            </div>
            <div class="mb-3">
              <label for="menuType" class="form-label">Tipe</label>
              <select class="form-control" id="menuType" v-model="currentMenu.type" required>
                <option disabled value="">Please select one</option>
                <option value="Buffet">Buffet</option>
                <option value="Foodstall">Foodstall</option>
                <option value="Nasi Box">Nasi Box</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="menuCategory" class="form-label">Kategori</label>
              <select class="form-control" id="menuCategory" v-model="currentMenu.category_id" required>
                <option disabled value="">Please select one</option>
                <option v-for="category in categories" :key="category.uuid" :value="category.uuid">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="menuDescription" class="form-label">Deskripsi</label>
              <textarea class="form-control" id="menuDescription" v-model="currentMenu.description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              {{ currentMenu && currentMenu.uuid ? "Update" : "Add" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal untuk Preview Gambar -->
  <div class="modal fade" id="imagePreviewModal" tabindex="-1" aria-labelledby="imagePreviewModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="imagePreviewModalLabel">
            Preview Gambar
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="" id="previewImage" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import foodMenuComponent from "../../../../api/component/foodMenuComponent"; // sesuaikan dengan path file foodComponent.js

export default {
  components: {},
  setup() {
    return foodMenuComponent.setup();
  },
};
</script>

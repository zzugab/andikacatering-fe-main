<template>
  <div class="container-xl px-4 mt-n10">
    <div class="card mb-4">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h2>Data Kategori</h2>
        <button class="btn btn-primary" @click="openAddModal">
          Tambah Data
        </button>
      </div>
      <div class="card-body">
        <table id="datatablesSimple"></table>
      </div>
    </div>

    <!-- Modal for Adding/Editing Category -->
    <div
      class="modal fade"
      id="categoryModal"
      tabindex="-1"
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel">
              {{ currentCategory && currentCategory.uuid ? "Edit Category" : "Add Category" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              @submit.prevent="
                currentCategory && currentCategory.uuid
                  ? updateCategoryHandler(currentCategory.uuid, currentCategory.name)
                  : createCategoryHandler(currentCategory.name)
              "
            >
              <div class="mb-3">
                <label for="categoryName" class="form-label"
                  >Nama Kategori</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="categoryName"
                  v-model="currentCategory.name"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                {{ currentCategory && currentCategory.uuid ? "Update" : "Add" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import foodCategoryComponent from '../../../../api/component/foodCategoryComponent'; // sesuaikan dengan path file foodComponent.js

export default {
  components: {},
  setup() {
    return foodCategoryComponent.setup();
  }
};
</script>

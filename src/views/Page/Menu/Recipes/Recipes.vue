<template>
  <div class="nav-fixed">
    <NavbarDashboard />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <main>
          <header
            class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10"
          >
            <div class="container-xl px-4">
              <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto mt-4">
                    <h1 class="page-header-title">
                      <div class="page-header-icon">
                        <i data-feather="book-open"></i>
                      </div>
                      Daftar Resep 
                    </h1>
                    <div class="page-header-subtitle">
                      Kelola dan atur resep dengan mudah
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <!-- Main page content-->
          <div class="container-xl px-4 mt-n10">
            <div class="card mb-4">
              <div
                class="card-header d-flex justify-content-between align-items-center"
              >
                <h2>Data Resep</h2>
              </div>
              <div class="card-body">
                <table id="datatablesSimple"></table>
              </div>
            </div>
            <!-- Modal for Adding/Editing Recipe -->
            <div
              class="modal fade"
              id="recipeModal"
              tabindex="-1"
              aria-labelledby="recipeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="recipeModalLabel">
                      {{
                        currentRecipe.view && currentRecipe.uuid
                          ? "Detail Resep"
                          : "Tambah & Edit Resep"
                      }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <form
                        @submit.prevent="updateRecipeHandler(currentRecipe)"
                        class="w-100"
                      >
                      <input type="hidden" v-model="currentRecipe.uuid" />
                        <!-- Menampilkan pesan jika tidak ada data -->
                        <div v-if="currentRecipe.nullable" class="text-center">
                          <p>Tidak Ada Data</p>
                        </div>

                        <!-- Menampilkan daftar resep jika ada data -->
                        <div v-else>
                          <div
                            v-for="(recipes, index) in currentRecipe.recipes"
                            :key="index"
                            class="row mb-1"
                          >
                            <div class="col-4">
                              <label class="form-label">Nama Bahan</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="recipes.name"
                                required
                                :readonly="isViewOnly"
                              />
                            </div>
                            <div class="col-2">
                              <label class="form-label">Kuantitas</label>
                              <input
                                type="number"
                                class="form-control"
                                v-model="recipes.quantity"
                                required
                                :readonly="isViewOnly"
                              />
                            </div>
                            <div class="col-2">
                              <label class="form-label">Satuan </label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="recipes.unit"
                                required
                                :readonly="isViewOnly"
                              />
                            </div>
                            <div class="col-2">
                              <label class="form-label">Porsi</label>
                              <input
                                type="number"
                                class="form-control"
                                v-model="recipes.portion"
                                required
                                :readonly="isViewOnly"
                              />
                            </div>
                            <div class="col-2 d-flex align-items-end">
                              <button
                                type="button"
                                class="btn btn-danger mx-3 fw-bold"
                                style="
                                  font-size: 50px;
                                  height: 50px;
                                  width: 50px;
                                "
                                @click="removeIngredient(index)"
                                v-if="!isViewOnly && index !== 0"
                              >
                                -
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary mx-3"
                                style="
                                  font-size: 50px;
                                  height: 50px;
                                  width: 50px;
                                "
                                @click="addIngredient"
                                v-if="!isViewOnly"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center mt-5">
                          <button
                          type="submit"
                          class="btn btn-primary"
                          v-if="!isViewOnly"
                        >
                          {{ currentRecipe.uuid ? "Update" : "Tambah" }}
                        </button>
                        </div>
                        
                      </form>
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
                Copyright &copy; Your Website 2021
              </div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Privacy Policy</a>
                &middot;
                <a href="#!">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../../Components/Sidebar.vue";
import NavbarDashboard from "../../../Components/NavbarDasboard.vue";
import RecipesComponent from "../../../../api/component/recipesComponent"; // sesuaikan dengan path file foodComponent.js

export default {
  components: {
    NavbarDashboard,
    Sidebar,
  },
  setup() {
    
    return RecipesComponent.setup();
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css");
@import url("https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css");

@import url("../../../../assets/css/styles.css");
</style>

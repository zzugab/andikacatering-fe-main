<template>
    <div class="container-xl px-4 mt-n10">
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5>Total Income</h5>
              <p>{{ totalIncome }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5>Total Outcome</h5>
              <p>{{ totalOutcome }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5>Sisa Dana</h5>
              <p>{{ totalDif }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h2>Financial Record - Outcome</h2>
          <button class="btn btn-primary" @click="openAddModal">Tambah Data</button>
        </div>
        <div class="card-body">
          <table id="datatablesOutcome"></table>
        </div>
      </div>
  
      <!-- Modal for Adding/Editing Financial Record -->
      <div
        class="modal fade"
        id="financialRecordModal"
        tabindex="-1"
        aria-labelledby="financialRecordModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="financialRecordModalLabel">
                {{
                  currentFinancialRecord && currentFinancialRecord.uuid ? 'Edit Financial Record' : 'Add Financial Record'
                }}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form
                @submit.prevent="
                  currentFinancialRecord && currentFinancialRecord.uuid
                    ? updateFinancialRecordHandler(currentFinancialRecord.uuid, currentFinancialRecord)
                    : createFinancialRecordHandler(currentFinancialRecord)
                "
              >
                <div class="mb-3">
                  <label for="financialRecordType" class="form-label">Type</label>
                  <select class="form-control" id="financialRecordType" v-model="currentFinancialRecord.type" required>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="financialRecordImage" class="form-label">Upload Image</label>
                  <input
                    type="file"
                    class="form-control"
                    id="financialRecordImage"
                    @change="handleImageUpload"
                    accept="image/*"
                  />
                  <div v-if="currentFinancialRecord.image && currentFinancialRecord.image.link" class="mt-2">
                    <img :src="currentFinancialRecord.image.link" alt="Current Image" class="img-fluid" width="100" />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="financialRecordDate" class="form-label">Date</label>
                  <input
                    type="date"
                    class="form-control"
                    id="financialRecordDate"
                    v-model="currentFinancialRecord.date"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="financialRecordAmount" class="form-label">Amount</label>
                  <input
                    type="text"
                    class="form-control"
                    id="financialRecordAmount"
                    v-model="currentFinancialRecord.amount"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="financialRecordDescription" class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    id="financialRecordDescription"
                    v-model="currentFinancialRecord.description"
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">
                  {{ currentFinancialRecord && currentFinancialRecord.uuid ? 'Update' : 'Add' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal for Viewing Image -->
      <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="imageModalLabel">View Image</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              <img :src="modalImageSrc" alt="Image" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import financialRecordComponent from '../../../../api/component/financialRecordComponent'; // sesuaikan dengan path file financialRecordComponent.js
  
  export default {
    setup() {
      const {
        totalDif,
        financialRecordsOutcome,
        currentFinancialRecord,
        openAddModal,
        hideModal,
        createFinancialRecordHandler,
        updateFinancialRecordHandler,
        deleteRecord,
        openEditModal,
        totalIncome,
        totalOutcome,
        modalImageSrc,
        openImageModal,
        handleImageUpload,
      } = financialRecordComponent.setup();
  
      return {
        totalDif,
        financialRecordsOutcome,
        currentFinancialRecord,
        openAddModal,
        hideModal,
        createFinancialRecordHandler,
        updateFinancialRecordHandler,
        deleteRecord,
        openEditModal,
        totalIncome,
        totalOutcome,
        modalImageSrc,
        openImageModal,
        handleImageUpload,
      };
    },
  };
  </script>
  
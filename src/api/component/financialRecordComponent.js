import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import {
  getAllFinancialRecords,
  createFinancialRecord,
  getFinancialRecordById,
  updateFinancialRecord,
  deleteFinancialRecord,
} from '../services/financialRecordService';
import { DataTable } from 'simple-datatables';
import { formatNominalRupiah, parseRupiah, formatRupiah } from '../helpers/formatRupiah';
import { convertDate } from '../helpers/formatDate';

export default {
  setup() {
    const route = useRoute();
    const financialRecordsOutcome = ref([]);
    const totalIncome = ref(0);
    const totalOutcome = ref(0);
    const totalDif = ref(0);
    const currentFinancialRecord = ref({
      image: null,
      date: '',
      amount: 0,
      description: '',
    });
    const modalImageSrc = ref('');

    let dataTableInstanceOutcome = null;
    const modalInstance = ref(null);
    const imageModalInstance = ref(null);

    const openAddModal = () => {
      currentFinancialRecord.value = {
        image: null,
        date: '',
        amount: 0,
        description: '',
      };
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      } else {
        console.error('Modal instance not found');
      }
    };

    const openImageModal = (src) => {
      modalImageSrc.value = src;
      imageModalInstance.value.show();
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        currentFinancialRecord.value.image = file;
      }
    };

    const loadFinancialRecords = async () => {
      try {
        const uuid = route.params.uuid;
        const response = await getAllFinancialRecords(uuid);

        financialRecordsOutcome.value = response.data.dataOutcome;
        totalIncome.value = formatNominalRupiah(response.data.totalIncome);
        totalOutcome.value = formatNominalRupiah(response.data.totalOutcome);
        totalDif.value = formatNominalRupiah(response.data.totalIncome - response.data.totalOutcome )

        console.log(totalDif.value);
        
        initializeDataTableOutcome();
      } catch (error) {
        console.error('Error loading financial records:', error);
      }
    };

    const initializeDataTableOutcome = () => {
      if (dataTableInstanceOutcome) {
        dataTableInstanceOutcome.destroy();
      }

      const tableElement = document.getElementById('datatablesOutcome');

      dataTableInstanceOutcome = new DataTable(tableElement, {
        data: {
          headings: ['No', 'Image', 'Date', 'Amount', 'Description', 'Actions'],
          data: financialRecordsOutcome.value.map((record, index) => [
            index + 1,
            `<img src="${record.image.link}" alt="${record.image.name}" width="50" height="50" class="view-image" data-src="${record.image.link}">`,
            record.date,
            formatNominalRupiah(record.amount),
            record.description,
            `
            <button class="btn btn-primary edit-btn" data-uuid="${record.uuid}">Edit</button>
            <button class="btn btn-danger delete-btn" data-uuid="${record.uuid}">Delete</button>
            `,
          ]),
        },
      });

      // Add event listeners for edit, delete buttons, and image click
      tableElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
          const uuid = event.target.getAttribute('data-uuid');
          openEditModal(uuid);
        } else if (event.target.classList.contains('delete-btn')) {
          const uuid = event.target.getAttribute('data-uuid');
          deleteRecord(uuid);
        } else if (event.target.classList.contains('view-image')) {
          const src = event.target.getAttribute('data-src');
          openImageModal(src);
        }
      });
    };

    const openEditModal = async (uuid) => {
      try {
        const response = await getFinancialRecordById(uuid);
        currentFinancialRecord.value = response.data;
        modalInstance.value.show();
      } catch (error) {
        console.error('Error opening edit modal:', error);
      }
    };

    const createFinancialRecordHandler = async (recordData) => {
      try {
        const orderId = route.params.uuid;
        if (recordData.image && recordData.image.uuid) {
          recordData.image = null;
        }

        const filteredData = {
          date: recordData.date,
          type: 'expense',
          amount: parseRupiah(recordData.amount),
          description: recordData.description,
          record_image: recordData.image,
        };

        await createFinancialRecord(orderId, filteredData);
        await loadFinancialRecords();
        hideModal();
        Swal.fire('Success', 'Financial record created successfully', 'success');
      } catch (error) {
        console.error('Error creating financial record:', error);
        Swal.fire('Failed', 'There was an error creating the financial record.', 'error');
      }
    };

    const updateFinancialRecordHandler = async (uuid, recordData) => {
      try {
        if (recordData.image && recordData.image.uuid) {
          recordData.image = null;
        }

        const filteredData = {
          date: recordData.date,
          type: 'expense',
          amount: parseRupiah(recordData.amount),
          description: recordData.description,
          record_image: recordData.image,
        };

        await updateFinancialRecord(uuid, filteredData);
        await loadFinancialRecords();
        hideModal();
        Swal.fire('Success', 'Financial record updated successfully', 'success');
      } catch (error) {
        console.error(`Error updating financial record with uuid ${uuid}:`, error);
        Swal.fire('Failed', 'There was an error updating the financial record.', 'error');
      }
    };

    const deleteRecord = async (uuid) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this financial record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await deleteFinancialRecord(uuid);
          await loadFinancialRecords();
          Swal.fire('Deleted!', 'The financial record has been deleted.', 'success');
        } catch (error) {
          console.error(`Error deleting financial record with uuid ${uuid}:`, error);
          Swal.fire('Failed', 'There was an error deleting the financial record.', 'error');
        }
      }
    };

    onMounted(() => {
      const inputElement = document.getElementById('financialRecordAmount');
      inputElement.addEventListener('keyup', function (e) {
        this.value = formatRupiah(this.value, 'Rp. ');
      });
      modalInstance.value = new bootstrap.Modal(document.getElementById('financialRecordModal'), {});
      imageModalInstance.value = new bootstrap.Modal(document.getElementById('imageModal'), {});
      loadFinancialRecords();
    });

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

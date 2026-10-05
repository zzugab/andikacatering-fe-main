import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";

import {
  getAllInstallments,
  createInstallment,
  getInstallmentById,
  updateInstallment,
  deleteInstallment,
  printData,
} from "../services/paymentInstallmentService";
import { getAllBankAccounts } from "../services/bankDataService"; // Pastikan Anda memiliki service untuk mengambil daftar bank
import { DataTable } from "simple-datatables";
import { formatRupiah, parseRupiah } from "../helpers/formatRupiah";
import { convertDate } from "../helpers/formatDate";

export default {
  setup() {
    const route = useRoute();
    const installments = ref([]);
    const banks = ref([]);
    const currentInstallment = ref({
      amount: null,
      payment_datelines: "",
      payment_bank_id: "",
      type: "",
      payment_image: null,
    });
    const modalImageSrc = ref("");
    const totalPayment = ref(0);
    const totalIncome = ref(0);
    const totalGap = ref(0);

    let dataTableInstance = null;
    const modalInstance = ref(null);
    const imageModalInstance = ref(null);

    const openAddModal = () => {
      currentInstallment.value = {
        amount: null,
        payment_datelines: "",
        payment_bank_id: "",
        type: "",
        payment_image: null,
      };
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      } else {
        console.error("Modal instance not found");
      }
    };

    const loadInstallments = async () => {
      try {
        const uuid = route.params.uuid;
        const response = await getAllInstallments(uuid);
        if (response.status) {
          installments.value = response.data.list_installment;
          totalPayment.value = response.data.total_payment;
          totalIncome.value = response.data.total_income;
          totalGap.value = response.data.total_gap;
        } else {
          console.error("Error loading installments:", response);
        }

        initializeDataTable();
      } catch (error) {
        console.error("Error loading installments:", error);
      }
    };

    const loadBanks = async () => {
      try {
        const response = await getAllBankAccounts();
        if (response.data.status) {
          banks.value = response.data.data;
        } else {
          console.error("Error loading banks:", response);
        }
      } catch (error) {
        console.error("Error loading banks:", error);
      }
    };

    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById("datatablesInstallments");

      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: [
            "No",
            "Image",
            "Amount",
            "Payment Datelines",
            "Bank",
            "Actions",
          ],
          data: installments.value.map((installment, index) => [
            index + 1,
            `<img src="${installment.image.link}" alt="${installment.image.name}" width="50" height="50" class="view-image" data-src="${installment.image.link}">`,
            formatRupiah(installment.amount),
            convertDate(installment.payment_datelines),
            installment.bank.name,
            `
            <button class="btn btn-primary edit-btn" data-uuid="${installment.uuid}">Edit</button>
            <button class="btn btn-danger delete-btn" data-uuid="${installment.uuid}">Delete</button>
            <button class="btn btn-secondary print-btn" data-uuid="${installment.uuid}">Print Nota</button>
            `,
          ]),
        },
      });

      // Add event listeners for edit, delete buttons, and image click
      tableElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
          const uuid = event.target.getAttribute("data-uuid");
          openEditModal(uuid);
        } else if (event.target.classList.contains("delete-btn")) {
          const uuid = event.target.getAttribute("data-uuid");
          deleteRecord(uuid);
        } else if (event.target.classList.contains("view-image")) {
          const src = event.target.getAttribute("data-src");
          openImageModal(src);
        } else if (event.target.classList.contains("print-btn")) {
          const uuid = event.target.getAttribute("data-uuid");
          const url = printData(uuid);
        }
      });
    };

    const openEditModal = async (uuid) => {
      try {
        const response = await getInstallmentById(uuid);
        if (response.status) {
          currentInstallment.value = response.data;
          modalInstance.value.show();
        } else {
          console.error("Error fetching installment:", response);
        }
      } catch (error) {
        console.error("Error opening edit modal:", error);
      }
    };

    const openImageModal = (src) => {
      modalImageSrc.value = src;
      imageModalInstance.value.show();
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) currentInstallment.value.image = file;
    };

    const createInstallmentHandler = async (installmentData) => {
      try {
        const paymentId = route.params.uuid;

        const filteredData = {
          payment_bank_id: installmentData.payment_bank_id,
          type: installmentData.type,
          amount: parseRupiah(String(installmentData.amount)), // Pastikan input adalah string
          payment_datelines: installmentData.payment_datelines,
          payment_image: installmentData.image,
        };

        await createInstallment(paymentId, filteredData);
        await loadInstallments();
        hideModal();
        Swal.fire("Success", "Installment created successfully", "success");
      } catch (error) {
        console.error("Error creating installment:", error);
        Swal.fire(
          "Failed",
          "There was an error creating the installment.",
          "error"
        );
      }
    };

    const updateInstallmentHandler = async (uuid, installmentData) => {
      try {
        if (installmentData.image && installmentData.image.uuid)
          installmentData.image = null;

        const filteredData = {
          payment_bank_id: installmentData.payment_bank_id,
          type: installmentData.type,
          amount: parseRupiah(String(installmentData.amount)), // Pastikan input adalah string
          payment_datelines: installmentData.payment_datelines,
          payment_image: installmentData.image,
        };

        await updateInstallment(uuid, filteredData);
        await loadInstallments();
        hideModal();
        Swal.fire("Success", "Installment updated successfully", "success");
      } catch (error) {
        console.error(`Error updating installment with uuid ${uuid}:`, error);
        Swal.fire(
          "Failed",
          "There was an error updating the installment.",
          "error"
        );
      }
    };

    const deleteRecord = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this installment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deleteInstallment(uuid);
          await loadInstallments();
          Swal.fire("Deleted!", "The installment has been deleted.", "success");
        } catch (error) {
          console.error(`Error deleting installment with uuid ${uuid}:`, error);
          Swal.fire(
            "Failed",
            "There was an error deleting the installment.",
            "error"
          );
        }
      }
    };

    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(
        document.getElementById("installmentModal"),
        {}
      );
      imageModalInstance.value = new bootstrap.Modal(
        document.getElementById("imageModal"),
        {}
      );
      loadInstallments();
      loadBanks();
    });

    return {
      installments,
      banks,
      currentInstallment,
      modalImageSrc,
      totalPayment,
      totalIncome,
      totalGap,
      openAddModal,
      hideModal,
      createInstallmentHandler,
      updateInstallmentHandler,
      deleteRecord,
      openEditModal,
      openImageModal,
      handleImageUpload,
      formatRupiah,
    };
  },
};

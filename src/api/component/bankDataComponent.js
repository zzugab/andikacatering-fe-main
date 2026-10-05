import { ref, onMounted} from "vue";
import Swal from "sweetalert2";
import {
  createBankAccount,
  getAllBankAccounts,
  updateBankAccount,
  deleteBankAccount,
} from "../services/bankDataService";
import { DataTable } from "simple-datatables";

export default {
  setup() {
    const bankAccounts = ref([]);
    const currentBankAccount = ref({
      name: "",
      account_number: "",
      account_owner: "",
    });

    let dataTableInstanceBankAccount = null;
    const modalInstance = ref(null);

    const openAddModal = () => {
      currentBankAccount.value = {
        name: "",
        account_number: "",
        account_owner: "",
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

    const loadBankAccounts = async () => {
      try {
        const response = await getAllBankAccounts();
        bankAccounts.value = response.data;
        initializeDataTableBankAccount();
      } catch (error) {
        console.error("Error loading bank accounts:", error);
      }
    };
    // Fungsi untuk mengisi form dengan data akun bank yang akan diedit
    const editBankAccount = (account) => {
      currentBankAccount.value = { ...account };
      modalInstance.value.show();
    };

    const initializeDataTableBankAccount = () => {
      if (dataTableInstanceBankAccount) {
        dataTableInstanceBankAccount.destroy();
      }

      const tableElement = document.getElementById("datatablesSimple");
      dataTableInstanceBankAccount = new DataTable(tableElement, {
        data: {
          headings: [
            "No",
            "Name",
            "Account Number",
            "Account Owner",
            "Actions",
          ],
          data: bankAccounts.value.data.map((data, index) => [
            index + 1,
            data.name,
            data.account_number,
            data.account_owner,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${data.uuid}">Edit</button>
             <button class="btn btn-danger btn-sm delete-btn" data-id="${data.uuid}">Delete</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll(".detail-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const accountId = button.getAttribute("data-id");
          const account = bankAccounts.value.data.find(
            (a) => a.uuid === accountId
          );

          viewBankAccountDetail(account);
        });
      });

      tableElement.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const accountId = button.getAttribute("data-id");
          const account = bankAccounts.value.data.find(
            (a) => a.uuid === accountId
          );

          editBankAccount(account);
        });
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const accountId = button.getAttribute("data-id");
          deleteBankAccountHandler(accountId);
        });
      });
    };

    const createBankAccountHandler = async (accountData) => {
      try {
        await createBankAccount(accountData);
        await loadBankAccounts();
        hideModal();
        Swal.fire(
          "Added!",
          "The bank account has been added successfully.",
          "success"
        );
      } catch (error) {
        console.error("Error creating bank account:", error);
        Swal.fire(
          "Failed!",
          "There was an error adding the bank account.",
          "error"
        );
      }
    };

    const updateBankAccountHandler = async (uuid, accountData) => {
      try {
        await updateBankAccount(uuid, accountData);
        await loadBankAccounts();
        hideModal();
        Swal.fire(
          "Updated!",
          "The bank account has been updated successfully.",
          "success"
        );
      } catch (error) {
        console.error(`Error updating bank account with ID ${uuid}:`, error);
        Swal.fire(
          "Failed!",
          "There was an error updating the bank account.",
          "error"
        );
      }
    };

    const deleteBankAccountHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this bank account!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deleteBankAccount(uuid);
          await loadBankAccounts();
          Swal.fire(
            "Deleted!",
            "The bank account has been deleted.",
            "success"
          );
        } catch (error) {
          console.error(`Error deleting bank account with ID ${uuid}:`, error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the bank account.",
            "error"
          );
        }
      }
    };

    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(
        document.getElementById("bankAccountModal"),
        {}
      );
      loadBankAccounts();
    });

    return {
      bankAccounts,
      currentBankAccount,
      openAddModal,
      hideModal,
      createBankAccountHandler,
      updateBankAccountHandler,
      deleteBankAccountHandler,
      editBankAccount,
    };
  },
};

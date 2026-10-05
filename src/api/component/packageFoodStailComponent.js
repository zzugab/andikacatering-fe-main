import { ref, reactive, onMounted } from "vue";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";
import { DataTable } from "simple-datatables";
import {
  getAllPackageStall,
  createPackageStall,
  updatePackageStall,
  deletePackageStall,
  getDataFoodStall,
} from "../services/packageFoodStaillService";

export default {
  setup() {
    const route = useRoute();
    const packageStalls = ref([]); // List of package stalls
    const dataFoodstall = ref([]); // List of food stalls
    const modalInstance = ref(null); // Bootstrap modal instance reference
    const foodStallQuantity = ref(null);
    let dataTableInstance = null; // DataTable instance reference

    // Default structure for a new package stall
    const defaultPackageStall = reactive({
      uuid: "",
      category: [
        {
          menu_id: "",
          quantity_percent: 0,
        },
      ],
    });

    // Default structure for updating a package stall
    const defaultUpdatePackageStall = reactive({
      uuid: "",
      menu_id: "",
      quantity_percent: 0,
      menu_name: "",
    });

    const currentPackageStall = reactive({ ...defaultPackageStall });
    const currentUpdatePackageStall = reactive({ ...defaultUpdatePackageStall });

    // Reset package stall to default for adding new data
    const resetPackageStall = () => {
      Object.assign(currentPackageStall, { ...defaultPackageStall });
    };

    // Reset update package stall to default for editing existing data
    const resetUpdatePackageStall = () => {
      Object.assign(currentUpdatePackageStall, { ...defaultUpdatePackageStall });
    };

    // Open modal for adding a new package stall
    const openAddModal = () => {
      resetPackageStall();
      resetUpdatePackageStall();
      modalInstance.value.show();
    };

    // Hide the modal
    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      } else {
        console.error("Modal instance not found");
      }
    };

    // Initialize DataTable
    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById("datatablesSimple");
      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: ["No", "Foodstall", "Quantity Percent", "Actions"],
          data: packageStalls.value.map((stall, index) => [
            index + 1,
            stall.menu ? stall.menu.name : "No Menu",
            stall.quantity_percent,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${stall.uuid}">Edit</button>
             <button class="btn btn-danger btn-sm delete-btn" data-id="${stall.uuid}">Delete</button>`,
          ]),
        },
      });

      // Event listeners for edit and delete buttons
      tableElement.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const stallId = button.getAttribute("data-id");
          editPackageStall(stallId);
        });
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const stallId = button.getAttribute("data-id");
          deletePackageStallHandler(stallId);
        });
      });
    };

    // Load package stalls and food stall data
    const loadPackageStalls = async () => {
      try {
        const uuid = route.params.uuid;
        const response = await getAllPackageStall(uuid);
        packageStalls.value = response.data;

        const foodstallResponse = await getDataFoodStall();
        dataFoodstall.value = foodstallResponse.data;

        initializeDataTable();
      } catch (error) {
        console.error("Error loading package stalls:", error);
      }
    };

    // Retrieve foodstall name by ID
    const getFoodstallName = (id) => {
      const foodstall = dataFoodstall.value.find((item) => item.uuid === id);
      return foodstall ? foodstall.name : "";
    };

    // Handler for creating a new package stall
    const createPackageStallHandler = async (currentPackageStall) => {
      try {
        const filteredData = {
          category: currentPackageStall.category.map(item => ({
            menu_id: item.menu_id.uuid, // Mengambil uuid dari menu_id
            quantity_percent: item.quantity_percent, // Mengambil quantity_percent
          })),
        };
        await createPackageStall(route.params.uuid, filteredData);
        await loadPackageStalls();
        Swal.fire(
          "Added!",
          "The package stall has been added successfully.",
          "success"
        );
        hideModal();
      } catch (error) {
        console.error("Error creating package stall:", error);
        Swal.fire(
          "Failed!",
          "There was an error adding the package stall.",
          "error"
        );
      }
    };

    // Handler for updating an existing package stall
    const updatePackageStallHandler = async (currentUpdatePackageStall) => {
      try {
        const filteredData = {
          category: [
            {
              uuid: currentUpdatePackageStall.uuid,
              menu_id: currentUpdatePackageStall.menu_id,
              quantity_percent: currentUpdatePackageStall.quantity_percent,
            },
          ],
        };
        await updatePackageStall(route.params.uuid, filteredData);
        await loadPackageStalls();
        Swal.fire(
          "Updated!",
          "The package stall has been updated successfully.",
          "success"
        );
        hideModal();
      } catch (error) {
        console.error("Error updating package stall:", error);
        Swal.fire(
          "Failed!",
          "There was an error updating the package stall.",
          "error"
        );
      }
    };

    // Handler for deleting a package stall
    const deletePackageStallHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this package stall!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deletePackageStall(uuid);
          await loadPackageStalls();
          Swal.fire("Deleted!", "The package stall has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting package stall:", error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the package stall.",
            "error"
          );
        }
      }
    };

    // Edit package stall data
    const editPackageStall = (uuid) => {
      const stall = packageStalls.value.find((s) => s.uuid === uuid);
      if (stall) {
        Object.assign(currentUpdatePackageStall, { ...stall });
        modalInstance.value.show();
      }
    };

    const validateInputRange = (event, min = 1, max = 100, errorMessage = 'Tolong isi persen dari 1 sampai 100') => {
      const value = parseInt(event.target.value, 10);
      const errorElement = document.getElementById(`${event.target.id}-error`);
      const submitButton = document.querySelector('button[type="submit"]');

      if (value < min || value > max) {
        // Jika tidak ada elemen error, buat elemen baru
        if (!errorElement) {
          const errorDiv = document.createElement('div');
          errorDiv.id = `${event.target.id}-error`;
          errorDiv.className = 'text-danger mt-2';
          errorDiv.innerText = errorMessage;
          event.target.parentNode.appendChild(errorDiv);
        }
        // Set nilai menjadi kosong untuk menjaga input tetap valid
        event.target.value = '';

        // Nonaktifkan tombol submit
        if (submitButton) {
          submitButton.disabled = true;
        }
      } else {
        // Jika input valid, hapus pesan error
        if (errorElement) {
          errorElement.remove();
        }
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    };

    // On mount, initialize modal and load package stalls
    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(
        document.getElementById("packageStallModal"),
        {}
      );
      loadPackageStalls();
    });

    return {
      validateInputRange,
      packageStalls,
      dataFoodstall,
      currentPackageStall,
      currentUpdatePackageStall,
      getFoodstallName,
      openAddModal,
      hideModal,
      createPackageStallHandler,
      updatePackageStallHandler,
      deletePackageStallHandler,
    };
  },
};

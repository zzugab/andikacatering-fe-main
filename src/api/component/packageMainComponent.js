import { ref, reactive, onMounted } from "vue";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";
import { DataTable } from "simple-datatables";
import {
  createPackageMain,
  getPackageMain,
  updatePackageMain,
  deletePackageMain,
} from "../services/packageMainService";
import { getCategories } from "../services/foodService";

export default {
  setup() {
    const route = useRoute();
    const category = ref([]); // Holds list of packages
    const categories = ref([]); // Holds list of categories
    const uuid_package = ref(route.params.uuid); // Package UUID for editing
    let dataTableInstance = null; // DataTable instance reference
    const modalInstance = ref(null); // Bootstrap modal instance reference
    const isViewOnly = ref(false); // View-only state for the modal

    // Default package structure
    const defaultPackage = reactive({
      uuid: "",
      category: [
        {
          category_id: "",
          quantity_percent: 0,
        },
      ],
    });

    // This holds the current package being edited or created
    const currentPackage = reactive({ ...defaultPackage });

    // Reset package state
    const resetPackageState = () => {
      Object.assign(currentPackage, { ...defaultPackage });
    };

    // Default package structure
    const updateDefaultPackage = reactive({
      uuid: "",
      category_id: "",
      quantity_percent: 0,
      category_name: "",
    });

    // This holds the current package being edited or created
    const currentUpdatePackage = reactive({ ...updateDefaultPackage });

    // Reset package state
    const resetUpdatePackageState = () => {
      Object.assign(currentUpdatePackage, { ...updateDefaultPackage });
    };

    // Open modal to add a new package
    const openAddModal = () => {
      isViewOnly.value = false;
      resetPackageState();
      resetUpdatePackageState();
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

    // Add a new package menu item
    const addPackageMenu = () => {
      currentPackage.category.push({
        category_id: "",
        quantity_percent: 0,
      });
    };

    // Remove a package menu item
    const removePackageMenu = (index) => {
      if (currentPackage.category.length > 1) {
        currentPackage.category.splice(index, 1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Cannot Remove",
          text: "At least one package menu is required.",
        });
      }
    };

    // Load the package data and categories
    const loadPackages = async () => {
      try {
        if (uuid_package.value) {
          const response = await getPackageMain(uuid_package.value);
          category.value = response.data;
          Object.assign(currentPackage, category.value);
        }

        const responseCategories = await getCategories();
        categories.value = responseCategories.data;

        initializeDataTable();
      } catch (error) {
        console.error("Error loading packages:", error);
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
          headings: ["No", "Category ID", "Quantity Percent", "Actions"],
          data: category.value.map((pkg, index) => [
            index + 1,
            pkg.category ? pkg.category.name : "No Category",
            pkg.quantity_percent,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${pkg.uuid}">Edit</button>
             <button class="btn btn-danger btn-sm delete-btn" data-id="${pkg.uuid}">Delete</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const packageId = button.getAttribute("data-id");
          editPackage(packageId);
        });
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const packageId = button.getAttribute("data-id");
          deletePackageMainHandler(packageId);
        });
      });
    };

    // Handle creation of a new package
    const createPackageMainHandler = async (dataPackage) => {
      try {
        dataPackage.category = dataPackage.category.map((item) => ({
          category_id: item.category_id.uuid, // Memperbarui hanya dengan uuid
          quantity_percent: item.quantity_percent,
        }));

        await createPackageMain(uuid_package.value, currentPackage);
        await loadPackages();

        Swal.fire(
          "Added!",
          "The package has been added successfully.",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            location.reload(); // Refresh halaman
          }
        });
        hideModal();
      } catch (error) {
        console.error("Error creating package:", error);
        Swal.fire("Failed!", "There was an error adding the package.", "error");
      }
    };

    // Handle updating an existing package
    const updatePackageMainHandler = async (uuid, dataPackage) => {
      try {
        delete dataPackage.category_name;
        // Membuat objek baru yang hanya berisi data yang diperlukan
        const filteredData = {
          category: [
            {
              uuid: dataPackage.uuid,
              category_id: dataPackage.category_id,
              quantity_percent: dataPackage.quantity_percent.toString(),
            },
          ],
        };
        await updatePackageMain(uuid_package.value, filteredData);
        await loadPackages();
        Swal.fire(
          "Updated!",
          "The package has been updated successfully.",
          "success"
        );
        hideModal();
      } catch (error) {
        console.error(
          `Error updating package with uuid ${currentPackage.uuid}:`,
          error
        );
        Swal.fire(
          "Failed!",
          "There was an error updating the package.",
          "error"
        );
      }
    };

    // Handle deleting a package
    const deletePackageMainHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this package!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deletePackageMain(uuid);
          await loadPackages();
          Swal.fire("Deleted!", "The package has been deleted.", "success");
        } catch (error) {
          console.error(`Error deleting package with uuid ${uuid}:`, error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the package.",
            "error"
          );
        }
      }
    };

    // Edit an existing package
    const editPackage = (uuid) => {
      const pkg = category.value.find((p) => p.uuid === uuid);
      let data_edit = [];
      if (pkg) {
        data_edit.push({
          uuid: pkg.uuid,
          category_id: pkg.category_id,
          category_name: pkg.category.name,
          quantity_percent: pkg.quantity_percent,
        });
      }
      Object.assign(currentUpdatePackage, data_edit[0]);

      isViewOnly.value = false;
      modalInstance.value.show();
    };

    // On component mount, initialize modal and load data
    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(
        document.getElementById("packageModal"),
        {}
      );
      loadPackages();
    });

    return {
      addPackageMenu,
      removePackageMenu,
      category,
      currentPackage,
      currentUpdatePackage,
      categories,
      createPackageMainHandler,
      updatePackageMainHandler,
      deletePackageMainHandler,
      openAddModal,
      hideModal,
      isViewOnly,
    };
  },
};

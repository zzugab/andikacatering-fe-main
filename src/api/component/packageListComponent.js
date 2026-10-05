import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import router from '../../router/index';
import { DataTable } from "simple-datatables";

import {
  getData,
  createPackage,
  updatePackage,
  deletePackage,
} from "../services/packagefoodService"; // Adjust the path to where your service code is
import { formatNominalRupiah, formatRupiah, parseRupiah } from "../helpers/formatRupiah";

export default {
  setup() {
    //--------------------- Data List
    const packages = ref([]);
    const currentPackage = ref({
      name: "",
      description: "",
      price: 0,
      type: "",
    });
    let dataTableInstance = null;
    const modalInstance = ref(null);


    //--------------------- Data List
    const loadPackages = async () => {
      try {
        const response = await getData();
        packages.value = response.data;
        initializeDataTable();
      } catch (error) {
        console.error("Error loading packages:", error);
      }
    };

    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById("datatablesSimple");
      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: ["No", "Name", "Price", "Type", "Data Makanan", "Actions"],
          data: packages.value.map((pkg, index) => [
            index + 1,
            pkg.name,
            formatNominalRupiah(pkg.price),
            pkg.type,
            `<button class="btn btn-warning btn-sm menu-btn" data-id="${pkg.uuid}">Data Menu</button>
                         <button class="btn btn-primary btn-sm foodstail-btn" data-id="${pkg.uuid}">Data FoodStail</button>`,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${pkg.uuid}">Edit</button>
                         <button class="btn btn-danger btn-sm delete-btn" data-id="${pkg.uuid}">Delete</button>`,
          ]),
        },
      });
      tableElement.querySelectorAll(".menu-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const packageId = button.getAttribute("data-id");
          router.push({ name: "PackageMenu", params: { uuid: packageId } });
        });
      });

      tableElement.querySelectorAll(".foodstail-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const packageId = button.getAttribute("data-id");
          router.push({ name: "PackageFoodstail", params: { uuid: packageId } });

        });
      });
      tableElement.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const packageId = button.getAttribute("data-id");
          const packages1 = packages.value.find(
            (cat) => cat.uuid === packageId
          ); // Pastikan menggunakan uuid
          editPackage(packages1);
        });
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const packageId = button.getAttribute("data-id");
          deletePackageHandler(packageId);
        });
      });
    };

    const openAddModal = () => {
      currentPackage.value = {
        name: "",
        description: "",
        price: 0,
        type: "",
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

    const createPackageHandler = async (packageListData) => {
      try {
        packageListData.price = parseRupiah(packageListData.price);
        await createPackage(packageListData);
        await loadPackages();
        hideModal();
        Swal.fire(
          "Added!",
          "The package has been successfully added.",
          "success"
        );
      } catch (error) {
        Swal.fire("Failed!", "There was an error adding the package.", "error");
      }
    };

    const updatePackageHandler = async (uuid, packageListData) => {
      try {
        packageListData.price = parseRupiah(packageListData.price);
        await updatePackage(uuid, packageListData);
        await loadPackages();
        hideModal();
        Swal.fire(
          "Updated!",
          "The package has been successfully updated.",
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Failed!",
          "There was an error updating the package.",
          "error"
        );
      }
    };

    const editPackage = async (pkg) => {
      try {
        currentPackage.value = {
          ...pkg,
        };
        modalInstance.value.show();
      } catch (error) {
        console.error(`Error fetching package by id ${uuid}:`, error);
      }
    };

    const deletePackageHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this package?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deletePackage(uuid);
          await loadPackages();
          Swal.fire(
            "Deleted!",
            "The package has been successfully deleted.",
            "success"
          );
        } catch (error) {
          console.error(`Error deleting package with id ${uuid}:`, error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the package.",
            "error"
          );
        }
      }
    };

    onMounted(() => {
      const inputElement = document.getElementById('packagePrice');
      inputElement.addEventListener('keyup', function (e) {
        this.value = formatRupiah(this.value, 'Rp. ');
      });
      modalInstance.value = new bootstrap.Modal(
        document.getElementById("packageModal"),
        {}
      );
      loadPackages();
    });

    return {
      packages,
      currentPackage,
      createPackageHandler,
      updatePackageHandler,
      editPackage,
      deletePackageHandler,
      openAddModal,
      hideModal,
    };
  },
};

import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import { formatNominalRupiah, formatRupiah, parseRupiah } from "../helpers/formatRupiah"

import {
  getMenus,
  getCategories,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../services/foodService"; // sesuaikan dengan path file yang berisi kode yang Anda berikan
import { DataTable } from "simple-datatables";

export default {
  setup() {
    const menus = ref([]);
    const categories = ref([]);
    const currentMenu = ref({
      image: null,
      name: "",
      price: "",
      category_id: "",
      type: "",
      description: "",
    });

    let dataTableInstanceMenu = null;
    const modalInstance = ref(null);

    const handleImageChange = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        currentMenu.value.image = files[0]; // Assumption: The structure includes an imageFile field in currentMenu
      }
    };
    const openAddModal = () => {
      currentMenu.value = {
        name: "",
        image: null,
        price: "",
        category_id: "",
        type: "",
        description: "",
      };
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        new bootstrap.Modal(document.getElementById("menuModal")).hide();
        modalInstance.value.hide();
      } else {
        console.error("Modal instance not found");
      }
    };

    const loadCategories = async () => {
      try {
        const response = await getCategories();
        categories.value = response.data;
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    const loadMenus = async () => {
      try {
        const response = await getMenus(); // Changed from getMenus to getCategories
        menus.value = response.data;
        initializeDataTableMenu(); // Call function to initialize DataTable
      } catch (error) {
        console.error("Error loading menus:", error);
      }
    };

    const initializeDataTableMenu = () => {
      if (dataTableInstanceMenu) {
        dataTableInstanceMenu.destroy(); // Destroy the previous instance if exists
      }

      const tableElement = document.getElementById("datatablesSimple");
      dataTableInstanceMenu = new DataTable(tableElement, {
        data: {
          headings: ["No", "Gambar", "Nama Menu", "Harga", "Tipe", "Aksi"], // Changed from "Nama Kategori" to "Nama Menu"
          data: menus.value.map((menu, index) => [
            index + 1,
            `<img src="${menu.image.link}" style="width: 100px; height: auto; cursor: pointer;" class="preview-img" data-bs-toggle="modal" data-bs-target="#imagePreviewModal" data-img-src="${menu.image.link}">`,
            menu.name,
            formatNominalRupiah(menu.price),
            menu.type,

            `<button class="btn btn-warning btn-sm edit-btn" data-id="${menu.uuid}">Edit</button>
                         <button class="btn btn-danger btn-sm delete-btn" data-id="${menu.uuid}">Delete</button>`,
          ]),
        },
      });

      document.querySelectorAll(".preview-img").forEach((img) => {
        img.addEventListener("click", function () {
          document.getElementById("previewImage").src = this.dataset.imgSrc;
          // imageModal.show();
        });
      });

      // Add event listeners for Edit and Delete buttons
      tableElement.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const menuId = button.getAttribute("data-id");
          const menu = menus.value.find((m) => m.uuid === menuId); // Ensure to use uuid
          editMenu(menu);
        });
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const menuId = button.getAttribute("data-id");
          deleteMenuHandler(menuId);
        });
      });
    };

    const formattedPrice = computed({
      get() {
        return formatNominalRupiah(currentMenu.value.price);
      },
      set(value) {
        currentMenu.value.price = parseRupiah(value);
      },
    });


    // foodComponent.js
    const createMenuHandler = async (menuData) => {
      try {

        await createMenu(menuData);
        hideModal();
        await loadMenus();
        Swal.fire(
          "Added!",
          "The menu item has been added successfully.",
          "success"
        );


      } catch (error) {
        console.error("Error creating menu:", error);
        Swal.fire(
          "Failed!",
          "There was an error adding the menu item.",
          "error"
        );
      }
    };

    const updateMenuHandler = async (uuid, menuData) => {
      try {
        // Cek jika `image.uuid` ada dan atur `image` menjadi null
        if (menuData.image.uuid) {
          menuData.image = null;
        }
        await updateMenu(uuid, menuData);
        await loadMenus();
        Swal.fire(
          "Updated!",
          "The menu item has been updated successfully.",
          "success"
        );
        hideModal();
      } catch (error) {
        console.error(`Error updating menu with uuid ${uuid}:`, error);
        Swal.fire(
          "Failed!",
          "There was an error updating the menu item.",
          "error"
        );
      }
      hideModal();

    };

    const editMenu = (Menu) => {
      currentMenu.value = {
        ...Menu,
      };
      modalInstance.value.show();
    };

    const deleteMenuHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this menu item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deleteMenu(uuid);
          await loadMenus();
          Swal.fire("Deleted!", "The menu item has been deleted.", "success");
        } catch (error) {
          console.error(`Error deleting menu with uuid ${uuid}:`, error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the menu item.",
            "error"
          );
        }
      }
    };

    onMounted(() => {
      loadCategories();
      loadMenus(); // Load menus when the component is mounted
      modalInstance.value = new bootstrap.Modal(
        document.getElementById("menuModal"), {}
      );
      const inputElement = document.getElementById('menuPrice');
      inputElement.addEventListener('keyup', function (e) {
        this.value = formatRupiah(this.value, 'Rp. ');
      });

    });


    return {
      formattedPrice,
      menus,
      categories,
      currentMenu,
      openAddModal,
      hideModal,
      createMenuHandler,
      updateMenuHandler,
      deleteMenuHandler,
      editMenu,
      handleImageChange,
    };
  },
};

import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/foodService"; // sesuaikan dengan path file yang berisi kode yang Anda berikan
import { DataTable } from "simple-datatables";

export default {
  setup() {
    const categories = ref([]);
    const currentCategory = ref({
      name: "",
    });
    let dataTableInstance = null;
    const modalInstance = ref(null);

    const loadCategories = async () => {
      try {
        const response = await getCategories();
        categories.value = response.data;
        initializeDataTable(); // Panggil fungsi untuk inisialisasi DataTable
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    const initializeDataTable = () => {
      // Inisialisasi DataTable jika belum diinisialisasi
      if (dataTableInstance) {
        dataTableInstance.destroy(); // Hancurkan instance sebelumnya jika ada
      }

      const tableElement = document.getElementById("datatablesSimple");
      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: ["No", "Nama Kategori", "Aksi"],
          data: categories.value.map((category, index) => [
            index + 1,
            category.name,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${category.uuid}">Edit</button>
                         <button class="btn btn-danger btn-sm delete-btn" data-id="${category.uuid}">Delete</button>`,
          ]),
        },
      });

      // Tambahkan event listener untuk tombol Edit dan Delete
      tableElement.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const categoryId = button.getAttribute("data-id");
          const category = categories.value.find(
            (cat) => cat.uuid === categoryId
          ); // Pastikan menggunakan uuid
          editCategory(category);
        });
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const categoryId = button.getAttribute("data-id");
          deleteCategoryHandler(categoryId);
        });
      });
    };

    const openAddModal = () => {
      currentCategory.value = {
        name: "",
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

    const createCategoryHandler = async (name) => {
      try {
        await createCategory(name);
        await loadCategories();
        hideModal();
        Swal.fire(
          "Ditambahkan!",
          "Kategori telah berhasil ditambahkan.",
          "success"
        ); // Close the modal
      } catch (error) {
        Swal.fire(
          "Gagal!",
          "Terjadi kesalahan saat menambahkan kategori.",
          "error"
        );
        // console.error("Error creating category:", error);
      }
    };

    const updateCategoryHandler = async (uuid, name) => {
      try {
        await updateCategory(uuid, name);
        await loadCategories();
        hideModal();
        Swal.fire(
          "Ditambahkan!",
          "Kategori telah berhasil ditambahkan.",
          "success"
        ); // Close the modal
      } catch (error) {
        Swal.fire(
          "Gagal!",
          "Terjadi kesalahan saat menambahkan kategori.",
          "error"
        );
        // console.error("Error creating category:", error);
      }
    };

    const editCategory = (category) => {
      currentCategory.value = {
        ...category,
      };
      new bootstrap.Modal(document.getElementById("categoryModal")).show();
    };

    const deleteCategoryHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Ingin menghapus kategori ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
      });

      if (result.isConfirmed) {
        try {
          await deleteCategory(uuid);
          await loadCategories();
          Swal.fire("Dihapus!", "Kategori telah berhasil dihapus.", "success");
        } catch (error) {
          console.error(`Error deleting category with UUID ${uuid}:`, error);
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus kategori.",
            "error"
          );
        }
      }
    };

    onMounted(() => {
      modalInstance.value = new bootstrap.Modal(
        document.getElementById("categoryModal"),
        {
          // additional options here if needed
        }
      );
      loadCategories();
    });

    return {
      categories,
      currentCategory,
      openAddModal,
      hideModal,
      createCategoryHandler,
      updateCategoryHandler,
      editCategory,
      deleteCategoryHandler,
    };
  },
};

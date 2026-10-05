import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

import {
  getAllTestimonials,
  createTestimonial,
  getTestimonialById,
  updateTestimonial,
  getAllCustomer, 
  createTestimonialFromUser,
  deleteTestimonial,
} from '../services/testimonialService'; // Adjust according to the actual path
import { DataTable } from 'simple-datatables';


export default {
  setup() {
    const testimonials = ref([]);
    const dataCustomer = ref([]);
    const currentTestimonial = ref({
      customer_id: "",
      rating: "",
      testimonial: ""
    });
    let dataTableInstance = null;
    const modalInstance = ref(null);

    const loadTestimonials = async () => {
      try {
        const response = await getAllTestimonials();
        testimonials.value = response.data.data;
        const responseDataCustomer = await getAllCustomer();
        dataCustomer.value = responseDataCustomer.data.data;
        initializeDataTable();
      } catch (error) {
        console.error("Error loading testimonials:", error);
      }
    };

    const initializeDataTable = () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }

      const tableElement = document.getElementById("datatablesSimple");
      dataTableInstance = new DataTable(tableElement, {
        data: {
          headings: ["No", "Nama Customer", "Rating", "Testimonial", "Actions"],
          data: testimonials.value.map((testimonial, index) => [
            index + 1,
            testimonial.customer.name,
            testimonial.rating,
            testimonial.testimonial,
            `<button class="btn btn-warning btn-sm edit-btn" data-id="${testimonial.uuid}">Edit</button>
             <button class="btn btn-danger btn-sm delete-btn" data-id="${testimonial.uuid}">Delete</button>`,
          ]),
        },
      });

      tableElement.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const testimonialId = button.getAttribute("data-id");
          const testimonial = testimonials.value.find(t => t.uuid === testimonialId);
          editTestimonial(testimonial);
        });
      });

      tableElement.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const testimonialId = button.getAttribute("data-id");
          deleteTestimonialHandler(testimonialId);
        });
      });
    };

    const openAddModal = () => {
      currentTestimonial.value = { customer_id: "", rating: "", testimonial: "" };
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      }
    };

    const addTestimonialHandler = async () => {
      try {
        await createTestimonial(currentTestimonial.value.customer_id.uuid, currentTestimonial.value.rating, currentTestimonial.value.testimonial);
        // console.log(currentTestimonial.value);
        
        await loadTestimonials();
        hideModal();
        Swal.fire("Added!", "Testimonial has been added successfully.", "success");
      } catch (error) {
        Swal.fire("Failed!", "There was an error adding the testimonial.", "error");
      }
    };

    const editTestimonial = (testimonial) => {
      currentTestimonial.value = { ...testimonial };
      modalInstance.value.show();
    };

    const updateTestimonialHandler = async () => {
      try {
        await updateTestimonial(currentTestimonial.value.uuid, currentTestimonial.value.customer_id, currentTestimonial.value.rating, currentTestimonial.value.testimonial );
        // console.log(currentTestimonial.value);
        
        await loadTestimonials();
        hideModal();
        Swal.fire("Updated!", "Testimonial has been updated successfully.", "success");
      } catch (error) {
        Swal.fire("Failed!", "There was an error updating the testimonial.", "error");
      }
    };

    const deleteTestimonialHandler = async (uuid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this testimonial?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        try {
          await deleteTestimonial(uuid);
          await loadTestimonials();
          Swal.fire("Deleted!", "Testimonial has been deleted successfully.", "success");
        } catch (error) {
          Swal.fire("Failed!", "There was an error deleting the testimonial.", "error");
        }
      }
    };

    const validateInputRange = (event, min = 1, max = 5, errorMessage = 'Tolong isi rating dari 1 sampai 5') => {
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

    onMounted(() => {
      loadTestimonials();
      modalInstance.value = new bootstrap.Modal(document.getElementById("testimonialModal"), {
        keyboard: false
      });
    });

    return {
      validateInputRange,
      dataCustomer,
      testimonials,
      currentTestimonial,
      openAddModal,
      hideModal,
      addTestimonialHandler,
      editTestimonial,
      updateTestimonialHandler,
      deleteTestimonialHandler,
      initializeDataTable
    };
  },
};

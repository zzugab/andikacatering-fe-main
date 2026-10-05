<template>
    <div class="nav-fixed">
        <NavbarDashboard />
        <div id="layoutSidenav">
            <Sidebar />
            <div id="layoutSidenav_content">
                <main>
                    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div class="container-xl px-4">
                            <div class="page-header-content pt-4">
                                <div class="row align-items-center justify-content-between">
                                    <div class="col-auto mt-4">
                                        <h1 class="page-header-title">
                                            <div class="page-header-icon">
                                                <i data-feather="message-circle"></i>
                                            </div>
                                            Daftar Testimoni
                                        </h1>
                                        <div class="page-header-subtitle">Kelola testimoni pelanggan dengan mudah</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <!-- Main page content-->
                    <div class="container-xl px-4 mt-n10">
                        <!-- Table Section -->
                        <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h2>Data Testimoni</h2>
                                <button class="btn btn-primary" @click="openAddModal">
                                    Tambah Testimoni
                                </button>
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple"></table>
                            </div>
                        </div>

                        <!-- Modal for Adding/Editing Testimonial -->
                        <div class="modal fade" id="testimonialModal" tabindex="-1"
                            aria-labelledby="testimonialModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="testimonialModalLabel">
                                            {{ currentTestimonial && currentTestimonial.uuid ? "Edit Testimoni" :
                                                "Tambah Testimoni" }}
                                        </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form
                                            @submit.prevent="currentTestimonial && currentTestimonial.uuid ? updateTestimonialHandler() : addTestimonialHandler()">
                                            <div class="mb-3">
                                                <label for="testimonialCustomer" class="form-label">ID Pelanggan</label>
                                                <div
                                                    v-if="currentTestimonial.customer && currentTestimonial.customer.name">
                                                    <input type="text" class="form-control"
                                                    :placeholder="currentTestimonial.customer && currentTestimonial.customer.name ? currentTestimonial.customer.name : 'Pilih Customer'"
                                                    v-model="currentTestimonial.customer.name" :disabled="!!currentTestimonial.uuid" required />
                                                </div>
                                                <div v-else>
                                                    <multiselect v-model="currentTestimonial.customer_id"
                                                    :options="dataCustomer" :multiple="false" :close-on-select="true"
                                                    label="name" track-by="uuid"
                                                    placeholder="Pilih Customer"
                                                    :value="currentTestimonial.uuid ? currentTestimonial.uuid : currentTestimonial.customer_id"
                                                    :disabled="!!currentTestimonial.uuid" />
                                                </div>
                                                

                                                <label for="testimonialRating" class="form-label">Rating</label>
                                                <input type="number" class="form-control" id="testimonialRating"
                                                    v-model="currentTestimonial.rating" 
                                                    @input="validateInputRange($event, 1, 5, 'Tolong isi rating dari 1 sampai 5');" required />

                                                <label for="testimonialText" class="form-label">Testimoni</label>
                                                <textarea class="form-control" id="testimonialText"
                                                    v-model="currentTestimonial.testimonial" required></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-primary">
                                                {{ currentTestimonial && currentTestimonial.uuid ? "Update" : "Tambah"
                                                }}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer class="footer-admin mt-auto footer-light">
                    <div class="container-xl px-4">
                        <div class="row">
                            <div class="col-md-6 small">
                                Copyright &copy; Your Website 2021
                            </div>
                            <div class="col-md-6 text-md-end small">
                                <a href="#!">Privacy Policy</a> &middot;
                                <a href="#!">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import testimonialComponent from '../../../api/component/testimonialComponent'; // Adjust according to the correct path
import Sidebar from '../../Components/Sidebar.vue';
import NavbarDashboard from '../../Components/NavbarDasboard.vue';
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css"; // Import CSS for Vue Multiselect


export default {
    components: {
        NavbarDashboard,
        Sidebar,
        Multiselect,
    },
    setup() {
        const {
            validateInputRange,
            dataCustomer,
            testimonials,
            currentTestimonial,
            openAddModal,
            addTestimonialHandler,
            updateTestimonialHandler,
            deleteTestimonialHandler,
            initializeDataTable,
        } = testimonialComponent.setup();




        return {
            validateInputRange,
            dataCustomer,
            testimonials,
            currentTestimonial,
            openAddModal,
            addTestimonialHandler,
            updateTestimonialHandler,
            deleteTestimonialHandler,
            initializeDataTable,
        };
    },
};
</script>
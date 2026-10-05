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
                                                <i data-feather="credit-card"></i>
                                            </div>
                                            Bank Accounts
                                        </h1>
                                        <div class="page-header-subtitle">
                                            Manage all your bank accounts here.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <!-- Main page content-->
                    <div class="container-xl px-4 mt-n10">
                        <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h2>Bank Accounts</h2>
                                <button class="btn btn-primary" @click="openAddModal">
                                    Add Account
                                </button>
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple" class="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Account Number</th>
                                            <th>Account Owner</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
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
                                <a href="#!">Terms & Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
    <!-- Add/Edit Modal -->
    <div class="modal fade" id="bankAccountModal" tabindex="-1" aria-labelledby="bankAccountModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="bankAccountModalLabel">Add/Edit Bank Account</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form
                        @submit.prevent="currentBankAccount.uuid ? updateBankAccountHandler( currentBankAccount.uuid, currentBankAccount) : createBankAccountHandler(currentBankAccount)">
                        <div class="form-group">
                            <label for="name">Bank Name:</label>
                            <input type="text" class="form-control" id="name" v-model="currentBankAccount.name"
                                required />
                        </div>
                        <div class="form-group">
                            <label for="account_number">Account Number:</label>
                            <input type="text" class="form-control" id="account_number"
                                v-model="currentBankAccount.account_number" required />
                        </div>
                        <div class="form-group">
                            <label for="account_owner">Account Owner:</label>
                            <input type="text" class="form-control" id="account_owner"
                                v-model="currentBankAccount.account_owner" required />
                        </div>
                        <div class="d-flex justify-content-center mt-4">
                            <button type="submit" class="btn btn-primary">{{ currentBankAccount.uuid ? 'Update' : 'Add'
                                }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarDashboard from "../../Components/NavbarDasboard.vue";
import Sidebar from "../../Components/Sidebar.vue";
import BankComponent from "../../../api/component/bankDataComponent";

export default {
    components: {
        NavbarDashboard,
        Sidebar,
    },
    setup() {
        return BankComponent.setup();
    },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css");
@import url("../../../assets/css/styles.css");
</style>
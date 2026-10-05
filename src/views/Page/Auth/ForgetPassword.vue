<template>
    <div class="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container-xl px-4">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <!-- Basic forgot password form-->
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header justify-content-center">
                      <h3 class="fw-light my-4">Password Recovery</h3>
                    </div>
                    <div class="card-body">
                      <div class="small mb-3 text-muted">
                        Enter your email address and we will send you a link to reset your password.
                      </div>
                      <!-- Forgot password form-->
                      <form @submit.prevent="resetPassword">
                        <!-- Form Group (email address)-->
                        <div class="mb-3">
                          <label class="small mb-1" for="inputEmailAddress">Email</label>
                          <input
                            class="form-control"
                            id="inputEmailAddress"
                            type="email"
                            v-model="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email address"
                            required
                          />
                        </div>
                        <!-- Form Group (submit options)-->
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <router-link class="small" to="/login">Return to login</router-link>
                          <button class="btn btn-primary" type="submit">Reset Password</button>
                        </div>
                      </form>
                    </div>
                    <div class="card-footer text-center">
                      <div class="small">
                        <router-link to="/register">Need an account? Sign up!</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer class="footer-admin mt-auto footer-dark">
            <div class="container-xl px-4">
              <div class="row">
                <div class="col-md-6 small">Copyright &copy; Your Website 2024</div>
                <div class="col-md-6 text-md-end small">
                  <a href="#!">Privacy Policy</a>
                  &middot;
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
  export default {
    name: 'ForgetPassword',
    data() {
      return {
        email: ''
      };
    },
    methods: {
      resetPassword() {
        // Handle password reset logic here
        console.log('Email:', this.email);
        // Example: Send email to reset password
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.css');
  @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
  @import url('../../../assets/css/styles.css'); /* Ganti dengan path CSS Anda */
  
  /* Tambahkan style tambahan di sini */
  .bg-primary {
    background-color: #007bff;
  }
  
  #layoutAuthentication {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  #layoutAuthentication_footer {
    flex-shrink: 0;
  }
  
  .footer-admin {
    background-color: #343a40;
    color: #fff;
    padding: 1rem 0;
  }
  </style>
  
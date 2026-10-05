<!-- src/views/Page/NotFound.vue -->
<template>
  <div class="container text-center">
    <div id="layoutError_content">
      <main>
        <div class="container-xl px-4 mt-5">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mt-4">
                <img
                  class="img-fluid p-4"
                  src="../../assets/assets/img/illustrations/400-error-bad-request.svg"
                  alt=""
                />
                <p class="lead">
                  Your client has issued a malformed or illegal request.
                </p>
                <router-link
                  to="#"
                  class="text-arrow-icon"
                  @click.prevent="goBack"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-arrow-left ms-0 me-1"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Return to Dashboard
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "NotFound",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
  
  <style>
@import url("../../assets/css/styles.css");
</style>
  
  <style scoped>
.card {
  background-color: #f8f9fa;
}

.btn-primary {
  margin-top: 20px;
}
</style>
  
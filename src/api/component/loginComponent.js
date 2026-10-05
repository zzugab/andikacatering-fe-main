import log from 'node-forge/lib/log';
import { loginUser } from '../../api/services/authService';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      usernameOrEmail: '',
      password: '',
      remember: false,
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        this.isLoading = true;
        const userData = {
          namemail: this.usernameOrEmail,
          password: this.password,
          remember: this.remember
        };
        const response = await loginUser(userData);
        if (response.message == 200) {
          this.$router.push('/app/dashboard').then(() => {
            window.location.reload(); // reload penuh
          });
        } else {
          this.isLoading = false;
          Swal.fire(
            'Failed!',
            response.message || 'Terdapat Kesalahan Coba Ulangi Lagi.',
            'error'
          ).then(() => {
            this.$router.go(0); // Refresh halaman menggunakan Vue Router
          });
        };
        
      } catch (error) {
        this.isLoading = false;
        Swal.fire(
          'Failed!',
          'Username atau Email Tidak Cocok Dengan Password.',
          'error'
        );
      }
    }
  }
};
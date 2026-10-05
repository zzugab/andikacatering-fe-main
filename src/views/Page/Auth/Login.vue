<template>
  <main class="login-page">
    <section class="login-card">
      <div class="login-form-panel">
        <div class="brand">
          <img src="../../../assets/img/andika.svg" alt="Andika Sari Catering" />
          <div>
            <strong>Andika Sari</strong>
            <span>Catering</span>
          </div>
        </div>

        <div class="login-copy">
          <p class="eyebrow">Masuk Dashboard</p>
          <h1>Selamat Datang Kembali</h1>
          <p>Kelola pesanan, menu, pelanggan, dan operasional catering dalam satu tempat.</p>
        </div>

        <form class="login-form" @submit.prevent="login">
          <label for="inputUsernameOrEmail">Email atau Username</label>
          <input
            id="inputUsernameOrEmail"
            type="text"
            v-model="usernameOrEmail"
            placeholder="Masukkan email atau username"
            required
          />

          <label for="inputPassword">Password</label>
          <input
            id="inputPassword"
            type="password"
            v-model="password"
            placeholder="Masukkan password"
            required
          />

          <div class="form-options">
            <label class="remember" for="rememberPasswordCheck">
              <input id="rememberPasswordCheck" type="checkbox" v-model="remember" />
              Ingat Saya
            </label>
          </div>

          <button class="login-button" :disabled="isLoading" type="submit">
            {{ isLoading ? 'Memproses...' : 'Login' }}
          </button>

          <div v-if="isLoading" class="spinner"></div>
        </form>
      </div>

      <div class="login-visual-panel">
        <div class="visual-badge">Pemesanan Catering</div>
        <img src="../../../assets/img/catering-image.png" alt="Ilustrasi pemesanan catering" />
        <div class="visual-card order-card">
          <span>Pesanan Hari Ini</span>
          <strong>24 Paket</strong>
        </div>
        <div class="visual-card delivery-card">
          <span>Status</span>
          <strong>Siap Dikirim</strong>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import loginComponent from "../../../api/component/loginComponent";

export default {
  mixins: [loginComponent],
};
</script>

<style>
@import url("../../../assets/css/styles.css");

.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background:
    radial-gradient(circle at top left, rgba(111, 66, 193, 0.16), transparent 34rem),
    linear-gradient(135deg, #f6f7fb 0%, #eef3ff 100%);
}

.login-card {
  width: min(1080px, 100%);
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  overflow: hidden;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 24px 70px rgba(30, 41, 59, 0.14);
}

.login-form-panel {
  padding: clamp(2rem, 4vw, 4rem);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 3rem;
  color: #1f2937;
}

.brand img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.brand strong,
.brand span {
  display: block;
  line-height: 1.1;
}

.brand span {
  color: #7c3aed;
  font-weight: 700;
}

.login-copy {
  margin-bottom: 2rem;
}

.eyebrow {
  margin-bottom: 0.65rem;
  color: #7c3aed;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.login-copy h1 {
  margin: 0 0 0.85rem;
  color: #111827;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.login-copy p:last-child {
  margin: 0;
  color: #6b7280;
  line-height: 1.7;
}

.login-form label {
  display: block;
  margin: 1rem 0 0.45rem;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 700;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  height: 3.25rem;
  padding: 0 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.95rem;
  background: #f9fafb;
  color: #111827;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.login-form input:focus {
  border-color: #8b5cf6;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.14);
}

.form-options {
  display: flex;
  align-items: center;
  margin: 1rem 0 1.25rem;
}

.remember {
  display: inline-flex !important;
  align-items: center;
  gap: 0.55rem;
  margin: 0 !important;
  color: #4b5563 !important;
  font-weight: 600 !important;
}

.remember input {
  width: 1rem;
  height: 1rem;
  accent-color: #7c3aed;
}

.login-button {
  width: 100%;
  height: 3.35rem;
  border: 0;
  border-radius: 1rem;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #7c3aed, #4f46e5 55%, #0ea5e9);
  box-shadow: 0 14px 28px rgba(79, 70, 229, 0.26);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.04);
  box-shadow: 0 18px 34px rgba(79, 70, 229, 0.34);
}

.login-button:disabled {
  cursor: not-allowed;
  filter: grayscale(0.5);
  opacity: 0.75;
}

.login-visual-panel {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 620px;
  padding: 3rem;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.65), transparent 18rem),
    linear-gradient(145deg, #ede9fe, #dbeafe 58%, #eff6ff);
}

.login-visual-panel::before,
.login-visual-panel::after {
  content: "";
  position: absolute;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
}

.login-visual-panel::before {
  width: 260px;
  height: 260px;
  right: -70px;
  top: -70px;
}

.login-visual-panel::after {
  width: 180px;
  height: 180px;
  left: -50px;
  bottom: 42px;
}

.login-visual-panel img {
  position: relative;
  z-index: 1;
  width: min(430px, 90%);
  filter: drop-shadow(0 28px 28px rgba(30, 41, 59, 0.16));
}

.visual-badge,
.visual-card {
  position: absolute;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 18px 38px rgba(79, 70, 229, 0.12);
  backdrop-filter: blur(14px);
}

.visual-badge {
  top: 2.5rem;
  right: 2.5rem;
  padding: 0.65rem 1rem;
  color: #5b21b6;
  font-weight: 800;
}

.visual-card {
  padding: 0.9rem 1.1rem;
}

.visual-card span,
.visual-card strong {
  display: block;
}

.visual-card span {
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 700;
}

.visual-card strong {
  color: #1e1b4b;
  font-size: 1rem;
}

.order-card {
  left: 2.3rem;
  top: 7rem;
}

.delivery-card {
  right: 2.6rem;
  bottom: 5rem;
}

.spinner {
  width: 38px;
  height: 38px;
  margin: 1rem auto 0;
  border: 4px solid rgba(124, 58, 237, 0.12);
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .login-card {
    grid-template-columns: 1fr;
  }

  .login-visual-panel {
    order: -1;
    min-height: 260px;
    padding: 2rem;
  }

  .login-visual-panel img {
    width: min(280px, 75%);
  }

  .visual-card {
    display: none;
  }
}

@media (max-width: 560px) {
  .login-page {
    padding: 1rem;
  }

  .login-card {
    border-radius: 1.35rem;
  }

  .login-form-panel {
    padding: 1.5rem;
  }

  .brand {
    margin-bottom: 2rem;
  }

  .login-visual-panel {
    display: none;
  }
}
</style>

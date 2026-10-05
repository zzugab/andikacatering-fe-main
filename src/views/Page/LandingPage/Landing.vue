<template>
  <div class="landing-page">
    <nav class="navbar navbar-expand-lg landing-navbar" aria-label="Navigasi utama">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img class="icon-andika" src="../../../assets/img/andika.svg" alt="Andika Sari Catering" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><a class="nav-link" href="#beranda">Beranda</a></li>
            <li class="nav-item"><a class="nav-link" href="#paket">Paket</a></li>
            <li class="nav-item"><a class="nav-link" href="#menu">Menu</a></li>
            <li class="nav-item"><a class="nav-link" href="#testimoni">Testimoni</a></li>
            <li class="nav-item"><a class="nav-link" href="#kontak">Kontak</a></li>
          </ul>
          <a class="btn btn-primary-andika navbar-login" href="/login">Login</a>
        </div>
      </div>
    </nav>

    <main>
      <section class="main-header" id="beranda">
        <div class="container">
          <div class="row align-items-center g-5">
            <div class="col-lg-6 hero-copy">
              <span class="section-kicker">Andika Sari Catering</span>
              <h1>Cita rasa Pilihan Masakan Indonesia Bersama Andika Sari Catering</h1>
              <p>Konsep catering yang dirancang membuat para pelanggan yang ingin membuat acara secara simpel dan efisien.</p>
              <div class="hero-actions">
                <a href="#menu" class="btn btn-primary-andika">Menu</a>
                <a href="#kontak" class="btn btn-outline-danger">Pesan Sekarang</a>
              </div>
            </div>
            <div class="col-lg-6 hero-image-wrap">
              <img src="../../../assets/img/catering-image.png" class="hero-image" alt="Catering Image" />
            </div>
          </div>
        </div>
      </section>

      <section class="stats-wrap" aria-label="Statistik Andika Sari Catering">
        <div class="container">
          <div class="stats-section">
            <article class="stats-item">
              <i class="bi bi-people"></i>
              <strong>1.000+</strong>
              <h4>Pelanggan</h4>
            </article>
            <article class="stats-item">
              <i class="bi bi-house"></i>
              <strong>20</strong>
              <h4>Acara</h4>
            </article>
            <article class="stats-item">
              <i class="bi bi-menu-button-wide"></i>
              <strong>79</strong>
              <h4>Menu</h4>
            </article>
          </div>
        </div>
      </section>

      <section class="why-us-section">
        <div class="container">
          <div class="row align-items-center g-5">
            <div class="col-lg-6">
              <img src="../../../assets/img/why-image.png" class="why-image" alt="Catering Image" />
            </div>
            <div class="col-lg-6">
              <span class="section-kicker">Keunggulan Kami</span>
              <h2>Kenapa harus kami?</h2>
              <p>Kami telah melayani berbagai jenis acara dengan profesionalisme dan dedikasi tinggi.</p>
              <div class="feature-grid">
                <div class="icon-text"><i class="fas fa-check-circle text-danger"></i><p>Pengalaman Lebih dari 15 Tahun</p></div>
                <div class="icon-text"><i class="fas fa-check-circle text-danger"></i><p>Kualitas Makanan Terbaik</p></div>
                <div class="icon-text"><i class="fas fa-check-circle text-danger"></i><p>Pelayanan Profesional</p></div>
                <div class="icon-text"><i class="fas fa-check-circle text-danger"></i><p>Fleksibilitas Menu</p></div>
                <div class="icon-text"><i class="fas fa-check-circle text-danger"></i><p>Kebersihan dan Higienis</p></div>
                <div class="icon-text"><i class="fas fa-check-circle text-danger"></i><p>Dukungan Event</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="event-section container">
        <div class="section-title text-center fw-bold">
          <h1>Layanan Jenis Acara Catering Kami</h1>
        </div>
        <div class="event-grid">
          <article class="event-card">
            <img src="../../../assets/img/icon-1.png" alt="Pesta Ulang Tahun" />
            <h2>Pesta Ulang Tahun</h2>
          </article>
          <article class="event-card">
            <img src="../../../assets/img/icon-2.png" alt="Pesta Pernikahan" />
            <h2>Pesta Pernikahan</h2>
          </article>
          <article class="event-card">
            <img src="../../../assets/img/icon-3.png" alt="Acara Kantor" />
            <h2>Acara Kantor</h2>
          </article>
          <article class="event-card">
            <img src="../../../assets/img/icon-4.png" alt="Syukuran Keluarga" />
            <h2 class="fw-bold">Syukuran Keluarga</h2>
          </article>
        </div>
      </section>

      <section class="container pricing-table" id="paket" v-if="landingData.package && landingData.package.data">
        <div class="section-title">
          <span class="section-kicker">Paket Catering</span>
          <h1>Daftar Paket</h1>
          <p>Pilih paket catering yang sesuai dengan kebutuhan acara Anda.</p>
        </div>
        <div class="row g-4">
          <div v-for="pkg in landingData.package.data" :key="pkg.uuid" class="col-md-4">
            <article class="package-card">
              <h3>{{ pkg.name }}</h3>
              <div class="price">Rp {{ pkg.price.toLocaleString() }}<span>/Pax</span></div>
              <h4>{{ pkg.type }}</h4>
              <ul>
                <li v-for="category in pkg.category" :key="category">{{ category }}</li>
              </ul>
              <div v-if="pkg.stall && pkg.stall.length > 0">
                <h4>Stall Information:</h4>
                <ul>
                  <li v-for="stall in pkg.stall" :key="stall.name">{{ stall.name }} - {{ stall.quantity_percent }}%</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
        <div class="text-center">
          <a class="btn btn-primary-andika mt-4" href="#">Lihat Pamflet</a>
        </div>
      </section>

      <section class="container food-stall" id="menu">
        <div class="section-title">
          <span class="section-kicker">Pilihan Menu</span>
          <h1>Aneka Menu</h1>
          <p>Aneka Menu untuk berbagai hidangan </p>
        </div>
        <div class="row g-4">
          <div class="col-md-3" v-for="food in landingData.menu" :key="food.uuid">
            <article class="menu-card">
              <img :src="`${STORAGE_URL}/storage/uploads/menu/${food.image.name}`" alt="Gambar Menu" />
              <h5>{{ food.name }}</h5>
              <div class="price">Rp {{ food.price }}</div>
              <p>{{ food.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="container food-stall" id="food-stall">
        <div class="section-title">
          <span class="section-kicker">Food Stall</span>
          <h1>Aneka Food Stall</h1>
          <p>Menu Food Stall paling laris dan paling disukai</p>
        </div>
        <div class="row g-4">
          <div class="col-md-3" v-for="food in landingData.foodstall" :key="food.uuid">
            <article class="menu-card">
              <img :src="`${STORAGE_URL}/storage/uploads/menu/${food.image.name}`" alt="Gambar Menu" />
              <h5>{{ food.name }}</h5>
              <div class="price">Rp {{ food.price }}</div>
              <p>{{ food.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- <section class="container testimonial-section text-center" id="testimoni">
        <div class="section-title">
          <span class="section-kicker">Ulasan Pelanggan</span>
          <h2>Testimoni</h2>
        </div>
        <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(group, index) in groupedTestimonials" :key="index" :class="{ 'carousel-item': true, active: index === 0 }">
              <div class="testimonial-grid">
                <article v-for="testimonial in group" :key="testimonial.uuid" class="testimonial-card text-center">
                  <img src="https://via.placeholder.com/100" alt="Customer Image" />
                  <h5>{{ testimonial.customer.name }}</h5>
                  <p>{{ testimonial.testimonial }}</p>
                </article>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section> -->

      <section class="container contact-wrap" id="kontak">
        <div class="contact-section">
          <div class="content">
            <h1>Kontak Kami</h1>
            <p>Sudah melihat semua menu dan paket tapi masih bingung dengan pilihan? Hubungi Kami untuk menentukan pilihan terbaik mu</p>
            <button class="btn btn-contact"><i class="bi bi-telephone-fill"></i> Hubungi Kami</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-5">
            <h5 class="text-white">Andika Sari Catering</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames ut dictumst urna, lorem nibh. Pretium leo hendrerit interdum netus.</p>
            <h6 class="text-white">Jam Operasional Kantor</h6>
            <div class="operational-hours">
              <div class="day">Senin s/d Jumat<br>08:00 - 17:00</div>
              <div class="day">Sabtu<br>08:00 - 13:00</div>
              <div class="closed">Minggu<br>Libur</div>
            </div>
          </div>
          <nav class="col-md-3" aria-label="Navigasi footer">
            <h6 class="text-white">Navigasi</h6>
            <ul class="list-unstyled">
              <li class="my-2">Beranda</li>
              <li class="my-2">Layanan</li>
              <!-- <li class="my-2">Testimoni</li> -->
              <li class="my-2">Kontak</li>
              <li class="my-2">Tentang Kami</li>
            </ul>
          </nav>
          <div class="col-md-4">
            <h6 class="text-white">Kontak Kami</h6>
            <ul class="list-unstyled contact-info">
              <li class="my-2"><i class="bi bi-telephone-fill"></i> 0813-1152-2779 (Dini)</li>
              <li class="my-2"><i class="bi bi-telephone-fill"></i> 0812-8398-1980 (Ina)</li>
              <li class="my-2"><i class="bi bi-envelope-fill"></i> andikasaricateringserang@gmail.com</li>
              <li class="my-2"><i class="bi bi-geo-alt-fill"></i> JL. SMU Negeri Kramatwatu No. 02 RT. 07 RW. 04</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <div class="copyright-bar text-center text-white">© Hak cipta dilindungi. PT Digital Inti Data</div>
  </div>
</template>

<script>
import LandingComponent from '../../../api/component/landingComponent';
import { STORAGE_URL } from '../../../config';

export default {
  components: {
    LandingComponent
  },
  setup() {
    const {
      landingData,
      groupedTestimonials,
      loadLandingData
    } = LandingComponent.setup();

    return {
      landingData,
      groupedTestimonials,
      loadLandingData,
      STORAGE_URL,
    };
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css");
@import url("../../../assets/css/index.css");
</style>

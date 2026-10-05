<template>
  <div id="layoutSidenav_nav">
    <nav class="sidenav shadow-right sidenav-light">
      <div class="sidenav-menu">
        <div class="nav accordion" id="accordionSidenav">

          <div class="sidenav-menu-heading" @click="toggle('ringkasan')" role="button">
            <span><i data-feather="bar-chart-2" class="me-2"></i>Ringkasan</span>
            <div class="sidenav-collapse-arrow" :class="{ collapsed: !expanded.ringkasan }">
              <i data-feather="chevron-down"></i>
            </div>
          </div>
          <Transition name="slide">
            <div v-show="expanded.ringkasan" class="sidenav-section-content">
              <router-link class="nav-link" :class="{ active: $route.path === '/app/dashboard' }" to="/app/dashboard">
                <div class="nav-link-icon"><i data-feather="activity"></i></div>
                Dashboard
              </router-link>
            </div>
          </Transition>

          <div class="sidenav-menu-heading" @click="toggle('makanan')" role="button">
            <span><i data-feather="book-open" class="me-2"></i>Menu Makanan</span>
            <div class="sidenav-collapse-arrow" :class="{ collapsed: !expanded.makanan }">
              <i data-feather="chevron-down"></i>
            </div>
          </div>
          <Transition name="slide">
            <div v-show="expanded.makanan" class="sidenav-section-content">
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/menu/food') }" to="/app/menu/food">
                <div class="nav-link-icon"><i data-feather="grid"></i></div>
                Data Makanan
              </router-link>
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/menu/package-food') }" to="/app/menu/package-food">
                <div class="nav-link-icon"><i data-feather="grid"></i></div>
                Data Paket
              </router-link>
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/menu/recipes-food') }" to="/app/menu/recipes-food">
                <div class="nav-link-icon"><i data-feather="grid"></i></div>
                Data Resep
              </router-link>
            </div>
          </Transition>

          <div class="sidenav-menu-heading" @click="toggle('pelanggan')" role="button">
            <span><i data-feather="users" class="me-2"></i>Pelanggan</span>
            <div class="sidenav-collapse-arrow" :class="{ collapsed: !expanded.pelanggan }">
              <i data-feather="chevron-down"></i>
            </div>
          </div>
          <Transition name="slide">
            <div v-show="expanded.pelanggan" class="sidenav-section-content">
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/pelanggan') }" to="/app/pelanggan/customer">
                <div class="nav-link-icon"><i data-feather="users"></i></div>
                Data Pelanggan
              </router-link>
              <router-link class="nav-link" :class="{ active: $route.path === '/app/testimonial' }" to="/app/testimonial">
                <div class="nav-link-icon"><i data-feather="message-square"></i></div>
                Data Testimoni
              </router-link>
            </div>
          </Transition>

          <div class="sidenav-menu-heading" @click="toggle('order')" role="button">
            <span><i data-feather="shopping-cart" class="me-2"></i>Order</span>
            <div class="sidenav-collapse-arrow" :class="{ collapsed: !expanded.order }">
              <i data-feather="chevron-down"></i>
            </div>
          </div>
          <Transition name="slide">
            <div v-show="expanded.order" class="sidenav-section-content">
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/order') }" to="/app/order/data">
                <div class="nav-link-icon"><i data-feather="clipboard"></i></div>
                Data Order
              </router-link>
            </div>
          </Transition>

          <div class="sidenav-menu-heading" @click="toggle('gudang')" role="button">
            <span><i data-feather="archive" class="me-2"></i>Gudang</span>
            <div class="sidenav-collapse-arrow" :class="{ collapsed: !expanded.gudang }">
              <i data-feather="chevron-down"></i>
            </div>
          </div>
          <Transition name="slide">
            <div v-show="expanded.gudang" class="sidenav-section-content">
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/inventory') }" to="/app/inventory">
                <div class="nav-link-icon"><i data-feather="package"></i></div>
                Data Gudang
              </router-link>
            </div>
          </Transition>

          <div class="sidenav-menu-heading" @click="toggle('keuangan')" role="button">
            <span><i data-feather="dollar-sign" class="me-2"></i>Keuangan</span>
            <div class="sidenav-collapse-arrow" :class="{ collapsed: !expanded.keuangan }">
              <i data-feather="chevron-down"></i>
            </div>
          </div>
          <Transition name="slide">
            <div v-show="expanded.keuangan" class="sidenav-section-content">
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/financial') }" to="/app/financial-sa" v-if="userRole === 'Superadmin'">
                <div class="nav-link-icon"><i data-feather="dollar-sign"></i></div>
                Data Keuangan
              </router-link>
              <router-link class="nav-link" :class="{ active: $route.path.startsWith('/app/financial') }" to="/app/financial" v-else>
                <div class="nav-link-icon"><i data-feather="dollar-sign"></i></div>
                Data Keuangan
              </router-link>
              <router-link class="nav-link" :class="{ active: $route.path === '/app/bank' }" to="/app/bank">
                <div class="nav-link-icon"><i data-feather="credit-card"></i></div>
                Data Bank
              </router-link>
            </div>
          </Transition>

          <div class="sidenav-menu-heading" @click="toggle('pegawai')" role="button">
            <span><i data-feather="briefcase" class="me-2"></i>Pegawai</span>
            <div class="sidenav-collapse-arrow" :class="{ collapsed: !expanded.pegawai }">
              <i data-feather="chevron-down"></i>
            </div>
          </div>
          <Transition name="slide">
            <div v-show="expanded.pegawai" class="sidenav-section-content">
              <router-link class="nav-link" :class="{ active: $route.path === '/app/meeting-schedule' }" to="/app/meeting-schedule">
                <div class="nav-link-icon"><i data-feather="calendar"></i></div>
                Data Meeting
              </router-link>
              <router-link class="nav-link" :class="{ active: $route.path === '/app/employee' }" to="/app/employee">
                <div class="nav-link-icon"><i data-feather="briefcase"></i></div>
                Data Pegawai
              </router-link>
            </div>
          </Transition>

        </div>
      </div>
      <div class="sidenav-footer">
        <div class="sidenav-footer-content">
          <div class="sidenav-footer-subtitle">Logged in as:</div>
          <div class="sidenav-footer-title">{{ userName }}</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import CredentialsUser from '../../api/utils/credentialsUser';

export default {
  data() {
    return {
      userName: null,
      userRole: null,
      expanded: {
        ringkasan: true,
        makanan: true,
        pelanggan: true,
        gudang: true,
        keuangan: true,
        pegawai: true,
      },
    };
  },
  async created() {
    try {
      const name = CredentialsUser.getNameUser();
      const role = CredentialsUser.getRoleUser();
      this.userName = name;
      this.userRole = role;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  },
  mounted() {
    import('https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js').then(() => {
      feather.replace();
    });
  },
  methods: {
    toggle(section) {
      this.expanded[section] = !this.expanded[section];
      this.$nextTick(() => feather.replace());
    },
  },
};
</script>

<style>
.sidenav .sidenav-menu .nav .sidenav-menu-heading {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  transition: all 0.2s ease;
  border-radius: 0.5rem;
  margin: 0.25rem 0.5rem;
  padding: 0.65rem 0.85rem;
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  color: #4a515b;
}

.sidenav .sidenav-menu .nav .sidenav-menu-heading:hover {
  color: #0061f2;
  background-color: rgba(0, 97, 242, 0.06);
  transform: translateX(2px);
}

.sidenav .sidenav-menu .nav .sidenav-menu-heading .sidenav-collapse-arrow {
  display: inline-flex;
  align-items: center;
  transition: transform 0.25s ease;
  font-size: 0.7rem;
  color: #a7aeb8;
}

.sidenav .sidenav-menu .nav .sidenav-menu-heading:hover .sidenav-collapse-arrow {
  color: #0061f2;
}

.sidenav .sidenav-menu .nav .sidenav-menu-heading .sidenav-collapse-arrow.collapsed {
  transform: rotate(-90deg);
}

.sidenav-section-content {
  overflow: hidden;
}

.sidenav-section-content .nav-link {
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  border-left: 3px solid transparent;
  margin: 0.15rem 0.5rem;
  border-radius: 0.4rem;
  transition: all 0.2s ease;
  font-size: 0.85rem;
  color: #69707a;
}

.sidenav-section-content .nav-link:hover {
  background-color: rgba(0, 97, 242, 0.06);
  border-left-color: #0061f2;
  color: #0061f2;
  transform: translateX(3px);
}

.sidenav-section-content .nav-link.active {
  background: linear-gradient(135deg, rgba(0, 97, 242, 0.1), rgba(0, 97, 242, 0.04));
  border-left-color: #0061f2;
  color: #0061f2;
  font-weight: 600;
}

.sidenav .sidenav-menu .nav .nav-link .nav-link-icon {
  font-size: 0.8rem;
  margin-right: 0.4rem;
}

.sidenav-menu-heading .me-2 {
  margin-right: 0.4rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>
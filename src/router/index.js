import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Page/Auth/Login.vue';
import ForgetPassword from '../views/Page/Auth/ForgetPassword.vue';
import Dashboard from '../views/Page/Dashboard/Dashboard.vue';
import Food from '../views/Page/Menu/Food/LayoutFood.vue';
import Package from '../views/Page/Menu/PackageFood/LayoutPackage.vue';
import PackageMenu from '../views/Page/Menu/PackageFood/MainPackage.vue';
import PackageFoodStail from '../views/Page/Menu/PackageFood/FoodStailPackage.vue';
import LandingPage from '../views/Page/LandingPage/Landing.vue';
import MenuPage from '../views/Page/LandingPage/Menu.vue';
import Employee from '../views/Page/Pegawai/LayoutEmployee.vue';
import Recipes from '../views/Page/Menu/Recipes/Recipes.vue';
import Customer from '../views/Page/Pelanggan/LayoutCustomer.vue';
import Testimonial from '../views/Page/Testimoni/Testimoni.vue';
import Inventory from '../views/Page/Gudang/LayoutDataInventory.vue';
import DataInventoryEvent from '../views/Page/Gudang/DataEventInventory/DataEventInventory.vue';
import DetailTransferInventory from '../views/Page/Gudang/Transfer/DetailTransferInventory.vue';
import OrderDetail from '../views/Page/Pelanggan/Order/LayoutDetailOrder.vue';
import CustomerDetail from '../views/Page/Pelanggan/Customer/LayoutDetailCustomer.vue';
import Order from '../views/Page/Order/Order.vue';
import DataOrder from '../views/Page/Order/LayoutOrder.vue';
import Profile from '../views/Page/User/Profile.vue';
import Finance from '../views/Page/Finance/Default/FinanceDefault.vue';
import FinanceSuperAdmin from '../views/Page/Finance/SuperAdmin/FinanceDefault.vue';
import DetailFinanceSuperAdmin from '../views/Page/Finance/SuperAdmin/DetailFinance.vue'
import OrderData from '../views/Page/Order/OrderDataAdd.vue';
import Payment from '../views/Page/Pembayaran/LayoutPayment.vue';
import Installment from '../views/Page/Pembayaran/InstallmentPage.vue';
import InstallmentCustomer from '../views/Page/Pelanggan/Pembayaran/InstallmentPage.vue';
import NotFound from '../views/Components/NotFound.vue'; // Import the NotFound component
import MeetingSchedule from '../views/Page/Meeting/MeetingSchedule.vue'; // Tambahkan import untuk MeetingSchedule.vue
import { logoutUser } from '../api/services/authService';
import Bank from '../views/Page/Bank/Bank.vue';
import { decryptRSAWithSalt } from '../api/utils/en_den';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/menu',
    name: 'MenuPage',
    component: MenuPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgetPassword,
  },
  {
    path: '/app',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'logout',
        name: 'Logout',
        beforeEnter: (to, from, next) => {
          logoutUser();
          next({ name: 'Login' }); // Redirect to the login page after logout
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'menu/food',
        name: 'Food',
        component: Food,
      },
      {
        path: 'menu/recipes-food',
        name: 'Recipes',
        component: Recipes,
      },
      {
        path: 'menu/package-food',
        name: 'Package',
        component: Package,
      },
      {
        path: 'menu/package-food/foodstail/:uuid',
        name: 'PackageFoodstail',
        component: PackageFoodStail,
      },
      {
        path: 'menu/package-food/menu/:uuid',
        name: 'PackageMenu',
        component: PackageMenu,
      },
      {
        path: 'employee',
        name: 'Employee',
        component: Employee,
      },
      {
        path: 'pelanggan/customer',
        name: 'CustomerList',
        component: Customer,
      },
      {
          path: 'pelanggan/customer/payment/:uuid',
          name: 'Installment',
          component: InstallmentCustomer,
        },
      {
        path: 'testimonial',
        name: 'testimonial',
        component: Testimonial,
      },
      {
        path: 'pelanggan/order',
        name: 'OrderList',
        component: Customer,
      },
      {
        path: 'order/data',
        name: 'OrderList2',
        component: DataOrder
      },
      {
        path: 'user/profile',
        name: 'ProfilePage',
        component: Profile,
      },
      {
        path: 'pelanggan/order/:uuid',
        name: 'OrderDetail',
        component: OrderDetail,
      },
      {
        path: 'pelanggan/customer/:uuid',
        name: 'CustomerDetail',
        component: CustomerDetail,
      },
      {
        path: 'order',
        name: 'Order',
        component: Order,
      },
      {
        path: 'order/addOrder/',
        name: 'OrderData',
        component: OrderData,
      },
      // {
      //   path: 'pelanggan/orderdata/:uuid',
      //   name: 'OrderData',
      //   component: OrderData,
      // },
      // {
      //   path: 'pelanggan/payment',
      //   name: 'Payment',
      //   component: Payment,
      // },
      // {
      //   path: 'pelanggan/payment/:uuid',
      //   name: 'Installment',
      //   component: Installment,
      // },
      {
        path: 'inventory',
        name: 'Inventory',
        component: Inventory,
      },
      {
        path: 'inventory/event',
        name: 'EventInventory',
        component: Inventory,
      },
      {
        path: 'financial',
        name: 'Financial',
        component: Finance,
      },
      {
        path: 'financial-sa',
        name: 'FinancialSuperAdmin',
        component: FinanceSuperAdmin,
      },
      {
        path: 'detail-financial-sa/:uuid',
        name: 'DetailFinanceSa',
        component: DetailFinanceSuperAdmin,
      },
      {
        path: 'inventoryevent/:uuid',
        name: 'InventoryEvent',
        component: DataInventoryEvent,
      },
      {
        path: 'inventoryevent/transfer/:uuid?',
        name: 'DetailTransferInventory',
        component: DetailTransferInventory,
      },
      {
        path: 'bank',
        name: 'Bank',
        component: Bank,
      },
      {
        path: 'meeting-schedule',
        name: 'MeetingSchedule',
        component: MeetingSchedule,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*', // This will match any path that is not defined above
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {

  const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!storedToken) {
      next({ name: 'Login' }); // Redirect ke halaman login jika tidak ada token
    } else {
      next(); // Lanjutkan ke halaman yang diinginkan jika token ada
    }
  } else {
    next(); // Lanjutkan ke halaman yang diinginkan jika tidak memerlukan autentikasi
  }

});

export default router;

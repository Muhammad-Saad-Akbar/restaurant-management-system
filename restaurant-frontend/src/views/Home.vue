<template>
  <div class="flex h-screen w-screen bg-gray-200">
    <!-- Sidebar -->
    <aside class="hidden lg:flex lg:w-65 bg-white p-6 flex-col justify-between">
      <div>
        <h1 class="text-3xl font-bold text-red-500 mb-12 px-2">FoodMode</h1>
        <nav>
          <ul>
            <li class="mb-6 px-2.5"><a href="#" class="flex items-center text-gray-700 font-serif-display hover:text-red-500 justify-between">
              <span><i class="ri-sticky-note-line mr-4"></i>Orders</span>
              <i class="ri-arrow-right-line"></i>
            </a>
            </li>
            <li class="mb-4 px-2.5">
              <a href="#" class="flex items-center text-gray-700 font-serif-display hover:text-red-500 justify-between">
                <span><i class="ri-restaurant-line mr-4"></i>Restaurants</span>
                <i class="ri-arrow-down-line"></i>
              </a>
              <ul class="ml-8 mt-4 space-y-4 text-sm text-gray-600">
                <li><h4 class="font-serif-display text-gray-700 hover:text-red-500 cursor-pointer" @click="addRestaurant">Add New Restaurant</h4></li>
                <li class="bg-red-100 text-red-500 p-2 rounded-lg -ml-2"><a href="#" class="font-serif-display">Restaurants List</a></li>
              </ul>
            </li>
            <li class="mb-6 px-2.5"><a href="#" class="flex items-center font-serif-display text-gray-700 hover:text-red-500"><i class="ri-line-chart-line mr-4"></i>Analytics</a></li>
            <li class="mb-6 px-2.5"><a href="#" class="flex items-center font-serif-display text-gray-700 hover:text-red-500"><i class="ri-bookmark-2-line mr-4"></i>Tags</a></li>
            <li class="mb-6 px-2.5"><a href="#" class="flex items-center font-serif-display text-gray-700 hover:text-red-500"><i class="ri-user-line mr-4"></i>Customers</a></li>
            <li class="mb-6 px-2.5"><a href="#" class="flex items-center font-serif-display text-gray-700 hover:text-red-500"><i class="ri-settings-2-line mr-4"></i>Setting</a></li>
          </ul>
        </nav>
      </div>
      <div class="p-1.5 rounded-2xl bg-[#9bb846] hidden xl:block">
        <div class="text-5xl mb-2 text-center">🍽️</div>
        <h3 class="font-semibold pl-2 pt-2 text-white">Add Restaurants</h3>
        <div class="flex items-center justify-between px-2 pb-2 text-white opacity-75">
          <p class="text-xs">Manage your Restaurant</p>
          <i class="ri-arrow-right-fill"></i>
        </div>
      </div>
      <button type="button" class="bg-white border border-red-500 text-red-500 font-semibold px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition-colors
       duration-300 flex items-center space-x-2 mb-7 hidden xl:block" @click="logout">
        <i class="ri-logout-box-line"></i>
        <span>Logout</span>
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 sm:p-7 overflow-y-auto">
      <!-- Header -->
      <header class="flex justify-between items-center mb-6 md:mb-7 lg:mb-8 bg-white py-2 md:py-2.5 lg:py-4 px-2.5 sm:px-4 md:px-6 lg:px-9 rounded-lg">
        <div>
          <h2 class="hidden xl:block text-2xl font-bold">Hello {{ userName }},</h2>
          <p class="hidden xl:block text-gray-500">Welcome to back!</p>
          <div class="flex space-x-1.5 xl:hidden">
            <i class="ri-home-2-line text-red-500 font-semibold lg:font-bold"></i>
            <h3 class="font-serif-display text-red-500 font-semibold lg:font-bold">Home</h3>
          </div>
        </div>
        <div class="flex items-center space-x-4.5 sm:space-x-6 lg:space-x-9">
          <div class="hidden sm:block relative cursor-pointer">
            <i class="ri-shopping-cart-line text-gray-600 text-xl"></i>
            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </div>
          <div class="hidden sm:block relative lg:mr-16 cursor-pointer">
            <i class="ri-notification-2-line text-gray-600 text-xl"></i>
            <span class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">4</span>
          </div>
          <div class="hidden xl:flex items-center space-x-2 bg-gray-200 rounded-full p-2 cursor-pointer">
            <img src="https://flagcdn.com/us.svg" width="23" alt="United States">
            <span>English</span>
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <i class="hidden lg:block ri-lock-unlock-line text-gray-600 text-xl cursor-pointer"></i>
          <div class="flex items-center space-x-2 mt-1.5 md:mt-0">
            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704d" alt="Admin" class="rounded-full">
            <div>
              <p class="text-sm lg:text-base font-semibold font-serif-display">{{ userName }}</p>
              <p class="text-xs text-gray-500 font-serif-display">Admin</p>
            </div>
          </div>
          <button type="button" class="bg-red-100 text-red-500 px-3 py-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300 mt-1.5 md:mt-0
            xl:hidden" @click="logout">
            <i class="ri-logout-box-line font-bold"></i>
          </button>
        </div>
      </header>

      <!--        Add New Restaurant Button-->
      <div class="mb-6 md:mb-8 md:flex justify-end lg:hidden">
        <button class="bg-red-500 text-white font-semibold w-full md:w-auto md:px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 space-x-2"
                @click="addRestaurant">
          <i class="ri-add-line"></i>
          <span>Add New Restaurant</span>
        </button>
      </div>

      <!-- Cards -->
      <Suspense>
        <AsyncComponent ref="restaurantsRef" />
        <template #fallback>
          <div class="flex items-center justify-center h-40">
            <div class="relative w-20 h-20">
              <div class="absolute inset-0 rounded-full border-4 border-gray-300"></div>
              <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
                Loading...
              </div>
            </div>
          </div>
        </template>
      </Suspense>
    </main>

  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { createApp } from "vue";
import RestaurantForm from "@/components/AddRestaurantForm.vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import BASE_URL from "@/api/api.js"
import AsyncComponent from "@/components/AsyncComponent.vue";

export default {
  name: "Home",
  components: {
    AsyncComponent
  },
  data() {
    return {
      userName: null
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.$router.push({
        name: 'signUp'
      })
    }
    this.userName = user.name
    console.log(user)
  },
  methods: {
    addRestaurant() {
      let formApp;
      let formInstance;
      const vm = this;

      Swal.fire({
        title: 'Add New Restaurant',
        html: `<div id="vue-form"></div>`,
        showCancelButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        focusConfirm: false,
        didOpen() {
          formApp = createApp(RestaurantForm);
          formInstance = formApp.mount("#vue-form");
          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.setAttribute("type", "button");
          }
        },
        async preConfirm() {
          return await axios.post(`${BASE_URL}/restaurants`, {
            regNumber: vm.generateRegistrationNumber(),
            restaurantName: formInstance.restaurantName,
            ownerName: formInstance.ownerName,
            tel: formInstance.tel,
            emailAddress: formInstance.emailAddress,
            restaurantAddress: formInstance.restaurantAddress,
            openingHours: formInstance.openingHours,
            closingHours: formInstance.closingHours,
            logo: formInstance.selectedFile,
          }).then((response) => {
            if (response.status === 201) {
              return {
                status: response.status,
                data: response.data
              };
            }
          }).catch((err) => {
            Swal.showValidationMessage(`Request failed: ${err}`);
          });
        } ,
        willClose() {
          formApp.unmount()
        }
      }).then((result) => {
        if (result.isConfirmed && result.value.status === 201) {
          console.log("Restaurant Added Successfully", result);
          vm.refreshRestaurants()
          toast.success(' New Restaurant Successfully Added', {
            autoClose: 2200,
            style: {
              width: '370px'
            },
          });
        } else {
          console.log("Cancelled", result);
        }
      });
    },
    generateRegistrationNumber() {
      const prefix = "RES";
      const randomNum = Math.floor(Math.random() * 1000);
      return `${prefix}-${randomNum}`;
    },
    logout() {
      localStorage.clear();
      this.$router.push({
        name: 'Login'
      });
    },
    refreshRestaurants() {
      this.$refs.restaurantsRef.fetchRestaurants();
    }
  }
}
</script>

<style scoped>
.font-serif-display {
  font-family: 'Lora', serif;
}
@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-\[loading_1\.5s_linear_infinite\] {
  animation: loading 1.5s linear infinite;
}
</style>

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
          <div class="flex items-center space-x-2 mt-1.5 md:mt-0">
            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704d" alt="Admin" class="rounded-full">
            <div>
              <p class="text-sm lg:text-base font-semibold font-serif-display">{{ userName }}</p>
              <p class="text-xs text-gray-500 font-serif-display">Admin</p>
            </div>
          </div>
          <div class="hidden xl:flex items-center space-x-2 bg-gray-200 rounded-full p-2 cursor-pointer">
            <img src="https://flagcdn.com/us.svg" width="30" alt="United States">
            <span>English</span>
            <i class="ri-arrow-down-s-line text-xs"></i>
          </div>
          <i class="hidden lg:block ri-lock-unlock-line text-gray-600 text-xl cursor-pointer"></i>
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
      <div v-if="restaurants.length > 0">
        <div class="flex flex-col px-2.5 sm:items-center lg:items-start md:px-0 2xl:grid grid-cols-2 gap-7.5 sm:gap-10 md:gap-11 lg:gap-13">
          <div class="mt-1 w-full sm:max-w-sm md:mt-0 md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden relative" v-for="restaurant in restaurants"
               :key="restaurant.id">

            <button type="button" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-300" @click="deleteRestaurant(restaurant.id)">
              <i class="ri-delete-bin-6-line text-xl"></i>
            </button>

            <div class="flex flex-col md:flex-row">
              <div class="w-full md:w-1/3">
                <img class="object-cover h-52 w-full md:h-full" :src="restaurant.logo" alt="Restaurant Img">
              </div>
              <div class="w-full md:w-2/3 p-6 pb-4.5 md:p-8">
                <p class="text-sm text-gray-500 font-medium">{{ restaurant.regNumber }}</p>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{{ restaurant.restaurantName }}</h2>

                <div class="mt-6 space-y-4 text-gray-700">
                  <div class="flex items-start">
                    <i class="fas fa-map-marker-alt w-5 mt-1 text-red-500"></i>
                    <div class="ml-3">
                      <h4 class="font-semibold">Address</h4>
                      <p class="text-gray-600 text-sm md:text-base">{{ restaurant.restaurantAddress }}</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-phone-alt w-5 text-red-500"></i>
                    <div class="ml-3">
                      <h4 class="font-semibold">Phone</h4>
                      <p class="text-gray-600 text-sm md:text-base">{{ restaurant.tel }}</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-clock w-5 text-red-500"></i>
                    <div class="ml-3">
                      <h4 class="font-semibold">Hours</h4>
                      <p class="text-gray-600 text-sm md:text-base">{{ restaurant.openingHours }} (Opening) - {{ restaurant.closingHours }} (Closing)</p>
                    </div>
                  </div>
                </div>

                <div class="mt-6.5 md:mt-8 text-right">
                  <button type="button" class="bg-red-500 text-white font-semibold px-8 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                          @click="editRestaurant(restaurant.id)">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="font-serif-display text-gray-500 text-lg font-bold">No restaurants have been added yet</p>
      </div>
    </main>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { createApp } from "vue";
import RestaurantForm from "@/components/AddRestaurantForm.vue";
import EditRestaurantForm from "@/components/EditRestaurantForm.vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import BASE_URL from "@/api/api.js"

export default {
  name: "Home",
  data() {
    return {
      restaurants: [],
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
    this.restaurantData()
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
          vm.restaurantData()
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
    editRestaurant(id) {
      let formApp;
      let formInstance;
      const vm = this;

      Swal.fire({
        title: "Edit Restaurant",
        html: `<div id="vue-edit-form"></div>`,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        focusConfirm: false,
        didOpen() {
          formApp = createApp(EditRestaurantForm, { restaurantId: id });
          formInstance = formApp.mount("#vue-edit-form");

          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.setAttribute("type", "button");
          }
        },
        async preConfirm() {
          return await axios.put(`${BASE_URL}/restaurants/${id}`, {
            regNumber: formInstance.regNumber,
            restaurantName: formInstance.restaurantName,
            ownerName: formInstance.ownerName,
            tel: formInstance.tel,
            emailAddress: formInstance.emailAddress,
            restaurantAddress: formInstance.restaurantAddress,
            openingHours: formInstance.openingHours,
            closingHours: formInstance.closingHours,
            logo: formInstance.selectedFile
          }).then((response) => {
            if (response.status === 200) {
              return {
                status: response.status,
                data: response.data
              };
            }
          }).catch((err) => {
            Swal.showValidationMessage(`Update failed: ${err}`);
          });
        },
        willClose() {
          formApp.unmount();
        }
      }).then((result) => {
        if (result.isConfirmed && result.value.status === 200) {
          console.log("Restaurant updated", result);
          vm.restaurantData();
          toast.success('Restaurant Successfully updated', {
            autoClose: 2200,
            style: {
              width: '350px'
            },
          });
        }else {
          console.log("Cancelled", result);
        }
      });
    },
    deleteRestaurant(id) {
      const vm = this;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        async preConfirm() {
          return await axios.delete(`${BASE_URL}/restaurants/${id}`).then((response) => {
            if (response.status === 200) {
              return response.status;
            }
          }).catch((err) => {
            Swal.showValidationMessage(`Update failed: ${err}`);
          });
        }
      }).then((result) => {
        if (result.isConfirmed && result.value === 200) {
          console.log("Restaurant deleted Successfully", result)
          vm.restaurantData()
          Swal.fire({
            title: "Deleted!",
            text: "Your Restaurant has been deleted.",
            icon: "success"
          });
        }else {
          console.log("Cancelled", result)
        }
      });
    },
    async restaurantData() {
      let result = await axios.get(`${BASE_URL}/restaurants`);
      if (result.status === 200) {
        this.restaurants = result.data
      }else {
        console.log("Api Call Failed", result);
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({
        name: 'Login'
      });
    }
  }
}
</script>

<style scoped>
.font-serif-display {
  font-family: 'Lora', serif;
}
</style>

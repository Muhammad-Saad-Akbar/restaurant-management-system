<template>
  <div v-if="restaurants.length > 0">
    <div class="flex flex-col px-2.5 sm:items-center lg:items-start md:px-0 2xl:grid grid-cols-2 gap-7.5 sm:gap-10 md:gap-11 lg:gap-13">
      <div class="mt-1 w-full sm:max-w-sm md:mt-0 md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden relative"
           v-for="restaurant in restaurants"
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
                <i class="ri-map-pin-line w-5 mt-1"></i>
                <div class="ml-3">
                  <h4 class="font-semibold">Address</h4>
                  <p class="text-gray-600 text-sm md:text-base">{{ restaurant.restaurantAddress }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <i class="ri-phone-line w-5"></i>
                <div class="ml-3">
                  <h4 class="font-semibold">Phone</h4>
                  <p class="text-gray-600 text-sm md:text-base">{{ restaurant.tel }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <i class="ri-time-line w-5"></i>
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
</template>

<script>
import axios from "axios";
import BASE_URL from "@/api/api.js";
import Swal from "sweetalert2";
import {createApp, ref, defineExpose} from "vue";
import EditRestaurantForm from "@/components/EditRestaurantForm.vue";
import {toast} from "vue3-toastify";

export default {
  name: "AsyncComponent",

  async setup() {
    const restaurants = ref([]);

    await new Promise(res => setTimeout(res, 3000));

    const fetchRestaurants = async () => {
      const response = await axios.get(`${BASE_URL}/restaurants`);
      restaurants.value = response.data;
      return response;
    };

    await fetchRestaurants();

    defineExpose({
      fetchRestaurants
    });

    return {
      restaurants,
      fetchRestaurants
    };
  },
  methods: {
    editRestaurant(id) {
      let formApp;
      let formInstance;
      let vm = this

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
          vm.fetchRestaurants();
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
          vm.fetchRestaurants()
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
  }
}
</script>

<style scoped>

</style>

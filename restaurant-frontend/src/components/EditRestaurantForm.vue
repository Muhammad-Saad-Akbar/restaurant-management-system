<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

      <!-- Column 1 -->
      <div class="space-y-5">
        <!-- Restaurant Name -->
        <div>
          <label for="restaurantName" class="block mb-2 text-sm font-medium text-gray-700">Restaurant Name</label>
          <input type="text" id="restaurantName" v-model="restaurantName" placeholder="e.g., The Grand Bistro"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
        </div>

        <!-- Contact Number -->
        <div>
          <label for="contactNumber" class="block mb-2 text-sm font-medium text-gray-700">Contact Number</label>
          <input type="tel" id="contactNumber" v-model="tel" placeholder="e.g., 0300-1234567"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
        </div>

        <!-- Opening Hours -->
        <div>
          <label for="openingHours" class="block mb-2 text-sm font-medium text-gray-700">Opening Hours</label>
          <input type="time" id="openingHours" v-model="openingHours"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
        </div>
      </div>

      <!-- Column 2 -->
      <div class="space-y-5">
        <!-- Owner Name -->
        <div>
          <label for="ownerName" class="block mb-2 text-sm font-medium text-gray-700">Owner Name</label>
          <input type="text" id="ownerName" v-model="ownerName" placeholder="e.g., Jhon Doe"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
        </div>

        <!-- Email Address -->
        <div>
          <label for="emailAddress" class="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="emailAddress" v-model="emailAddress" placeholder="e.g., contact@bistro.com"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
        </div>

        <!-- Closing Hours -->
        <div>
          <label for="closingHours" class="block mb-2 text-sm font-medium text-gray-700">Closing Hours</label>
          <input type="time" id="closingHours" v-model="closingHours"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
        </div>
      </div>

      <!-- Full-width fields below the columns -->
      <!-- Full Address -->
      <div class="md:col-span-2">
        <label for="restaurantAddress" class="block mb-2 text-sm font-medium text-gray-700">Full Address</label>
        <textarea id="restaurantAddress" v-model="restaurantAddress" placeholder="Enter the full address of the restaurant" rows="3"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"></textarea>
      </div>

      <!-- File Input & Image Preview -->
      <div class="md:col-span-2">
        <label class="block mb-2 text-sm font-medium text-gray-700">Restaurant Image</label>
        <div class="flex items-center space-x-3">
          <div class="shrink-0">
            <img :src="selectedFile" alt="Image Preview" class="h-20 w-20 object-cover rounded-lg border border-gray-200">
          </div>
          <div class="flex-1">
            <input type="file" @change="handleFileUpload"
                   class="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
                              file:bg-red-50 file:text-red-700 file:font-semibold file:border-none file:px-4 file:py-2.5 file:mr-4 hover:file:bg-red-100">
          </div>
          <!-- Image Preview -->

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import BASE_URL from "@/api/api.js"
export default {
  name: "EditRestaurantForm",
  props: [
    "restaurantId"
  ],
  data() {
    return {
      regNumber: null,
      restaurantName: "",
      ownerName: "",
      tel: "",
      emailAddress: "",
      restaurantAddress: "",
      openingHours: "",
      closingHours: "",
      selectedFile: null
    }
  },
   mounted() {
     this.selectedRestaurantData()
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async selectedRestaurantData() {
      if (this.restaurantId) {
        try {
          let response = await axios.get(`${BASE_URL}/restaurants/${this.restaurantId}`);
          if (response.status === 200) {
            let data = response.data;
            this.regNumber = data.regNumber
            this.restaurantName = data.restaurantName;
            this.ownerName = data.ownerName;
            this.tel = data.tel;
            this.emailAddress = data.emailAddress;
            this.restaurantAddress = data.restaurantAddress;
            this.openingHours = data.openingHours;
            this.closingHours = data.closingHours;
            this.selectedFile = data.logo;
          }
        } catch (err) {
          console.error("Failed to fetch restaurant", err);
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

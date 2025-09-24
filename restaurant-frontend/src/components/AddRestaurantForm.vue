<template>
  <!-- Main container with vertical spacing for form elements -->
  <div class="text-left space-y-6">

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Restaurant Name</label>
      <input type="text" v-model="restaurantName" placeholder="e.g., The Grand Bistro"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Owner Name</label>
      <input type="text" v-model="ownerName" placeholder="e.g., Jhon Doe"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Contact Number</label>
      <input type="tel" v-model="tel" placeholder="e.g., 0300-1234567"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
      <input type="email" v-model="emailAddress" placeholder="e.g., contact@bistro.com"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Full Address</label>
      <textarea v-model="restaurantAddress" placeholder="Enter the full address of the restaurant" rows="3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"></textarea>
    </div>

    <div class="flex items-center space-x-4">
      <div class="w-1/2">
        <label class="block mb-2 text-sm font-medium text-gray-700">Opening Hours</label>
        <input type="time" v-model="openingHours"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
      </div>
      <div class="w-1/2">
        <label class="block mb-2 text-sm font-medium text-gray-700">Closing Hours</label>
        <input type="time" v-model="closingHours"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5">
      </div>
    </div>

    <div>
      <label class="block mb-2 text-sm font-medium text-gray-700">Restaurant Image</label>
      <input type="file" @change="handleFileUpload"
             class="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
                           file:bg-red-50 file:text-red-700 file:font-semibold file:border-none file:px-4 file:py-2.5 file:mr-4 hover:file:bg-red-100">
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantForm",
  data() {
    return {
      restaurantName: "",
      ownerName: "",
      tel: "",
      emailAddress: "",
      restaurantAddress: "",
      openingHours: "",
      closingHours: "",
      selectedFile: null
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        return
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
</script>

<style scoped>

</style>

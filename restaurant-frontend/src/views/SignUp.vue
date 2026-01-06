<template>
  <div class="w-full min-h-screen flex flex-col justify-center items-center p-4 xl:flex-row xl:justify-normal xl:items-stretch xl:p-2 bg-white">

    <!-- Left Side: Image  -->
    <div class="hidden xl:flex xl:w-[55%] flex-col justify-between bg-cover bg-no-repeat p-12 text-white bg-[url('/src/assets/restaurant.jpg')] rounded-4xl
     relative">
      <div class="absolute inset-0 bg-black/65 rounded-4xl"></div>
      <div class="z-10">
        <p class="text-lg tracking-widest font-bold text-[#F5F5DC]">A WISE QUOTE</p>
      </div>
      <div class="z-10">
        <h1 class="font-serif-display text-5xl leading-tight mb-3.5 text-[#F5F5DC]">Built<br> For speed,<br> Designed for service.</h1>
        <p class="font-light text-[#F5F5DC] text-xl">The future of restaurant management is now.</p>
        <p class="font-light text-[#F5F5DC] text-xl">Run your restaurant. We'll handle the rest.</p>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="w-full flex flex-col justify-center items-center p-4 xl:w-[45%] xl:p-12">
      <div class="w-full max-w-md">

        <div class="text-center mb-12 xl:hidden">
          <lord-icon
            src="https://cdn.lordicon.com/rzsnbiaw.json"
            trigger="loop"
            delay="2000"
            colors="primary:#f4a09c,secondary:#ee6d66"
            style="width:150px;height:150px">
          </lord-icon>
        </div>

        <h2 class="font-serif-display text-2xl md:text-3xl lg:text-4xl mb-2 text-gray-800">Welcome</h2>
        <p class="font-serif-display text-gray-500 mb-8 text-sm md:text-lg">Create Your Account</p>

        <div class="mb-5">
          <label for="text" class="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input type="text" id="text" placeholder="Enter your name" class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none
          focus:ring-2 focus:ring-red-400" required v-model="formData.name">
        </div>

        <div class="mb-5">
          <label for="email" class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input type="email" id="email" placeholder="Enter your email" class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none
          focus:ring-2 focus:ring-red-400" v-model="formData.email" required>
        </div>

        <div class="mb-5">
          <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <div class="relative">
            <input type="password" id="password" placeholder="Enter your password" class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-red-400" v-model="formData.password" required>
            <span class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
                                </svg>
                            </span>
          </div>
        </div>

        <div class="mb-5">
          <label for="tel" class="block text-gray-700 text-sm font-medium mb-2">Phone-Number</label>
          <input type="tel" id="tel" placeholder="Enter your phone-number" class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none
           focus:ring-2 focus:ring-red-400" v-model="formData.phone" required>
        </div>

        <div class="mb-4">
          <button type="button" class="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition duration-300 hover:cursor-pointer
           mt-3" @click="signUp">Sign Up</button>
        </div>

        <router-link to="/login">
          <p class="font-serif-display text-gray-500 hover:underline text-center mt-5.5">Already have an account? Log in here.</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BASE_URL from "@/api/api.js"
export default {
  name: "SignUp",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        phone: ""
      }
    }
  },
  methods: {
    async signUp() {
      let result = await axios.post(`${BASE_URL}/users`, this.formData)
      console.log(result);
      console.log("Saad");
      if (result.status == 201) {
        localStorage.setItem("user", JSON.stringify(result.data))
        this.$router.push({
          name: 'home'
        });
      }
    }
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (user) {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
.font-serif-display {
  font-family: 'Lora', serif;
}
</style>

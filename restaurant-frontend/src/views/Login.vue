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
    <div class="w-full xl:w-[45%] p-4 flex flex-col justify-center items-center xl:p-12">
      <div class="w-full max-w-md">

        <div class="text-center mb-6 xl:hidden">
            <span class="inline-block p-4 bg-red-100 rounded-full">
                <svg class="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM5 5a1 1 0 00-1 1v1a1 1 0 002 0V6a1 1 0 00-1-1zm10 0a1 1 0 00-1 1v1a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </span>
        </div>

        <h2 class="font-serif-display text-2xl md:text-3xl lg:text-4xl mb-2 text-gray-800">Welcome Back</h2>
        <p class="font-serif-display text-gray-500 mb-8 text-sm md:text-base">Enter your email and password to access your account</p>


        <div class="mb-5">
          <label for="email" class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input type="email" id="email" placeholder="Enter your email" class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none
          focus:ring-2 focus:ring-red-400" v-model="email">
        </div>

        <div class="mb-5">
          <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <div class="relative">
            <input type="password" id="password" placeholder="Enter your password" class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-red-400" v-model="password">
            <span class="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
              </svg>
            </span>
          </div>
        </div>

        <div class="mb-4">
          <button type="button" class="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition duration-300 cursor-pointer
           mt-3" @click="login">Sign In</button>
        </div>

        <router-link to="/sign-up">
          <p class="font-serif-display text-gray-500 hover:underline text-center mt-5.5">Don't have an account? Sign up here.</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BASE_URL from "@/api/api.js"

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async login() {
      let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
      console.log(result);
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(result.data[0]));
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

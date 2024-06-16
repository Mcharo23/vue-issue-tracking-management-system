<template>
  <div class="w-full mt-20 flex justify-center items-center flex-col">
    <div
      class="max-w-xs bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <form class="w-full" @submit.prevent="handleSignIn">
        <div class="mb-1">
          <label
            class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            :class="[
              'shadow appearance-none border rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline',
              errorMessage
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-700',
            ]"
            id="username"
            type="email"
            placeholder="Username"
            v-model="username"
          />
          <p v-if="errorMessage" class="text-red-500 text-xs italic">
            {{ errorMessage }}
          </p>
        </div>
        <div class="mb-1">
          <label
            class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            :class="[
              'shadow appearance-none border rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline',
              errorMessage
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-700',
            ]"
            id="password"
            type="password"
            placeholder="your password"
            v-model="password"
          />
          <p v-if="errorMessage" class="text-red-500 text-xs italic">
            {{ errorMessage }}
          </p>
        </div>
        <div class="flex flex-row justify-end m-4">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div class="flex items-center">
          <button
            class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
    <p class="text-center text-gray-500 dark:text-gray-400 text-xs">
      &copy;2024 ITMS. All rights reserved.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { ROLE } from "../lib/enum";

const auth = useAuthStore();

const router = useRouter();

const username = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

const handleSignIn = async () => {
  errorMessage.value = "";

  const { success, message } = await auth.authenticate(
    username.value,
    password.value
  );

  if (!success) {
    errorMessage.value = message ?? "";
    return;
  }

  if (auth.user?.role === ROLE.ADMIN) {
    router.push({ name: "Home", replace: false });
  } else {
    router.push({ name: "Developer", replace: false });
  }
};
</script>

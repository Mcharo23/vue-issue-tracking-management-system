<template>
  <div>
    <Navbar />

    <div class="p-4 sm:ml-64 justify-center flex">
      <div class="p-4 max-w-7xl w-full items-center justify-center flex mt-14">
        <div
          class="max-w-xs bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <form class="w-full" @submit.prevent="handleOnChangePassword">
            <div
              v-if="resMessage"
              class="text-white bg-green-600 rounded-md p-2 mb-3"
            >
              {{ resMessage }}
            </div>
            <div class="mb-1">
              <label
                class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                for="oldPassword"
              >
                Old Password
              </label>
              <input
                :class="[
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline',
                  errorMessage
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-700',
                ]"
                id="oldPassword"
                type="password"
                placeholder="your old password"
                v-model="oldPassword"
              />
              <p v-if="errorMessage" class="text-red-500 text-xs italic">
                {{ errorMessage }}
              </p>
            </div>
            <div class="mb-1">
              <label
                class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                for="newPassword"
              >
                New Password
              </label>
              <input
                :class="[
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline',
                  newPasswordError
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-700',
                ]"
                id="newPassword"
                type="password"
                placeholder="your new password"
                v-model="newPassword"
              />
              <p v-if="newPasswordError" class="text-red-500 text-xs italic">
                {{ newPasswordError }}
              </p>
            </div>

            <div class="mb-1">
              <label
                class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                for="reTypeNewPassword"
              >
                Re-Type Password
              </label>
              <input
                :class="[
                  'shadow appearance-none border rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline',
                  newPasswordError
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-700',
                ]"
                id="reTypeNewPassword"
                type="password"
                placeholder="your new password"
                v-model="reTypedPassword"
              />
              <p v-if="newPasswordError" class="text-red-500 text-xs italic">
                {{ newPasswordError }}
              </p>
            </div>

            <div class="flex items-center mt-5">
              <button
                class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Navbar from "../components/Navbar.vue";
import { updatePassword } from "../api/employee";

const oldPassword = ref("");
const newPassword = ref("");
const reTypedPassword = ref("");
const errorMessage = ref(null);
const newPasswordError = ref(null);
const resMessage = ref(null);

const clearFields = () => {
  oldPassword.value = "";
  newPassword.value = "";
  reTypedPassword.value = "";
  newPasswordError.value = null;
  errorMessage.value = null;
  resMessage.value = null;
};

const handleOnChangePassword = async () => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
  resMessage.value = null;

  errorMessage.value =
    oldPassword.value.length === 0 ? "Old password required" : null;
  newPasswordError.value =
    newPassword.value.length === 0
      ? "New password required"
      : newPassword.value !== reTypedPassword.value
      ? "Password do not match"
      : !passwordRegex.test(newPassword.value)
      ? "Strong password required"
      : null;

  if (errorMessage.value || newPasswordError.value) {
    return;
  }

  const { message, success } = await updatePassword(
    oldPassword.value,
    newPassword.value
  );

  if (success) {
    resMessage.value = message;
  } else {
    errorMessage.value = message;
  }
};

watch(oldPassword, (newValue) => {
  if (newValue.length > 0) {
    errorMessage.value = null;
  }
});

watch(newPassword, (newValue) => {
  if (newValue.length > 0) {
    newPasswordError.value = null;
  }
});

watch(reTypedPassword, (newValue) => {
  if (newValue.length > 0) {
    newPasswordError.value = null;
  }
});

const components = {
  Navbar,
};
</script>

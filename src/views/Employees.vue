<template>
  <div>
    <Navbar />

    <div class="p-4 sm:ml-64">
      <!-- header -->
      <div class="mt-14 flex flex-col justify-center items-center">
        <div
          class="p-4 border-2 border-gray-200 max-w-7xl flex flex-row justify-between items-center w-full rounded-md"
        >
          <p class="text-2xl text-gray-900">Employees</p>
          <button
            type="button"
            @click="toggleModel"
            class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            New developer
          </button>
        </div>
      </div>

      <!-- employee list -->
      <div class="mt-6 flex flex-col justify-center items-center">
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-7xl"
        >
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">First Name</th>
                <th scope="col" class="px-6 py-3">Last Name</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="employee in employeeList"
                :key="employee.user_id"
                class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ employee.first_name }}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ employee.last_name }}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ employee.email }}
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span
                    v-if="employee.is_deleted"
                    class="bg-red-500 text-white text-xs font-medium me-2 px-3.5 py-1.5 rounded"
                    >{{ STATUS.DELETED }}</span
                  >
                  <span
                    v-else-if="employee.is_active"
                    class="bg-green-500 text-white text-xs font-medium me-2 px-3.5 py-1.5 rounded"
                    >{{ STATUS.ACTIVE }}</span
                  >
                  <span
                    v-else-if="!employee.is_active"
                    class="bg-gray-500 text-white text-xs font-medium me-2 px-3.5 py-1.5 rounded"
                    >{{ STATUS.INACTIVE }}</span
                  >
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 text-right justify-evenly gap-2 flex flex-row"
                >
                  <button
                    type="button"
                    class="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                    @click="activateEmployee(employee.user_id)"
                  >
                    <p v-if="!employee.is_active">Activate</p>
                    <p v-if="employee.is_active">Deactivate</p>
                  </button>
                  <button
                    type="button"
                    :class="employee.is_deleted ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'"
                    class="py-2 px-4 text-sm font-medium text-white rounded-lg "
                    @click="deleteAccount(employee.user_id)"
                  >
                    <span v-if="employee.is_deleted"> Restore </span>
                    <span v-if="!employee.is_deleted"> Delete </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- new employee model -->

      <!-- Main modal -->
      <div
        id="crud-modal"
        :class="{ hidden: !isModelOpen }"
        tabindex="-1"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-700 bg-opacity-50"
      >
        <div
          class="relative p-4 w-full max-w-md max-h-full flex justify-center"
        >
          <!-- Modal content -->
          <div class="flex justify-center items-center">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <!-- Modal header -->
              <div
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Developer
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="toggleModel"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <form class="p-4 md:p-5 max-w-screen-md min-w-[20rem]">
                <div class="grid gap-4 mb-4 grid-cols-2 w-full">
                  <div class="col-span-2">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >First Name</label
                    >
                    <input
                      v-model="firstName"
                      type="text"
                      name="first_name"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="developer first name"
                      required=""
                    />
                  </div>

                  <div class="col-span-2">
                    <label
                      for="last_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Last Name</label
                    >
                    <input
                      v-model="lastName"
                      type="text"
                      name="last_name"
                      id="last_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="developer last name"
                      required=""
                    />
                  </div>

                  <div class="col-span-2">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Email Address</label
                    >
                    <input
                      v-model="email"
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="developer email"
                      required=""
                    />
                  </div>
                </div>
                <button
                  type="button"
                  @click="handleOnSubmitNewDeveloper"
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full justify-center"
                >
                  <svg
                    class="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import {
  employees,
  ativateEmployee,
  deleteEmployee,
  addNewDeveloper,
} from "../api/employee.ts";
import { STATUS } from "../lib/enum.ts";

const employeeList = ref([]);
const isModelOpen = ref(false);
const firstName = ref("");
const lastName = ref("");
const email = ref("");

const getEmployees = async () => {
  const { success, message, data } = await employees();

  employeeList.value = data;
};



const activateEmployee = async (user_id) => {
  const { message } = await ativateEmployee(user_id);
  getEmployees();
};

const deleteAccount = async (user_id) => {
  const { message } = await deleteEmployee(user_id);
  getEmployees();
};

const toggleModel = () => {
  isModelOpen.value = !isModelOpen.value;
};

const handleOnSubmitNewDeveloper = async () => {
  const { message } = await addNewDeveloper(
    firstName.value,
    lastName.value,
    email.value
  );
  getEmployees();
  toggleModel();
};

onMounted(getEmployees);

const components = { Navbar };
</script>

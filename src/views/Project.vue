<template>
  <div>
    <Navbar />

    <div class="p-4 sm:ml-64 justify-center flex">
      <div class="max-w-7xl w-full">
        <!-- header -->
        <div
          class="mt-14 bg-white rounded-lg flex-col justify-center flex items-center"
        >
          <div
            class="p-4 max-w-7xl flex flex-row justify-between items-center w-full rounded-md"
          >
            <p class="text-2xl text-gray-900">Projects</p>
            <button
              type="button"
              @click="toggleModel"
              :class="user.role === ROLE.ADMIN ? 'flex' : 'hidden'"
              class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              New Project
            </button>
          </div>
        </div>

        <!-- project list -->
        <div
          v-if="projectList.length > 0"
          class="p-4 rounded-lg dark:border-gray-700 mt-10"
        >
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="project in projectList"
              :key="project.id"
              class="flex flex-col items-center justify-center rounded bg-gray-50 h-32 dark:bg-gray-800 p-3"
            >
              <p class="line-clamp-1 text-2xl text-gray-900 dark:text-gray-200">
                {{ project.project_name }}
              </p>
              <p
                class="text-md line-clamp-3 dark:text-gray-200 text-gray-900 text-center"
              >
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- new project model -->

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
                  Add New Project
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
                      for="project_name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Project Name</label
                    >
                    <input
                      v-model="project_name"
                      type="text"
                      name="project_name"
                      id="project_name"
                      :class="[
                        'bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-gray-600 ',
                        projectNameError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                      placeholder="project name"
                      required=""
                    />
                    <p
                      v-if="projectNameError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ projectNameError }}
                    </p>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Description</label
                    >
                    <textarea
                      v-model="description"
                      type="text"
                      name="description"
                      id="description"
                      rows="4"
                      :class="[
                        'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        descriptionError
                          ? 'border-red-300 dark:red-gray-600'
                          : 'border-gray-300 dark:border-gray-600',
                      ]"
                      placeholder="project description"
                    ></textarea>
                    <p
                      v-if="descriptionError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ descriptionError }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="handleOnSubmitNewProject"
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
import { onMounted, ref, watch } from "vue";
import Navbar from "../components/Navbar.vue";
import { newProject, projects } from "../api/projects";
import { useAuthStore } from "../store/auth";
import { ROLE } from "../lib/enum";

const authStore = useAuthStore();
const user = authStore.user;

const isModelOpen = ref(false);
const projectList = ref([]);
const project_name = ref("");
const description = ref("");

// errors
const projectNameError = ref(null);
const descriptionError = ref(null);

const resetForm = () => {
  project_name.value = "";
  description.value = "";
  projectNameError.value = null;
  descriptionError.value = null;
};

const toggleModel = () => {
  isModelOpen.value = !isModelOpen.value;
  resetForm();
};

const getProjects = async () => {
  const { success, data, message } = await projects();
  if (success) {
    projectList.value = data;
  } else {
  }
};

const handleOnSubmitNewProject = async () => {
  projectNameError.value =
    project_name.value.length === 0 ? "Project name required" : null;
  descriptionError.value =
    description.value.length === 0 ? "Description required" : null;

  if (projectNameError.value || descriptionError.value) {
    return;
  }

  const { message } = await newProject(project_name.value, description.value);

  getProjects();

  setTimeout(() => {
    toggleModel();
  }, 1000);
};

watch(project_name, (newValue) => {
  if (newValue.length > 0) {
    projectNameError.value = null;
  }
});

watch(description, (newValue) => {
  if (newValue.length > 0) {
    descriptionError.value = null;
  }
});

onMounted(getProjects);
const components = { Navbar };
</script>

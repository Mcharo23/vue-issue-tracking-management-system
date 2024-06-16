<template>
  <div>
    <Navbar />

    <div class="p-4 sm:ml-64">
      <!-- header -->
      <div class="mt-14 flex flex-col justify-center items-center">
        <div
          class="p-4 max-w-7xl bg-white flex flex-row justify-between items-center w-full rounded-md"
        >
          <p class="text-2xl text-gray-900">Issues</p>
        </div>
      </div>

      <!-- ALL ISSUES -->
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
                <th scope="col" class="px-6 py-3">Project Name</th>
                <th scope="col" class="px-6 py-3">Issue Name</th>
                <th scope="col" class="px-6 py-3">Summary</th>
                <th scope="col" class="px-6 py-3">Comments</th>
                <th scope="col" class="px-6 py-3">Priority</th>
                <th scope="col" class="px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="issue in issueList"
                :key="issue.issue_id"
                class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ issue.project_name }}
                </td>

                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ issue.issue_type }}
                </td>

                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ issue.summary }}
                </td>

                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ issue.comments.length }}
                </td>

                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span
                    :style="{
                      backgroundColor: PRIORITY_COLORS[issue.priority],
                    }"
                    class="text-sm font-medium me-2 px-2.5 py-0.5 rounded"
                    >{{ issue.priority }}</span
                  >
                </td>

                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span
                    :style="{
                      backgroundColor: STATUS_COLORS[issue.status],
                    }"
                    class="text-sm font-medium me-2 px-2.5 py-0.5 rounded"
                    >{{ issue.status }}</span
                  >
                </td>

                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <button
                    type="button"
                    class="py-2 px-4 text-sm font-medium text-white rounded-lg bg-green-500 hover:bg-green-700"
                    @click="toggleModel(issue.issue_id)"
                  >
                    Progress
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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
                  Progress
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="toggleModel(``)"
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
                      for="status"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Select Status</label
                    >
                    <select
                      id="status"
                      v-model="selectedStatus"
                      :class="[
                        'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        selectedStatusError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                    >
                      <option selected disabled value="">
                        Select a status
                      </option>
                      <!-- Populate options from the ISSUE_STATUS enum -->
                      <option
                        v-for="(status, key) in ISSUE_STATUS"
                        :key="key"
                        :value="status"
                      >
                        {{ status }}
                      </option>
                    </select>
                    <p
                      v-if="selectedStatusError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ selectedStatusError }}
                    </p>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="comment"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Comment</label
                    >
                    <textarea
                      v-model="comment"
                      type="text"
                      name="comment"
                      id="comment"
                      rows="4"
                      :class="[
                        'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        commentError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                      placeholder="progress comment"
                    ></textarea>
                    <p v-if="commentError" class="text-red-500 text-xs italic">
                      {{ commentError }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="recordProgress"
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
                  Save
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
import { getIssuesByAssigneeId, updateIssueStatus } from "../api/issue";
import {
  ISSUE_STATUS,
  PRIORITY,
  PRIORITY_COLORS,
  STATUS,
  STATUS_COLORS,
} from "../lib/enum";

const issueList = ref([]);
const comment = ref("");
const selectedStatus = ref("");
const selectedId = ref("");
const isModelOpen = ref(false);

// errors
const commentError = ref(null);
const selectedStatusError = ref(null);

const resetForm = () => {
  comment.value = "";
  selectedStatus.value = "";
  commentError.value = null;
  selectedStatusError.value = null;
};

const toggleModel = (issue_id) => {
  selectedId.value = issue_id;
  isModelOpen.value = !isModelOpen.value;
  resetForm();
};

const getIssues = async () => {
  const { success, data, message } = await getIssuesByAssigneeId();

  if (success) {
    issueList.value = data;
  }
};

const recordProgress = async () => {
  commentError.value =
    comment.value.length === 0 ? "Comment required for progress" : null;
  selectedStatusError.value =
    selectedStatus.value.length === 0 ? "Please select status" : null;

  if (commentError.value || selectedStatusError.value) {
    return;
  }

  const { message } = await updateIssueStatus(
    selectedId.value,
    comment.value,
    selectedStatus.value
  );
  toggleModel();
  getIssues();
};

watch(comment, (newValue) => {
  if (newValue.length > 0) {
    commentError.value = null;
  }
});

watch(selectedStatus, (newValue) => {
  if (newValue.length > 0) {
    selectedStatusError.value = null;
  }
});

onMounted(getIssues);
const components = { Navbar };
</script>

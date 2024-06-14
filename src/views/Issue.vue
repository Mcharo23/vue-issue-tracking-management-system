<template>
  <div>
    <Navbar />

    <div class="p-4 sm:ml-64">
      <!-- header -->
      <div class="mt-14 flex flex-col justify-center items-center">
        <div
          class="p-4 border-2 border-gray-200 max-w-7xl flex flex-row justify-between items-center w-full rounded-md"
        >
          <p class="text-2xl text-gray-900">Projects</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-4 border-b border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          <li class="me-2" role="presentation">
            <button
              :class="[
                'inline-block p-4 border-b-2 rounded-t-lg',
                activeTab === 'issue'
                  ? 'border-blue-500 text-blue-500'
                  : 'hover:text-gray-600 hover:border-gray-300',
              ]"
              @click="activeTab = 'issue'"
              id="issue-tab"
              type="button"
              role="tab"
              aria-controls="issue"
              :aria-selected="activeTab === 'issue'"
            >
              Issue
            </button>
          </li>
          <li role="presentation">
            <button
              :class="[
                'inline-block p-4 border-b-2 rounded-t-lg',
                activeTab === 'issue-type'
                  ? 'border-blue-500 text-blue-500'
                  : 'hover:text-gray-600 hover:border-gray-300 ',
              ]"
              @click="activeTab = 'issue-type'"
              id="issue-type-tab"
              type="button"
              role="tab"
              aria-controls="issue-type"
              :aria-selected="activeTab === 'issue-type'"
            >
              Issue Type
            </button>
          </li>
        </ul>
      </div>

      <div>
        <div
          v-show="activeTab === 'issue'"
          class="p-4 rounded-lg"
          id="issue"
          role="tabpanel"
          aria-labelledby="issue-tab"
        >
          <div class="flex flex-row justify-end rounded border-dashed">
            <button
              type="button"
              @click="toggleIssueModel"
              class="flex flex-row py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
              Issue
            </button>
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
                    <th scope="col" class="px-6 py-3">Developer</th>
                    <th scope="col" class="px-6 py-3">Comments</th>
                    <th scope="col" class="px-6 py-3">Priority</th>
                    <th scope="col" class="px-6 py-3">Status</th>
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
                      {{ issue.developer }}
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ALL ISSUE TYPE -->
        <div
          v-show="activeTab === 'issue-type'"
          class="p-4 rounded-lg"
          id="issue-type"
          role="tabpanel"
          aria-labelledby="issue-type-tab"
        >
          <div class="flex flex-row justify-end rounded border-dashed">
            <button
              type="button"
              @click="toggleIssueTypeModel"
              class="flex flex-row py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
              Issue Type
            </button>
          </div>

          <div
            v-if="issueTypeList.length > 0"
            class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10"
          >
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="issue in issueTypeList"
                :key="issue.issue_type_id"
                class="flex flex-col items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800"
              >
                <p
                  class="line-clamp-3 text-2xl text-gray-900 dark:text-gray-200"
                >
                  {{ issue.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- NEW ISSUE MODEL-->
      <div
        id="crud-modal"
        :class="{ hidden: !isNewIssueModelOpen }"
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
                  New Issue
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="toggleIssueModel"
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
                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="issue-type"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Select Issue Type</label
                    >
                    <select
                      id="issueType"
                      v-model="selectedIssueType"
                      :class="[
                        'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        selectedIssueTypeError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                    >
                      <option selected disabled value="">
                        Select an issue type
                      </option>
                      <option
                        v-for="issueType in issueTypeList"
                        :key="issueType.issue_type_id"
                        :value="issueType.issue_type_id"
                      >
                        {{ issueType.name }}
                      </option>
                    </select>
                    <p
                      v-if="selectedIssueTypeError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ selectedIssueTypeError }}
                    </p>
                  </div>

                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="project"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Select Project</label
                    >
                    <select
                      id="projects"
                      v-model="selectedProject"
                      :class="[
                        'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        selectedProjectError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                    >
                      <option selected disabled value="">
                        Select a project
                      </option>
                      <option
                        v-for="project in projectList"
                        :key="project.project_id"
                        :value="project.project_id"
                      >
                        {{ project.project_name }}
                      </option>
                    </select>
                    <p
                      v-if="selectedProjectError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ selectedProjectError }}
                    </p>
                  </div>

                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="priority"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Select Priority</label
                    >
                    <select
                      id="priority"
                      v-model="selectedPriority"
                      :class="[
                        'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        selectedPriorityError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                    >
                      <option selected disabled value="">
                        Select a priority
                      </option>
                      <option
                        v-for="(priority, key) in PRIORITY"
                        :key="key"
                        :value="priority"
                      >
                        {{ priority }}
                      </option>
                    </select>
                    <p
                      v-if="selectedPriorityError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ selectedPriorityError }}
                    </p>
                  </div>

                  <div class="col-span-2 sm:col-span-1">
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
                      for="project"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Select Developer</label
                    >
                    <select
                      id="projects"
                      v-model="selectedDeveoper"
                      :class="[
                        'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        selectedDeveoperError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                    >
                      <option selected disabled value="">
                        Select a developer
                      </option>
                      <option
                        v-for="developer in developerList"
                        :key="developer.user_id"
                        :value="developer.user_id"
                      >
                        {{ developer.first_name + " " + developer.last_name }}
                      </option>
                    </select>
                    <p
                      v-if="selectedDeveoperError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ selectedDeveoperError }}
                    </p>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="summary"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Summary</label
                    >
                    <textarea
                      v-model="summary"
                      id="summary"
                      rows="4"
                      :class="[
                        'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        summaryError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                      placeholder="issue summary"
                    ></textarea>
                    <p v-if="summaryError" class="text-red-500 text-xs italic">
                      {{ summaryError }}
                    </p>
                  </div>

                  <div class="col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Description</label
                    >
                    <textarea
                      v-model="issue_description"
                      id="description"
                      rows="4"
                      :class="[
                        'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                        issueDescritionError
                          ? 'border-red-300 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-500',
                      ]"
                      placeholder="issue description"
                    ></textarea>
                    <p
                      v-if="issueDescritionError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ issueDescritionError }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="handleOnSubmitNewIssue"
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

      <!-- NEW ISSUE TYPE MODEL-->
      <div
        id="crud-modal"
        :class="{ hidden: !isIssueTypeOpnen }"
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
                  New Issue Type
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="toggleIssueTypeModel"
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
                      for="issueTypeName"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Issue Type Name</label
                    >
                    <input
                      v-model="issue_type_name"
                      type="text"
                      name="issue_type_name"
                      id="issue_type_name"
                      :class="[
                        'bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
                        issueTypeNameError
                          ? 'dark:border-red-500 border-red-300'
                          : 'dark:border-gray-500 border-gray-300',
                      ]"
                      placeholder="issue name"
                      required=""
                    />
                    <p
                      v-if="issueTypeNameError"
                      class="text-red-500 text-xs italic"
                    >
                      {{ issueTypeNameError }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="handleOnSubmitIssueTypeName"
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
import { getIssues, newIssue } from "../api/issue";
import { employees } from "../api/employee";
import { getIssueTypes, newIssueType } from "../api/issue-type";
import { projects } from "../api/projects";
import {
  ISSUE_STATUS,
  PRIORITY,
  PRIORITY_COLORS,
  ROLE,
  STATUS,
  STATUS_COLORS,
} from "../lib/enum";

const isActionModelOpen = ref(false);
const isIssueTypeOpnen = ref(false);
const isNewIssueModelOpen = ref(false);
const issueList = ref([]);
const issueTypeList = ref([]);
const projectList = ref([]);
const developerList = ref([]);

const activeTab = ref("issue");

const selectedIssueType = ref("");
const selectedProject = ref("");
const selectedPriority = ref("");
const selectedStatus = ref("");
const summary = ref("");
const issue_description = ref("");
const selectedDeveoper = ref("");

const issue_type_name = ref("");

// errors
const issueTypeNameError = ref(null);
const selectedIssueTypeError = ref(null);
const selectedProjectError = ref(null);
const selectedPriorityError = ref(null);
const selectedStatusError = ref(null);
const summaryError = ref(null);
const issueDescritionError = ref(null);
const selectedDeveoperError = ref(null);

const resetForm = () => {
  selectedIssueType.value = "";
  selectedProject.value = "";
  selectedPriority.value = "";
  selectedStatus.value = "";
  summary.value = "";
  issue_description.value = "";
  selectedDeveoper.value = "";
  issue_type_name.value = "";

  issueTypeNameError.value = null;
  selectedIssueTypeError.value = null;
  selectedProjectError.value = null;
  selectedPriorityError.value = null;
  selectedStatusError.value = null;
  summaryError.value = null;
  issueDescritionError.value = null;
  selectedDeveoperError.value = null;
};

watch(selectedIssueType, (newValue) => {});

const toggleActionModel = (issue_id) => {
  isActionModelOpen.value = !isActionModelOpen.value;
  resetForm();
};

const toggleIssueTypeModel = (issue_id) => {
  isIssueTypeOpnen.value = !isIssueTypeOpnen.value;
  resetForm();
};

const toggleIssueModel = () => {
  isNewIssueModelOpen.value = !isNewIssueModelOpen.value;
  resetForm();
};

const getAllIssues = async () => {
  const { success, data, message } = await getIssues();
  if (success) {
    issueList.value = data;
  } else {
  }
};

const handleOnSubmitNewIssue = async () => {
  selectedIssueTypeError.value =
    selectedIssueType.value.length === 0 ? "Select issue type" : null;
  selectedProjectError.value =
    selectedProject.value.length === 0 ? "Select project" : null;
  selectedPriorityError.value =
    selectedPriority.value.length === 0 ? "Select priority" : null;
  selectedStatusError.value =
    selectedStatus.value.length === 0 ? "Select status" : null;
  summaryError.value =
    summary.value.length === 0 ? "Summary for issue required" : null;
  issueDescritionError.value =
    issue_description.value.length === 0 ? "Issue description required" : null;
  selectedDeveoperError.value =
    selectedDeveoper.value.length === 0 ? "Select developer" : null;

  if (
    selectedIssueTypeError.value ||
    selectedProjectError.value ||
    selectedPriorityError.value ||
    selectedStatusError.value ||
    summaryError.value ||
    issueDescritionError.value ||
    selectedDeveoperError.value
  ) {
    return;
  }

  const { message } = await newIssue(
    selectedProject.value,
    selectedIssueType.value,
    summary.value,
    issue_description.value,
    selectedPriority.value,
    selectedStatus.value,
    selectedDeveoper.value
  );

  getAllIssues();

  setTimeout(() => {
    toggleIssueModel();
  }, 100);
};

const getAllIssueTypes = async () => {
  const { success, data, message } = await getIssueTypes();
  if (success) {
    issueTypeList.value = data;
  } else {
  }
};

const getProjects = async () => {
  const { success, data, message } = await projects();
  if (success) {
    projectList.value = data;
  } else {
  }
};

const getDevelopers = async () => {
  const { success, message, data } = await employees();
  if (success) {
    developerList.value = data;
  } else {
  }
};

const handleOnSubmitIssueTypeName = async () => {
  issueTypeNameError.value =
    issue_type_name.value.length === 0 ? "Issue name required" : null;

  if (issueTypeNameError.value) {
    return;
  }

  const { message } = await newIssueType(issue_type_name.value);

  setTimeout(() => {
    getAllIssueTypes();
    toggleIssueTypeModel();
  }, 100);
};

// WATCHERS

watch(selectedIssueType, (newValue) => {
  selectedIssueTypeError.value = null;
});

watch(selectedProject, (newValue) => {
  selectedProjectError.value = null;
});

watch(selectedPriority, (newValue) => {
  selectedPriorityError.value = null;
});

watch(selectedStatus, (newValue) => {
  selectedStatusError.value = null;
});

watch(summary, (newValue) => {
  summaryError.value = null;
});

watch(issue_description, (newValue) => {
  issueDescritionError.value = null;
});

watch(selectedDeveoper, (newValue) => {
  selectedDeveoperError.value = null;
});

watch(issue_type_name, (newValue) => {
  issueTypeNameError.value = null;
});

onMounted(getDevelopers);
onMounted(getAllIssues);
onMounted(getAllIssueTypes);
onMounted(getProjects);
const components = { Navbar };
</script>

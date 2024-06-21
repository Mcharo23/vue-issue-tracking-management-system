<template>
  <div>
    <Navbar />

    <div class="p-4 sm:ml-64 justify-center flex flex-col" v-if="issueProgress">
      <div
        class="p-4 border-2 max-w-7xl w-full text-2xl border-gray-200 rounded-lg dark:border-gray-700 mt-14 divide-y hover:divide-solid"
      >
        <div class="flex flex-col mb-3">
          <div class="font-semibold">Assigned Developer</div>
          <div>
            {{ issueProgress.developer.first_name }}{{ " "
            }}{{ issueProgress.developer.last_name }}
          </div>
        </div>

        <div class="flex flex-col mb-3">
          <div class="font-semibold">Project</div>
          <div>
            {{ issueProgress.project.project_name }}
          </div>
        </div>

        <div class="flex flex-col mb-3">
          <div class="font-semibold">Issue</div>
          <div>
            {{ issueProgress.issue_type.name }}
          </div>
        </div>

        <div class="flex flex-row py-2 gap-5">
          <div class="flex flex-row gap-3">
            <div>Priority:</div>
            <span
              :style="{
                backgroundColor: PRIORITY_COLORS[issueProgress.priority],
              }"
              class="text-xs font-medium me-2 px-2.5 py-0.5 rounded flex items-center justify-center"
              >{{ issueProgress.priority }}</span
            >
          </div>
          <div class="flex flex-row gap-3">
            <div>Status:</div>
            <span
              :style="{
                backgroundColor: STATUS_COLORS[issueProgress.status],
              }"
              class="text-xs font-medium me-2 px-2.5 py-0.5 rounded flex items-center justify-center"
              >{{ issueProgress.status }}</span
            >
          </div>
        </div>
      </div>

      <div
        class="p-4 border-2 max-w-7xl w-full text-2xl border-gray-200 rounded-lg dark:border-gray-700 mt-6"
      >
        <div class="flex flex-col">
          <h2>Summary</h2>
          <div class="text-sm text-gray-900">
            {{ issueProgress.summary }}
          </div>
        </div>
        <div class="flex flex-col">
          <h2>Description</h2>
          <div class="text-sm text-gray-900">
            {{ issueProgress.description }}
          </div>
        </div>
      </div>

      <div
        v-if="issueProgress.comments"
        class="p-4 border-2 max-w-7xl w-full text-2xl border-gray-200 rounded-lg dark:border-gray-700 mt-6 divide-y divide-gray-200"
      >
        <h1>Comments</h1>
        <div
          v-for="comment in issueProgress.comments"
          :key="comment.comment_id"
          class="divide-y hover:divide-solid mt-5"
        >
          <div class="flex flex-col">
            <div class="text-sm">{{ formatDate(comment.created_at) }}</div>
            <h2>{{ comment.comment }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getIssue } from "../api/issue";
import { PRIORITY, PRIORITY_COLORS, STATUS, STATUS_COLORS } from "../lib/enum";
import { formatDate } from "../utils/date-format";

const route = useRoute();
const issueId = ref("");
const issueProgress = ref(null);

const getIssueById = async () => {
  const { success, data, message } = await getIssue(issueId.value);

  if (success) {
    issueProgress.value = data;
    return;
  }
};

onMounted(() => {
  issueId.value = route.params.issue_id;
});

onMounted(getIssueById);

const components = {
  Navbar,
};
</script>

<script setup lang="ts">
import TaskList from "./components/TaskList.vue";
import DialogForm from "./components/DialogForm.vue";
import DialogEditForm from "./components/DialogEditForm.vue";
import { Input } from "./components/ui/input";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { ref } from "vue";

type Task = {
  id: number;
  status: string;
  title: string;
  description: string;
};

const invoices: Task[] = [
  { id: 1, status: "Paid", title: "$250.00", description: "Credit Card" },
  { id: 2, status: "Pending", title: "$150.00", description: "PayPal" },
  { id: 3, status: "Unpaid", title: "$350.00", description: "Bank Transfer" },
  { id: 4, status: "Paid", title: "$450.00", description: "Credit Card" },
  { id: 5, status: "Paid", title: "$550.00", description: "PayPal" },
  { id: 6, status: "Pending", title: "$200.00", description: "Bank Transfer" },
  { id: 7, status: "Unpaid", title: "$300.00", description: "Credit Card" }
];

const isCreateDialogOpen = ref<boolean>(false);
const isEditDialogOpen = ref<boolean>(false);
const currentEditTask = ref<Task | null>(null);

const handleSubmit = (params: { title: string; description: string }): void => {
  console.log("New Task:", params);
};

const handleActions = (action: string, taskId: number): void => {
  console.log("Action:", action, "Task ID:", taskId);

  if (action === "edit") {
    const taskToEdit = invoices.find((invoice) => invoice.id === taskId);
    if (taskToEdit) {
      currentEditTask.value = taskToEdit;
      isEditDialogOpen.value = true;
    }
  }
};

const handleEditSubmit = (updatedTask: {
  title: string;
  description: string;
}): void => {
  console.log("Updated Task:", updatedTask);
  isEditDialogOpen.value = true;
};
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-neutral-100 p-20"
  >
    <div class="flex w-full justify-end gap-4">
      <div class="relative w-full max-w-sm items-center">
        <Input
          type="text"
          placeholder="Pesquisar tarefa..."
          class="bg-white pl-10"
        />
        <span
          class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
        >
          <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
        </span>
      </div>

      <DialogForm
        :is-open="isCreateDialogOpen"
        :onSubmit="
          ({ title, description }) => handleSubmit({ title, description })
        "
      />
    </div>

    <TaskList :invoices="invoices" :handle-action="handleActions" />

    <DialogEditForm
      v-if="currentEditTask"
      :task="currentEditTask"
      :is-open="isEditDialogOpen"
      @close="isEditDialogOpen = false"
      @submit="handleEditSubmit"
    />
  </div>
</template>

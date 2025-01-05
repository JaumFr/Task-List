<script setup lang="ts">
import DialogEditForm from "./components/DialogEditForm.vue";
import DialogForm from "./components/DialogForm.vue";
import { dialogState } from "./composable/dialog";
import TaskList from "./components/TaskList.vue";
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

const [isOpen, closeDialog] = dialogState();

const isEditDialogOpen = ref<boolean>(false);

const handleSubmit = (params: { title: string; description: string }): void => {
  console.log("New Task:", params);
};

const handleActions = (action: string, taskId: number): void => {
  console.log("Action:", action, "Task ID:", taskId);

  if (action === "edit") {
    const taskToEdit = invoices.find((invoice) => invoice.id === taskId);

    isOpen.value = true;
    console.log("Task to Edit:", taskToEdit);
  }
};

const handleEditSubmit = (updatedTask: {
  status: string;
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
      <DialogForm
        :on-submit="
          ({ title, description }) => handleSubmit({ title, description })
        "
      />
    </div>

    <TaskList :invoices="invoices" :handle-action="handleActions" />

    <DialogEditForm
      :is-open="isOpen"
      :is-close="closeDialog"
      :on-submit="
        ({ status, title, description }) =>
          handleEditSubmit({ status, title, description })
      "
    />
  </div>
</template>

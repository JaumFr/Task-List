<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { TrashIcon, Pencil1Icon, CheckIcon } from "@radix-icons/vue";

defineProps<{
  invoices: {
    id: number;
    status: string;
    title: string;
    description: string;
  }[];
  handleAction: (action: string, invoiceId: number) => void;
}>();

const actionButtonsData = [
  { id: "edit", icon: Pencil1Icon },
  { id: "delete", icon: TrashIcon },
  { id: "confirm", icon: CheckIcon }
];
</script>

<template>
  <Table class="h-full rounded-lg bg-white">
    <TableHeader>
      <TableRow>
        <TableHead class="w-40">Status</TableHead>
        <TableHead>Título</TableHead>
        <TableHead class="">Descrição</TableHead>
        <TableHead class="w-32">Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="invoice in invoices" :key="invoice.id">
        <TableCell>{{ invoice.status }}</TableCell>
        <TableCell>{{ invoice.title }}</TableCell>
        <TableCell>{{ invoice.description }} </TableCell>
        <TableCell class="flex gap-2">
          <Button
            v-for="buttonData in actionButtonsData"
            :key="buttonData.id"
            @click="handleAction(buttonData.id, invoice.id)"
            type="button"
            class="h-9 w-9 p-1"
          >
            <component :is="buttonData.icon" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

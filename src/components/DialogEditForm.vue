<script setup lang="ts">
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";

import { PlusIcon } from "@radix-icons/vue";
import { Input } from "./ui/input";
import Textarea from "./ui/textarea/Textarea.vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    title: z.string({ message: "O campo de tarefa é obrigatório" }).min(1, {
      message: "O campo de tarefa deve ter pelo menos 1 caractere"
    }),
    description: z
      .string({ message: "O campo de descrição é obrigatório" })
      .min(1, {
        message: "O campo de descrição deve ter pelo menos 1 caractere"
      })
  })
);

defineProps<{
  task: { id: number; title: string; description: string };
  isOpen: boolean;
  onSubmit: (values: { title: string; description: string }) => void;
}>();
</script>

<template>
  <Form v-slot="{ handleSubmit }" :validation-schema="formSchema">
    <Dialog :open="isOpen" @close="$emit('close')">
      <DialogTrigger as-child>
        <Button variant="outline"> <PlusIcon /> Criar tarefa </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader> <DialogTitle>Criar tarefa</DialogTitle> </DialogHeader>

        <form
          class="flex flex-col gap-4"
          id="dialogForm"
          @submit="handleSubmit($event, onSubmit as any)"
        >
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input type="text" maxlength="50" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  type="text"
                  maxlength="500"
                  class="h-52"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <Button type="submit" form="dialogForm"> Confirmar </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

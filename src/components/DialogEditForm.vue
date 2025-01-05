<script setup lang="ts">
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";

import { Input } from "../components/ui/input";
import Textarea from "./ui/textarea/Textarea.vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    status: z.string({ message: "O campo de status é obrigatório" }).min(1),
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

const props = defineProps<{
  isOpen: boolean;
  isClose: () => void;
  onSubmit: (values: {
    status: string;
    title: string;
    description: string;
  }) => void;
}>();

const handleFormSubmit = (params: {
  status: string;
  title: string;
  description: string;
}) => {
  props.onSubmit(params);
  props.isClose();
};
</script>

<template>
  <Form v-slot="{ handleSubmit }" :validation-schema="formSchema">
    <Dialog :open="isOpen" @update:open="isClose">
      <DialogContent>
        <DialogHeader> <DialogTitle>Editar tarefa</DialogTitle> </DialogHeader>
        <form
          class="flex flex-col gap-4"
          id="dialogForm"
          @submit="handleSubmit($event, handleFormSubmit as any)"
        >
          <FormField v-slot="{ componentField }" name="status">
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="pending"> pendente </SelectItem>
                      <SelectItem value="in-progress">
                        em progresso
                      </SelectItem>
                      <SelectItem value="done"> concluída </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

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

import { type Ref, ref } from 'vue';

type DialogState = [Ref<boolean>, () => void];

export const dialogState = (): DialogState => {
  const isOpen = ref(false);

  function closeDialog(): void {
    isOpen.value = false;
  }

  return [isOpen, closeDialog];
};

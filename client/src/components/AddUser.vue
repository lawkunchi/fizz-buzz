<template>
  <div class="max-w-lg mx-auto p-4">
    <form @submit.prevent="handleSubmit" novalidate>
      <!-- Name Field -->
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          :class="{ 'border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <!-- Email Field -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          :class="{ 'border-red-500': errors.email }"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
         :disabled="isSubmitting.status"
        class="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from "vue";
import * as yup from "yup";
import { User } from '../models/User';
import { toastService } from '../services/ToastService';
import { userService } from '../services/UserService';

export default defineComponent({
  name: 'AddUser',
  props: {
    onUserAdded: {
      type: Function as PropType<(user: User) => void>,
      required: true,
    },
  },
  setup(props) {
    const form = reactive({
      name: '',
      email: '',
    });

    const errors = reactive({
      name: "",
      email: "",
    });

    const isSubmitting = reactive({
      status: false,
    });

    const schema = yup.object().shape({
      name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
      email: yup.string().required("Email is required").email("Must be a valid email"),
    });

    const handleSubmit = async () => {
      try {
        isSubmitting.status = true;
        const user: User = await userService.post(form);
        errors.name = "";
        errors.email = "";

        await schema.validate(form, { abortEarly: false });
        toastService.showToast('User added succefully', 'success', 3000, 'top-right');
        props.onUserAdded(user);

      } catch (err) {
        if (err instanceof yup.ValidationError) {
          err.inner.forEach((validationError) => {
            if (validationError.path) {
              errors[validationError.path] = validationError.message;
            }
          });
        }
        
      }
      finally {
        isSubmitting.status = false;
      }
    };

    return {
      form,
      errors,
      handleSubmit,
      isSubmitting,
    };
  },
});
</script>

<style scoped>
.border-red-500 {
  border-color: #f56565;
}
</style>

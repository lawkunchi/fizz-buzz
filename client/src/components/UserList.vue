<template>
  <div class="container mx-auto px-4">
    <h3 class="text-xl font-semibold my-4">Users</h3>
    <div v-if="users.length" class="flex justify-center">
      <table class="min-w-full table-auto">
        <thead class="bg-gray-200">
          <tr>
            <th class="text-left px-4">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="user._id"
            :class="index % 2 === 0 ? 'bg-gray-100' : ''"
          >
            <td class="px-4">{{ user.name }}</td>
            <td class="text-left">{{ user.email }}</td>
            <td class="text-left" @click="deleteUser(user._id)">
              <button
                title="Delete User"
                class="p-1 rounded-full text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="mt-4">No users found.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "../models/User";
import { userService } from "../services/UserService";

export default defineComponent({
  name: "UserList",
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(userId: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const deleteUser = async (userId: string) => {
      try {
        await userService.delete(userId);
        props.onDelete(userId);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      deleteUser,
    };
  },
});
</script>
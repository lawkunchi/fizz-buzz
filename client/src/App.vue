<template>
  <div class="container mx-auto px-4">
    <h1>User Management</h1>
    <AddUser :onUserAdded="onUserAdded" />
    <UserList :users="users" :onDelete="onDelete"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import AddUser from './components/AddUser.vue';
import UserList from './components/UserList.vue';
import { User } from './models/User';
import { userService } from './services/UserService';

export default defineComponent({
  name: 'App',
  components: {
    AddUser,
    UserList,
  },
  setup() {
    const users = ref<User[]>([]);

    const onUserAdded = (user:User) => {
      users.value.push(user);
    };

      const onDelete = (userId: string) => {
      users.value = users.value.filter(user => user._id !== userId);
    };

    onMounted(async () => {
      const allUsers:User[] = await userService.getAll();
      users.value = allUsers;
    });

    return { users, onUserAdded, onDelete};
  },
});
</script>
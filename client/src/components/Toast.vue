<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="visible"
      :class="[
        ' bottom-1 px-4 py-3 rounded shadow-lg flex items-center',
        typeClasses,
      ]"
    >
      <span class="text-white" v-if="message">{{ message }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success', 
    },
    duration: {
      type: Number,
      default: 3000, 
    },
  },
  setup(props) {
    const visible = ref(true);

    const typeClasses = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500',
    };

    onMounted(() => {
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    });

    return {
      visible,
      typeClasses: typeClasses[props.type],
    };
  },
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
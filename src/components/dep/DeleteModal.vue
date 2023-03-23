<template>
  <modal @close="close">
    <template #header>Are you sure you want to delete '{{name}}' department?</template>
    <template #content>
    <div class="actions">
      <button class="confirm-btn btn" @click="$emit('confirm')">Confirm</button>
      <button class="cancel-btn btn" @click="close">Cancel</button>
    </div>
    </template>
  </modal>
</template>


<script>
import Modal from "../Modal.vue";

export default {
  props: { name: { type: String } },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  components: {
    Modal
  }
};
</script>
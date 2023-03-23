<template>
  <div class="list">
    <table>
      <thead>
        <slot></slot>
      </thead>
      <tbody v-for="field in fields" :key="field._id">
        <preview :field="field" @remove="remove"></preview>
      </tbody>
    </table>
  </div>
</template>

<script>
import Preview from "./Preview.vue"
export default {
  props: {
    fields: {
      type: Array
    }
  },
  components: {
    Preview
  },
  methods: {
    remove(id) {
      this.$emit("remove", id);
    }
  }
};
</script>
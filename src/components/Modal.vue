<template>
  <div class="modal-wrapper">
    <section class="wrapped-modal" v-click-outside="closeModal">
      <h3>
        <slot name="header"></slot>
      </h3>
      <slot name="content"></slot>
    </section>
  </div>
</template>


<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>
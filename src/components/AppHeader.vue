<template>
  <section class="app-header full">
    <nav v-for="comp in comps" :key="comp._id">
      <RouterLink
        :to="`/comp/${comp._id}/emp`"
        :style="{'text-decoration' : isActive(comp._id) ? 'underline': '' }"
      >{{comp.name}}</RouterLink>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      compId: null
    };
  },
  computed: {
    comps() {
      return this.$store.getters.miniComps;
    }
  },
  methods: {
    isActive(compId) {
      return this.$route.params.id === compId;
    }
  },
  watch: {
    $route: {
     async  handler({ params }) {
        const { id } = params;
        this.compId = id || null;
        await this.$store.dispatch({
          type: "setComp",
          compId: this.compId
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

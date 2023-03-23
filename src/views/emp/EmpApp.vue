<template>
  <section class="app" v-if="compId">
    <button class="add-btn btn">
      <a @click="openEditModal" @setFilter="setFilter">Add a new employee</a>
    </button>
    <emp-filter v-if="comp && comp.deps" :deps="comp.deps" @setFilter="setFilter"></emp-filter>
    <list :fields="emps" @remove="removeEmp"  v-if="emps && emps.length">
        <th>Name</th>
        <th class="dep">Department</th>
        <th></th>
    </list>
    <routerView></routerView>
  </section>
</template>

<script>
import List from "@/components/List.vue"
import EmpFilter from "@/components/emp/EmpFilter.vue";
export default {
  computed: {
    emps() {
      return this.$store.getters.filteredEmps;
    },
    compId() {
      return this.$store.getters.currCompId;
    },
    comp() {
      return this.$store.getters.currComp;
    }
  },
  methods: {
    async removeEmp(id) {
      try {
        var compToSave = JSON.parse(JSON.stringify(this.comp));
        var idx = compToSave.emps.findIndex(emp => emp._id === id);
        compToSave.emps.splice(idx, 1);
        await this.$store.dispatch({ type: "saveComp", comp: compToSave });
      } catch (err) {
        console.log("Cannot remove  employee " + id, err);
        this.$notify({
          text: "Oops... Something went wrong",
          title: "Error",
          type: "error"
        });
      }
    },
    openEditModal() {
      if (!this.comp.deps || !this.comp.deps.length)
        this.$notify({
          text:
            "This company has no departments. Please add a department first",
          title: "Error",
          type: "error"
        });
      else this.$router.push(`/comp/${this.compId}/emp/edit`);
    },
    setFilter(filterBy) {
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      this.$store.dispatch({
        type: "setFilter",
        filterBy: copyFilter
      });
    }
  },
  components: {
    EmpFilter,
    List
  }
};
</script>
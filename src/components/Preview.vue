<template>
  <tr class="preview">
    <td name="name">{{field.name}}</td>
    <td v-if="field.depId" class="dep">{{getDepName(field)}}</td>
    <td class="actions">
      <el-dropdown>
        <span class="el-dropdown-link">Actions</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="remove(field._id)">Delete Employee</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Preview",
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDepName(emp) {
      const deps = this.$store.getters.currComp.deps;
      const dep = deps.find(dep => dep._id === emp.depId);
      return dep.name;
    },
      remove(id) {
      this.$emit("remove", id);
    }
  }
};
</script>


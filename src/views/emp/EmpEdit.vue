<template>
  <modal @close="closeModal">
    <template #header>Add a new '{{ comp.name }}' employee</template>
    <template #content>
      <form v-if="empToEdit" @submit.prevent="save">
        <el-input type="text" placeholder="Employee name" v-model="empToEdit.name" />
        <label>
          <el-select v-model="empToEdit.depId">
            <el-option
              v-for="dep in comp.deps"
              :key="dep._id"
              :label="dep.name"
              :value="dep._id"
            >{{dep.name}}</el-option>
          </el-select>
        </label>
        <button>Save</button>
      </form>
    </template>
  </modal>
</template>
<script>
import compService from "@/services/comp.service.js";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      empToEdit: null
    };
  },
  created() {
    this.empToEdit = compService.getEmp();
  },
  methods: {
    async save() {
      try {
        var compToSave = JSON.parse(JSON.stringify(this.comp));
        var empToSave = JSON.parse(JSON.stringify(this.empToEdit));
        if (!(empToSave.depId || empToSave.name)) return;
        compToSave.emps.push(empToSave);
        await this.$store.dispatch({
          type: "saveComp",
          comp: compToSave
        });
        this.closeModal();
      } catch (err) {
        console.log("can't add employee ", err);
        this.$notify({
          text: "Oops... Something went wrong",
          title: "Error",
          type: "error"
        });
      }
    },
    closeModal() {
      this.empToEdit = null;
      this.$router.go(-1);
    }
  },
  computed: {
    comp() {
      return this.$store.getters.currComp;
    }
  }
};
</script>

<template>
  <div class="modal-wrapper" v-if="comp">
    <section class="emp-edit wrapped-modal" v-click-outside="closeModal">
      <h3>Add a new '{{ comp.name }}' employee</h3>
      <form v-if="empToEdit" @submit.prevent="save" class="emp-edit-form">
        <input type="text" placeholder="Fullname" v-model="empToEdit.name" />
        <label>
          <!-- Department -->
          <el-select v-model="empToEdit.dep">
            <el-option
              v-for="dep in comp.deps"
              :key="dep._id"
              :value="dep.name"
              @click="setDepId(dep._id)"
            >{{dep.name}}</el-option>
          </el-select>
        </label>
        <button>Save</button>
      </form>
    </section>
  </div>
</template>
<script>
import compService from "../../services/comp.service.js";
export default {
  components: {},
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
        delete empToSave.dep;
        if (!(empToSave.depId || empToSave.name)) return
        compToSave.emps.push(empToSave);
        await this.$store.dispatch({
          type: "saveComp",
          comp: compToSave
        });
        this.closeModal();
      } catch (err) {
        console.log("can't add employee ", err);
      }
    },
    closeModal() {
      this.empToEdit = null;
      this.$router.go(-1);
    },
    setDepId(depId) {
      this.empToEdit.depId = depId;
    }
  },
  computed: {
    comp() {
      return this.$store.getters.currComp;
    }
  }
};
</script>

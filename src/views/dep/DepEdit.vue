<template>
  <modal @close="closeModal">
    <template #header>Add a new '{{ comp.name }}' department</template>
    <template #content>
      <form v-if="depToEdit" @submit.prevent="save" >
        <el-input type="text" placeholder="Department name" v-model="depToEdit.name" />
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
      depToEdit: null
    };
  },
  created() {
    this.depToEdit = compService.getDep();
  },
  methods: {
    async save() {
      try {
        var compToSave = JSON.parse(JSON.stringify(this.comp));
        var depToSave = JSON.parse(JSON.stringify(this.depToEdit));
        if (!depToSave.name) return;
        compToSave.deps.push(depToSave);
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
      this.depToEdit = null;
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
<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <h2>添加信息</h2>
      <b-form-group label="账号">
        <b-form-input v-model="account" placeholder="账号"></b-form-input>
      </b-form-group>
      <b-form-group label="密码">
        <b-form-input v-model="password" type="password" placeholder="密码"></b-form-input>
      </b-form-group>
      <b-form-group label="平台">
        <b-form-input v-model="platform" placeholder="平台"></b-form-input>
      </b-form-group>
      <b-form-group label="图标">
        <b-form-input v-model="icon" placeholder="图标"></b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="addInfo">添加</b-button>
      <b-button @click="closeModal">关闭</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
      account: '',
      password: '',
      platform: '',
      icon: '',
    };
  },
  methods: {
    addInfo() {
      // 添加信息逻辑
      this.$emit('add-info', { account: this.account, password: this.password, platform: this.platform, icon: this.icon });
      this.account = '';
      this.password = '';
      this.platform = '';
      this.icon = '';
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
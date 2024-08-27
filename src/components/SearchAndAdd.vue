<template>
  <div class="search-container">
    <div class="search-input-group">
      <b-form-input v-model="searchQuery" placeholder="搜索..." class="search-input"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="search" class="search-btn" disabled>搜索</b-button>
      </b-input-group-append>
    </div>
    <div class="add-button-group">
      <b-button v-b-modal.modal-center variant="success" @click="showModal" class="add-btn">添加信息</b-button>
    </div>
    <!-- 添加信息的模态框 -->
    <b-modal ref="addInfoModal" :title="'添加信息'" @show="resetModal" @hidden="resetModal">
      <template #modal-header>
        <h5>添加信息</h5>
        <button type="button" class="close" @click="hideModal">
          <span aria-hidden="true">❌</span>
        </button>
      </template>
      <template #default>
        <b-form @submit.stop.prevent="addInfo">
          <b-form-group label="图标">
            <b-form-input v-model="addInfo.icon" placeholder="icon URL"></b-form-input>
          </b-form-group>
          <b-form-group label="平台">
            <b-form-input v-model="addInfo.platform_name" placeholder="请输入平台名称"></b-form-input>
          </b-form-group>
          <b-form-group label="账号">
            <b-form-input v-model="addInfo.account" placeholder="请输入账号"></b-form-input>
          </b-form-group>
          <b-form-group label="密码">
            <b-form-input type="password" v-model="addInfo.password" placeholder="请输入密码密码"></b-form-input>
          </b-form-group>
          <b-form-group label="链接">
            <b-form-input type="text" v-model="addInfo.link" placeholder="请输入链接"></b-form-input>
          </b-form-group>
          <b-form-group label="备注">
            <b-form-input type="text" v-model="addInfo.notes" placeholder="备注"></b-form-input>
          </b-form-group>
        </b-form>
      </template>
      <!-- 模态框页脚 -->
      <template #modal-footer="{}">
        <b-button class="mt-3" variant="info" type="submit" @click="addItem">添加</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data() {
    return {
      DataList: [],
      searchQuery: '',
      // 后端类型
      backend_type: '',
      addInfo: {
        account: '',
        password: '',
        platform_name: '',
        icon: '',
        notes: '',
        link: ''
      },
    };
  },
  methods: {
    // ！！！待实现：搜索
    search() {
      request.get('/tableData')
        .then(response => {
          this.DataList = response.data;
          const searchDataList = this.searchQuery.toLowerCase();
          this.DataList = this.DataList.filter(item => {
            return Object.values(item).some(value => {
              return String(value).toLowerCase().includes(searchDataList);
            });
          });
          alert('成功搜索到以下内容');
          console.log(this.filteredDataList);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('未找到！');
        });
    },
    // 关闭模态框
    hideModal() {
      this.$refs.addInfoModal.hide();
    },
    // 显示模态框
    showModal() {
      this.$refs.addInfoModal.show();
    },
    resetModal() {
      this.addInfo = {
        account: '',
        password: '',
        platform_name: '',
        icon: '',
        notes: '',
        link: '',
      };
    },
    addItem() {
      var addUrl = ''
      if (this.backend_type === 'json-server') { addUrl = `/pwdinfo/`; }
      if (this.backend_type === 'flask') {
        addUrl = `/pwdinfo/add`;
      }
      console.log('新增',this.addInfo);
      console.log(JSON.stringify(this.addInfo));
      request.post(addUrl, JSON.stringify(this.addInfo),{headers: {
    'Content-Type': 'application/json'
    }})
        .then(() => {
          alert('添加成功')
          window.location.reload()
        })
        .catch(error => {
          console.error('Error:', error);
          alert('很抱歉，添加失败！请检查内容格式')
        });
      this.resetModal();
      this.hideModal()
    },
  },
  created() {
    this.backend_type = process.env.VUE_APP_BACKEND_TYPE
  }
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.search-input-group {
  display: flex;
  width: 50%;
  align-items: center;
}

.search-input {
  flex: 1;
  /* 使搜索输入框占据剩余空间 */
}

.search-btn {
  width: 100px;
}

.add-btn {
  width: 100px;
}

.add-button-group {
  display: flex;
  align-items: center;
}

/* 添加信息模态框 */
.modal-header .close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-size: 20px;
  background-color: white;
}

.modal-header .close:hover {
  opacity: 0.5;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .search-container {
    flex-direction: column;
  }

  .search-input-group {
    flex-direction: column;
  }

  .search-btn {
    margin-bottom: 1rem;
  }

  .search-input {
    width: 300px;
    margin-bottom: 0.5rem;
  }
}
</style>
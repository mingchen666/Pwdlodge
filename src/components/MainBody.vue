<template>
  <div>
    <b-table striped hover :items="TableDataList" :fields="fields" responsive="sm" class="custom-table">
      <!-- 平台icon图标 -->
      <template #cell(icon)="data">
        <img :src="data.item.icon" alt="" class="table-icon" />
        <!-- <b-icon :icon="data.item.icon" font-scale="1.5"></b-icon> -->
      </template>
      <!-- 查看密码按钮 -->
      <template #cell(viewPassword)="data">
        <b-button size="sm" variant="info" @click="ViewPassword(data.item)">查看密码</b-button>
      </template>
      <!-- 密码列显示为星号 -->
      <template #cell(password)="data">
        <span v-if="!visiblePasswords.includes(data.item.id)">{{ "********" }}</span>
        <span v-else>{{ data.item.password }}</span>
      </template>
      <!-- 链接 -->
      <template #cell(link)="data">
        <a :href="data.item.link" target="_blank">{{
          data.item.linkText || "链接"
        }}</a>
      </template>
      <!-- 操作按钮 -->
      <template #cell(actionButtons)="data">
        <div class="d-flex justify-content-center">
          <b-button size="sm" variant="danger" @click="confirmDelete(data.item)">删除</b-button>
          <b-button size="sm" variant="warning" @click="editItem(data.item)">编辑</b-button>
        </div>
      </template>
    </b-table>
    <!-- 编辑模态框 start-->
    <b-modal v-model="showEditModal" title="'编辑密码'" hide-footer no-close-on-backdrop no-close-on-esc>
      <template #modal-header>
        <h5>编辑密码</h5>
        <button type="button" class="close" @click="hideModal">
          <span aria-hidden="true">❌</span>
        </button>
      </template>
      <b-form @submit.prevent="saveEdit">
        <b-form-group label="Icon链接:">
          <b-form-input v-model="editingItem.icon" type="text" placeholder="请输入icon图标链接"
            class="form-control-lg"></b-form-input>
        </b-form-group>
        <b-form-group label="平台:">
          <b-form-input v-model="editingItem.platform_name" type="text" placeholder="请输入平台名称"
            class="form-control-lg"></b-form-input>
        </b-form-group>
        <b-form-group label="账号:">
          <b-form-input v-model="editingItem.account" type="text" placeholder="请输入账号"
            class="form-control-lg"></b-form-input>
        </b-form-group>
        <b-form-group label="密码:">
          <b-form-input v-model="editingItem.password" type="password" placeholder="请输入密码"
            class="form-control-lg"></b-form-input>
        </b-form-group>
        <b-form-group label="链接">
          <b-form-input v-model="editingItem.link" type="text" placeholder="请输入链接"
            class="form-control-lg"></b-form-input>
        </b-form-group>
        <b-form-group label="备注:">
          <b-form-input v-model="editingItem.notes" type="text" placeholder="备注(选填)"
            class="form-control-lg"></b-form-input>
        </b-form-group>
      </b-form>
      <div class="modal-footer">
        <b-button variant="secondary" @click="showEditModal = false">取消</b-button>
        <b-button variant="success" @click="saveEdit">保存</b-button>
      </div>
    </b-modal>
    <!-- 编辑模态框 end-->
    <!-- 分页 -->
    <div class="pagination-container">
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-table"
        class="custom-pagination" size="lg" first-text="⏮" prev-text="⏪" next-text="⏩" last-text="⏭"></b-pagination>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data() {
    return {
      // 后端类型
      backend_type: '',
      allDataList: [],
      TableDataList: [],
      showDeleteModal: false,
      showEditModal: false,
      editingItem: {},
      ConfirmedPassword: '',
      visiblePasswords: [], // 用于存储需要显示密码的 ID
      currentPage: 1,
      totalRows: 0, // 总行数
      perPage: 5,  // 每页显示的行数
      fields: [
        { key: 'icon', label: 'icon', thClass: 'text-center', tdClass: 'text-center', sortable: false },
        { key: 'platform_name', label: '平台', sortable: false },
        { key: 'account', label: '账号', sortable: false },
        { key: 'password', label: '密码', sortable: false },
        { key: 'link', label: '链接', thClass: 'text-center', tdClass: 'text-center', sortable: false },
        { key: 'viewPassword', label: '查看密码', thClass: 'text-center', tdClass: 'text-center', sortable: false },
        { key: 'notes', label: '备注', sortable: false },
        { key: 'actionButtons', label: '操作', thClass: 'text-center', tdClass: 'text-center', sortable: false },
      ],
    };
  },
  watch: {
    currentPage(newPage) {
      this.updateTableData(newPage);
    }
  },
  methods: {
    showPasswordItems(item) {
      return this.showPasswordStates[item.id] || false;
    },
    // 关闭模态框
    hideModal() {
      this.showEditModal = false;
    },
    // 显示模态框
    showModal() {
      this.showEditModal = true;
    },
    // 查看密码
    ViewPassword(item) {
      if (sessionStorage.getItem('ConfirmedPassword') === null || !sessionStorage.getItem('ConfirmedPassword')) {
        // 弹出窗口提示用户输入密码
        const password = prompt('请输入管理密码以确认查看密码：');
        if (password === process.env.VUE_APP_PASSWORD) {
          // 存储确认状态
          sessionStorage.setItem('ConfirmedPassword', 'true');
          item.isshowPassword = true;
        } else {
          // 拒绝查看密码
          alert('密码错误，无法查看密码。');
        }
        return
      }

      // this.isshowPassword = !this.isshowPassword;
      this.togglePasswordVisibility(item.id)
      // item.isshowPassword = true;
      console.log('查看密码', item);

    },
    confirmDelete(item) {
      // 使用 window.confirm 弹出确认框
      const confirmed = window.confirm('您确定要删除此项吗？');
      if (confirmed) {
        this.deleteItem(item);
      }
    },
    // 删除
    deleteItem(item) {
      var deteleUrl = ''
      if (this.backend_type === 'json-server') { deteleUrl = `/pwdinfo/${item.id}`; }
      if (this.backend_type === 'flask') {
        deteleUrl = `/pwdinfo/delete/${item.id}`;
      }
      request.delete(deteleUrl)
        .then(() => {
          alert('删除成功');
          window.location.reload()
        })
        .catch(error => {
          alert('很抱歉，删除失败！')
          console.error('数据删除失败:', error);
        });
    },
    // 编辑
    editItem(item) {
      // 打开模态框
      this.showEditModal = true;
      // 将当前行的数据传递给模态框
      this.editingItem = { ...item };
      console.log('编辑操作:', item);
    },
    saveEdit() {
      this.updateItem(this.editingItem);
      this.showEditModal = false;
    },
    updateItem(item) {
      console.log(item);

      var postUrl = ''
      if (this.backend_type === 'json-server') { postUrl = `/pwdinfo/${item.id}`; }
      if (this.backend_type === 'flask') {
        postUrl = `/pwdinfo/update/${item.id}`;
      }
      // 发送更新请求到后端
      request.patch(postUrl, item)
        .then(() => {
          // 处理响应
          alert('更新成功')
          window.location.reload()
        })
        .catch(error => {
          console.error('更新失败:', error);
          alert('很抱歉，更新失败！请检查内容格式或后端接口!')
        });
    },
    // 切换密码显示
    togglePasswordVisibility(itemId) {
      const index = this.visiblePasswords.indexOf(itemId);
      if (index === -1) {
        // 如果 ID 不在数组中，则添加到数组中
        this.visiblePasswords.push(itemId);
      } else {
        // 如果 ID 已经在数组中，则从数组中移除
        this.visiblePasswords.splice(index, 1);
      }
    },
    // 更新页数
    updateTableData(page) {
      const start = (page - 1) * this.perPage;
      const end = start + this.perPage;
      this.TableDataList = this.allDataList.slice(start, end);
    },
  },
  created() {
    // 后端类型
    this.backend_type = process.env.VUE_APP_BACKEND_TYPE
    var getUrl = '';
    if (this.backend_type === 'json-server') { getUrl = '/pwdinfo/'; }
    if (this.backend_type === 'flask') {
      getUrl = '/pwdinfo/get';
    }
    request.get(getUrl)
      .then((response) => {
        this.allDataList = this.backend_type === 'flask' ? response.data.data : response.data;
      // 更新总行数
      this.totalRows = this.allDataList.length;
      this.updateTableData(this.currentPage); // 初始化表格数据
      })
      .catch(error => {
        alert('很抱歉，获取失败！请检查后端是否可用')
        console.error('数据获取失败:', error);
      });
  }

};
</script>

<style scoped>
.custom-table {
  width: 80%;
  margin: 0 auto;
}

/* 图标icon样式 */
.table-icon {
  width: 30px;
  /* 设置图片宽度 */
  height: 30px;
}

.custom-table .table thead th,
.custom-table .table tbody td {
  text-align: center;
}

.custom-table .table td div.d-flex {
  justify-content: center;
}

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.custom-pagination {
  justify-content: center;
  /* 分页组件内部对齐方式， */
}

.custom-pagination .page-item .page-link {
  border-radius: 5px;
}

/* 修改当前选中页码按钮的背景颜色 */
.active>.page-link {
  background-color: #69e328;
  border-color: #e17b22 !important;
  color: #ffffff !important;
  border-radius: 5px;
}

/* 可选：为所有按钮添加过渡效果 */
.custom-pagination .page-link {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-size: 20px;
  color: #000;
  background-color: white;
  /* opacity: 0.5; */
}

.modal-header .close:hover {
  opacity: 0.5;
}

.modal-footer {
  /* padding: 1rem; */
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
}

/* 移动端样式 */
@media (max-width: 767px) {
  .custom-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 0.875rem;
  }

  .custom-pagination .page-item {
    display: inline-block;
    margin: 0 2px;
  }

  .custom-pagination .page-link {
    padding: 0.25rem 0.5rem;
    /* font-size: 1rem; */
  }
}
</style>
<template>
  <div>
    <b-table striped hover :items="currentTableData" :fields="fields" responsive="sm" class="custom-table">
      <!-- 平台图标 -->
      <template #cell(icon)="data">
        <img :src="data.item.icon" alt="" class="table-icon">
        <!-- <b-icon :icon="data.item.icon" font-scale="1.5"></b-icon> -->
      </template>
      <!-- 查看密码按钮 -->
      <template #cell(viewPassword)="data">
        <b-button size="sm" variant="info" @click="ViewPassword(data.item)">查看密码</b-button>
      </template>
      <!-- 密码列显示为星号 -->
      <template #cell(password)="data">
        <span v-if="!data.item.showPassword">{{ '••••••••' }}</span>
        <span v-else>{{ data.item.password }}</span>
      </template>
      <!-- 链接 -->
      <template #cell(link)="data">
        <a :href="data.item.url" target="_blank">{{ data.item.linkText || '链接' }}</a>
      </template>
      <!-- 操作按钮 -->
      <template #cell(actionButtons)="data">
        <div class="d-flex justify-content-center">
          <b-button size="sm" variant="danger" @click="deleteItem(data.item)">删除</b-button>
          <b-button size="sm" variant="warning" @click="editItem(data.item)">编辑</b-button>
        </div>
      </template>
    </b-table>
    <div class="pagination-container">
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-table"
        class="custom-pagination" size="lg" first-text="⏮" prev-text="⏪" next-text="⏩" last-text="⏭"></b-pagination>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  computed: {
    // 计算当前页面显示的数据
    currentTableData() {
      const firstIndex = (this.currentPage - 1) * this.perPage;
      const lastIndex = firstIndex + this.perPage;
      console.log(lastIndex);
      return this.TableDataList.slice(firstIndex, lastIndex);
    },
  },
  data() {
    return {
      ConfirmedPassword:'',
      showPassword: false,//是否显示密码
      currentPage: 1, // 当前页码
      perPage: 10, // 每页显示条数
      totalRows: 0, // 总行数，需要根据实际数据动态计算
      fields: [
        { key: 'icon', label: 'icon', thClass: 'text-center', tdClass: 'text-center', sortable: false },
        { key: 'platform', label: '平台', sortable: false },
        { key: 'account', label: '账号', sortable: false },
        { key: 'password', label: '密码', sortable: false },
        { key: 'link', label: '链接', thClass: 'text-center', tdClass: 'text-center', sortable: false },
        { key: 'viewPassword', label: '查看密码', thClass: 'text-center', tdClass: 'text-center', sortable: false },
        { key: 'remark', label: '备注', sortable: false },
        { key: 'actionButtons', label: '操作', thClass: 'text-center', tdClass: 'text-center', sortable: false },
      ],
      TableDataList:[],
      TableDataList1: [
      {
          icon: '@/assets/icons_imgs/百度.png',
          platform: '测试',
          account: '1111',
          password: 'password1',
          remark: '备注1',
          showPassword: false,
          url: 'http://baidue.com',
          linkText: '百度'
        },
        {
          icon: require('@/assets/icons_imgs/百度.png'),
          platform: '测试',
          account: '1111',
          password: 'password1',
          remark: '备注1',
          showPassword: false,
          url: 'http://baidue.com',
          linkText: '百度'
        }]
    };
  },
  methods: {

    getIcon(iconPath) {
      // 使用 require 动态加载图标
      return require(`${iconPath}`);
    },
    // 查看密码
    ViewPassword(item) {
      console.log('请确认');
      // console.log(typeof sessionStorage.getItem('hasConfirmedPassword'));
      if (sessionStorage.getItem('ConfirmedPassword')===null) {
        // 弹出窗口提示用户输入密码
        console.log('请确认1');
        const password = prompt('请输入管理密码以确认查看密码：');
        if (password == '1234') {
          // 存储确认状态
          sessionStorage.setItem('ConfirmedPassword', 'true');
          item.showPassword = true;
        } else {
          // 拒绝查看密码
          alert('密码错误，无法查看密码。');
        }
      }
      else 
      {
        item.showPassword = !item.showPassword;
      }

    },
    // 删除
    deleteItem(item) {
      console.log('删除操作:', item);
      const deleteUrl = `/tableData/${item.id}`;
      request.delete(deleteUrl)
        .then(response => {
          console.log('数据删除成功:', response.data);
          alert('删除成功');
        })
        .catch(error => {
          console.error('数据删除失败:', error);
        });
    },
    // 编辑
    editItem(item) {
      console.log('编辑操作:', item);
    },
    // 切换密码显示
    togglePasswordVisibility(item) {
      item.showPassword = !item.showPassword;
    }, 
  },
  created(){
    const getUrl = '/tableData';
    request.get(getUrl)
      .then(response => {
        // console.log('数据获取成功:', response.data);
        // console.log('图片获取成功:', response.data[1].icon);
        this.TableDataList = response.data;
        // 解析 response.data 并将其转换为数组
        console.log('数据获取成功:', this.TableDataList);
        console.log('类型：', typeof this.TableDataList);
      })
    .catch(error => {
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
  width: 30px; /* 设置图片宽度 */
  height: 30px; /* 设置图片高度 */
  /* 其他样式调整 */
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
  /* 根据需要调整分页与表格的距离 */

}

.custom-pagination {
  justify-content: center;
  /* 分页组件内部对齐方式，可根据BootstrapVue版本调整 */
}

.custom-pagination .page-item .page-link {
  border-radius: 5px;
  /* 添加圆角 */
}

/* 修改当前选中页码按钮的背景颜色 */
.active>.page-link {
  background-color: #69e328;
  /* 更改为所需颜色 */
  border-color: #e17b22 !important;
  /* 保持边框颜色与背景一致 */
  color: #ffffff !important;
  /* 文字颜色，确保对比度 */
  /* 如果需要，也可以为选中按钮单独设置圆角 */
  border-radius: 5px;
}

/* 可选：为所有按钮添加过渡效果 */
.custom-pagination .page-link {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

@media (max-width: 767px) {

  /* 移动端样式调整 */
  .custom-pagination .btn {
    /* 在移动端可以调整按钮的大小和间距 */
    padding: 0.25rem 0.5rem;
    margin: 0 0.25rem;
  }
}
/* 移动端样式 */
@media (max-width: 767px) {
  .custom-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .custom-pagination .page-item {
    display: inline-block;
    margin: 0 2px;
  }

  .custom-pagination .page-link {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
  }

  /* 如果需要，可以调整间距和大小 */
}
</style>
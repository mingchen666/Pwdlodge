(function(){"use strict";var t={4558:function(t,e,a){var o=a(5359),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("NavMenu"),e("SearchAndAdd"),e("AddInfo"),e("MainBody")],1)},n=[],r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"Navbar"},[e("b-nav",{attrs:{tabs:"",fill:""}},[e("b-nav-item",[t._v("首页")]),e("b-nav-item",[t._v("个人中心")]),e("b-nav-item",[t._v("等待添加")]),e("b-nav-item",[t._v("等待添加")]),e("b-nav-item",{attrs:{disabled:""}},[t._v("注册/登录")])],1)],1)},i=[],l={},c=l,d=a(4698),u=(0,d.A)(c,r,i,!1,null,null,null),f=u.exports,p=function(){var t=this,e=t._self._c;return e("div",[e("b-table",{staticClass:"custom-table",attrs:{striped:"",hover:"",items:t.TableDataList,fields:t.fields,responsive:"sm"},scopedSlots:t._u([{key:"cell(icon)",fn:function(t){return[e("img",{staticClass:"table-icon",attrs:{src:t.item.icon,alt:""}})]}},{key:"cell(viewPassword)",fn:function(a){return[e("b-button",{attrs:{size:"sm",variant:"info"},on:{click:function(e){return t.ViewPassword(a.item)}}},[t._v("查看密码")])]}},{key:"cell(password)",fn:function(a){return[t.visiblePasswords.includes(a.item.id)?e("span",[t._v(t._s(a.item.password))]):e("span",[t._v(t._s("********"))])]}},{key:"cell(link)",fn:function(a){return[e("a",{attrs:{href:a.item.link,target:"_blank"}},[t._v(t._s(a.item.linkText||"链接"))])]}},{key:"cell(actionButtons)",fn:function(a){return[e("div",{staticClass:"d-flex justify-content-center"},[e("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(e){return t.confirmDelete(a.item)}}},[t._v("删除")]),e("b-button",{attrs:{size:"sm",variant:"warning"},on:{click:function(e){return t.editItem(a.item)}}},[t._v("编辑")])],1)]}}])}),e("b-modal",{attrs:{title:"'编辑密码'","hide-footer":"","no-close-on-backdrop":"","no-close-on-esc":""},scopedSlots:t._u([{key:"modal-header",fn:function(){return[e("h5",[t._v("编辑密码")]),e("button",{staticClass:"close",attrs:{type:"button"},on:{click:t.hideModal}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("❌")])])]},proxy:!0}]),model:{value:t.showEditModal,callback:function(e){t.showEditModal=e},expression:"showEditModal"}},[e("b-form",{on:{submit:function(e){return e.preventDefault(),t.saveEdit.apply(null,arguments)}}},[e("b-form-group",{attrs:{label:"Icon链接:"}},[e("b-form-input",{staticClass:"form-control-lg",attrs:{type:"text",placeholder:"请输入icon图标链接"},model:{value:t.editingItem.icon,callback:function(e){t.$set(t.editingItem,"icon",e)},expression:"editingItem.icon"}})],1),e("b-form-group",{attrs:{label:"平台:"}},[e("b-form-input",{staticClass:"form-control-lg",attrs:{type:"text",placeholder:"请输入平台名称"},model:{value:t.editingItem.platform_name,callback:function(e){t.$set(t.editingItem,"platform_name",e)},expression:"editingItem.platform_name"}})],1),e("b-form-group",{attrs:{label:"账号:"}},[e("b-form-input",{staticClass:"form-control-lg",attrs:{type:"text",placeholder:"请输入账号"},model:{value:t.editingItem.account,callback:function(e){t.$set(t.editingItem,"account",e)},expression:"editingItem.account"}})],1),e("b-form-group",{attrs:{label:"密码:"}},[e("b-form-input",{staticClass:"form-control-lg",attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.editingItem.password,callback:function(e){t.$set(t.editingItem,"password",e)},expression:"editingItem.password"}})],1),e("b-form-group",{attrs:{label:"链接"}},[e("b-form-input",{staticClass:"form-control-lg",attrs:{type:"text",placeholder:"请输入链接"},model:{value:t.editingItem.link,callback:function(e){t.$set(t.editingItem,"link",e)},expression:"editingItem.link"}})],1),e("b-form-group",{attrs:{label:"备注:"}},[e("b-form-input",{staticClass:"form-control-lg",attrs:{type:"text",placeholder:"备注(选填)"},model:{value:t.editingItem.notes,callback:function(e){t.$set(t.editingItem,"notes",e)},expression:"editingItem.notes"}})],1)],1),e("div",{staticClass:"modal-footer"},[e("b-button",{attrs:{variant:"secondary"},on:{click:function(e){t.showEditModal=!1}}},[t._v("取消")]),e("b-button",{attrs:{variant:"success"},on:{click:t.saveEdit}},[t._v("保存")])],1)],1),e("div",{staticClass:"pagination-container"},[e("b-pagination",{staticClass:"custom-pagination",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,"aria-controls":"my-table",size:"lg","first-text":"⏮","prev-text":"⏪","next-text":"⏩","last-text":"⏭"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)},m=[],b=(a(9138),a(1627));const h=b.A.create({baseURL:"http://localhost:3000",timeout:5e3});var v=h,g={data(){return{backend_type:"",allDataList:[],TableDataList:[],showDeleteModal:!1,showEditModal:!1,editingItem:{},ConfirmedPassword:"",visiblePasswords:[],currentPage:1,totalRows:0,perPage:5,fields:[{key:"icon",label:"icon",thClass:"text-center",tdClass:"text-center",sortable:!1},{key:"platform_name",label:"平台",sortable:!1},{key:"account",label:"账号",sortable:!1},{key:"password",label:"密码",sortable:!1},{key:"link",label:"链接",thClass:"text-center",tdClass:"text-center",sortable:!1},{key:"viewPassword",label:"查看密码",thClass:"text-center",tdClass:"text-center",sortable:!1},{key:"notes",label:"备注",sortable:!1},{key:"actionButtons",label:"操作",thClass:"text-center",tdClass:"text-center",sortable:!1}]}},watch:{currentPage(t){this.updateTableData(t)}},methods:{showPasswordItems(t){return this.showPasswordStates[t.id]||!1},hideModal(){this.showEditModal=!1},showModal(){this.showEditModal=!0},ViewPassword(t){if(null!==sessionStorage.getItem("ConfirmedPassword")&&sessionStorage.getItem("ConfirmedPassword"))this.togglePasswordVisibility(t.id),console.log("查看密码",t);else{const e=prompt("请输入管理密码以确认查看密码：");"123456"===e?(sessionStorage.setItem("ConfirmedPassword","true"),t.isshowPassword=!0):alert("密码错误，无法查看密码。")}},confirmDelete(t){const e=window.confirm("您确定要删除此项吗？");e&&this.deleteItem(t)},deleteItem(t){var e="";"json-server"===this.backend_type&&(e=`/pwdinfo/${t.id}`),"flask"===this.backend_type&&(e=`/pwdinfo/delete/${t.id}`),v.delete(e).then((()=>{alert("删除成功"),window.location.reload()})).catch((t=>{alert("很抱歉，删除失败！"),console.error("数据删除失败:",t)}))},editItem(t){this.showEditModal=!0,this.editingItem={...t},console.log("编辑操作:",t)},saveEdit(){this.updateItem(this.editingItem),this.showEditModal=!1},updateItem(t){console.log(t);var e="";"json-server"===this.backend_type&&(e=`/pwdinfo/${t.id}`),"flask"===this.backend_type&&(e=`/pwdinfo/update/${t.id}`),v.patch(e,t).then((()=>{alert("更新成功"),window.location.reload()})).catch((t=>{console.error("更新失败:",t),alert("很抱歉，更新失败！请检查内容格式或后端接口!")}))},togglePasswordVisibility(t){const e=this.visiblePasswords.indexOf(t);-1===e?this.visiblePasswords.push(t):this.visiblePasswords.splice(e,1)},updateTableData(t){const e=(t-1)*this.perPage,a=e+this.perPage;this.TableDataList=this.allDataList.slice(e,a)}},created(){this.backend_type="json-server # or flask";var t="";"json-server"===this.backend_type&&(t="/pwdinfo/"),"flask"===this.backend_type&&(t="/pwdinfo/get"),v.get(t).then((t=>{this.allDataList="flask"===this.backend_type?t.data.data:t.data,this.totalRows=this.allDataList.length,this.updateTableData(this.currentPage)})).catch((t=>{alert("很抱歉，获取失败！请检查后端是否可用"),console.error("数据获取失败:",t)}))}},w=g,k=(0,d.A)(w,p,m,!1,null,"6dd096b6",null),y=k.exports,_=function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-container"},[e("div",{staticClass:"search-input-group"},[e("b-form-input",{staticClass:"search-input",attrs:{placeholder:"搜索..."},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}}),e("b-input-group-append",[e("b-button",{staticClass:"search-btn",attrs:{variant:"info",disabled:""},on:{click:t.search}},[t._v("搜索")])],1)],1),e("div",{staticClass:"add-button-group"},[e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-center",modifiers:{"modal-center":!0}}],staticClass:"add-btn",attrs:{variant:"success"},on:{click:t.showModal}},[t._v("添加信息")])],1),e("b-modal",{ref:"addInfoModal",attrs:{title:"添加信息"},on:{show:t.resetModal,hidden:t.resetModal},scopedSlots:t._u([{key:"modal-header",fn:function(){return[e("h5",[t._v("添加信息")]),e("button",{staticClass:"close",attrs:{type:"button"},on:{click:t.hideModal}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("❌")])])]},proxy:!0},{key:"default",fn:function(){return[e("b-form",{on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.addInfo.apply(null,arguments)}}},[e("b-form-group",{attrs:{label:"图标"}},[e("b-form-input",{attrs:{placeholder:"icon URL"},model:{value:t.addInfo.icon,callback:function(e){t.$set(t.addInfo,"icon",e)},expression:"addInfo.icon"}})],1),e("b-form-group",{attrs:{label:"平台"}},[e("b-form-input",{attrs:{placeholder:"请输入平台名称"},model:{value:t.addInfo.platform_name,callback:function(e){t.$set(t.addInfo,"platform_name",e)},expression:"addInfo.platform_name"}})],1),e("b-form-group",{attrs:{label:"账号"}},[e("b-form-input",{attrs:{placeholder:"请输入账号"},model:{value:t.addInfo.account,callback:function(e){t.$set(t.addInfo,"account",e)},expression:"addInfo.account"}})],1),e("b-form-group",{attrs:{label:"密码"}},[e("b-form-input",{attrs:{type:"password",placeholder:"请输入密码密码"},model:{value:t.addInfo.password,callback:function(e){t.$set(t.addInfo,"password",e)},expression:"addInfo.password"}})],1),e("b-form-group",{attrs:{label:"链接"}},[e("b-form-input",{attrs:{type:"text",placeholder:"请输入链接"},model:{value:t.addInfo.link,callback:function(e){t.$set(t.addInfo,"link",e)},expression:"addInfo.link"}})],1),e("b-form-group",{attrs:{label:"备注"}},[e("b-form-input",{attrs:{type:"text",placeholder:"备注"},model:{value:t.addInfo.notes,callback:function(e){t.$set(t.addInfo,"notes",e)},expression:"addInfo.notes"}})],1)],1)]},proxy:!0},{key:"modal-footer",fn:function({}){return[e("b-button",{staticClass:"mt-3",attrs:{variant:"info",type:"submit"},on:{click:t.addItem}},[t._v("添加")])]}}])})],1)},I=[],x={data(){return{DataList:[],searchQuery:"",backend_type:"",addInfo:{account:"",password:"",platform_name:"",icon:"",notes:"",link:""}}},methods:{search(){v.get("/tableData").then((t=>{this.DataList=t.data;const e=this.searchQuery.toLowerCase();this.DataList=this.DataList.filter((t=>Object.values(t).some((t=>String(t).toLowerCase().includes(e))))),alert("成功搜索到以下内容"),console.log(this.filteredDataList)})).catch((t=>{console.error("Error:",t),alert("未找到！")}))},hideModal(){this.$refs.addInfoModal.hide()},showModal(){this.$refs.addInfoModal.show()},resetModal(){this.addInfo={account:"",password:"",platform_name:"",icon:"",notes:"",link:""}},addItem(){var t="";"json-server"===this.backend_type&&(t="/pwdinfo/"),"flask"===this.backend_type&&(t="/pwdinfo/add"),console.log("新增",this.addInfo),console.log(JSON.stringify(this.addInfo)),v.post(t,JSON.stringify(this.addInfo),{headers:{"Content-Type":"application/json"}}).then((()=>{alert("添加成功"),window.location.reload()})).catch((t=>{console.error("Error:",t),alert("很抱歉，添加失败！请检查内容格式")})),this.resetModal(),this.hideModal()}},created(){this.backend_type="json-server # or flask"}},C=x,M=(0,d.A)(C,_,I,!1,null,"0e39f21c",null),P=M.exports,D=function(){var t=this,e=t._self._c;return t.showModal?e("div",{staticClass:"modal"},[e("div",{staticClass:"modal-content"},[e("h2",[t._v("添加信息")]),e("b-form-group",{attrs:{label:"账号"}},[e("b-form-input",{attrs:{placeholder:"账号"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}})],1),e("b-form-group",{attrs:{label:"密码"}},[e("b-form-input",{attrs:{type:"password",placeholder:"密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),e("b-form-group",{attrs:{label:"平台"}},[e("b-form-input",{attrs:{placeholder:"平台"},model:{value:t.platform,callback:function(e){t.platform=e},expression:"platform"}})],1),e("b-form-group",{attrs:{label:"图标"}},[e("b-form-input",{attrs:{placeholder:"图标"},model:{value:t.icon,callback:function(e){t.icon=e},expression:"icon"}})],1),e("b-button",{attrs:{variant:"primary"},on:{click:t.addInfo}},[t._v("添加")]),e("b-button",{on:{click:t.closeModal}},[t._v("关闭")])],1)]):t._e()},L=[],$={data(){return{showModal:!0,account:"",password:"",platform:"",icon:""}},methods:{addInfo(){this.$emit("add-info",{account:this.account,password:this.password,platform:this.platform,icon:this.icon}),this.account="",this.password="",this.platform="",this.icon="",this.closeModal()},closeModal(){this.showModal=!1}}},S=$,T=(0,d.A)(S,D,L,!1,null,"2571bf6f",null),j=T.exports,O={name:"App",components:{NavMenu:f,MainBody:y,SearchAndAdd:P,AddInfo:j}},A=O,E=(0,d.A)(A,s,n,!1,null,null,null),N=E.exports,Q=a(3076);o["default"].use(Q.Ay);const R=new Q.Ay.Store({state:{TableDataList:[],TableDataList12:[{icon:"@/assets/icons_imgs/百度.png",platform:"'测试'",account:"1111",password:"password1",remark:"备注1",showPassword:!1,url:"http://baidue.com",linkText:"百度"},{icon:"@/assets/icons_imgs/百度.png",platform:"'测试'",account:"1111",password:"password1",remark:"备注1",showPassword:!1,url:"http://baidue.com",linkText:"百度"}]},mutations:{setDataList(t,e){t.TableDataList=e}},actions:{getDataList(t){const e="/tableData";v.get(e).then((e=>{const a=e.data;t.commit("setDataList",a)})).catch((t=>{console.error("数据获取失败:",t)}))}},getters:{}});var z=R,B=a(6232);a(8070);o["default"].use(B.Ay$),o["default"].config.productionTip=!1,new o["default"]({store:z,render:t=>t(N)}).$mount("#app")}},e={};function a(o){var s=e[o];if(void 0!==s)return s.exports;var n=e[o]={exports:{}};return t[o].call(n.exports,n,n.exports,a),n.exports}a.m=t,function(){var t=[];a.O=function(e,o,s,n){if(!o){var r=1/0;for(d=0;d<t.length;d++){o=t[d][0],s=t[d][1],n=t[d][2];for(var i=!0,l=0;l<o.length;l++)(!1&n||r>=n)&&Object.keys(a.O).every((function(t){return a.O[t](o[l])}))?o.splice(l--,1):(i=!1,n<r&&(r=n));if(i){t.splice(d--,1);var c=s();void 0!==c&&(e=c)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[o,s,n]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var o in e)a.o(e,o)&&!a.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,o){var s,n,r=o[0],i=o[1],l=o[2],c=0;if(r.some((function(e){return 0!==t[e]}))){for(s in i)a.o(i,s)&&(a.m[s]=i[s]);if(l)var d=l(a)}for(e&&e(o);c<r.length;c++)n=r[c],a.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return a.O(d)},o=self["webpackChunkpassword_manage"]=self["webpackChunkpassword_manage"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=a.O(void 0,[504],(function(){return a(4558)}));o=a.O(o)})();
//# sourceMappingURL=app.c7c2f059.js.map
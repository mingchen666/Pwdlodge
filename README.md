## PwdLodge - 密码管理应用

PwdLodge 是一个基于vue的密码管理应用，支持数据库/本地存储两种方式

>非常适合练练手(vue和flask增删查改)


### 技术栈

vue2 +  axios + bootstrap-vue

>非常适合练练手

### 功能特性

- 增删查改---账号信息
- 查看密码（需要二次密码确认）
- 数据库存储/本地存储两种方式
- ...我还没想到

### 文件结构

```plaintext
PwdLodge/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddInfo.vue
│   │   ├── MainBody.vue
│   │   ├── NavMenu.vue
│   │   └── SearchAndAdd.vue
│   ├── store/
│   │   └── index.js
│   ├── utils/
│   │   └── request.js
│   ├── App.vue
│   ├── main.js
│   └── ...
├── db/
│   └── db.json
├── jsconfig.json
├── package.json
└── ...

``` 
### 开始使用
后端数据有两种方式使用：

- 克隆仓库
```
git clone https://github.com/yourusername/PwdLodge.git
```  

- 在.env文件里面填写VUE_APP_PASSWORD、VUE_APP_BACKEND_TYPE(值为flask/json-server)


- (1).使用json-server模拟后端请求数据
  ```
  npm install -g json-server
  json-server --watch db/db.json
  ```

- (2).使用python的flask框架作为后端
自行安装python环境3.x

```
pip install Flask,flask-cors
# 填写.env文件的环境变量
python app.py
```

#### 1.直接使用
>可以直接复制dist文件夹里面的内容部署到服务器上 

或者自己打包
```
npm run build
# 或者 
yarn build
# 或者 
pnpm run build
```
 

#### 2.本地开发

##### (1).前端

- 克隆仓库
```
git clone https://github.com/yourusername/PwdLodge.git
cd PwdLodge
```
 

- 安装依赖

```
npm install  
# 或者
yarn install 
# 或者
pnpm install
```
 
- 运行

```
npm run serve 
# 或者
yarn serve
# 或者
pnpm run serve
```

##### (2).后端(flask)
- clone后端代码仓库
- 运行app.py
 
#### 未来计划
- [ ] 使用 Element-plus (Vue3) 重构
- [ ] 使用 Element-ui (Vue2) 重构
- [ ] 完善搜索功能
- [ ] 增加用户认证和权限管理
- [ ] 多种后端(java，php等)
- [ ] 添加数据备份和恢复功能 
- [ ] 等待添加...


### 关于
项目非常适合拿来练手vue和flask增删查改
这个项目可能存在未知问题,欢迎大家一起交流和探讨，提出宝贵的意见和建议，共同完善这个项目。

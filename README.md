# mock-server

mockjs + express 快捷创建模拟数据接口

### 说明

mockServer(端口，数据转化接口，用于把数据统一二次处理，再使用mockjs统一处理返回)

提供 get post put patch delete 五种请求方式链式调用

创建 mock-server.js 并使用 node 运行即可

```
const mockServer = require('@dyb881/mock-server').default;

const tableInfo = {
  id: '@id',
  Batch: '@id',
  Description: '@ctitle(50)',
};

const tableList = {
  'list|20': [tableInfo],
  total: 20,
};

// 初始化
mockServer('8090', (data, length) => {
  return {
    code: 0,
    msg: '模拟数据',
    [length ? `data|${length}` : 'data']: length ? [data] : data,
  };
})
  .get('/getTableList', tableList) // 注册接口
  .get('/getTableInfo', tableInfo) // 注册接口
  .init();
```

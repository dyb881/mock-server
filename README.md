# mock-server

mockjs + express 快捷创建模拟数据接口

### 说明

mockServer(端口，数据转化接口，用于把 data 二次处理，再使用 mockjs 统一处理返回)<br>
提供 get post put patch delete 五种请求方式链式调用<br>
创建 mock-server.js 并使用 node 运行即可<br>

```
const mockServer = require('@dyb881/mock-server').default;

const tableInfo = {
  id: '@id',
  Batch: '@id',
  Description: '@ctitle(50)',
};

mockServer(data => ({
  code: 0,
  msg: '模拟数据',
  data,
}))
  .get('/api/getTableList', req => {
    const pageSize = req.param('pageSize') || 10;
    const pageNum = req.param('pageNum') || 1;
    return {
      [`list|${pageSize}`]: [tableInfo],
      total: 100,
      pageNum
    }
  })
  .get('/api/getTableInfo', tableInfo)
  .init(80);
```

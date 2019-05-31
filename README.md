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

/**
 * 暂停
 */
const sleep = (outTime) => new Promise(r => setTimeout(r, outTime));

// 初始化
mockServer(async data => {
  await sleep(1000);
  return {
    code: 0,
    msg: '模拟数据',
    data,
  };
})
  .get('/api/getTableList', async (req) => {
    const pageSize = req.param('pageSize') || 10;
    const pageNum = req.param('pageNum') || 1;
    await sleep(500);
    return {
      [`list|${pageSize}`]: [tableInfo],
      total: 100,
      pageNum,
    };
  }) // 注册接口，根据请求参数作出处理，并返回 data
  .get('/api/getTableInfo', tableInfo) // 注册接口，直接传入 data
  .init();
```

import mockServer from './index';

const tableInfo = {
  id: '@id',
  Batch: '@id',
  Description: '@ctitle(50)',
};

// 初始化
mockServer(data => ({
  code: 0,
  msg: '模拟数据',
  data,
}))
  .get('/api/getTableList', (req: any) => {
    const pageSize = req.param('pageSize') || 10;
    const pageNum = req.param('pageNum') || 1;
    return {
      [`list|${pageSize}`]: [tableInfo],
      total: 100,
      pageNum,
    };
  }) // 注册接口，根据请求参数作出处理，并返回 data
  .get('/api/getTableInfo', tableInfo) // 注册接口，直接传入 data
  .init();

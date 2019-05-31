import mockServer from './index';

const tableInfo = {
  id: '@id',
  Batch: '@id',
  Description: '@ctitle(50)',
};

/**
 * 暂停
 */
const sleep = (outTime: number) => new Promise(r => setTimeout(r, outTime));

// 初始化
mockServer(async data => {
  await sleep(500); // 所有接口延时 0.5秒
  return {
    code: 0,
    msg: '模拟数据',
    data,
  };
})
  .get('/api/getTableList', async (req: any) => {
    const pageSize = req.param('pageSize') || 10;
    const pageNum = req.param('pageNum') || 1;
    await sleep(500); // 对应接口延时 0.5秒
    return {
      [`list|${pageSize}`]: [tableInfo],
      total: 100,
      pageNum,
    };
  }) // 注册接口，根据请求参数作出处理，并返回 data
  .get('/api/getTableInfo', tableInfo) // 注册接口，直接传入 data
  .delay(300,1000) // 全局随机延时返回
  .init();

import mockServer from './index';

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
mockServer('8090', data => ({
  code: 0,
  msg: '模拟数据',
  data,
}))
  .get('/getTableList', (req: any) => {
    const pageNum = req.param('pageNum');
    return {
      ...tableList,
      pageNum,
    };
  }) // 注册接口，根据请求参数作出处理，并返回 data
  .get('/getTableInfo', tableInfo) // 注册接口，直接传入 data
  .init();

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
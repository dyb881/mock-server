import express from 'express';
import cors from 'cors';
import Mock from 'mockjs';
import ip from 'ip';

const app = express();

app.use(cors());

/**
 * 模拟数据服务
 */
const mockServer = (template: (...arg: any[]) => any) => {
  const mock: any = {
    init: (port = 80) => {
      const server = app.listen(port, function() {
        const { port = 80 } = server.address() as any;
        let msg = `运行模拟数据接口：http://${ip.address()}`;
        if (+port !== 80) msg += `${msg}:${port}`;
        console.log(msg);
      });
    },
  };

  const create = (type: string) => {
    mock[type] = (path: string, fun: any, ...arg: any[]) => {
      app[type](path, async (req: Request, res: any) => {
        let templateArg = typeof fun === 'function' ? await fun(req, ...arg) : [fun, ...arg];
        const mockData = await template(...templateArg);
        const resData = Mock.mock(mockData);
        res.json(resData);
      });
      return mock;
    };
  };

  create('get');
  create('post');
  create('put');
  create('patch');
  create('delete');

  return mock;
};

export default mockServer;

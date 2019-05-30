import express from 'express';
import Mock from 'mockjs';
import os from 'os';

const app = express();

/**
 * 模拟数据服务
 */
const mockServer = (port: string, template: (...arg: any[]) => any) => {
  const init = () => {
    app.use(function(_req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });

    app.listen(port);

    console.log(`运行模拟数据接口：http://${getIPAdress()}:${port}`);
  };

  const mock: any = {
    init,
  };

  const create = (type: string) => {
    mock[type] = (path: string, ...arg: any[]) => {
      app[type](path, (_req: Request, res: any) => {
        res.json(Mock.mock(template(...arg)));
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

// 获取IP地址
const getIPAdress = () => {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

export default mockServer;
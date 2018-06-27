/**
 * Copyright (c) 2018 AXA Shared Services Spain S.A.
 *
 * Licensed under the AXA Shared Services Spain S.A. License (the "License"); you
 * may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MyAXAContext } from './context/context';

// import * as http from 'http';
// import * as https from 'https';
import * as express from 'express';
// import { renderLogo } from 'myaxa-core';
// import { boostrap } from './bootstrap';
import * as parse from 'json-templates';
import { getEntityDataFromProjectPackage } from './helpers/misc';
import { AMFLogger } from './loggers/amf';

const app: express.Application = express();

let name: string = 'unknow';
let version: string = '0.0.0';

let configJSON: any = require('./config.json');
configJSON = parse(configJSON)({ env: process.env });

[name, version] = getEntityDataFromProjectPackage();

const context: MyAXAContext = new MyAXAContext(name, configJSON);
const givenLogLevel: string = process.env.LOG_LEVEL || 'none';
const logger: AMFLogger = new AMFLogger(
  name,
  Logger.LogLevel[givenLogLevel],
  context.location !== interfaces.ValidLocation.production
);

/*
function start(app: express.Application, context: MyAXAContext): http.Server | https.Server {
  let server: http.Server | https.Server;

  if (context.server.useSSL && context.server.certificate) {
    const options: Object = { ...context.server.certificate };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }

  server.listen(context.server.port, err => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-console
    console.info(`${renderLogo()} \nServer listening on ${context.serverToString()}`);
  });

  return server;
}

boostrap(app, context);
start(app, context);

process.on('unhandledRejection', err => {
  logger.error(err);
  process.exit(1);
});
*/

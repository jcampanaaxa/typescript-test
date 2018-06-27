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

import * as bodyParser from 'body-parser';
import { interfaces } from './context/interfaces';
// import * as Maintenance from './instances/maintenance';
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { createError, errorHandler } = require('myaxa-errors');
const { myaxaCore, sessionMiddleware, store } = require('myaxa-core');
const { Express } = require('myaxa-cross-framework');
const apiDefinitions = require('./api-definitions.json');

export function boostrap(
  app: any,
  config: interfaces.MyAXACoreInterface,
  logger: Logger.LogInterface
) {
  /* Express Middlewares */
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // Init all the the core stores

  app.disable('x-powered-by');

  /* MyAXA instances */

  store.add('mwName', 'mw-myaxa-cz');

  /* MyAXA Middlewares and Endpoints */
  app.use(Express.middleware(sessionMiddleware));
  // if (config.maintenanceMode) {
  //   const maintenance: any = Maintenance.factory(entityCredentials, maintenanceSettings);
  //   app.all('/v[0-9]/api/*', Express.middleware(req => maintenance.middleware(req)));
  // }

  // if (config.hasFeature(MOBFeatures.maintenance)) {
  //   const maintenanceSettings: Settings = config.getFeature(MOBFeatures.maintenance).settings;
  //   const entityCredentials: Credentials = config.getCredential(CredentialNames.entity);
  //   const maintenance: any = Maintenance.factory(entityCredentials, maintenanceSettings);

  //   if (maintenance) {
  //     app.all('/v[0-9]/api/*', Express.middleware(req => maintenance.middleware(req)));
  //   }
  // }

  /* Plugins */
  // Myaxa Core
  myaxaCore.Express(app, config.getCoreConfigJSON(), { apiDefinitions });

  /* Error handler */
  // 404 error
  app.use((req, res, next) => next(createError(404)));
  // Error handler
  app.use(Express.errorHandler(errorHandler));
}

/*
 * Copyright(c) 2018 AXA Shared Services Spain S.A.
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

// import get from 'lodash-es/get';
// import curry from 'lodash-es/curry';

import * as cts from '../constants';
import { get, curry } from 'lodash';

const findByName: Function = curry((name: string, item: any) => item.name === name);

export class MiddlewareContext implements interfaces.ContextInterface {
  location: string;
  baseURLForExternalAPI: string;
  region: interfaces.Region;
  name: string;
  server: interfaces.Server;
  defaultLocation: string;
  protected getItemByName: Function;

  constructor(name: string, configJSON: any) {
    this.name = name;
    this.defaultLocation = get(configJSON, 'locations.default', cts.DEFAULT_ENVIRONMENT);
    this.getItemByName = findByName;

    const locations = get(configJSON, 'locations.settings', []);
    [this.location, this.region, this.baseURLForExternalAPI] = this.parseLocation(
      this.defaultLocation,
      locations
    );
  }

  serverToString(): string {
    return `${
      this.server.useSSL && this.server.certificate
        ? interfaces.URLScheme.https
        : interfaces.URLScheme.http
    }${this.server.host}:${this.server.port}`;
  }

  private parseLocation(defaultLocation: string, locations: any[]): any[] {
    const locationName: string = process.env.location || defaultLocation;

    if (!process.env.location) {
      //TODO: inject log class
      // eslint-disable-next-line no-console
      console.warn(`warning: env.location not present, using default: ${locationName}`);
    }

    const location: any = locations.find(this.getItemByName(locationName));
    if (!location) {
      const error: ErrorClass.NoStackError = new ErrorClass.NoStackError(
        `No environment configuration found for location ${locationName}`
      );
      throw error;
    }

    const baseURL: string = location.endpoint || '';
    const region: interfaces.Region = location.region || interfaces.Region.Europe;

    return [locationName, region, baseURL];
  }
}

export class MyAXAContext extends MiddlewareContext implements interfaces.MyAXACoreInterface {
  readonly pushNotifications: interfaces.FeatureInterface;
  readonly versionValidate: interfaces.FeatureInterface;
  readonly maintenanceMode: interfaces.FeatureInterface;
  readonly ekomi: interfaces.FeatureInterface;
  readonly request: any;

  constructor(name: string, configJSON: any) {
    super(name, configJSON);

    const locations = get(configJSON, 'locations.settings', []);
    const location: any = locations.find(this.getItemByName(this.location));

    this.ekomi = this.parseEkomi(location);
    this.maintenanceMode = this.parseMaintenanceModeSettigns(location);
    this.pushNotifications = this.parseDeviceFeature(interfaces.MOBFeatures.push, location);
    this.versionValidate = this.parseDeviceFeature(interfaces.MOBFeatures.validate, location);
    this.request = get(configJSON, 'request', {});
  }

  getCoreConfigJSON(): interfaces.CoreConfig {
    let config: interfaces.CoreConfig;
    config.endpoint = this.baseURLForExternalAPI;
    config.server = this.server;
    config.request = this.request;

    return config;
  }

  private parseDeviceFeature(type: interfaces.MOBFeatures, location: any): DevicesFeature {
    const entity: interfaces.ClientIdSecretCredentials = location.credentials.find(
      this.getItemByName('entity')
    );
    const apple: interfaces.ClientIdSecretCredentials = location.credentials.find(
      this.getItemByName('device_ios')
    );
    const android: interfaces.ClientIdSecretCredentials = location.credentials.find(
      this.getItemByName('device_android')
    );

    return new DevicesFeature(type, entity, apple, android);
  }

  private parseMaintenanceModeSettigns(location: any): MaintenanceFeature {
    const settings: any = location.features.find(
      this.getItemByName(interfaces.MOBFeatures.maintenance)
    ).settings;
    const entity: interfaces.ClientIdSecretCredentials = location.credentials.find(
      this.getItemByName('entity')
    );

    return new MaintenanceFeature(
      interfaces.MOBFeatures.maintenance,
      entity,
      settings.updateInterval,
      settings.error
    );
  }

  private parseEkomi(location: any): EkomiFeature {
    const server: interfaces.Server = location.features.find(this.getItemByName('ekomi')).settings;
    const credentials: any = location.credentials.find(findByName('ekomi'));
    const shopId: string = credentials.shopId;

    let ekomiCredential: interfaces.UserPasswordCredentials;

    ekomiCredential.name = 'ekomi';
    ekomiCredential.username = credentials.username;
    ekomiCredential.password = credentials.password;

    return new EkomiFeature(ekomiCredential, shopId, server);
  }
}

export class EntityFeature implements interfaces.FeatureInterface {
  type: interfaces.MOBFeatures;
  credentials: interfaces.ClientIdSecretCredentials;
  protected eqFeature: Function;

  constructor(type: interfaces.MOBFeatures, credential: interfaces.ClientIdSecretCredentials) {
    this.type = type;
    this.eqFeature = curry((name: string, item: any) => item.name === name);
    this.credentials = credential;
  }
}

export class MaintenanceFeature extends EntityFeature {
  readonly updateInterval: number;
  readonly errorFormat: interfaces.APIErrorFormat;

  constructor(
    type: interfaces.MOBFeatures,
    credential: interfaces.ClientIdSecretCredentials,
    updateInterval: number,
    error: interfaces.APIErrorFormat
  ) {
    super(type, credential);
    this.updateInterval = updateInterval;
    this.errorFormat = error;
  }
}

export class DevicesFeature extends EntityFeature {
  credentialsApple: interfaces.ClientIdSecretCredentials;
  credentialsAndroid: interfaces.ClientIdSecretCredentials;

  constructor(
    type: interfaces.MOBFeatures,
    credential: interfaces.ClientIdSecretCredentials,
    appleCredentials: interfaces.ClientIdSecretCredentials,
    androidCredentials: interfaces.ClientIdSecretCredentials
  ) {
    super(type, credential);
    this.credentialsAndroid = androidCredentials;
    this.credentialsApple = appleCredentials;
  }
}

export class EkomiFeature implements interfaces.FeatureInterface {
  type: interfaces.MOBFeatures;
  credentials: interfaces.UserPasswordCredentials;
  readonly shopId: string;
  readonly server: interfaces.Server;

  constructor(
    credentials: interfaces.UserPasswordCredentials,
    shopId: string,
    server: interfaces.Server
  ) {
    this.type = interfaces.MOBFeatures.ekomi;
    this.shopId = shopId;
    this.server = server;
    this.credentials = credentials;
  }
}

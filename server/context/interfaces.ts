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

export declare namespace interfaces {
  export enum Region {
    Asia = 'asia',
    Europe = 'europe'
  }

  export enum DevicePlatform {
    Android,
    Apple
  }

  export enum MOBFeatures {
    push = 'push_notifications',
    validate = 'version_validate',
    maintenance = 'maintenance_mode',
    ekomi = 'ekomi'
  }

  export enum CredentialNames {
    entity = 'entity',
    ios = 'device_ios',
    android = 'device_android',
    ekomi = 'ekomi'
  }

  export enum ValidLocation {
    develop = 'dev',
    uat = 'uat',
    preproduction = 'preprod',
    production = 'production'
  }

  export enum URLScheme {
    http = 'http://',
    https = 'https://'
  }

  export interface Settings {
    host?: string | null;
    port?: string | null;
    secure?: boolean | null;
    updateInterval?: number | null;
    error?: APIErrorFormat | null;
  }

  export interface Certificate {
    privateKey: string;
    certificate: string;
    passphrase: string;
  }

  export interface APIErrorFormat {
    statusCode: number;
    code: string;
    developerMessage: string;
    userMessage: string;
  }

  export interface Server {
    host: string;
    port: number;
    useSSL: boolean | false;
    certificate?: Partial<Certificate> | null;
  }

  export interface CoreConfig {
    endpoint: string;
    request?: any;
    server: Server;
  }

  export interface ClientIdSecretCredentials {
    name: string;
    clientId: string;
    clientSecret: string;
  }

  export interface UserPasswordCredentials {
    name: string;
    username: string;
    password: string;
  }

  export interface FeatureInterface {
    readonly type: MOBFeatures;
    readonly credentials: ClientIdSecretCredentials | UserPasswordCredentials;
  }

  export interface ContextInterface {
    readonly name: string;
    readonly server: Server;
    readonly defaultLocation: string;
    readonly location: string;
    readonly baseURLForExternalAPI: string;
    readonly region: Region;

    serverToString(): string;
  }

  export interface MyAXACoreInterface extends ContextInterface {
    readonly request: any;

    getCoreConfigJSON(): CoreConfig;
  }
}

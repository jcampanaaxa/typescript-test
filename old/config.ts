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

/*

import * as parse from 'json-templates';
import * as path from 'path';
import * as fs from 'fs';

export class MiddlewareConfig {
  private requestSettings: RequestSettings;
  private credentials: Credentials[];
  private features: FeaturesMW[];

  public readonly server: ServerSettings;
  public readonly location: ValidLocation;
  public readonly endpoint: string;
  public readonly region: Region;
  public readonly fullServerURL: string;

  constructor(configJSON: any) {
    const parsedJSON: any = parse(configJSON)({ env: process.env });
    const locationTmp: string = process.env.location || parsedJSON.locations.default;
    const indexOfLocation: number = parsedJSON.locations.settings.findIndex(
      item => item.name === locationTmp
    );

    if (!process.env.location) {
      // eslint-disable-next-line no-console
      console.warn(
        `warning: env.location not present, using default: ${parsedJSON.locations.default}`
      );
    }

    if (indexOfLocation === -1) {
      let error: Error = new Error(
        `No environment configuration found for location ${locationTmp}. Killing myaxa execution`
      );

      error.stack = null;
      throw error;
    }

    const location: any = parsedJSON.locations.settings[indexOfLocation];

    //Hack:
    parsedJSON.server.secure = parsedJSON.server.secure === 'true';

    this.requestSettings = parsedJSON.request;
    this.server = parsedJSON.server;
    this.server.scheme = this.server.secure ? URLScheme.https : URLScheme.http;
    this.location = location.name;
    this.endpoint = location.endpoint;
    this.region = location.region;
    this.credentials = location.credentials;
    this.features = location.features;

    //Replacing the certificate path with its content
    if (this.server.certificate) {
      this.server.certificate = this.replaceCertificatePathsToContent(this.server.certificate);
    }

    if (this.requestSettings.certificate) {
      this.requestSettings.certificate = this.replaceCertificatePathsToContent(
        this.requestSettings.certificate
      );
    }

    if (this.server.secure && !this.server.certificate) {
      console.warn(`No certificate available for SSL. Forcing ${URLScheme.http} scheme`);

      this.server.secure = false;
      this.server.scheme = URLScheme.http;
    }

    this.fullServerURL = `${this.server.scheme}${this.server.host}:${this.server.port}`;
  }

  private replaceCertificatePathsToContent(certificate: Certificate): Certificate {
    const newCertificateContainer: Certificate = { ...certificate };

    try {
      newCertificateContainer.certificate = this.getCertificateOrPrivateKey(
        certificate.certificate
      );
      newCertificateContainer.privateKey = this.getCertificateOrPrivateKey(certificate.privateKey);

      return newCertificateContainer;
    } catch (e) {
      console.error(`${e}`);
      return null;
    }
  }

  private getCertificateOrPrivateKey(pathToCertificate: string): string {
    return fs.readFileSync(path.join(__dirname, pathToCertificate)).toString();
  }

  public getCredential(name: CredentialNames): Credentials {
    const index: number = this.credentials.findIndex(item => item.name === name);

    return index > -1 ? this.credentials[index] : null;
  }

  public getFeature(name: MOBFeatures): FeaturesMW {
    const index: number = this.features.findIndex(item => item.name === name);

    return index > -1 ? this.features[index] : null;
  }

  public hasFeature(name: MOBFeatures): boolean {
    return this.features.findIndex(item => item.name === name) > -1;
  }

  public toCoreJSON(): any {
    return {
      endpoint: this.endpoint,
      request: this.requestSettings,
      server: {
        host: this.server.host,
        port: this.server.port
      }
    };
  }
}
*/

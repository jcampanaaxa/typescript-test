/*
 * Copyright (c) 2017 AXA Shared Services Spain S.A.
 *
 * Licensed under the AXA Shared Services Spain S.A License (the "License")
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const path = require('path');
const fs = require('fs');

function getPrivateKey() {
  const sslKeyPath = process.env.NODE_SSL_KEY_PATH || '../external-config/server.key';

  return fs.readFileSync(path.join(__dirname, sslKeyPath)).toString();
}

function getCertificate() {
  const sslCertPath = process.env.NODE_SSL_CERT_PATH || '../external-config/server.crt';

  return fs.readFileSync(path.join(__dirname, sslCertPath)).toString();
}

module.exports = {
  getPrivateKey,
  getCertificate
};

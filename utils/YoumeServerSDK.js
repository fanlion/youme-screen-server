/*
 * @Author: fan.li
 * @Date: 2019-01-07 11:34:44
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-07 14:23:28
 */

const crypto = require("crypto");
const request = require("request");

const config = require("../config");

function YoumeServerSDK() {
  if (YoumeServerSDK._instance) {
    return YoumeServerSDK._instance;
  }

  return (YoumeServerSDK._instance = this);
}

YoumeServerSDK._instance = null;

YoumeServerSDK.getInstance = function() {
  return YoumeServerSDK._instance || (YoumeServerSDK._instance = new YoumeServerSDK());
}

YoumeServerSDK.prototype.genUrl = function(serviceName, command) {
  let url = config.BASE_URL + serviceName;
  url += "/" + command;
  url += "?appkey=";
  url += config.APP_KEY;
  url += "&identifier=admin";

  const now = Date.now() / 1000;
  url += "&curtime=";
  url += now;
  url += "&checksum=";
  url += this.genCheckSum(now);
  return url;
};

YoumeServerSDK.prototype.genCheckSum = function(curtime) {
  const encodeSrc = config.SECRET_KEY + config.RESTAPI_KEY + curtime;
  const sha1 = crypto.createHash("sha1");
  sha1.update(encodeSrc);
  return sha1.digest("hex");
};

YoumeServerSDK.prototype.sendPost = function(serviceName, command, body) {
  return new Promise((resolve, reject) => {
    const url = this.genUrl(serviceName, command);
    const options = {
      url: url,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json"
      },
      body: body
    };

    request.post(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      return resolve(body);
    });
  });
};

YoumeServerSDK.prototype.genUserToken = function(userId) {
  const sha1Src = config.APP_KEY + config.RESTAPI_KEY + userId;
  const sha1 = crypto.createHash("sha1");
  sha1.update(sha1Src);
  return sha1.digest("hex");
};

module.exports = YoumeServerSDK;

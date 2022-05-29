import Base from './base.js';

export default class Common extends Base {
  /**
   * returns gasPrice
   *
   * @returns {Promise}
   */
  gasPrice() {
    return this.requestNode({
      url: 'api/v1/gasPrice',
      method: 'get',
    }).then((data) => data.price);
  }
  /**
   * returns snowtraceApiKey
   *
   * @returns {Promise}
   */
  getSnowtraceApiKey() {
    return this.requestNode({
      url: 'api/v1/snowtraceApiKey',
      method: 'get',
    }).then((data) => data.apiKey);
  }
}

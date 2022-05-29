import Base from './base.js';

export default class Addresses extends Base {
  /**
   * returns address balance
   *
   * @param address
   * @param confirmations
   * @returns {Promise}
   */
  balance(address, confirmations) {
    return validateAddress(address).then(() => {
      return this.requestNode({
        url: `api/v1/addr/${address}/balance`,
        method: 'get',
        params: { confirmations },
      });
    });
  }
  /**
   * returns address txs count
   *
   * @param ids
   * @returns {Promise}
   */
  txsCount(address) {
    return validateAddress(address).then(() => {
      return this.requestNode({
        url: `api/v1/addr/${address}/txsCount`,
        method: 'get',
      });
    }).then((data) => {
      return Promise.resolve(data.count);
    });
  }
  /**
   * returns address txs
   *
   * @param address
   * @param cursor
   * @returns {Promise}
   */
  txs(address, cursor) {
    return validateAddress(address).then(() => {
      const offset = 5;
      return this.requestHistory({
        url: 'api',
        method: 'get',
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: '1',
          endblock: '9999999999999999',
          page: cursor,
          offset,
          sort: 'desc',
          apikey: this.api.snowtraceApiKey,
        },
      }).then((data) => {
        const hasMoreTxs = data.result.length === offset;
        if (hasMoreTxs) cursor++;
        const dict = {};
        data.result = data.result.filter((item) => {
          if (dict[item.hash]) return;
          dict[item.hash] = true;
          return true;
        });
        return {
          txs: data.result,
          hasMoreTxs,
          cursor,
        };
      });
    });
  }
}

/**
 * check whether address is correct
 *
 * @private
 * @param address
 * @returns {Promise}
 */
function validateAddress(address) {
  return new Promise((resolve, reject) => {
    if (!/^(0x)[0-9a-f]{40}$/i.test(address)) {
      reject(new Error(address + ' is not a valid address'));
    } else {
      resolve();
    }
  });
}

import Base from './base.js';

export default class Tokens extends Base {
  /**
   * returns token balance
   *
   * @param tokenAddress
   * @param address
   * @param confirmations
   * @returns {Promise}
   */
  balance(tokenAddress, address, confirmations) {
    return Promise.all([
      validateAddress(tokenAddress),
      validateAddress(address),
    ]).then(() => {
      return this.requestNode({
        url: `api/v1/token/${tokenAddress}/${address}/balance`,
        method: 'get',
        params: { confirmations },
      });
    });
  }
  /**
   * returns token txs
   *
   * @param tokenAddress
   * @param address
   * @param cursor
   * @returns {Promise}
   */
  txs(tokenAddress, address, cursor) {
    return Promise.all([
      validateAddress(tokenAddress),
      validateAddress(address),
    ]).then(() => {
      const offset = 5;
      return this.requestHistory({
        url: 'api',
        method: 'get',
        params: {
          module: 'account',
          action: 'tokentx',
          contractaddress: tokenAddress,
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

export default class Base {
  constructor({ apiNode, apiHistory, request, api }) {
    this.apiNode = apiNode;
    this.apiHistory = apiHistory;
    this.request = request;
    this.api = api;
  }

  requestNode(config) {
    return this.request({
      ...config,
      baseURL: this.apiNode,
      disableDefaultCatch: true,
      seed: 'public',
    }).catch((err) => {
      const message = err.response && err.response.data;
      if (/Gas limit is too low/.test(message)) throw new Error('Gas limit is too low');
      console.error(err);
      throw new Error('cs-node-error');
    });
  }

  requestHistory(config) {
    return this.request({
      ...config,
      baseURL: this.apiHistory,
      disableDefaultCatch: true,
    }).catch((err) => {
      console.error(err);
      throw new Error('cs-node-error');
    });
  }
}

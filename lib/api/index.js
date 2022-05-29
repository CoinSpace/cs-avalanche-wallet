import Addresses from './addresses.js';
import Tokens from './tokens.js';
import Transactions from './transactions.js';
import Common from './common.js';

export default class API {
  constructor(options) {
    options.api = this;
    this.addresses = new Addresses(options);
    this.tokens = new Tokens(options);
    this.transactions = new Transactions(options);
    this.common = new Common(options);
    this.snowtraceApiKey = '';
  }
}

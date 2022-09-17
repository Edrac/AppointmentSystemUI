export interface BaseURLParams{
  /**
   * @description The endpoint URL.
   * @type {string}
   * @memberof BaseURLParams
   */
  url: string;

  /**
   * @description object with key-value data that has to be parsed and included in the URL.
   * @type {boolean}
   * @memberof BaseURLParams
   */
  urlArguments?: any;

  /**
   * @description Whether or not to include the credentials in the url of the request for the specific resource.
   * @type {boolean}
   * @memberof BaseURLParams
   */
  includeCreds?: boolean;


  /**
   * @description The HTTP options to send with the request.
   * @type {object}
   * @memberof BaseURLParams
   */
  options?: any;


  /**
   * @description Used with POSTS requests, and is the content to replace with.
   * @type {object}
   * @memberof BaseURLParams
   */
  body?: any;
}

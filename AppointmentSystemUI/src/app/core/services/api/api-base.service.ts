// Angular Modules
import { Injectable } from '@angular/core';

// Application Classes
import { UrlBuilder } from 'src/app/shared/classes/url-builder';
import { QueryStringParameters } from 'src/app/shared/classes/query-string-parameters';

// Application Constants
import { Constants } from 'src/app/config/constants';
import { BaseURLParams } from 'src/app/shared/interfaces/base-params';


@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {

  constructor(
  ) { }

  protected _setUpHeaders(params: BaseURLParams) {

  }

  // URL WITH QUERY PARAMS
  protected createUrlWithQueryParameters(
    action?: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      '',
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  /**
   *
   * @description Constructs a fully qualified API url with the method specified in the pathMethod argument.
   * @param {string} pathMethod
   * @return {string} Fully qualified API url
   * @memberof ApiBaseService
   */
  createUrl(
    pathMethod: string
  ): string {
    return `${Constants.API_URL}/${pathMethod}`;
  }



  /**
   *
   * @description Constructs a fully qualified API url with the method specified in the pathMethod argument.
   * @param {string} url Fully qualified URL to the API.
   * @param {string} params Object with key=>value items that need to be appended to the URL..
   * @return {string} Fully qualified API url with any url params added, if given any.
   * @memberof ApiBaseService
   */
  protected _createUrl(
    url: string,
    params?: any,
  ) {
    if (params == undefined) {
      return url;
    }
    let urlWithParams = this.createUrlWithQueryParameters(
      url,
      (qs: QueryStringParameters) => {

        let keys = Object.keys(params);

        for (let i = 0; i < keys.length; i++) {
          //https://stackoverflow.com/questions/62438346/how-to-dynamically-access-object-property-in-typescript
          type KeyType = keyof typeof params;
          let key = keys[i];
          let param = params[key as KeyType];
          if (param != undefined) qs.push(key, param)
        }
      }
    );
    return urlWithParams;
  }
}

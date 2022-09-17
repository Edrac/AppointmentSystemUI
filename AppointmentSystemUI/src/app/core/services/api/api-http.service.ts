import { Injectable } from '@angular/core';
import { catchError, first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { BaseURLParams } from 'src/app/shared/interfaces/base-params';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService extends ApiBaseService {

  constructor(
    private _http: HttpClient,
  ) {
    super(
    );
  }


  /**
   * @description Error catching function for this whole service
   * @private
   * @param {(HttpErrorResponse | any)} res
   * @return {*}  {Observable<any>}
   * @memberof ApiHttpService
   */
  public handleError(res: HttpErrorResponse | any): Observable<any> {
    if (res !== undefined && res !== null) {
      let err = res;
      if (res.error !== undefined) err = res.error;
      if (res.error === undefined && res.body !== undefined) err = res.body;
      if (res.error === undefined && res.body !== undefined && res.body.error !== undefined) err = res.body.error;

      //console.error(err);
      return throwError(err || 'Server error');
    }
    // Token expired
    if (res.error.errorCode == 11) {
      // TODO: if there is a refresh token, try to acquired a new token with it

    }
    return of(null);
  }

  /**
   * @description Constructs a GET request that interprets the body as an ArrayBuffer and returns the response in an ArrayBuffer.
   * @param {BaseURLParams} params
   * @return {*}  {Observable<any>}
   * @memberof ApiHttpService
   */
  public get(params: BaseURLParams): Observable<any> {
    let url = this._createUrl(params.url, params.urlArguments);
    this._setUpHeaders(params);
    return this._http.get(url, params.options)
      .pipe(
        first(),
        catchError(this.handleError)
      );
  }

  /**
   * @description Constructs a POST request that interprets the body as an ArrayBuffer and returns an ArrayBuffer.
   * @param {BaseURLParams} params
   * @return {*}  {Observable<any>} An Observable of the response, with the response body as an ArrayBuffer
   * @memberof ApiHttpService
   */
  public post(params: BaseURLParams): Observable<any> {
    let url = this._createUrl(params.url, params.urlArguments);
    this._setUpHeaders(params);
    return this._http.post(url, params.body, params.options)
      .pipe(
        first(),
        catchError(this.handleError)
      );
  }

  /**
   * @description Constructs a PUT request that interprets the body as an ArrayBuffer and returns the response as an ArrayBuffer.
   * @param {BaseURLParams} params
   * @return {*}  {Observable<any>}
   * @memberof ApiHttpService
   */
  public put(params: BaseURLParams): Observable<any> {
    let url = this._createUrl(params.url, params.urlArguments);
    this._setUpHeaders(params);
    return this._http.put(url, params.body, params.options)
      .pipe(
        first(),
        catchError(this.handleError)
      );
  }

  /**
   * @description Constructs a DELETE request that interprets the body as an ArrayBuffer and returns the response as a boolean.
   * @param {BaseURLParams} params
   * @return {*}  {Observable<any>} An Observable of the response, with the response body as an ArrayBuffer
   * @memberof ApiHttpService
   */
  public delete(params: BaseURLParams): Observable<boolean> {
    let url = this._createUrl(params.url, params.urlArguments);
    this._setUpHeaders(params);
    return this._http.delete(url, params.options)
      .pipe(
        first(),
        catchError(this.handleError)
      );
  }
}

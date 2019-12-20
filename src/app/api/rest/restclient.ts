import {Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export class RESTClient {

  public constructor(@Inject(HttpClient) protected http: HttpClient) {
  }

  protected getBaseUrl(): string {
    return '';
  }

  protected getDefaultHeaders(): HttpHeaders {
    return undefined;
  }

  /**
   * Request Interceptor
   *
   * @method requestInterceptor
   * @param {Request} req - request object
   */
  protected requestOptionsInterceptor(options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean, withCredentials?: boolean,
  }): {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    withCredentials?: boolean,
  } {
    return options;
  }

  /**
   * GRAPIResponse Interceptor
   *
   * @method responseInterceptor
   * @param {Response} res - response object
   * @returns {Response} res - transformed response object
   */
  protected responseInterceptor(res: Observable<any>): Observable<any> {
    return res;
  }

}

/**
 * Set the base URL of REST resource
 * @param {String} url - base URL
 */
export function BaseUrl(url: string) {
  return function <TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getBaseUrl = function() {
      return url;
    };
    return Target;
  };
}

/**
 * Set default headers for every method of the RESTClient
 * @param {Object} headers - default headers in a key-value pair
 */
export function DefaultHeaders(headers: any) {
  return function <TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getDefaultHeaders = function() {
      return new HttpHeaders(headers);
    };
    return Target;
  };
}

function paramBuilder(paramName: string) {
  return function(key: string) {
    return function(target: RESTClient, propertyKey: string | symbol, parameterIndex: number) {
      const propString = propertyKey.toString();
      const metadataKey = `${propString}_${paramName}_parameters`;
      const paramObj: any = {
        key,
        parameterIndex,
      };
      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export let Path = paramBuilder('Path');
/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export let Query = paramBuilder('Query');
/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export let Body = paramBuilder('Body')('Body');
/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export let Header = paramBuilder('Header');

/**
 * Set custom headers for a REST method
 * @param {Object} headersDef - custom headers in a key-value pair
 */
export function Headers(headersDef: any) {
  return function(target: RESTClient, propertyKey: string, descriptor: any) {
    descriptor.headers = headersDef;
    return descriptor;
  };
}

/**
 * Defines the media type(s) that the methods can produce
 * @param MediaType producesDef - mediaType to be parsed
 * @param boolean First -
 */
export function Produces(producesDef: MediaType) {
  return function(target: RESTClient, propertyKey: string, descriptor: any) {
    descriptor.isJSON = producesDef === MediaType.JSON;
    return descriptor;
  };
}

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
}

function methodBuilder(method: string) {
  return function(url: string) {
    return function(target: RESTClient, propertyKey: string, descriptor: any) {

      const pPath = target[`${propertyKey}_Path_parameters`];
      const pQuery = target[`${propertyKey}_Query_parameters`];
      const pBody = target[`${propertyKey}_Body_parameters`];
      const pHeader = target[`${propertyKey}_Header_parameters`];

      descriptor.value = function(...args: any[]) {

        // Body
        let body = null;
        if (pBody) {
          body = JSON.stringify(args[pBody[0].parameterIndex]);
        }

        // Path
        let resUrl: string = url;
        if (pPath) {
          for (const k in pPath) {
            if (pPath.hasOwnProperty(k)) {
              resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex].toString());
            }
          }
        }

        // Query
        let search = new HttpParams();
        if (pQuery) {
          pQuery
            .filter(p => args[p.parameterIndex]) // filter out optional parameters
            .forEach(p => {
              const key = p.key;
              let value = args[p.parameterIndex];
              // if the value is a instance of Object, we stringify it
              if (value instanceof Object) {
                value = JSON.stringify(value);
              }
              // search.set(encodeURIComponent(key), encodeURIComponent(value));
              search = search.set(key, value);
            });
        }
        /* (TODO(JVA) sort out why we need to set a cacheDate
        const d = new Date();
        search = search.set('cacheDate', d.getTime().toString());
        */

        // Headers
        // set class default headers
        let headers = this.getDefaultHeaders();
        // set method specific headers
        for (const k in descriptor.headers) {
          if (descriptor.headers.hasOwnProperty(k)) {
            headers = headers.append(k, descriptor.headers[k]);
          }
        }
        // set parameter specific headers
        if (pHeader) {
          for (const k in pHeader) {
            if (pHeader.hasOwnProperty(k)) {
              headers = headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
            }
          }
        }

        let observable: Observable<any> = null;
        let options = { headers, params: search};
        resUrl = this.getBaseUrl() + resUrl;
        options = this.requestOptionsInterceptor(options);
        switch (method) {
          case 'GET': {
            observable = this.http.get(resUrl, options);
            break;
          }
          case 'DELETE': {
            observable = this.http.delete(resUrl, options);
            break;
          }
          case 'POST': {
            observable = this.http.post(resUrl, body, options);
            break;
          }

          case 'PUT': {
            observable = this.http.put(resUrl, body, options);
            break;
          }

          default:
            observable = null;
        }
        // intercept the response
        observable = this.responseInterceptor(observable);

        return observable;
      };

      return descriptor;
    };
  };
}

/**
 * GET method
 * @param {string} url - resource url of the method
 */
export let GET = methodBuilder('GET');
/**
 * POST method
 * @param {string} url - resource url of the method
 */
export let POST = methodBuilder('POST');
/**
 * PUT method
 * @param {string} url - resource url of the method
 */
export let PUT = methodBuilder('PUT');
/**
 * DELETE method
 * @param {string} url - resource url of the method
 */
export let DELETE = methodBuilder('DELETE');


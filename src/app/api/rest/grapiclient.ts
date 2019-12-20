import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DefaultHeaders, RESTClient} from './restclient';
import {catchError, flatMap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {GRAPIResponse} from "../models/grapi-response";
import {DsOrdersByInternalIdFlat} from "../models/ds-orders-by-internal-id-flat";

@DefaultHeaders({
  'Content-Type': 'application/json',
})
export class GRAPIClient <T> extends RESTClient {
  public constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * Override the baseUrl annotation of the RESTClient
   * @returns {string}
   */
  protected getBaseUrl(): string {
    return 'http://localhost:8090/grapi/rest/grapi/';
  }

  protected requestOptionsInterceptor(options: {
    headers?: HttpHeaders;
    params?: HttpParams;
    reportProgress?: boolean;
    withCredentials?: boolean;
  }): {
    headers?: HttpHeaders;
    params?: HttpParams;
    reportProgress?: boolean;
    withCredentials?: boolean;
  } {
    options.headers = options.headers.append('Authorization', 'Basic ' +
        btoa('laurensvdb@Cybertrack:'));
    options.withCredentials = true;
    return options;
  }

  protected responseInterceptor<T>(res: Observable<any>): Observable<T[]> {
    return super.responseInterceptor(res).pipe(
      flatMap(resp => this.extractData<T>(resp)),
      catchError(err => throwError(this.handleError(err))),
    );
  }

  /**
   * Handles any type of error.
   * @param error the error.
   * @returns {ErrorObservable} containing the error message.
   */
  protected handleError(error: any): string {
    let errorMessage = '';
    if (error.cbtErrorMessage) {
      errorMessage = 'Error: ' + error.cbtErrorMessage;
    } else {
      if (error.status) {
        errorMessage = `Http: ${error.status} - `;
        let auxMessage = '';
        if (typeof error.error === 'string') {
          // html in response
          if (error.error.charAt(0) !== '<') {
            auxMessage = error.error;
          }
        } else if (error.error._errors) {
          const springError = error.error._errors;
          if (springError.length > 1) {
            auxMessage = springError[1]._errorMsg;
            errorMessage = '';
          }
        }
        if (auxMessage === '' && error.status === 404) {
          auxMessage = 'Not Found';
        }

        errorMessage = errorMessage + auxMessage;
      } else {
        errorMessage = 'Back: Backend error';
      }
    }
    return errorMessage;
  }

  /**
   * Generic extractor for the CyberTrack JSON data.
   * @param json the CT4 REST JSON.
   * @returns {any} observable of the javascript interface object.
   */
  private extractData<T>(json: any): Observable<T[]> {
    // to login with form we do not have a standard json.response => return default
    if (json.response) {
      if (json.response.errors) {
        return throwError({ cbtErrorMessage: json.response.errors });
      }
      if (json.response.DataSetHandle) {
        if (json.response.DataSetHandle) {
          const dataSetHandle = json.response.DataSetHandle;
          for (const counter in dataSetHandle) {
            if (dataSetHandle.hasOwnProperty(counter)) {
              const flatDataSetHandle = dataSetHandle[counter];
              for (const childCounter in flatDataSetHandle) {
                if (flatDataSetHandle.hasOwnProperty(childCounter)) {
                  return of(flatDataSetHandle[childCounter]) as Observable<T[]>;
                }
                break;
              }
            }
            break;
            /* We got an invalid answer */
            return of([]);
          }
        }
        /*
        if (json.response.data.set) {
          const type = Object.keys(json.response.data.set)[0];
          if (type) {
            const dataSet = json.response.data.set[type];
            return of(dataSet) as Observable<T[]>;
          }
        }
        */
      } else {
        return of([]);
      }
    }
    return of([]);
  }
}

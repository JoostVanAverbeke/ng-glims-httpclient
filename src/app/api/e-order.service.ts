import { Injectable } from '@angular/core';
import {GRAPIClient} from './rest/grapiclient';
import {HttpClient} from '@angular/common/http';
import {GET, MediaType, Produces} from './rest/restclient';
import {Observable} from 'rxjs';
import {EOrder} from './models/e-order';

@Injectable({
  providedIn: 'root'
})
export class EOrderService extends GRAPIClient<EOrder> {

  constructor(http: HttpClient) {
    super(http);
  }

  @GET('eOrder')
  @Produces(MediaType.JSON)
  public getEOrders(): Observable<EOrder[]> {
    return undefined;
  }
}

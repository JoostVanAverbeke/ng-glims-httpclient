import {Component, OnInit} from '@angular/core';
import {EOrderService} from './api/e-order.service';
import {EOrder} from './api/models/e-order';
import {DsOrdersByInternalIdFlat} from './api/models/ds-orders-by-internal-id-flat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-glims-httpclient';
  eOrders: EOrder[];

  constructor(private eOrderService: EOrderService) {}

  ngOnInit() {
    this.eOrderService.getEOrders().subscribe(eOrders => this.eOrders = eOrders);
  }
}

import { Component, OnInit } from '@angular/core';
import {EOrder} from '../api/models/e-order';
import {EOrderService} from '../api/e-order.service';
import {User} from '../models/user';
import {first} from 'rxjs/operators';
import {UserService} from '../api/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // loading = false;
  // eOrders: EOrder[];
  //
  // constructor(private eOrderService: EOrderService) {}
  //
  // ngOnInit() {
  //   this.loading = true;
  //   this.eOrderService.getEOrders().subscribe(eOrders => {
  //     this.loading = false;
  //     this.eOrders = eOrders;
  //   });
  // }
  users: User[];
  loading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }


}

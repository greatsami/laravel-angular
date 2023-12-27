import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PaginatorComponent} from "../components/paginator/paginator.component";
import {RouterLink} from "@angular/router";
import {Order} from "../../interfaces/order";
import {OrdersService} from "../../services/orders.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgForOf,
    PaginatorComponent,
    RouterLink
  ],
  animations: [
    trigger('tableState', [
      state('show', style({
        maxHeight: '150px'
      })),
      state('hide', style({
        maxHeight: 0
      })),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('1000ms ease-out'))
    ])
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  lastPage: number | undefined;
  // @ts-ignore
  selected: number;

  constructor(
    private orderService: OrdersService,
  ) {
  }

  ngOnInit(): void {
    this.load()
  }

  load(page: number = 1): void {
    this.orderService.all(page).subscribe(
      (res: any) => {
        this.orders = res.data;
        this.lastPage = res.meta.last_page
      }
    )
  }

  select(id: number): void {
    this.selected = this.selected === id ? 0 : id;
  }

  itemState(id: number): string {
    return this.selected === id ? 'show' : 'hide';
  }

  export(): void {
    this.orderService.export().subscribe(
      res => {
        const blob = new Blob([res], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
      }
    )
  }

}

import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Product} from "../../interfaces/product";
import {ProductsService} from "../../services/products.service";
import {PaginatorComponent} from "../components/paginator/paginator.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgOptimizedImage,
    PaginatorComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage: number | undefined;

  constructor(
    private productService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this.load()
  }

  load(page: number = 1): void {
    this.productService.all(page).subscribe(
      (res: any) => {
        this.products = res.data;
        this.lastPage = res.meta.last_page
      }
    )
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.productService.delete(id).subscribe(
        () => {
          this.products = this.products.filter(p => p.id !== id);
        }
      )
    }
  }

}

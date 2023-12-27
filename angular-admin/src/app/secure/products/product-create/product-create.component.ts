import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {Product} from "../../../interfaces/product";
import {ProductsService} from "../../../services/products.service";
import {UploadComponent} from "../../components/upload/upload.component";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    UploadComponent
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  roles: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: '',
    });
  }

  submit(): void {
    this.productService.create(this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/products'])
    );
  }

}

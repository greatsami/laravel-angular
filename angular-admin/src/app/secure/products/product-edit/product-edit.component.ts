import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UploadComponent} from "../../components/upload/upload.component";
import {Product} from "../../../interfaces/product";
import {ProductsService} from "../../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        UploadComponent
    ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent  implements OnInit {
  // @ts-ignore
  form: FormGroup;
  roles: Product[] = [];
  // @ts-ignore
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: '',
    });

    this.id = this.route.snapshot.params['id'];

    this.productService.get(this.id).subscribe(
      product => {
        this.form.patchValue({
          title: product.title,
          image: product.image,
          description: product.description,
          price: product.price,
        });
      }
    )

  }

  submit(): void {
    this.productService.update(this.id, this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/products'])
    );
  }

}

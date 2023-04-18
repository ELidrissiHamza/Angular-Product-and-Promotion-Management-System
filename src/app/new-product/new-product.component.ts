import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, public productService: ProductService,private router:Router) {
  }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      price: this.fb.control(null, [Validators.required]),
      promotion: this.fb.control(false, [Validators.required]),
    });
  }


  handleAddProduct() {
    let product = this.productFormGroup.value;
    this.productService.addProduct(product).subscribe({
      next: data => {
        alert("Product added successfully");
        this.router.navigateByUrl('/admin/products');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

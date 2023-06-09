import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
productId!:string;
product!:Product;
productFormGroup!:FormGroup;
  constructor(private route:ActivatedRoute,public productService: ProductService,
              private router:Router,private  fb: FormBuilder) {
    this.productId=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.findProduct(this.productId).subscribe({
      next:data=>{
        this.product=data;
        this.productFormGroup = this.fb.group({
          name: this.fb.control(this.product.name, [Validators.required, Validators.minLength(3)]),
          price: this.fb.control(this.product.price, [Validators.required]),
          promotion: this.fb.control(this.product.promotion, [Validators.required]),
        });
      },
      error:err=> {
        console.log(err);
      }
      });
    }


  handleUpdateProduct() {
    let product = this.productFormGroup.value;
    product.id=this.product.id;
    console.log(product);
    this.productService.updateProduct(product).subscribe({
      next: data => {
        alert("Product updated successfully");
        this.router.navigateByUrl('/admin/products');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

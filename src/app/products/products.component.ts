import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  currentPage:number=0;
  pageSize:number=5;
  totalPages:number=0;
  errorMessage!: string;
  SearchFormGroup!: FormGroup;
  currentAction:String="all";//pour la recherche par mot clé ou par pagination

  constructor(private productService: ProductService, private fb: FormBuilder,
              public AuthService:AuthentificationService,private router:Router) {
  }

  ngOnInit(): void {
    this.SearchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    //this.handleGetAllProducts();
    this.handleGetPageProducts()
  }

  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }
  handleGetPageProducts() {
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages=data.totalPages;

      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }
  handleDeleteProduct(product: any) {
    let conf = confirm("Are you sure to delete this product?");
    if (!conf) {
      return;
    }
    this.productService.deleteProduct(product.id).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleSetPromotion(product: Product) {

    this.productService.setPromotion(product.id).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });

  }

  handleSearchProduct() {
    this.currentPage=0;
this.currentAction="search";
    let keyword = this.SearchFormGroup.value.keyword;

    this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages=data.totalPages;

      },
      error: (err) => {
        this.errorMessage = err;

      }
    });
    }

  goToPage(i: number) {
    this.currentPage=i;

    if(this.currentAction==="all")
    this.handleGetPageProducts();
    else
      this.handleSearchProduct();
  }

  handleNewProduct() {
    this.router.navigateByUrl("/admin/newProduct");
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl("/admin/editProduct/"+product.id);
  }
}

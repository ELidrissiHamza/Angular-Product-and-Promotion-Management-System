import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthentificationGuard} from "./guards/authentification.guard";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminTemplateComponent,canActivate : [AuthentificationGuard],children:[
      {path:'products',component:ProductsComponent},
      {path:'newProduct',component:NewProductComponent},
      {path:'editProduct/:id',component:EditProductComponent},
      {path:'customers',component:CustomersComponent}
    ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

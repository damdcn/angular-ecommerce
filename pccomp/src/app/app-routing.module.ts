

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';

const routes: Routes = [
//{path: '', redirectTo: '/shop',pathMatch:'full'},
{path: 'login',component : LoginComponent},
{path: 'register',component : RegisterComponent},
{path: '',component : ShoppingCartComponent},
{path: 'payment', component : CartComponent},
{path: 'description/:item', component: ProductDescriptionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

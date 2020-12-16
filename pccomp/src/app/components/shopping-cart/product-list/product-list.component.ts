import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/messenger.service';
import { ProduitsService } from 'src/app/produits-service.service';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any;
  constructor(private produitsService: ProduitsService, private msg: MessengerService) { }

  ngOnInit(): void {
    let filtre = "";
    this.msg.getMsg().subscribe((filter: any) => {
      filtre = filter;
      this.loadProducts(filter);
    });
    if (filtre == "") { this.loadProducts("") }


  }

  loadProducts(filter: any) {
    this.produitsService.getProductsBySearch(filter).subscribe((products: any) => {
      this.productList = products;
    });
  }
}

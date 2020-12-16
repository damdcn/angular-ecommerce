import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessengerService } from '../messenger.service';
import { ProduitsService } from '../produits-service.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  
  productItem: any;

  constructor(private route: ActivatedRoute, private produitsService: ProduitsService) { }
 
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.produitsService.getProductsById(params.item).subscribe((products:any) => {
        this.productItem = products;   
      });
    });
  }
 }
 
import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/produits-service.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  catList: any;
  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.produitsService.getCategory().subscribe((products: any) => {
      this.catList = products;
      console.log(this.catList);
    })
  }
}
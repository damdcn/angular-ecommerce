import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/messenger.service';
import { ProduitsService } from 'src/app/produits-service.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  catList: any;
  constructor(private produitsService: ProduitsService ,private msg:MessengerService) { }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.produitsService.getCategory().subscribe((products: any) => {
      this.catList = products;
    });
  }

  setCategory(cat: any) {
    this.msg.sendMsg(cat);
  }
}
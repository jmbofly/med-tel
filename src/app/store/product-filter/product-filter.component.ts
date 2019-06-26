import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../core/products.data';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input() productList: Product[];
  constructor() {}

  ngOnInit() {}
}

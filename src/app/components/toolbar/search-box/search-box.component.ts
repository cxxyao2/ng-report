import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchProductService } from 'src/app/services/search-product.service';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: SearchProductService
  ) {}

  ngOnInit(): void {}

  setSearchTerms(term: string) {
    this.service.setSearchTerms(term);

    // if productList component is not active, navigate to it
    if (!this.router.url.includes('product-list')) {
      this.router.navigateByUrl('/product-list');
    }
  }
}

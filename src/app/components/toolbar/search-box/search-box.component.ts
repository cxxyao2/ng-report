import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { SearchProductService } from 'src/app/services/search-product.service';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  sub?: Subscription;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private service: SearchProductService
  ) {}

  productInput = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(3),
  ]);

  ngOnInit(): void {
    this.sub = this.productInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((data) => console.log(data)),
        map((searchTerm: string) => {
          this.service.setSearchTerms(searchTerm);
          // if productList component is not active, navigate to it
          if (!this.router.url.includes('product-list')) {
            this.router.navigateByUrl('/product-list');
          }
        })
      )
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  resetSearchTerm() {
    this.productInput.reset();
  }
}

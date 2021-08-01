import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  readonly prefix: string;

  readonly prefixList: { [key: string]: number; } = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.prefixList = this.createPrefixList('a', 'z');
  }

  ngOnInit(): void {
  }

  private createPrefixList(begin: string, includeEnd: string): { [key: string]: number; } {
    const start = begin.charCodeAt(0);
    const end = includeEnd.charCodeAt(0);

    const result: { [key: string]: number; } = {};
    for (let i = start; i <= end; i++) {
      const key = String.fromCharCode(i);
      result[key] = 0;
    }
    return result;
  }

  clickPrefix(prefix: string): void {
    this.router.navigate([prefix], { relativeTo: this.route });
  }
}

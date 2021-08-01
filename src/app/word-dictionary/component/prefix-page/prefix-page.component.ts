import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JavEngWord } from 'src/app/model/Response';
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-prefix-page',
  templateUrl: './prefix-page.component.html',
  styleUrls: ['./prefix-page.component.scss']
})
export class PrefixPageComponent implements OnInit, OnDestroy {

  index: number = 0;
  size: number = 10;
  paginatorDisabled: boolean = true;

  prefix: string;
  prefixNum: number;

  readonly prefixList: string[] = [];
  readonly pageSizeList: number[] = [10, 50, 100];
  readonly displayedColumns: string[] = ['Lemma', 'Japanese'];
  wordList: JavEngWord[] = [];

  readonly subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiClientService,
  ) {
    this.prefixList = this.createPrefixList('a', 'z');

    this.prefix = this.route.snapshot.paramMap.get('prefix').charAt(0);
    this.index = Number.parseInt(this.route.snapshot.queryParamMap.get('index'));
    this.size = Number.parseInt(this.route.snapshot.queryParamMap.get('size'));
    if (isNaN(this.index) || this.index < 0) {
      this.index = 0;
    }
    if (isNaN(this.size) || this.size < 0 || 100 < this.size || !this.pageSizeList.some(value => value === this.size)) {
      this.size = this.pageSizeList[0];
    }
  }

  private createPrefixList(begin: string, includeEnd: string): string[] {
    const start = begin.charCodeAt(0);
    const end = includeEnd.charCodeAt(0);

    const result: string[] = [];
    for (let i = start; i <= end; i++) {
      const key = String.fromCharCode(i);
      result.push(key);
    }
    return result;
  }

  ngOnInit(): void {
    this.loadWordList(this.prefix, this.index, this.size);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changePrefix(prefix: string) {
    this.prefix = prefix;
    this.index = 0;
    this.redirect(this.prefix, this.index, this.size);
  }

  changePage(index: number, size: number) {
    this.index = index;
    this.size = size;
    this.redirect(this.prefix, this.index, this.size);
  }

  private loadWordList(prefix: string, index: number, size: number) {
    this.paginatorDisabled = true;
    const subscription = this.api.countWord(prefix)
      .pipe(
        switchMap(res => {
          this.prefixNum = res.Count;
          if (!this.prefixNum || this.prefixNum === 0) {
            this.router.navigate([''], { relativeTo: this.route.parent });
          }

          return this.api.getWordByPrefix(prefix, size, index * size);
        })
      )
      .subscribe(res => {
        this.wordList = res;
        this.paginatorDisabled = false;
      });

    this.subscriptions.push(subscription);
  }

  private redirect(prefix: string, index: number, size: number) {
    this.loadWordList(prefix, index, size);
    this.router.navigate(['../' + prefix], { relativeTo: this.route, queryParams: { index: index, size: size } });
  }

  clickWord(word: string) {
    this.router.navigate(['../../word/' + word], { relativeTo: this.route });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
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

  readonly prefix: string;
  prefixNum: number;

  displayedColumns: string[] = ['Lemma', 'Japanese'];
  wordList: JavEngWord[] = [];

  readonly subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiClientService,
  ) {
    this.prefix = this.route.snapshot.paramMap.get('prefix').charAt(0);
  }

  ngOnInit(): void {

    const subscription = this.api.countWord(this.prefix).pipe(
      switchMap(res => {
        this.prefixNum = res.Count;
        if (!this.prefixNum || this.prefixNum === 0) {
          this.router.navigate([''], { relativeTo: this.route.parent });
        }
        return this.api.getWordByPrefix(this.prefix, this.size, this.index * this.size);
      })
    )
      .subscribe(
        res => {
          this.wordList = res;
          this.paginatorDisabled = false;
        }
      );

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changePage(index: number, size: number) {
    this.paginatorDisabled = true;
    this.index = index;
    this.size = size;
    const subscription = this.api.getWordByPrefix(this.prefix, this.size, this.index * this.size)
      .subscribe(res => {
        this.paginatorDisabled = false;
        this.wordList = res;
      });
    this.subscriptions.push(subscription);
  }

}

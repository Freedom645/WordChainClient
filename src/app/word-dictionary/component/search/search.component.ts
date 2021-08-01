import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { JavEngWord } from 'src/app/model/Response';
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  readonly inputControl = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]);
  filteredOptions: Observable<string[]>;

  isAutocomplete: boolean = false;

  index: number;
  size: number = 10;
  paginatorDisabled: boolean = true;

  searchNum: number;

  readonly prefixList: string[] = [];
  readonly displayedColumns: string[] = ['Lemma', 'Japanese'];
  wordList: JavEngWord[];

  readonly subscriptions: Subscription[] = [];

  constructor(
    private api: ApiClientService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe(event => {
      this.index = Number.parseInt(this.route.snapshot.queryParamMap.get('index'));
      if (isNaN(this.index) || this.index < 0) {
        this.index = 0;
      }

      this.inputControl.setValue(this.route.snapshot.queryParamMap.get('q'));
      if (this.inputControl.invalid) {
        this.inputControl.setValue('');
        return;
      }

      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.subscriptions.push(this.api.countWord(this.inputControl.value).subscribe(res => this.searchNum = res.Count));
      this.subscriptions.push(this.api.getWordByPrefix(this.inputControl.value, this.size, this.index * this.size).subscribe(res => {
        this.setWordList(res);
        this.paginatorDisabled = false;
      }));
    });
    if (!this.wordList) {
      this.setWordList([]);
    }
  }

  private setWordList(list: JavEngWord[]) {
    const newList = new Array<JavEngWord>(this.size);

    if (list) {
      for (let i = 0; i < list.length; i++) {
        newList[i] = list[i];
      }
    }

    this.wordList = newList;
  }

  ngOnInit(): void {

    this.filteredOptions = this.inputControl.valueChanges.pipe(
      switchMap(value => this.query(value)),
      filter(list => !!list),
      map(list => list.map(jew => jew.Lemma)),
    );
  }

  private query(value: string): Observable<JavEngWord[]> {
    if (!this.isAutocomplete || !value) {
      return of([]);
    }

    const lower = value.toLowerCase();
    return this.api.getWordByPrefix(lower, 10, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getErrorMessage(): string {
    if (this.inputControl.hasError('required')) {
      return 'please enter.';
    }
    if (this.inputControl.hasError('pattern')) {
      return 'please enter in alphabet.';
    }
    return '';
  }

  submitSearch() {
    const value: string = this.inputControl.value;
    if (!value) {
      return;
    }
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { q: value } });
  }

  clickWord(word: string) {
    this.router.navigate(['../word/' + word], { relativeTo: this.route });
  }

  changePage(index: number, size: number) {
    this.index = index;
    this.size = size;
    this.redirect(this.inputControl.value, this.index, this.size);
  }

  private redirect(value: string, index: number, size: number) {
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { q: value, index: index } });
  }

}

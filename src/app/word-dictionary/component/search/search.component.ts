import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { JavEngWord } from 'src/app/model/Response';
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  readonly size = 10;

  readonly inputControl = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]);
  filteredOptions: Observable<string[]>;

  isAutocomplete: boolean = true;

  readonly displayedColumns: string[] = ['Lemma', 'Japanese'];
  wordList: JavEngWord[] = [];

  constructor(
    private api: ApiClientService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe(event => {
      this.inputControl.setValue(this.route.snapshot.queryParamMap.get('q'));
      if (this.inputControl.invalid) {
        this.inputControl.setValue('');
        return;
      }
      this.api.getWordByPrefix(this.inputControl.value, this.size, 0).subscribe(res => this.wordList = res);
    });
    this.wordList = new Array(this.size);
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
    return this.api.getWordByPrefix(lower, this.size, 0);
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
}

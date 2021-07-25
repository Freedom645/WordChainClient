import { Component, OnInit, ViewChild } from '@angular/core';
import { concat, EMPTY, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Chain } from '../../model/Chain';
import { JavEngWord } from '../../../model/Response';
import { ApiClientService } from '../../../service/api-client.service';
import { InputComponent } from '../../component/game/input/input.component';

export interface WordHistory {
  position: number,
  name: string,
  word: string,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  readonly subscriptions: Subscription[] = [];
  chain: Chain = { previous: {}, now: {} };
  history: WordHistory[] = [];

  @ViewChild('appInput') appInput: InputComponent;

  constructor(
    private api: ApiClientService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  submitWord(input: string) {

    const subscription = this.api.getWord(input).pipe(
      switchMap(res => {
        if (!res || res.length === 0) {
          this.appInput.addNotExistWord(input);
          return EMPTY;
        }
        this.addNext("YOU", res[0]);
        const suffix = input.charAt(input.length - 1);
        return this.api.randomWord(suffix, 100);
      })
    ).pipe(
      map(res => res.find(rec => !this.isUsed(rec.Lemma)))
    ).subscribe(next => this.addNext("CPU", next));

    this.subscriptions.push(subscription);
  }

  private isUsed(word: string): boolean {
    return this.history.some(hist => hist.word === word);
  }

  private addNext(name: string, word: JavEngWord): void {
    const hist: WordHistory = {
      position: this.history.length + 1,
      name: name,
      word: word.Lemma,
    };

    this.chain.previous = this.chain.now;
    this.chain.now = word;

    this.history = this.history.concat(hist);
    this.appInput.addUsedWord(word.Lemma);
    this.appInput.setNextPrefix(word.Lemma);
  }
}

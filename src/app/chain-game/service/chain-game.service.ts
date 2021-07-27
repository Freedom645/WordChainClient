import { Injectable } from '@angular/core';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JavEngWord } from 'src/app/model/Response';
import { ApiClientService } from 'src/app/service/api-client.service';
import { DifficultySetting, DifficultySettingsTemplate, QueryState, WordHistory } from '../model/chain-game-model';

@Injectable({
  providedIn: 'root'
})
export class ChainGameService {

  private difficultySetting: DifficultySetting = DifficultySettingsTemplate[0];

  private readonly history: WordHistory[] = [];
  private readonly notExistWords = new Set<string>();

  private readonly SubmitSubject = new Subject<WordHistory>();
  public readonly SubmitState = this.SubmitSubject.asObservable();

  constructor(
    private api: ApiClientService,
  ) { }

  public initialize() {
    this.history.splice(0);
    this.notExistWords.clear();
  }

  public submitWord(word: string): Subscription {
    if (this.isUsed(word)) {
      // 使用済みの場合
      const hist = this.addHistory("YOU", { Lemma: word }, "Used");
      this.SubmitSubject.next(hist);
      return Subscription.EMPTY;
    }

    return this.api.getWord(word).pipe(
      switchMap(res => {
        if (!res || res.length === 0) {
          // 存在しない場合
          const hist = this.addHistory("YOU", { Lemma: word }, "NotExist");
          this.notExistWords.add(word);
          this.SubmitSubject.next(hist);
          return EMPTY;
        }
        const hist = this.addHistory("YOU", res[0], "OK");
        this.SubmitSubject.next(hist);

        const suffix = this.lastLetter(word);
        return this.api.randomWord(suffix, this.difficultySetting.randomTry);
      })
    ).pipe(
      map(res => res.find(rec => !this.isUsed(rec.Lemma)))
    ).subscribe(
      next => {
        const hist = this.addHistory("CPU", next, next ? "OK" : "Failed");
        this.SubmitSubject.next(hist);
      }
    );
  }

  private addHistory(name: string, word: JavEngWord, state: QueryState): WordHistory {
    const hist: WordHistory = {
      position: this.history.length + 1,
      state: state,
      playerName: name,
      word: word,
    };

    this.history.push(hist);
    return hist;
  }

  public isUsed(word: string): boolean {
    return this.history.some(hist => hist.word.Lemma === word);
  }

  public getHistory(): WordHistory[] {
    return this.history;
  }

  public getNextPrefix(): string {
    const latest = this.history[this.history.length - 1].word.Lemma;
    return this.lastLetter(latest);
  }

  public isNotExist(word: string): boolean {
    return this.notExistWords.has(word);
  }

  public getDifficulty() {
    return this.difficultySetting;
  }

  public setDifficulty(diff: DifficultySetting): void {
    this.difficultySetting = diff;
  }

  private lastLetter(word: string): string {
    return word.charAt(word.length - 1);
  }
}

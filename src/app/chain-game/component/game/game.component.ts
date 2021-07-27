import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { JavEngWord } from 'src/app/model/Response';
import { Chain, GameOverType, WordHistory } from '../../model/chain-game-model';
import { ChainGameService } from '../../service/chain-game.service';
import { InputComponent } from './input/input.component';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  readonly subscriptions: Subscription[] = [];
  chain: Chain = { previous: {}, now: {} };
  history: WordHistory[] = [];

  failedNum: number = 0;
  failedNumMax = this.service.getDifficulty().failedNum;

  @ViewChild('appInput') appInput: InputComponent;
  @ViewChild('appTimer') appTimer: TimerComponent;

  constructor(
    private service: ChainGameService,
    private cd: ChangeDetectorRef,
  ) {
    this.service.SubmitState.subscribe(word => this.receiveResponse(word));
  }

  ngOnInit(): void {
    this.service.initialize();
  }

  ngAfterViewInit() {
    this.appTimer.setTime(this.service.getDifficulty().answerTime);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  submitWord(input: string) {
    this.appInput.setDisableSubmitButton(true);
    this.subscriptions.push(this.service.submitWord(input));
  }

  private receiveResponse(response: WordHistory) {
    this.appInput.setDisableSubmitButton(false);
    switch (response.state) {
      case "NotExist":
        this.appInput.setWord(response.word.Lemma);
        this.failedNum = this.service.addFailedNum();
        if (this.service.isFailed()) {
          this.doGameOver("FailedOver");
        }
        break;
      case "Used":
        this.failedNum = this.service.addFailedNum();
        if (this.service.isFailed()) {
          this.doGameOver("FailedOver");
        }
        break;
      case "OK":
        this.switchChain(response.word);
        this.appInput.setNextPrefix(this.service.getNextPrefix());
        if (this.appTimer.isStarting()) {
          this.appTimer.resetTimer();
        } else {
          this.appTimer.startTimer(() => this.doGameOver("TimeLimit"));
        }
        break;
      case "Failed":
        this.switchChain({});
        this.doGameOver("FailedByCPU");
        break;
    }
    this.history = [...this.service.getHistory()];
  }

  private switchChain(word: JavEngWord) {
    this.chain.previous = this.chain.now;
    this.chain.now = word;
  }

  private doGameOver(type: GameOverType) {
    this.appInput.setDisableSubmitButton(true);
    if (this.appTimer.isStarting()) {
      this.appTimer.stopTimer();
    }
    switch (type) {
      case "FailedByCPU":
        break;
      case "FailedOver":
        break;
      case "TimeLimit":
        break;
    }
  }

}

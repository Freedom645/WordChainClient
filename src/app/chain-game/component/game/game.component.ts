import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chain, WordHistory } from '../../model/chain-game-model';
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

  @ViewChild('appInput') appInput: InputComponent;
  @ViewChild('appTimer') appTimer: TimerComponent;

  constructor(
    private service: ChainGameService,
    private cd: ChangeDetectorRef,
  ) {
    this.service.SubmitState.subscribe(word => this.receiveResponse(word));
  }

  ngOnInit(): void { }

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
        break;
      case "Used":
        break;
      case "OK":
        this.chain.previous = this.chain.now;
        this.chain.now = response.word;
        this.appInput.setNextPrefix(this.service.getNextPrefix());

        if (this.appTimer.isStarting()) {
          this.appTimer.resetTimer();
        } else {
          this.appTimer.startTimer(() => { this.appInput.setDisableSubmitButton(true); });
        }
        break;
      case "Failed":
        break;
    }
    this.history = [...this.service.getHistory()];
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chain, WordHistory } from '../../model/chain-game-model';
import { InputComponent } from '../../component/game/input/input.component';
import { ChainGameService } from '../../service/chain-game.service';


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
    private service: ChainGameService,
  ) {
    this.service.SubmitState.subscribe(word => this.receiveResponse(word));
  }

  ngOnInit(): void {
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
        this.appInput.addNotExistWord(response.word.Lemma);
        break;
      case "Used":
        break;
      case "OK":
        this.chain.previous = this.chain.now;
        this.chain.now = response.word;
        this.appInput.setNextPrefix(this.service.getNextPrefix());
        break;
      case "Failed":
        break;
    }
    this.history = [...this.service.getHistory()];
  }

}

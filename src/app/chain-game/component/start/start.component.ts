import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DifficultySettingsTemplate } from '../../model/chain-game-model';
import { ChainGameService } from '../../service/chain-game.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  selectedIndex = 0;
  readonly gameDifficulties = DifficultySettingsTemplate;
  readonly inputs = ["randomTry", "answerTime", "failedNum"];

  constructor(
    private service: ChainGameService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    const index = this.gameDifficulties.findIndex(diff => diff === this.service.getDifficulty());
    if (index !== -1) {
      this.selectedIndex = index;
    }
  }

  private getDifficulty() {
    return this.gameDifficulties[this.selectedIndex];
  }

  select(event: MatSelectionListChange) {
    this.selectedIndex = event.options[0].value;
  }

  clickStart() {
    this.service.initialize();
    this.service.setDifficulty(this.getDifficulty());
    this.router.navigate(['game'], { relativeTo: this.route.parent });
  }
}

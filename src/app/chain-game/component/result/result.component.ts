import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordHistory } from '../../model/chain-game-model';
import { ChainGameService } from '../../service/chain-game.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  history: WordHistory[];

  constructor(
    private service: ChainGameService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.history = this.service.getHistory();
  }

  ngOnInit(): void {

  }


  moveStart() {
    this.router.navigate(['start'], { relativeTo: this.route.parent });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { WordHistory } from 'src/app/chain-game/model/chain-game-model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  readonly displayedColumns: string[] = ['position', 'name', 'word', 'state'];

  @Input() dataSource: WordHistory[] = [];

  constructor() { }

  ngOnInit(): void { }


}

import { Component, Input, OnInit } from '@angular/core';
import { WordHistory } from '../game.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  readonly displayedColumns: string[] = ['position', 'name', 'word'];
  @Input() dataSource: WordHistory[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

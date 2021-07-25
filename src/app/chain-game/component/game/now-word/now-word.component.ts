import { Component, Input, OnInit } from '@angular/core';
import { Chain } from 'src/app/chain-game/model/Chain';

@Component({
  selector: 'app-now-word',
  templateUrl: './now-word.component.html',
  styleUrls: ['./now-word.component.scss']
})
export class NowWordComponent implements OnInit {

  @Input() chain: Chain;

  constructor() { }

  ngOnInit(): void {
  }

}

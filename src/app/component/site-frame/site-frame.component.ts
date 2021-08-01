import { Component, OnInit } from '@angular/core';

interface SideMenu {
  name: string,
  path: string;
}

@Component({
  selector: 'app-site-frame',
  templateUrl: './site-frame.component.html',
  styleUrls: ['./site-frame.component.scss']
})
export class SiteFrameComponent implements OnInit {

  readonly menuList: SideMenu[] = [
    { name: "Top", path: "." },
    null,
    { name: "WordChain", path: "./chain-game" },
    { name: "Dictionary", path: "./dictionary/prefix" },
    { name: "Search", path: "./dictionary/search" },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

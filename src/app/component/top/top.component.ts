import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface TopMenu {
  icon: string,
  title: string,
  description: string,
  path: string,
}

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {



  readonly topMenu: TopMenu[] = [
    { icon: "play_arrow", title: "Game Start", description: "", path: "/chain-game" },
    { icon: "menu_book", title: "Dictionary", description: "", path: "/dictionary/prefix" },
    { icon: "search", title: "Search", description: "", path: "/dictionary/search" },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }

}

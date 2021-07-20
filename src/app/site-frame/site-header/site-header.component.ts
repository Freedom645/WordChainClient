import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  title: string = environment.siteName;

  @Output() clickSideMenu = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

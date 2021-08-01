import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JavEngWord } from 'src/app/model/Response';
import { ApiClientService } from 'src/app/service/api-client.service';

interface ExternalSite {
  host: string,
  url: string,
  display: string,
}

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  readonly word: string;
  readonly wordSuffix: string;
  jew: JavEngWord = {};

  readonly siteList: ExternalSite[] = [];

  constructor(
    private api: ApiClientService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.word = this.route.snapshot.paramMap.get('word');
    if (this.word) {
      this.wordSuffix = this.word.charAt(this.word.length - 1);
    }
    this.siteList.push({ host: "ejje.weblio.jp", url: `https://ejje.weblio.jp/content/${this.word}`, display: "Weblio" });
    this.siteList.push({ host: "translate.google.co.jp", url: `https://translate.google.co.jp/?hl=ja&sl=en&tl=ja&text=${this.word}&op=translate`, display: "Google Trans" });
    this.siteList.push({ host: "wikipedia.org", url: `https://ja.wikipedia.org/wiki/${this.word}`, display: "Wikipedia" });
    this.siteList.push({ host: "dictionary.goo.ne.jp", url: `https://dictionary.goo.ne.jp/word/en/${this.word}`, display: "goo" });
  }

  ngOnInit(): void {
    if (!this.word) {
      this.navigateSearch();
    }
    this.api.getWord(this.word).subscribe(res => {
      if (!res || !res.length || !res[0]) {
        this.navigateSearch();
        return;
      }
      this.jew = res[0];
    });
  }

  private navigateSearch() {
    this.router.navigate(['../../search'], { relativeTo: this.route });
  }

  clickReturn() {
    this.router.navigate(['../../search'], { relativeTo: this.route, queryParams: { q: this.word } });
  }

  clickNext(next: string) {
    this.router.navigate(['../../search'], { relativeTo: this.route, queryParams: { q: next } });
  }

  navigateExternalSite(anchor: HTMLAnchorElement) {
    anchor.click();
  }

}

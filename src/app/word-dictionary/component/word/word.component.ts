import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JavEngWord } from 'src/app/model/Response';
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  readonly word: string;
  jew: JavEngWord = {};

  constructor(
    private api: ApiClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.word = this.route.snapshot.paramMap.get('word');
  }

  ngOnInit(): void {
    this.api.getWord(this.word).subscribe(res => {
      if (!res || !res.length || !res[0]) {
        this.router.navigate(['../../'], { relativeTo: this.route });
        return;
      }
      this.jew = res[0];
    });
  }

}

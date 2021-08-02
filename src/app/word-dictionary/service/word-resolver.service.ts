import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JavEngWord } from 'src/app/model/Response';
import { ApiClientService } from 'src/app/service/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class WordResolverService implements Resolve<Observable<JavEngWord[]>>{

  constructor(
    private api: ApiClientService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JavEngWord[]> {
    const word = route.paramMap.get('word');
    return this.api.getWord(word);
  }
}

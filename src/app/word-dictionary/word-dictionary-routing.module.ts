import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { WordComponent } from './component/word/word.component';
import { WordDictionaryComponent } from './container/word-dictionary/word-dictionary.component';
import { WordResolverService } from './service/word-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: WordDictionaryComponent,
    children: [
      { path: 'search', component: SearchComponent },
      { path: 'word/:word', component: WordComponent, resolve: { word: WordResolverService } },
      { path: '**', redirectTo: 'search', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordDictionaryRoutingModule { }

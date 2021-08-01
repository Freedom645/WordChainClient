import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrefixPageComponent } from './component/prefix-page/prefix-page.component';
import { SearchComponent } from './component/search/search.component';
import { WordDictionaryComponent } from './container/word-dictionary/word-dictionary.component';

const routes: Routes = [
  {
    path: '',
    component: WordDictionaryComponent,
    children: [
      { path: 'search', component: SearchComponent },
      { path: 'prefix/:prefix', component: PrefixPageComponent },
      { path: 'prefix', redirectTo: 'prefix/a', pathMatch: 'full' },
      { path: '**', redirectTo: 'prefix/a', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordDictionaryRoutingModule { }

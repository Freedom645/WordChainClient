import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './component/page/page.component';
import { PrefixPageComponent } from './component/prefix-page/prefix-page.component';
import { SearchComponent } from './component/search/search.component';
import { WordDictionaryComponent } from './container/word-dictionary/word-dictionary.component';

const routes: Routes = [
  {
    path: '',
    component: WordDictionaryComponent,
    children: [
      { path: 'page/:prefix', component: PrefixPageComponent },
      { path: 'page', component: PageComponent },
      { path: 'search', component: SearchComponent },
      { path: '**', redirectTo: 'page', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordDictionaryRoutingModule { }

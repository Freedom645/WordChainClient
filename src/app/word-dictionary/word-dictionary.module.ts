import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { WordComponent } from './component/word/word.component';
import { WordDictionaryComponent } from './container/word-dictionary/word-dictionary.component';
import { SearchComponent } from './component/search/search.component';
import { WordDictionaryRoutingModule } from './word-dictionary-routing.module';
import { PrefixPageComponent } from './component/prefix-page/prefix-page.component';



@NgModule({
  declarations: [
    WordComponent,
    WordDictionaryComponent,
    SearchComponent,
    PrefixPageComponent,
  ],
  imports: [
    CommonModule,
    WordDictionaryRoutingModule,

    MatGridListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,

  ]
})
export class WordDictionaryModule { }

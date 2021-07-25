import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { GameComponent } from './component/game/game.component';
import { HistoryComponent } from './component/game/history/history.component';
import { InputComponent } from './component/game/input/input.component';
import { NowWordComponent } from './component/game/now-word/now-word.component';
import { StartComponent } from './component/start/start.component';
import { ChainGameService } from './service/chain-game.service';
import { TimerComponent } from './component/game/timer/timer.component';

@NgModule({
  declarations: [
    GameComponent,
    HistoryComponent,
    InputComponent,
    NowWordComponent,
    StartComponent,
    TimerComponent,
  ],
  imports: [
    CommonModule,

    FlexLayoutModule,

    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ChainGameService,
  ],
})
export class ChainGameModule { }

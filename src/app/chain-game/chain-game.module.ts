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
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

import { GameComponent } from './component/game/game.component';
import { HistoryComponent } from './component/game/history/history.component';
import { InputComponent } from './component/game/input/input.component';
import { NowWordComponent } from './component/game/now-word/now-word.component';
import { StartComponent } from './component/start/start.component';
import { ChainGameService } from './service/chain-game.service';
import { TimerComponent } from './component/game/timer/timer.component';
import { ChainGameContainerComponent } from './container/chain-game-container/chain-game-container.component';
import { ChainGameRoutingModule } from './chain-game-routing.module';
import { GameOverDialogComponent } from './component/game/game-over-dialog/game-over-dialog.component';

@NgModule({
  declarations: [
    GameComponent,
    HistoryComponent,
    InputComponent,
    NowWordComponent,
    StartComponent,
    TimerComponent,
    ChainGameContainerComponent,
    GameOverDialogComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,

    ChainGameRoutingModule,

    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSliderModule,
    MatBadgeModule,
    MatDialogModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ChainGameService,
  ],
})
export class ChainGameModule { }

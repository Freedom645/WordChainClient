import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './chain-game/game/game.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { ApiClientService } from './service/api-client.service';
import { SiteFrameComponent } from './site-frame/site-frame.component';
import { SiteHeaderComponent } from './site-frame/site-header/site-header.component';
import { HistoryComponent } from './chain-game/game/history/history.component';
import { InputComponent } from './chain-game/game/input/input.component';
import { NowWordComponent } from './chain-game/game/now-word/now-word.component';
import { TopComponent } from './top/top.component';
import { SiteFooterComponent } from './site-frame/site-footer/site-footer.component';
import { StartComponent } from './chain-game/start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SiteFrameComponent,
    SiteHeaderComponent,
    HistoryComponent,
    InputComponent,
    NowWordComponent,
    TopComponent,
    SiteFooterComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FlexLayoutModule,

    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ApiClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

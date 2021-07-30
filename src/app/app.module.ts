import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { ApiClientService } from './service/api-client.service';
import { SiteFrameComponent } from './component/site-frame/site-frame.component';
import { SiteHeaderComponent } from './component/site-frame/site-header/site-header.component';
import { SiteFooterComponent } from './component/site-frame/site-footer/site-footer.component';

import { TopComponent } from './component/top/top.component';
import { ChainGameModule } from './chain-game/chain-game.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    SiteFrameComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    TopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,

    ChainGameModule,
  ],
  providers: [
    ApiClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

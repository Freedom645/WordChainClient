import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { TopComponent } from './top/top.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: '', component: TopComponent },
  // 未設定パスのリダイレクトng
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

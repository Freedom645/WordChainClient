import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  // { path: 'metho-tori-4j', loadChildren: './metho-tori-4j/metho-tori-4j-routing.module#MethoTori4jRoutingModule' },
  { path: 'game', component: GameComponent },
  // 未設定パスのリダイレクト
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

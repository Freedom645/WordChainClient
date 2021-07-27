import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './chain-game/component/game/game.component';
import { TopComponent } from './component/top/top.component';

const routes: Routes = [
  { path: 'chain-game', loadChildren: "./chain-game/chain-game-routing.module#ChainGameRoutingModule" },
  { path: '', component: TopComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

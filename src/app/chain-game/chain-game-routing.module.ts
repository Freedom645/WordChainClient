import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameComponent } from "./component/game/game.component";
import { StartComponent } from "./component/start/start.component";
import { ChainGameContainerComponent } from "./container/chain-game-container/chain-game-container.component";

const routes: Routes = [
  {
    path: '',
    component: ChainGameContainerComponent,
    children: [
      { path: 'start', component: StartComponent },
      { path: 'game', component: GameComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChainGameRoutingModule { }

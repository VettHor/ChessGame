import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesTableComponent } from './games-table/games-table.component';
import { PlayersTableComponent } from './players-table/players-table.component';

const routes: Routes = [
  {
    path: "players", component: PlayersTableComponent
  },
  {
    path: "games", component: GamesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

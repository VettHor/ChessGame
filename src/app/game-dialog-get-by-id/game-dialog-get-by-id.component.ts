import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-game-dialog-get-by-id',
  templateUrl: './game-dialog-get-by-id.component.html',
  styleUrls: ['./game-dialog-get-by-id.component.css']
})
export class GameDialogGetByIdComponent implements OnInit {
  id: number = 0;
  player1ID: number = 0;
  player2ID: number = 0;
  gameTime: number = 0;

  constructor(
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.httpClient.get<any>(`https://localhost:44385/api/Game/get_game/${this.data}`).subscribe(
      response => {
        this.id = response.id;
        this.player1ID = response.player1ID;
        this.player2ID = response.player2ID;
        this.gameTime = response.gameTime;
       }
    );
  }
}

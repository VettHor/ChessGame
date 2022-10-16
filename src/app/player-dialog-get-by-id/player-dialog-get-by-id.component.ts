import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-player-dialog-get-by-id',
  templateUrl: './player-dialog-get-by-id.component.html',
  styleUrls: ['./player-dialog-get-by-id.component.css']
})
export class PlayerDialogGetByIdComponent implements OnInit {
  id: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
  level: number = 0;

  constructor(
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.httpClient.get<any>(`https://localhost:44385/api/User/get_player/${this.data}`).subscribe(
      response => {
        this.id = response.id;
        this.name = response.name;
        this.email = response.email;
        this.password = response.password;
        this.level = response.level;
       }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { concatWith } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  gameForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
      player1ID : ['', Validators.required],
      player2ID : ['', Validators.required],
      gameTime : ['', Validators.required]
    })

    if(this.editData) {
      this.actionBtn = "Update";
      this.gameForm.controls['player1ID'].setValue(this.editData.player1ID);
      this.gameForm.controls['player2ID'].setValue(this.editData.player2ID);
      this.gameForm.controls['gameTime'].setValue(this.editData.gameTime);
    }
  }

  addAndEditGame() {
    if(!this.editData) {
      if(this.gameForm.valid) {
        this.addGame();
      }
    } else {
      this.updateGame();
    }
  }

  addGame() {
    this.httpClient.post<any>('https://localhost:44385/api/Game/add_game', this.gameForm.value)
    .subscribe({
      next: (res) => {
        this.gameForm.reset();
        this.dialogRef.close('save');
      }
    });
  }

  updateGame() {
    this.httpClient.put<any>(`https://localhost:44385/api/Game/update_game/${this.editData.id}`, this.gameForm.value)
    .subscribe(() => {
        this.gameForm.reset();
        this.dialogRef.close('update');
    })
  }
}

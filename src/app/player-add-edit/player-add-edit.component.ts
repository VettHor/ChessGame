import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.css']
})
export class PlayerAddEditComponent implements OnInit {
  playerForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PlayerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.playerForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      level : ['', Validators.required]
    })

    if(this.editData) {
      this.actionBtn = "Update";
      this.playerForm.controls['name'].setValue(this.editData.name);
      this.playerForm.controls['email'].setValue(this.editData.email);
      this.playerForm.controls['password'].setValue(this.editData.password);
      this.playerForm.controls['level'].setValue(this.editData.level);
    }
  }

  addAndEditPlayer() {
    if(!this.editData) {
      if(this.playerForm.valid) {
        this.addPlayer();
      }
    } else {
      this.updatePlayer();
    }
  }

  addPlayer() {
    this.httpClient.post<any>('https://localhost:44385/api/User/add_player', this.playerForm.value)
    .subscribe({
      next: (res) => {
        this.playerForm.reset();
        this.dialogRef.close('save');
      }
    });
  }

  updatePlayer() {
    this.httpClient.put<any>(`https://localhost:44385/api/User/update_player/${this.editData.id}`, this.playerForm.value)
    .subscribe(() => {
        this.playerForm.reset();
        this.dialogRef.close('update');
    })
  }
}

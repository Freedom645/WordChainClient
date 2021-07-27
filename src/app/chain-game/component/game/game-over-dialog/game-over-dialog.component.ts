import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameOverDialogData } from 'src/app/chain-game/model/chain-game-model';

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
  styleUrls: ['./game-over-dialog.component.scss']
})
export class GameOverDialogComponent implements OnInit {

  title: string;
  description: string;

  constructor(
    private dialogRef: MatDialogRef<GameOverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: GameOverDialogData,
  ) {
    if (this.data.type === "FailedByCPU") {
      this.title = "YOU WIN!!!";
      this.description = "CPU";
    } else {
      this.title = "YOU LOSE...";
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}

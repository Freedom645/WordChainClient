import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameOverDialogData, GameOverType } from 'src/app/chain-game/model/chain-game-model';

type GameOver = {
  title: string,
  description: string,
};

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
  styleUrls: ['./game-over-dialog.component.scss']
})
export class GameOverDialogComponent implements OnInit {

  readonly isWin: boolean;
  readonly display: GameOver;

  constructor(
    private dialogRef: MatDialogRef<GameOverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: GameOverDialogData,
  ) {
    this.isWin = this.data.type === "FailedByCPU";
    this.display = this.initialize(this.data.type);
  }

  private initialize(type: GameOverType): GameOver {
    switch (type) {
      case "FailedByCPU":
        return { title: "YOU WIN.", description: "" };
      case "FailedOver":
        return { title: "YOU LOSE.", description: "Failure times limit exceeded." };
      case "TimeLimit":
        return { title: "YOU LOSE.", description: "Time up." };
    }
  }


  onClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}

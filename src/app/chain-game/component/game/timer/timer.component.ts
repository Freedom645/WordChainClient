import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  private timer: NodeJS.Timeout;

  private timeSetting: number;
  private time: number;
  timeStr: string = "00:00.0";
  timeProgress: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public setTime(time: number) {
    if (time >= 6000) {
      time = 5999;
    }
    if (time < 1) {
      time = 1;
    }
    this.time = time * 10;

    this.timeSetting = this.time;
    this.timeStr = this.formatTime(this.time);
    this.timeProgress = 100;
  }

  public startTimer(func: () => void) {
    if (this.isStarting()) {
      return;
    }
    this.timer = setInterval(() => {
      this.timeStr = this.formatTime(this.time);
      this.timeProgress = this.time / this.timeSetting * 100;
      if (this.time <= 0) {
        this.stopTimer();
        func();
      }
      this.time -= 1;
    }, 100);
  }

  public resetTimer() {
    this.time = this.timeSetting;
  }

  public stopTimer() {
    if (this.isStarting()) {
      clearInterval(this.timer);
    }
  }

  public isStarting(): boolean {
    return !!this.timer;
  }

  private formatTime(time: number): string {
    const mil = time % 10;
    const sec = ("00" + Math.floor(time / 10) % 60).slice(-2);
    const min = ("00" + Math.floor(time / 600)).slice(-2);
    return `${min}:${sec}.${mil}`;
  }

}

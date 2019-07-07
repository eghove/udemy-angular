import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  // need to emit this event so the other components can listen to it, add @Output to make it listenable
  @Output() intervalFired = new EventEmitter<number>();
 
  // setting the propery for the counter/interval
  interval;
 
  // storing the count
  lastNumber = 0;

  constructor() { }

  ngOnInit() {
  }

  // fires when the "Start" button pressed
  onStartGame() {
    console.log("game started");
    // so every 1000 ms, emit the value of lastNumber + 1
    this.interval = setInterval(
      () => {
        this.intervalFired.emit(this.lastNumber + 1);
        // then increment lastNumber
        this.lastNumber++;
      },
      1000)
  }

  // fires when the "Stop" button pressed
  onStopGame() {
    console.log("game stopped");
    // clears the interval
    clearInterval(this.interval);
  }
}

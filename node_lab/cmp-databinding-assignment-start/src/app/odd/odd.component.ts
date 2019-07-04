import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  // adding the number property, make it take values from outside this component
 @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

}

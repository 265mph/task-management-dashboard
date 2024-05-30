import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userName: string = "Otunba"
  currentDate: string = "";

  ngOnInit(): void {
    this.showDate()
  }
  
  showDate() {
    const date = new Date();
    this.currentDate = date.toDateString()
  }
}

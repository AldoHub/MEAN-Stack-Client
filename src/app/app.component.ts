import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-client';
  
  constructor(private router: Router){}

  addItem: boolean = true;

  checkUrl(){
    this.router.events.subscribe(x => {
      if(!this.router.url.indexOf("/addpost")){
        this.addItem = false;
      }else{
        this.addItem = true;
      }
    })
  }

  ngOnInit(): void {
    this.checkUrl(); 
  }

}

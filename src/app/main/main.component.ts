import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private httpClient: HttpClient) { }

  public posts: any = null;
  public totalCount: any;
  public currentPage: any;

  public getNextPosts($event: Event, page: any){
    $event.preventDefault();
    let _posts: any[] = [];
    this.posts = this.apiService.getPosts(page).pipe(
      map(res => {
        res["data"].forEach((post: any) => {
          _posts.push(post);
        })

        this.currentPage = page;
        localStorage.setItem("currentPage", this.currentPage);
        return _posts;
      })
    );
  }



  ngOnInit() {

    let _posts:any = [];
    if(localStorage.getItem("currentPage")){
     
      this.posts = this.apiService.getPosts(localStorage.getItem("currentPage")).pipe(
        map((res) => {
          if(res["data"].length == 0) {
            let c: any = localStorage.getItem("currentPage");
            let n: any = c - 1;
            
            JSON.parse(c);
            localStorage.removeItem("currentPage");

            new Promise((resolve) => {

              this.httpClient.get("http://localhost:4000/api/" + n).pipe(map((res) => {
                res["data"].forEach((post: any) => {
                  _posts.push(post);
                  this.totalCount = Array(res["pages"]).fill("").map((x,i)=> i + 1);
                  localStorage.setItem("currentPage", n);
                })
              })).subscribe(() => {
                resolve();
              });
            });

            return _posts;

          }else{
             res["data"].forEach((post: any) => {
               _posts.push(post);
             })
             this.totalCount =  Array(res["pages"]).fill("").map((x,i)=> i + 1);
             return _posts;
          }
        }));


    }else{
      this.posts = this.apiService.getPosts(null).pipe(
        map((res) => {
        res["data"].forEach((post :any) => {
          _posts.push(post);
        });
        
        console.log(res);
        console.log(_posts);
        
        this.totalCount =  Array(res["pages"]).fill("").map((x,i)=> i + 1);
        console.log(this.totalCount)
        return _posts;
      }));
    }


  }

}

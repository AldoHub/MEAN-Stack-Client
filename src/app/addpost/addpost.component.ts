import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  public image:any = null; //list of files
  public busy: boolean = false;

  public postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', [Validators.required, Validators.minLength(100)]),
    cover: new FormControl('',  Validators.required),  
  });

  public handleInput($event: Event){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image);
  }


  public addPost(formData: FormData){
    this.busy = true;
    this.apiService.addPost(formData, this.image).subscribe( res => {
      this.busy = false;
      console.log(res);
      this.router.navigate(["/"]);
    })
  }


  ngOnInit() {
  }

}

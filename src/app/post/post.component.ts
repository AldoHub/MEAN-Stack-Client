import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute, Router} from "@angular/router";
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  public post : any;
  public currentId: any = this.route.snapshot.paramMap.get("id");
  public postSubscription: Subscription;
  public editMode: boolean = false;
  public image: any;
  public busy: boolean = false;

  public editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('',  Validators.required),
    oldcover: new FormControl('', Validators.required),
    oldcovername: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
  });


  public handleInput($event: Event){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image);
  }


  public enablePanel(){
    this.editMode = true;
  }

  public closePanel(){
    this.editMode = false;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/post", this.currentId])); 
  }


  public editPost(formData: FormData){
    this.apiService.updatePost(formData, this.image).subscribe(res => {
      console.log(res);
    })
  }


  public deletePost(postId: string){
    this.apiService.deletePost(postId).subscribe(res => {
      console.log(res);
      this.router.navigate(["/"]);
    })
  }

  ngOnInit() {

    this.postSubscription = this.apiService.getPost(this.currentId).pipe(map((res:any) => {
      console.log(res);
      return res["data"];
    })).subscribe( post => {
      this.post = post;

      this.editForm.setValue({
        title: this.post.title,
        content: this.post.content,
        oldcover: this.post.cover,
        oldcovername: this.post.covername,
        id: this.post._id,
      });

    });

  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }


}

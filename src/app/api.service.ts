import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  public getPosts(page: any){
    if(page == null){
      return this.httpClient.get("http://localhost:4000/api/" + 1);
    }else{
      return this.httpClient.get("http://localhost:4000/api/" + page);
    }
  }


  public getPost(postId: any){
    console.log(postId);
    return this.httpClient.get("http://localhost:4000/api/post/" + postId);
  }

  public addPost(post: any, file: any){
    
      const {title, content} = post;
      const formData: FormData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("cover", file[0], file["filename"]);

      return this.httpClient.post("http://localhost:4000/api/create", formData);
      

  }


  public updatePost(post: any, file: any){
   
    const {title, content, id, oldcover, oldcovername} = post;
    const formData: FormData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("oldcover", oldcover); //node storage url
    formData.append("oldcovername", oldcovername); // multer filename
  
    if(file !== undefined) {
      formData.append("cover", file[0], file["filename"]);
      return this.httpClient.put("http://localhost:4000/api/update/" + id, formData);
    }else{
      return this.httpClient.put("http://localhost:4000/api/update/" + id, formData);
    }
  }


  public deletePost(postId: string){
    const formData: FormData = new FormData();

    formData.append("id", postId );
    return this.httpClient.request("delete", "http://localhost:4000/api/delete/" + postId, {body: formData});
  }

}

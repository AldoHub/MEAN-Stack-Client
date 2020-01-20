import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";


const routes: Routes = [
  {path: "", loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
  {path: "addpost", loadChildren: () => import("./addpost/addpost.module").then(m => m.AddpostModule)},
  {path: 'post/:id', loadChildren: () => import("./post/post.module").then(m => m.PostModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
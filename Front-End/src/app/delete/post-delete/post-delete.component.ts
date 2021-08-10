import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Theme } from 'src/app/model/Theme';
import { PostService } from 'src/app/service/post.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  post: Post = new Post();
  postId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {

    window.scroll(0, 0);

    if(environment.token == "") {
      this.router.navigate(["/login"]);
    }

    this.postId = this.route.snapshot.params["id"];
    this.findByPostId(this.postId);
  }

  findByPostId(id: number) {
    this.postService.getByPostId(id).subscribe((resp: Post) => {
      this.post = resp;
    })
  }

  deletePost() {
    this.postService.deletePost(this.postId).subscribe(() => {
      alert("Postagem apagada com sucesso!");
      this.router.navigate(["/home"]);
    });
  }

}

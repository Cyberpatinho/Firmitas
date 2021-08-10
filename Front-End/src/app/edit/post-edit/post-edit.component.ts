import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Theme } from 'src/app/model/Theme';
import { PostService } from 'src/app/service/post.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: Post = new Post();

  theme: Theme = new Theme();
  themeList: Theme[];
  themeId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {

    window.scroll(0, 0);

    if(environment.token == "") {
      this.router.navigate(["/login"]);
    }

    let id = this.route.snapshot.params["id"];
    this.findByPostId(id);
    this.getAllThemes();
  }

  findByPostId(id: number) {
    this.postService.getByPostId(id).subscribe((resp: Post) => {
      this.post = resp;
    })
  }

  getAllThemes() {
    this.themeService.getAllThemes().subscribe((resp: Theme[]) => {
      this.themeList = resp;
    })
  }

  getThemeById(id: number) {
    this.themeService.getThemeById(this.themeId).subscribe((resp: Theme) => {
      this.theme = resp;
    })
  }

  editPost() {
    this.theme.id = this.themeId;
    this.post.tema = this.theme;

    this.postService.editPost(this.post).subscribe((resp: Post) => {
      this.post = resp;
      alert("Postagem atualizada com sucesso!");
      this.router.navigate(['/home']);
    });

  }

}

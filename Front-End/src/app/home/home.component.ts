import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';
import { Theme } from '../model/Theme';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostService } from '../service/post.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Post = new Post();
  postList: Post[];

  theme: Theme = new Theme();
  themeList: Theme[];
  themeId: number;

  user: User = new User();
  userId: number = environment.id;

  constructor(
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(environment.token == "") {
      alert("Sua seção expirou, faça login novamente.");
      this.router.navigate(["/login"]);
    }

    this.getAllThemes();
    this.getAllPost();
  }

  getUserById() {
    this.authService.getUserById(this.userId).subscribe((resp: User) => {
      this.user = resp;
    })
  }

  getAllThemes() {
    this.themeService.getAllThemes().subscribe((resp: Theme[]) => {
      this.themeList = resp;
    })
  }

  getThemeById() {
    this.themeService.getThemeById(this.themeId).subscribe((resp: Theme) => {
      this.theme = resp;
    })
  }

  getAllPost() {
    this.postService.getAllPost().subscribe((resp: Post[]) => {
      this.postList = resp;
    })
  }

  postPost() {
    this.theme.id = this.themeId;
    this.post.tema = this.theme;

    this.user.id = this.userId;
    this.post.usuario = this.user;

    this.postService.postPost(this.post).subscribe((resp: Post) => {
      this.post = resp;
      alert("Postagem realizada com sucesso!")
      this.post = new Post();
      this.getAllPost();
    })

  }

}

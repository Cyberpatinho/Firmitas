import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  theme: Theme = new Theme();
  themeList: Theme[]

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    
    if(environment.token == "") {
      alert("Sua seção expirou, faça login novamente.");
      this.router.navigate(["/login"]);
    }

    this.getAllThemes();

  }

  addTheme() {
    this.themeService.postTheme(this.theme).subscribe((resp: Theme) => {
      this.theme = resp;
      alert("Tema cadastrado com sucesso!");
      this.getAllThemes();
      this.theme = new Theme();
    })
  }

  getAllThemes() {
    this.themeService.getAllThemes().subscribe((resp: Theme[]) => {
      this.themeList = resp;
    }) 
  }

}

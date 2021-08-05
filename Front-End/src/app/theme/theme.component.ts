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
  themeList: Theme[];

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    if(environment.token == ""){
      this.router.navigate(["/login"]);
    }
  }

  addTheme() {
    console.log(this.theme.descricao);
    this.themeService.postTheme(this.theme).subscribe((resp: Theme) => {
      this.theme = resp;
      alert("Tema cadastrado com sucesso!");
      this.theme = new Theme();
    }) 
  }

}

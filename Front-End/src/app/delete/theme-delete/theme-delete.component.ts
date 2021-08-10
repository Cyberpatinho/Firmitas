import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css']
})
export class ThemeDeleteComponent implements OnInit {

  theme: Theme = new Theme();
  themeId: number;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == "") {
      this.router.navigate(["/login"]);
    }

    this.themeId = this.route.snapshot.params['id'];
    this.getThemeById(this.themeId);
  }

  getThemeById(id: number) {
    this.themeService.getThemeById(id).subscribe((resp: Theme) => {
      this.theme = resp;
    })
  }

  deleteTheme() {
    this.themeService.deleteTheme(this.themeId).subscribe(() => {
      alert("Tema deletado com sucesso!");
      this.router.navigate(["/theme"]);
    })
  }

}

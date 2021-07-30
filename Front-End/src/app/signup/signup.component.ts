import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  confirmPasswordVar: string;
  typeUserVar: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmPassword(event: any) {
    this.confirmPasswordVar = event.target.value;
  }

  typeUser(event: any) {
    this.typeUserVar = event.target.value;
  }

  signUp() {
    this.user.tipo = this.typeUserVar;

    if (this.user.senha != this.confirmPasswordVar) {
      alert("As senhas não batem!");
    }
    else {
      this.authService.signUp(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(["/login"]);
        alert("Usuário cadastrado com sucesso!")
      });

    }

  }

}

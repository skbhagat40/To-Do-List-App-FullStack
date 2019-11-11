import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrelloService} from '../../../services/trello.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private trelloService: TrelloService,
              private toaster: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.trelloService.login(this.loginForm.getRawValue()).subscribe(res => {
        localStorage.setItem('token', res['token']);
        this.toaster.show('Logged In Successfully!!', 'Success');
        this.router.navigate(['']);
      },
      error1 => {
        this.toaster.show('Invalid Credentials.. Please Try Again!! ');
      });
  }

}

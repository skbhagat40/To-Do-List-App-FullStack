import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrelloService} from '../../../services/trello.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private trelloService: TrelloService,
              private toaster: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  register() {
    this.trelloService.register(this.registerForm.getRawValue()).subscribe(res => {
        this.toaster.show('Registered In Successfully!!', 'Success');
        this.router.navigate(['']);
      },
      error1 => {
        this.toaster.show('Invalid Credentials.. Please Try Again!! With' +
          'Different Username ..');
      });
  }
}

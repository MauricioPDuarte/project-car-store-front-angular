import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    ) {
      this.formGroup = this.formBuilder.group({
        username: ['', []],
        password: ['', []]
      });
  }

  ngOnInit() {
  }

}

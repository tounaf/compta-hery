import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { relative } from 'path';
// import { SessionStorageService } from 'ngx-webstorage';


interface User {
  user: string;
  pw: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: any = '';
  pw: any = '';
  erreurLogin:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private routes: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    // private sessionStorage: SessionStorageService
    ) {
    this.form = new FormGroup({ 
    });
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: [''],
      pw: [''],
    });
    this.erreurLogin = true;
  }

  login(){
    console.log(this.form.get('user')?.value);
    console.log(this.form.get('pw')?.value);
    const username = this.form.get('user')?.value;
    const pw = this.form.get('pw')?.value;
    if(username == "admin" && pw == "admin"){
      // this.sessionStorage.store('password', pw);
      this.router.navigateByUrl('compta');
    }else{
      this.router.navigateByUrl('login')
      this.erreurLogin =  false;
    }
  }

}

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toasterService: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }


  createLoginForm() {

    this.loginForm = this.formBuilder.group({

      email: ["", Validators.required],
      password: ["", Validators.required]


    });


  }
  login() {

    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {

        this.toasterService.success("Başarılı", "giriş yapıldı");
        localStorage.setItem("token", response.data.token)

        this.router.navigate(["/"])
      },responseError=>{

        this.toasterService.error(responseError.error);

      }
      )
    }
  }

}

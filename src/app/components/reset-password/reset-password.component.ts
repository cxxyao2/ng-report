import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { uniquePasswordValidator } from 'src/app/shared/unique-password.directive';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  hide = true;
  hideRepeat = true;
  token = '';
  myForm!: FormGroup;
  successMessage:string |null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // https://xxxx.xxx.xxx.xxx/reset-password?token=xxx
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  resetPassword() {
    this.authService.resetPassword('xx',this.token).subscribe(
      (data:any)=>{
        
        //this.successMessage = data.message;
      }
    );
  }

}

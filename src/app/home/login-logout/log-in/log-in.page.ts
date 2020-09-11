import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
    userLogInForm: FormGroup;
    targetUrl: string;

    constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.createLogInForm();
        this.targetUrl = this.route.snapshot.queryParams['target'];
    }

    createLogInForm() {
      this.userLogInForm = new FormGroup({
            username: new FormControl(null, {
                updateOn: 'change',
                validators: [Validators.required, Validators.minLength(4)]
            }),
            password: new FormControl(null, {
                updateOn: 'change',
                validators: [Validators.required, Validators.minLength(6)]
            })
        });
    }

    async onLogin() {
        console.log(this.userLogInForm.value);
        await this.authService.login(this.userLogInForm.value).then(data => {
            if (data['status'] === 'success') {
                this.router.navigateByUrl(this.targetUrl);
                this.userLogInForm.reset();
            }
        })
    }
}

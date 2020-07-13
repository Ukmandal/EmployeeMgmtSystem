import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { trigger, transition, animate, style, state } from "@angular/animations";
import { routerTransition } from '../../router.animations';
import { AdminService } from '../../customer/shared/stepper.service';


@Component({
    templateUrl: 'register.component.html',
    styles: [`
    .form-control-password {
      position: relative;
      top: -27px;
      left: -4px;
      cursor: pointer;
  },
  .button {
    cursor:pointer;
  }
    `],
    animations: [routerTransition()]
})

export class RegisterComponent implements OnInit {
    password: boolean = false;
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public snackBar: MatSnackBar,
        private adminService: AdminService,
    ) {}
    
    ngOnInit() {
        this.registerForm = this.fb.group({
            id: [0],
            firstName: [null, [Validators.required, Validators.minLength(3)]],
            lastName: [null, [Validators.required, Validators.minLength(3)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
            role: [null, [Validators.required, Validators.minLength(3)]],
            color: [null, [Validators.required]],
            country: [null, [Validators.required]],
            status: [null, [Validators.required]],
        });
    }

    togglePassword() {
        this.password = !this.password;
    }

    register() {
        this.adminService.addAdmin(this.registerForm.value);
        this.router.navigate(['/login']);
        console.log('registered Successfully!!');
        let snackBarRef = this.snackBar.open('Registerd Successfully!',
            'Got it!', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
            });
    }

    cancel() {
        this.router.navigate(['/welcome']);
    }
}
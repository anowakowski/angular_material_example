import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];
  user: User;

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  ngOnInit() {
    this.user = new User();
  }

  save() {
    this.userService.addUser(this.user).then(result => {
      this.dialogRef.close(this.user);

      if (result) {
        this.openSnackBar('added new contact', 'Navigate')
          .onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }
  dismiss() {
    this.dialogRef.close(null);
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}

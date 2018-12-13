import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) { }

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
    this.dialogRef.close(this.user);

  }
  dismiss() {
    this.dialogRef.close(null);
  }

}

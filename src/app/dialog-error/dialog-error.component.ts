import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent implements OnInit {

  title: string;
  status: number;
  message: string;

  @ViewChild('errorContainer', null) errorContainer: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.title = data.title;
    this.status = data.status;
    this.message = data.message;
  }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

}

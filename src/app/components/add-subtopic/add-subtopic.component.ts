import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-subtopic',
  templateUrl: './add-subtopic.component.html',
  styleUrls: ['./add-subtopic.component.scss'],
})
export class AddSubtopicComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private data: any = {}) {
  }

  title: string;

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close({data: this.title});
  }
}

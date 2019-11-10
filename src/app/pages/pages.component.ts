import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TrelloService} from '../../services/trello.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pages',
  template: `
    <div class="container container-fluid">
      <div class="row">
        <h3> List Of Topics </h3>
      </div>
      <div class="row">
        <ul class="list-group">
          <li class="list-group-item col" *ngFor="let topic of broadTopics; let i = index ;"
              style="display: flex; margin: 10px; align-items: baseline; justify-content: space-between; flex-basis: 33%; flex-grow: 0;">
            <a [routerLink]="['broad-topics/', i]">{{topic.title}}</a>
            <button class="btn btn-danger float-right" (click)="deleteTopic(i)" style="margin-left: 10px; border-radius: 50%; outline: none;">X</button>
          </li>
        </ul>
      </div>
      <span class="row" style="margin-top: 20px">
        <button class="btn btn-success" (click)="addTopic()">+ Add Topic</button>
      </span>
      <div *ngIf="showAdd" style="display: flex">
        <form class="form" style="margin-top: 10px">
          <input class="mat-input-element" type="text" autofocus [(ngModel)]="topicName" (keyup.enter)="submitTopic()"
                 (keydown.enter)="submitTopic()" name="topicName"
                 class="mat-input-element topicName"
                 placeholder="Enter the Topic Name"
                 style="margin: 10px;
             outline: none;
    border: solid;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 10px 5px 5px grey;
    padding: 10px">
          <button class="btn btn-primary mt-3" style="margin-left: 10px" (click)="showAdd = false">X</button>
        </form>
      </div>
    </div>
    <p>{{statusText}}</p>
    <router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['pages.component.scss']
})
export class PagesComponent implements OnInit {
  showAdd = false;
  topicName = '';
  statusText = '';
  broadTopics = [];

  constructor(private trelloService: TrelloService,
              private router: Router,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.trelloService.getBaseView().subscribe(res => {
      console.log('data', res);
      this.broadTopics = res['data'];
    });
  }

  addTopic() {
    this.showAdd = true;
  }

  submitTopic() {
    this.showAdd = false;
    this.statusText = 'Submitting....';
    this.trelloService.createBroadTopic(this.topicName).subscribe(res => {
      this.statusText = 'Topic Created Successfully!';
      setTimeout(() => {
        this.statusText = '';
        this.get_data();
      }, 1000);
    });
  }

  deleteTopic(i) {
    this.trelloService.deleteBroadTopic(this.broadTopics[i].id).subscribe(res => console.log(res));
    this.toaster.show('Record Deleted Successfully', 'Info');
    this.get_data();
  }

}

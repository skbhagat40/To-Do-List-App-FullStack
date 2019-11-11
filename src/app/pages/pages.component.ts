import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TrelloService} from '../../services/trello.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pages',
  template: `
    <div class="container container-fluid">
      <nav class="navbar">
        <button class="nav-item" (click)="logout()">Logout</button>
      </nav>
      <div class="row">
        <h3> Broad Topics </h3>
      </div>
      <div class="row">
        <ul class="list-group">
          <li class="list-group-item col" *ngFor="let topic of broadTopics; let i = index ;"
              style="display: flex; margin: 10px; align-items: baseline; justify-content: space-between; flex-basis: 38%; flex-grow: 0; flex-wrap: wrap;">
            <a [routerLink]="['broad-topics/', topic.id]">
              <input type="text" class="form-control" [(ngModel)]="topic.title"
                     [ngStyle]="{textDecoration: topic.status ? 'line-through': 'none'}"
                     [readOnly]="!topic['edit']"
                     (keyup.enter)="updateTopicText(topic)" (keydown.enter)="updateTopicText(topic)" autofocus #inpt>
            </a>
            <mat-checkbox [checked]="topic.status" (click)="updateTopicStatus(topic)"></mat-checkbox>
            <mat-icon style="cursor: pointer" (click)="topic['edit'] = true; inpt.focus()">border_color</mat-icon>
            <button class="btn btn-danger float-right" (click)="deleteTopic(i)"
                    style="margin-left: 10px; border-radius: 50%; outline: none; height: 45px">X
            </button>
          </li>
        </ul>
      </div>
      <span class="row" style="margin-top: 20px">
        <button class="btn btn-success" (click)="addTopic()">+ Add Topic</button>
      </span>
      <div *ngIf="showAdd" style="display: flex">
        <form class="form" style="margin-top: 10px">
          <input class="mat-input-element" type="text" autofocus [(ngModel)]="topicName" (keyup.enter)="submitTopic($event)"
                 (keydown.enter)="submitTopic($event)" name="topicName"
                 class="mat-input-element topicName"
                 placeholder="Enter the Topic Name"
                 style="margin: 10px;
             outline: none;
    border: solid;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 10px 5px 5px grey;
    padding: 10px" required #n="ngModel">
          <div *ngIf="n.errors" class="alert alert-danger">
            This Field is Required
          </div>
        </form>
        <button class="btn btn-primary mt-3" style="margin-left: 10px; height: 75px" (click)="showAdd = false">X</button>

      </div>
    </div>
    <p>{{statusText}}</p>
    <router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['pages.component.scss'],
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
    this.trelloService.updateData();
    this.get_data();
  }

  get_data() {
    this.trelloService.displayData$.subscribe(r => this.broadTopics = r);
  }

  addTopic() {
    this.showAdd = true;
  }

  submitTopic($event) {
    $event.stopPropagation();
    if (!this.topicName.length) {
      return;
    }
    this.showAdd = false;
    this.statusText = 'Submitting....';
    this.trelloService.createBroadTopic(this.topicName).subscribe(res => {
      this.statusText = 'Topic Created Successfully!';
      this.toaster.show('Topic Created Successfully!', 'Success');
      this.trelloService.updateData();
      this.topicName = '';
      setTimeout(() => {
        this.statusText = '';
      }, 1000);
    });
  }

  deleteTopic(i) {
    this.trelloService.deleteBroadTopic(this.broadTopics[i].id).subscribe(res => {
        this.toaster.show('Record Deleted Successfully', 'Info');
        this.trelloService.updateData();
      },
    );
  }

  updateTopicText(topic: any) {
    if (topic.edit) {
      topic.edit = false;
    }
    this.trelloService.updateTopic(topic).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Status Changed!!', 'Info');
    });
  }

  updateTopicStatus(topic: any) {
    topic.status = !topic.status;
    this.trelloService.updateTopic(topic).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Status Changed!!', 'Info');
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.trelloService.logout().subscribe(res => {});
  }
}

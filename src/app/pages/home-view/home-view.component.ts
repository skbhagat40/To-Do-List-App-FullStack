import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {TrelloService} from '../../../services/trello.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddSubtopicComponent} from '../../components/add-subtopic/add-subtopic.component';
import {ToastrService} from 'ngx-toastr';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  providers: [HttpClient],
  encapsulation: ViewEncapsulation.None,
})
export class HomeViewComponent implements OnInit {

  constructor(private trelloService: TrelloService,
              private location: Location,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private toaster: ToastrService,
              private cd: ChangeDetectorRef) {
  }

  dataToDisplay: any;
  id: any;
  subtopics: any[];
  items: any[];

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.trelloService.displayData$.subscribe(r => {
      this.dataToDisplay = r.filter(x => x.id == this.id)[0];
      if (this.dataToDisplay && this.dataToDisplay.subtopics) {
        this.subtopics = this.dataToDisplay.subtopics.map(() => false);
      }
      this.cd.markForCheck();
    });
  }

  onBackClick() {
    this.location.back();
  }

  addSubTopic() {
    this.dialog.open(AddSubtopicComponent, {
      width: '250px',
      height: '25%',
      data: {},
    }).afterClosed().subscribe(r => {
      if (r && r.data) {
        this.trelloService.createSubtopic(r.data, this.dataToDisplay.id)
          .subscribe(res => this.toaster.show('Subtopic Created Successfully !'), error1 => console.error(error1),
            () => this.trelloService.updateData());
      }
    });
  }

  addItem(i: any) {
    this.subtopics[i] = true;
  }

  submitItem(subtopic: any, value: any, i: number) {
    if (!value) {
      return;
    }
    this.subtopics[i] = false;
    this.trelloService.addItem(subtopic.id, value).subscribe(res => {
      console.log('res', res);
      this.trelloService.updateData();
      this.toaster.show('Item Added Successfully');
    });
  }

  deleteSubTopic(subtopic: any) {
    this.trelloService.deleteSubTopic(subtopic.id).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Topic Deleted Successfully', 'Info');
    });
  }

  deleteItem(item: any) {
    this.trelloService.deleteItem(item.id).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Item Deleted Successfully', 'Info');
    });
  }

  updateStatus(item: any) {
    item.status = !item.status;
    this.trelloService.updateItem(item).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Status Changed!!', 'Info');
    });
  }

  updateItemText(item: any) {
    if (item.edit) {
      item.edit = false;
    }
    this.trelloService.updateItem(item).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Status Changed!!', 'Info');
    });
  }

  updateSubTopicStatus(subtopic: any) {
    subtopic.status = !subtopic.status;
    this.trelloService.updateSubTopic(subtopic).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Status Changed!!', 'Info');
    });
  }

  updateSubTopicText(subtopic: any) {
    if (subtopic.edit) {
      subtopic.edit = false;
    }
    this.trelloService.updateSubTopic(subtopic).subscribe(res => {
      this.trelloService.updateData();
      this.toaster.show('Status Changed!!', 'Info');
    });
  }

  drop(event: CdkDragDrop<string[]>, array) {
    moveItemInArray(array, event.previousIndex, event.currentIndex);
    console.log('current state of array', array);
    this.trelloService.updateItemPriority(array).subscribe(res => {
      this.toaster.show('Priorities Update Successfully');
      this.trelloService.updateData();
    });
  }
}

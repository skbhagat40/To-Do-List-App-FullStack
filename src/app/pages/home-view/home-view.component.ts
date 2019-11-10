import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TrelloService} from '../../../services/trello.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

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
              private route: ActivatedRoute) {
  }

  dataToDisplay: any;
  id: any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.trelloService.displayData$.subscribe(r => { this.dataToDisplay = r[this.id]; });
  }

  onBackClick() {
    this.location.back();
  }

  addSubTopic() {
    return;
  }
}

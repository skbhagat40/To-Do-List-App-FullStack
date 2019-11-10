import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {

  constructor(private http: HttpClient) {
    this.getBaseView().subscribe(r => { this.displayData$.next(r['data']); });
  }

  baseUrl = 'http://localhost:8000/trello/';
  displayData$ = new BehaviorSubject([]);

  getBaseView() {
    return this.http.get(this.baseUrl);
  }

  createBroadTopic(topicName) {
    return this.http.post(this.baseUrl + 'create', {title: topicName});
  }

  deleteBroadTopic(TopicId) {
    return this.http.post(this.baseUrl + 'delete', {id : TopicId});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {

  constructor(private http: HttpClient) {
    this.getBaseView().subscribe(r => {
      console.log('r', r);
      this.displayData$.next(r['data']);
    });
  }

  baseUrl = 'http://localhost:8000/trello/';
  displayData$ = new BehaviorSubject([]);

  updateData() {
    this.getBaseView().subscribe(r => {
      this.displayData$.next(r['data']);
    });

  }

  getBaseView() {
    return this.http.get(this.baseUrl);
  }

  createBroadTopic(topicName) {
    return this.http.post(this.baseUrl + 'create', {title: topicName});
  }

  deleteBroadTopic(TopicId) {
    return this.http.post(this.baseUrl + 'delete', {id: TopicId});
  }

  createSubtopic(subTopicName: any, parentId: any) {
    return this.http.post(this.baseUrl + 'create-subtopic', {title: subTopicName, id: parentId});
  }

  addItem(parentId: any, description: any) {
    return this.http.post(this.baseUrl + 'create-item', {id: parentId, title: description});
  }

  deleteSubTopic(subtopicId: any) {
    return this.http.post(this.baseUrl + 'delete-subtopic', {id: subtopicId});
  }

  deleteItem(itemId: any) {
    return this.http.post(this.baseUrl + 'delete-item', {id: itemId});
  }

  updateItem(item: any) {
    return this.http.put(this.baseUrl + 'update-item', {id: item.id, description: item.description, status: item.status});
  }

  updateSubTopic(subtopic: any) {
    return this.http.put(this.baseUrl + 'update-subtopic', {id: subtopic.id, title: subtopic.title, status: subtopic.status});
  }

  updateTopic(topic: any) {
    return this.http.put(this.baseUrl + 'update-topic', {id: topic.id, title: topic.title, status: topic.status});
  }

  updateItemPriority(array: any) {
    return this.http.post(this.baseUrl + 'update-item-priorities', {items: array});
  }

  login(userInfo: any) {
    return this.http.post(this.baseUrl + 'api-token-auth', {username: userInfo.username, password: userInfo.password});
  }

  register(userInfo: any) {
    return this.http.post(this.baseUrl + 'register', {user_info: userInfo});
  }

  logout() {
    return this.http.get(this.baseUrl + 'logout');
  }
}

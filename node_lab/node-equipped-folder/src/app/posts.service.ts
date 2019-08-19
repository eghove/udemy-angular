import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {

  constructor(private http: HttpClient) { }
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-5f4d2.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-5f4d2.firebaseio.com/posts.json'
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key })
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );

  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-5f4d2.firebaseio.com/posts.json');
  }
}
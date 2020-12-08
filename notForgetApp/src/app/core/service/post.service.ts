import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private post = new BehaviorSubject({ post: null, key: '' });
  currentPost = this.post.asObservable();

  constructor(
    private db: AngularFireDatabase,
  ) { }

  insert(post: Post) {
    this.db.list('post').push(post);
  }

  update(post: Post, key: string) {
    this.db.list('post').update(key, post);
  }

  getAll() {
    return this.db.list('post')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`post/${key}`).remove()
  }

  changePost(post: Post, key: string) {
    this.post.next({post: post, key: key})
  }
}

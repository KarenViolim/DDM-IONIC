import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private db: AngularFireDatabase) { }

  insert(post: Post) {
    this.db.list('post').push(post);
  }

  Update(post: Post, key: string) {
    this.db.list('post').update(key, post);
  }

  /* getAll() {
    return this.db.list('contato')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
      })
    )
  } */

  delete(key: string) {
    this.db.object(`post/${key}`).remove
  }
}

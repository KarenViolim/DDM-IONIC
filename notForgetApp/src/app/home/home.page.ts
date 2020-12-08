import { Component, OnInit } from '@angular/core';
import { Post } from '../core/interfaces/post.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../core/service/post.service';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public posts: Observable<any>;

  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.posts = this.postService.getAll();
    console.log(this.posts)
  }

  delete(key: string) {
    this.postService.delete(key);
  }

  edit(post: Post, key: string) {
    this.postService.changePost(post, key);
  }
}

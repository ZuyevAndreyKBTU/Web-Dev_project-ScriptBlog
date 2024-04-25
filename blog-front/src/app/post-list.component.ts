import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { BlogPost } from './blog-post.interface';

@Component({
  selector: 'app-post-list',
  template: `
  <div style="text-align:center">
    <h1>Blog Posts</h1>
  </div>
  <ul>
    <li *ngFor="let post of posts">
      <h2>{{ post.title }}
      <button (click)="delete(post.id)">Delete Post</button></h2>
      <p>{{ post.content }}</p>
    </li>
  </ul>
  <input #postTitle type='text' placeholder='Title'>
  <textarea #postContent placeholder='Content'></textarea>
  <button (click)="add(postTitle.value, postContent.value)">Add Post</button>
  <p>{{ error?.message }}</p>
  <p *ngIf="error">{{ error?.error | json }}</p>
  <button (click)="logout()">Logout</button>
  `
})

export class PostListComponent implements OnInit {
  posts: BlogPost[] = [];
  error: any;
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.getBlogPosts().subscribe(
      (posts: BlogPost[]) => this.posts = posts,
      (error: any) => this.error = error
    );
  }
  add(title: string, content: string) {
    this.api.createBlogPost(title, content).subscribe(
      (post: BlogPost) => this.posts.push(post),
      (error: any) => this.error = error
    );
  }
  delete(id: number) {
    this.api.deleteBlogPost(id).subscribe(
      () => this.posts = this.posts.filter(post => post.id !== id),
      (error: any) => this.error = error
    );
  }
}

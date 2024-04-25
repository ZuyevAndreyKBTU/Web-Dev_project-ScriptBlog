import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { BlogPost } from './blog-post.interface';
import { Router } from '@angular/router';

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
      <p>{{ post.body }}</p>
    </li>
  </ul>
  <input [(ngModel)]="newPost.title" type='text' placeholder='Title'>
  <textarea [(ngModel)]="newPost.body" placeholder='body'></textarea>
  <button (click)="add()">Add Post</button>
  <p>{{ error?.message }}</p>
  <p *ngIf="error">{{ error?.error | json }}</p>
  <button (click)="logout()">Logout</button>
  `
})

export class PostListComponent implements OnInit {
  posts: BlogPost[] = [];
  newPost: BlogPost = {
    id: -1, 
    title: '',
    body: '',
    owner: null, 
  };
  
  error: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.api.getBlogPosts().subscribe(
      (posts: BlogPost[]) => this.posts = posts,
      (error: any) => this.error = error
    );
  }

  add() {
    this.api.createBlogPost(this.newPost.title, this.newPost.body).subscribe(
      (post: BlogPost) => {
        this.posts.push(post);
        this.newPost = { title: '', body: '' }; // Clear input fields
      },
      (error: any) => this.error = error
    );
  }

  delete(id: number) {
    this.api.deleteBlogPost(id).subscribe(
      () => this.posts = this.posts.filter(post => post.id !== id),
      (error: any) => this.error = error
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
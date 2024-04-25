import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './blog-post.interface';
import { Comment } from './comment.interface';
import { Category } from './category.interface';
import { Clap } from './clap.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')  // Assuming the token is stored here after login
    })
  };

  constructor(private http: HttpClient) { }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.baseUrl}posts/`, this.httpOptions);
  }

  createBlogPost(title: string, content: string): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.baseUrl}posts/`, { title, content }, this.httpOptions);
  }

  deleteBlogPost(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}posts/${id}/`, this.httpOptions);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}posts/${postId}/comments/`, this.httpOptions);
  }

  createComment(postId: number, body: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}posts/${postId}/comments/`, { body }, this.httpOptions);
  }

  deleteComment(postId: number, commentId: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}posts/${postId}/comments/${commentId}/`, this.httpOptions);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}categories/`, this.httpOptions);
  }

  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}categories/`, { name }, this.httpOptions);
  }

  deleteCategory(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}categories/${id}/`, this.httpOptions);
  }

  clapForPost(postId: number): Observable<{}> {
    return this.http.post(`${this.baseUrl}posts/${postId}/clap/`, {}, this.httpOptions);
  }
}
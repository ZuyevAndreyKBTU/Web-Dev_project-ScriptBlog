import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './blog-post.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://your-django-api-url.com/api/';
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
}

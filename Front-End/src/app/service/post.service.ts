import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:8080/postagens", this.token);
  }

  getByPostId(id: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:8080/postagens/${id}`, this.token);
  }

  postPost(post: Post): Observable<Post> {
    return this.http.post<Post>("http://localhost:8080/postagens", post, this.token);
  }
  
  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>("http://localhost:8080/postagens", post, this.token);
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:8080/postagens/${id}`, this.token);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { Movie } from './movie';
import { MovieSearchComponent } from './movie-search/movie-search.component';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {

  private apiUrl = 'https://api.themoviedb.org/3/movie';
  private apiKey = '?api_key=55682437c627cf8d393ceadf474dad4d';


  constructor(
    private http: HttpClient) { }

  //https://api.themoviedb.org/3/movie/id?api_key=55682437c627cf8d393ceadf474dad4d
  getMovieJson(id: number): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`+this.apiKey;
    console.log(url);
    return this.http.get<Movie>(url).pipe(
      map(movie => this.jsonToMovie(movie) ),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  jsonToMovie(data: any){
     let movie: Movie = {
      id: data.id,
      original_title: data.original_title,
      overview: data.overview,
      release_date: data.release_date,
      original_language: data.original_language,
      budget: data.budget,
      revenue: data.revenue
    };
    return movie;
  }

  searchHeroes(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Movie[]>(`https://api.themoviedb.org/3/search/movie?api_key=55682437c627cf8d393ceadf474dad4d&language=en-US&query=${term}`).pipe(
      map(movies => this.jsonToMovies(movies)),
      catchError(this.handleError<Movie[]>('searchHeroes', []))
    );
  }

  jsonToMovies(data: any){
    let movies: Movie[] = [];
    console.log(data.results);
    for (let elemento of data.results) {
      let movie: Movie = {
        id: elemento.id,
        original_title: elemento.original_title,
      };
      movies.push(movie);
    }
    return movies;
  }



  //https://api.themoviedb.org/3/search/movie?api_key=55682437c627cf8d393ceadf474dad4d&language=en-US&query=lord%20of%20the&include_adult=false

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

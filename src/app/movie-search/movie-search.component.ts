import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Movie } from '../movie';
import { SearcherService } from '../searcher.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies$!: Observable<Movie[]>;
  private searchTerms = new Subject<string>();
  movie!: Movie | undefined;

  constructor(private SearcherService: SearcherService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //this.SearcherService.getMovieJson(121).subscribe(movie => this.movie = movie);
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.SearcherService.searchHeroes(term)),
    );
  }

}

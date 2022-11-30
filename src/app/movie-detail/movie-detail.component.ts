import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from '../movie';
import { SearcherService } from '../searcher.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie!: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private SearcherService: SearcherService,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.SearcherService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }

}

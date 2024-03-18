import { Component, OnInit } from '@angular/core';
import { MovieService } from '@/features/movie/services/movie.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

  public collectionDetailsCallback: Function;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.collectionDetailsCallback = this.getCollectionDetails.bind(this);
  }

  private getCollectionDetails(id: number) {
    return this.movieService.getCollectionDetails(id).toPromise();
  }
}

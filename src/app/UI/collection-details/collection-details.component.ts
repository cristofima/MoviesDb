import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Collection } from 'src/app/shared/models/collection.model';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

  collection: Collection;

  constructor(private actRouter: ActivatedRoute, private moviesService: MoviesService,
    private spinner: NgxSpinnerService, private titleService: Title) { }

  ngOnInit(): void {
    this.spinner.show();
    this.actRouter.params.subscribe(params => {
      this.loadCollectionDetails(params['id']);
    });
  }

  private loadCollectionDetails(collectionId: number) {
    this.moviesService.getCollectionDetails(collectionId).subscribe(data => {
      this.spinner.hide();
      this.collection = data;
      this.titleService.setTitle(`${this.collection.name} | Movies Db`);
    }, () => {
      this.spinner.hide();
    });
  }
}

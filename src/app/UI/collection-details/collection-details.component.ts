import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DominantColorService } from 'src/app/core/services/dominant-color.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Collection } from 'src/app/shared/models/collection.model';
import { ColorUtil } from 'src/app/shared/utils/color.util';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

  collection: Collection;
  posterImgDominantColor: string;
  firstBackgroundImg: string;
  secondBackgroundImg: string;

  constructor(private actRouter: ActivatedRoute, private moviesService: MoviesService,
    private spinner: NgxSpinnerService, private titleService: Title, private dominantColorService: DominantColorService) { }

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
      this.getDominantColor();
      this.titleService.setTitle(`${this.collection.name} | Movies Db`);
    }, () => {
      this.spinner.hide();
    });
  }

  private async getDominantColor() {
    let imgUrl = `image/t/p/original${this.collection.posterPath}`;
    this.posterImgDominantColor = await this.dominantColorService.getDominantColor(imgUrl);
    this.firstBackgroundImg = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${this.collection.backdropPath})`;

    let rgbColor = ColorUtil.hexToRgb(this.posterImgDominantColor);
    let rgbString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;

    this.secondBackgroundImg = `linear-gradient(to right, rgba(${rgbString}, 1) calc((50vw - 170px) - 340px), rgba(${rgbString}, 0.84) 50%, rgba(${rgbString}, 0.84) 100%)`;
  }
}

import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Collection } from '../../../core/models/collection.model';
import { Movie } from '../../../core/models/movie.model';
import { DominantColorService } from 'src/app/core/services/dominant-color.service';
import { ActivatedRoute } from '@angular/router';
import { TMDbService } from 'src/app/core/services/tmdb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { ColorUtil } from '../../utils/color.util';

@Component({
  selector: 'app-generic-details',
  templateUrl: './generic-details.component.html',
  styleUrls: ['./generic-details.component.scss']
})
export class GenericDetailsComponent implements OnInit {

  data: Movie | Collection;
  @Input() type: 'Movie' | 'Collection';

  posterImgDominantColor: string;
  firstBackgroundImg: string;
  secondBackgroundImg: string;
  @Input() contrastColor = 'white';

  @ContentChild('mainInfo') mainInfo: TemplateRef<any>;
  @ContentChild('aditionalInfo') aditionalInfo: TemplateRef<any>;

  constructor(private actRouter: ActivatedRoute, private moviesService: TMDbService,
    private spinner: NgxSpinnerService, private titleService: Title, private dominantColorService: DominantColorService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.actRouter.params.subscribe(params => {
      this.loadDetails(params['id']);
    });
  }

  private async loadDetails(id: number) {
    let title: string;
    if (this.type == 'Movie') {
      this.data = await this.moviesService.getMovieDetails(id).toPromise();
      title = (this.data as Movie).title;
    } else if (this.type == 'Collection') {
      this.data = await this.moviesService.getCollectionDetails(id).toPromise();
      title = (this.data as Collection).name;
    }

    this.spinner.hide();
    this.getDominantColor();
    this.titleService.setTitle(`${title} | Movies Db`);
  }

  private async getDominantColor() {
    let imgUrl = `image/t/p/original${this.data.posterPath}`;
    this.posterImgDominantColor = await this.dominantColorService.getDominantColor(imgUrl);
    this.contrastColor = ColorUtil.getContrastColor(this.posterImgDominantColor);
    this.firstBackgroundImg = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${this.data.backdropPath})`;

    let rgbColor = ColorUtil.hexToRgb(this.posterImgDominantColor);
    let rgbString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;

    this.secondBackgroundImg = `linear-gradient(to right, rgba(${rgbString}, 1) calc((50vw - 170px) - 340px), rgba(${rgbString}, 0.84) 50%, rgba(${rgbString}, 0.84) 100%)`;
  }
}

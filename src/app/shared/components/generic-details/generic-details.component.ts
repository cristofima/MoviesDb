import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Collection } from '@/core/models/collection.model';
import { Movie } from '@/core/models/movie.model';
import { DominantColorService } from '@/core/services/dominant-color.service';
import { ColorUtil } from '@/shared/utils/color.util';
import { TV } from '@/core/models/tv.model';
import { environment } from 'src/environments/environment';
import { TmdbImgConfig } from '@/shared/config/tmdb-img.config';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  selector: 'app-generic-details',
  templateUrl: './generic-details.component.html',
  styleUrls: ['./generic-details.component.scss'],
  providers: TmdbImgConfig.getImgProviders()
})
export class GenericDetailsComponent implements OnInit {

  data: Movie | TV | Collection;
  @Input({ required: true }) type: 'Movie' | 'Collection' | 'TV';

  posterImgDominantColor: string;
  firstBackgroundImg: string;
  secondBackgroundImg: string;
  contrastColor = 'black';

  @Input({ required: true }) callback: Function;

  @ContentChild('mainInfo') mainInfo: TemplateRef<any>;
  @ContentChild('aditionalInfo') aditionalInfo: TemplateRef<any>;

  constructor(private actRouter: ActivatedRoute, private titleService: Title, private dominantColorService: DominantColorService) { }

  ngOnInit(): void {
    this.actRouter.params.subscribe(params => {
      this.loadDetails(params['id']);
    });
  }

  private async loadDetails(id: number) {
    let title: string;
    if (this.type == 'Movie') {
      this.data = await this.callback(id);
      title = (this.data as Movie).title;
    } else if (this.type == 'Collection') {
      this.data = await this.callback(id);
      title = (this.data as Collection).name;
    } else if (this.type == 'TV') {
      this.data = await this.callback(id);
      title = (this.data as TV).title;
    }

    this.getDominantColor();
    this.titleService.setTitle(`${title} | Movies Db`);
  }

  private async getDominantColor() {
    if(this.data.posterPath){
      let imgUrl: string;
      if(environment.production){
        imgUrl = `${environment.proxyServer}/image?url=https://media.themoviedb.org/t/p/w300${this.data.posterPath}`;
      }else{
        imgUrl = `image/t/p/w300${this.data.posterPath}`;
      }
      
      try{
        this.posterImgDominantColor = await this.dominantColorService.getDominantColor(imgUrl);
      }catch{

      }
      
      if(!this.posterImgDominantColor) return;
      
      this.contrastColor = ColorUtil.getContrastColor(this.posterImgDominantColor);
      this.firstBackgroundImg = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${this.data.backdropPath})`;
  
      let rgbColor = ColorUtil.hexToRgb(this.posterImgDominantColor);
      let rgbString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
  
      this.secondBackgroundImg = `linear-gradient(to right, rgba(${rgbString}, 1) calc((50vw - 170px) - 340px), rgba(${rgbString}, 0.84) 50%, rgba(${rgbString}, 0.84) 100%)`;
    }else{
      this.contrastColor = 'black';
    }
  }
}

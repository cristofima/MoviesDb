import { Component, Input, OnInit } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';
import { TVMinimalWithSeasons } from '@/core/models/tv.model';
import { Title } from '@angular/platform-browser';
import { DominantColorService } from '@/core/services/dominant-color.service';
import { environment } from 'src/environments/environment';
import { ColorUtil } from '@/shared/utils/color.util';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.scss'
})
export class SeasonsComponent implements OnInit {

  tv: TVMinimalWithSeasons;
  contrastColor = 'black';
  posterImgDominantColor: string;
  @Input('id') private tvId: number;

  constructor(private seasonsService: SeasonsService, private titleService: Title, private dominantColorService: DominantColorService) { }
  
  ngOnInit() {
    this.loadDetails();
  }

  private async loadDetails(){
    this.tv = await this.seasonsService.getSeasons(this.tvId).toPromise();
    this.titleService.setTitle(`${this.tv.title} - Seasons | Movies Db`);
    this.getDominantColor();
  }

  private async getDominantColor() {
    if(this.tv.posterPath){
      let imgUrl: string;
      if(environment.production){
        imgUrl = `${environment.proxyServer}/image?url=https://media.themoviedb.org/t/p/w58_and_h87_face${this.tv.posterPath}`;
      }else{
        imgUrl = `image/t/p/w58_and_h87_face${this.tv.posterPath}`;
      }
      
      try{
        this.posterImgDominantColor = await this.dominantColorService.getDominantColor(imgUrl);
      }catch{

      }
      
      if(!this.posterImgDominantColor) return;
      
      this.contrastColor = ColorUtil.getContrastColor(this.posterImgDominantColor);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TvService } from '../../services/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvDetailsComponent implements OnInit {

  public tvDetailsCallback: Function;

  constructor(private tvService: TvService) { }

  ngOnInit(): void {
    this.tvDetailsCallback = this.getTVDetails.bind(this);
  }

  private getTVDetails(id: number) {
    return this.tvService.getTVDetails(id).toPromise();
  }
}

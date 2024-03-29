import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MinimalMedia } from '@/core/models/base-media.model';
import { MediaFilter } from '@/core/models/media-filter';
import { PaginationModel } from '@/core/models/pagination.model';
import { MediaService } from '@/shared/services/media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  mediaList: MinimalMedia[] = [];
  pageSize = 20;

  search = '';
  private prevSearch = '';
  maxResults = 0;

  private filters: MediaFilter;

  pageNumber = 1;
  @Input() genreId: number;
  @Input({required: true}) mediaType: 'movie' | 'tv';

  languageKeyMediaType: string;

  constructor(private mediaService: MediaService, private titleService: Title) { }

  ngOnInit() {
    const prefix = this.mediaType === 'movie' ? 'Movies' : 'TV Shows';
    this.languageKeyMediaType = this.mediaType === 'movie' ? 'Movies' : 'TVShows';
    this.titleService.setTitle(`${prefix} | Movies Db`);
    this.loadParams();
  }

  private loadParams() {
    this.filters = new MediaFilter();
    this.filters.genreId = this.genreId;
    this.loadMedia();
  }

  public async paginateMedia() {
    let pagination: PaginationModel;
    if (!this.search || !this.search.trim()) {
      pagination = await this.mediaService.discoverMedia(this.pageNumber, this.mediaType, this.filters).toPromise();
    } else {
      pagination = await this.mediaService.searchMedia(this.pageNumber, this.search, this.mediaType).toPromise();
    }

    this.mediaList = pagination.results;
    this.setMaxResults(pagination.totalPages);
  }

  public async searchMedia() {
    this.pageNumber = 1;
    this.filters = null;
    if (!this.search || !this.search.trim() || this.prevSearch == this.search.trim()) return;

    this.prevSearch = this.search = this.search.trim();

    let pagination = await this.mediaService.searchMedia(this.pageNumber, this.search, this.mediaType).toPromise();
    this.mediaList = pagination.results;
    this.setMaxResults(pagination.totalPages);
  }

  public async loadMedia() {
    this.pageNumber = 1;
    let pagination = await this.mediaService.discoverMedia(this.pageNumber, this.mediaType, this.filters).toPromise();
    this.mediaList = pagination.results;
    this.setMaxResults(pagination.totalPages);
  }

  private setMaxResults(totalPages: number) {
    if (totalPages >= 500) {
      this.maxResults = this.pageSize * 500;
    } else {
      this.maxResults = this.pageSize * totalPages;
    }
  }
}

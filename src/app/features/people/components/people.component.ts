import { Component, OnInit } from '@angular/core';
import { PopularPerson } from '@/features/people/models/popular-person.model';
import { PeopleService } from '@/features/people/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent implements OnInit  {

  popularPeople: PopularPerson[] = [];
  pageSize = 20;
  maxResults = 0;
  pageNumber = 1;

  constructor(private peopleService: PeopleService) { }
  ngOnInit() {
    this.paginateMedia();
  }

  async paginateMedia() {
    let pagination = await this.peopleService.getPopularPeople(this.pageNumber).toPromise();
    this.popularPeople = pagination.results;
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

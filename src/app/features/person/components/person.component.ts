import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbAccordionDirective, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Person } from '@/core/models/person.model';
import { PersonService } from '@/features/person/services/person.service';
import { TmdbImgConfig } from '@/shared/config/tmdb-img.config';

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule, NgbAccordionModule, RouterModule],
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: TmdbImgConfig.getImgProviders()
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  showFullBiography = false;
  @ViewChild('accordion', { static: false }) accordion: NgbAccordionDirective;

  @Input('id') private personId: number;

  constructor(private personService: PersonService, private titleService: Title) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  private async loadDetails() {
    this.person = await this.personService.getPersonDetails(this.personId).toPromise();

    this.titleService.setTitle(`${this.person.name} | Movies Db`);
    setTimeout(() => {
      this.accordion && this.accordion.expandAll();
    }, 500);
  }
}

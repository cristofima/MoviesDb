import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { Person } from '@/core/models/person.model';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
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

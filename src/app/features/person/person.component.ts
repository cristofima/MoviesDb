import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Person } from 'src/app/core/models/person.model';
import { TMDbService } from 'src/app/core/services/tmdb.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  @ViewChild('accordion', { static: false }) accordion: NgbAccordion;

  constructor(private actRouter: ActivatedRoute, private tMDbService: TMDbService,
    private spinner: NgxSpinnerService, private titleService: Title) { }

  ngOnInit(): void {
    this.spinner.show();
    this.actRouter.params.subscribe(params => {
      this.loadDetails(params['id']);
    });
  }

  private async loadDetails(id: number) {
    this.person = await this.tMDbService.getPersonDetails(id).toPromise();
    this.spinner.hide();
    this.titleService.setTitle(`${this.person.name} | Movies Db`);
    setTimeout(() => {
      this.accordion && this.accordion.expandAll();
    }, 500);
  }
}

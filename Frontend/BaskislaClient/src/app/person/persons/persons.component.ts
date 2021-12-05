import { Person } from './../../_interfaces/person.model';
import { RepositoryService } from './../../shared/services/repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  public persons: Person[] | undefined;

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies = () => {
    const apiAddress: string = "api/person";
    this.repository.getData(apiAddress)
    .subscribe((res) => {
      this.persons = res as Person[];
    })
  }
}

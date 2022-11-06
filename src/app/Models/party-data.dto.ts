import { PersonDTO } from './person.dto';

export class PartyDataDTO {
  place: string;
  dateParty: Date | null;
  budget: number;
  people: PersonDTO[];

  constructor(
    place: string,
    dateParty: Date | null,
    budget: number,
    people: PersonDTO[]
  ) {
    this.place = place;
    this.dateParty = dateParty;
    this.budget = budget;
    this.people = people;
  }
}

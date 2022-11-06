import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PartyDataDTO } from '../Models/party-data.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  partyData: PartyDataDTO;

  place: FormControl;
  dateParty: FormControl;
  budget: FormControl;

  dataForm: FormGroup;

  isValidForm: boolean | null;

  constructor(private formBuilder: FormBuilder) {
    this.isValidForm = null;

    this.partyData = new PartyDataDTO('', null, 0, []);

    this.place = new FormControl(this.partyData.place, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.dateParty = new FormControl(this.partyData.dateParty, [
      Validators.required,
    ]);
    this.budget = new FormControl(this.partyData.budget, [
      Validators.required,
      Validators.min(0),
    ]);

    this.dataForm = this.formBuilder.group({
      place: this.place,
      dateParty: this.dateParty,
      budget: this.budget,
      people: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.addPerson();
    this.addPerson();
    this.addPerson();
  }

  get people() {
    return this.dataForm.controls['people'] as FormArray;
  }

  addPerson() {
    const name = new FormControl('', [Validators.required]);
    const email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    const peopleForm = this.formBuilder.group({
      name: name,
      email: email,
    });

    this.people.push(peopleForm);
  }

  deletePerson(index: number) {
    if (this.dataForm.value.people.length > 3) {
      this.people.removeAt(index);
    } else {
      alert('Se necesitan mínimo 3 personas.');
    }
  }

  sendData(): void {
    this.isValidForm = false;

    if (this.dataForm.invalid) {
      alert('Formulario no válido. Existe errores.');
      return;
    }

    this.isValidForm = true;
    const suffleArray = this.sufflePeople(this.dataForm.value.people.length);
  }

  sufflePeople(total: number): number[] {
    let arr: number[] = Array(total).fill(-1);
    let position = 0;
    arr.map((el, index) => {
      let target = Math.floor(Math.random() * total) + 1;
      if (index != total - 1) {
        while (arr.includes(target)) {
          target++;
          if (target === total) {
            target = 1;
          }
        }
        arr[position] = target;
        position = target;
      } else {
        arr[position] = 0;
      }
    });
    return arr;
  }
}

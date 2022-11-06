import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  partyDataFormGroup: FormGroup;
  peopleFormGroup: FormGroup;

  isValidForm: boolean | null;

  constructor(private _formBuilder: FormBuilder) {
    this.partyDataFormGroup = this._formBuilder.group({
      place: ['', Validators.required],
      dateParty: ['', Validators.required],
      budget: [0, Validators.required],
    });

    this.peopleFormGroup = this._formBuilder.group({
      people: this._formBuilder.array([]),
    });

    this.isValidForm = null;
  }

  ngOnInit() {
    this.addPerson();
    this.addPerson();
    this.addPerson();
  }

  get people() {
    return this.peopleFormGroup.controls['people'] as FormArray;
  }

  addPerson() {
    const name = new FormControl('', [Validators.required]);
    const email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    const peopleForm = this._formBuilder.group({
      name: name,
      email: email,
    });

    this.people.push(peopleForm);
  }

  deletePerson(index: number) {
    if (this.peopleFormGroup.value.people.length > 3) {
      this.people.removeAt(index);
    } else {
      alert('Se necesitan mínimo 3 personas.');
    }
  }

  sendData(): void {
    console.log('this.people.value.length:', this.people.value.length);
    const suffleArray = this.sufflePeople(this.people.value.length);
    console.log(suffleArray);
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

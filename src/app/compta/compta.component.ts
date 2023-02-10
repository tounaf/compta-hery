import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
interface User {
  nom: string;
  prenom: string;
}
@Component({
  selector: 'app-compta',
  templateUrl: './compta.component.html',
  styleUrls: ['./compta.component.scss']
})

export class ComptaComponent implements OnInit {
  form: FormGroup;
  results: User[] = [];
  imageSrc: string = '';
  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom: [''],
      prenom: ['']
      // Autres champs
    });
  }

  submitForm() {
    //@ts-ignore
    this.results.push(this.form.value);
    console.log(this.results);
    this.form.reset();
  }


  displayImage(event: Event) {
    console.log(event);
    const reader = new FileReader();
    const files = (event?.target as HTMLInputElement).files;
    console.log(files);
    if (files) {
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        this.imageSrc = reader.result as string;
      };
    }

  }

}

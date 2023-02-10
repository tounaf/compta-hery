import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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
  listeClass: any[] = [];
  listeSousClass: any[] = [];
  listeChoix1: any[] = [];
  listChoix2: any[] = [];
  listeModeReglement: any[] = [];
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

    this.listeClass = [
      {
        id: 0,
        value: 'FACTURE',
      },
      {
        id: 1,
        value: 'BANQUE',
      },
      {
        id: 2,
        value: 'SOCIAL',
      },
      {
        id: 3,
        value: 'FISCAL',
      },
      {
        id: 4,
        value: 'OPERATIONS DIVERS',
      },
      {
        id: 5,
        value: 'AUTRE',
      }
    ]

    this.listeSousClass = [
      {
        id: 0,
        value: 'ACHATS',
      },
      {
        id: 1,
        value: 'VENTES',
      },
      {
        id: 2,
        value: 'PIEDS DE BANQUES',
      },
      {
        id: 3,
        value: 'AUTRES',
      }
    ]

    this.listeChoix1 = [
      {
        id: 0,
        value: 'CLIENT 20%',
      },
      {
        id: 1,
        value: 'CLIENT 10%',
      },
      {
        id: 2,
        value: 'CLIENT 5.5%',
      }
    ]

    this.listChoix2 = [
      {
        id: 0,
        value: '0DIVER',
      },
      {
        id: 1,
        value: '0CARBU',
      },
      {
        id: 2,
        value: '0POSTE',
      },
      {
        id: 3,
        value: '0ORANG',
      },
      {
        id: 4,
        value: '0BOUYG',
      },
      {
        id: 5,
        value: '0CABIN',
      }
    ]

    this.listeModeReglement = [
      {
        id: 0,
        value: 'CHEQUES',
      },
      {
        id: 1,
        value: 'VIREMENT',
      },
      {
        id: 2,
        value: 'PRELEVEMENT',
      },
      {
        id: 3,
        value: 'CB',
      }
    ]
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

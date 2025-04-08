import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importation de HttpClient

declare var google: any; // Déclaration de la variable google

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  buttonColor: string = '#ff7f50'; // Couleur par défaut

  constructor(private fb: FormBuilder, private http: HttpClient) { // Ajout de HttpClient
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('Init appelé...');
    this.initMap();
  }
  
  initMap() {
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error("DIV avec l'id 'map' introuvable !");
        return;
      }

      const mapOptions = {
        center: { lat: -4.33094, lng: 15.30676 },
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      const map = new google.maps.Map(mapElement, mapOptions);

      const marker = new google.maps.Marker({
        position: { lat: -4.33094, lng: 15.30676 },
        map: map,
        title: 'Our Location'
      });
    }, 100); // Délai court pour attendre le DOM
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = {
        full_name: this.contactForm.value.fullName,
        email: this.contactForm.value.email,
        phone_number: this.contactForm.value.phoneNumber,
        message: this.contactForm.value.message
      };

      this.http.post('http://localhost:8000/contact', formData).subscribe(response => {
        alert('Votre message a bien été envoyé !');
        this.contactForm.reset(); // Réinitialiser le formulaire
        this.buttonColor = '#28a745'; // Changer la couleur du bouton
        setTimeout(() => {
          this.buttonColor = '#ff7f50'; // Revenir à la couleur par défaut après 2 secondes
        }, 2000);
      }, error => {
        alert('Une erreur est survenue. Veuillez réessayer.');
      });
    }
  }
}
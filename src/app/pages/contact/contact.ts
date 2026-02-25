import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ContactData } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  showSuccess = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    console.log('Contact Component initialized');
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      const data: ContactData = this.contactForm.value;

      if (this.contactService.sendContact(data)) {
        this.showSuccess = true;
        this.contactForm.reset();
        this.submitted = false;
        setTimeout(() => this.showSuccess = false, 4000);
      }
    }
  }
}

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  private isBrowser: boolean;

  /* Modal state */
  activeModal: 'login' | 'signup' | 'forgot' | null = null;

  /* Login fields */
  loginEmail = '';
  loginPassword = '';
  showLoginPass = false;

  /* Signup fields */
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupConfirm = '';
  showSignupPass = false;
  acceptTerms = false;

  /* Forgot field */
  forgotEmail = '';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /* Password strength */
  get passwordStrength(): number {
    const p = this.signupPassword;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score += 20;
    if (p.length >= 10) score += 15;
    if (/[A-Z]/.test(p)) score += 20;
    if (/[0-9]/.test(p)) score += 20;
    if (/[^A-Za-z0-9]/.test(p)) score += 25;
    return Math.min(score, 100);
  }

  /* Modal methods */
  openModal(type: 'login' | 'signup' | 'forgot') {
    this.activeModal = type;
    if (this.isBrowser) document.body.style.overflow = 'hidden';
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.activeModal = null;
      if (this.isBrowser) document.body.style.overflow = '';
    }
  }

  switchModal(type: 'login' | 'signup' | 'forgot') {
    this.activeModal = type;
  }

  dismissModal() {
    this.activeModal = null;
    if (this.isBrowser) document.body.style.overflow = '';
  }

  handleLogin(): void {
    if (this.loginEmail && this.loginPassword) {
      this.dismissModal();
      // TODO: integrate AuthService
    }
  }
}

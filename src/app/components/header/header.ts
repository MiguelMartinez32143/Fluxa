import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private authService: AuthService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /* Auth Message */
  get authMessage(): string {
    return this.authService.authMessage;
  }

  /* Password strength */
  get passwordStrength(): number {
    return this.authService.calculatePasswordStrength(this.signupPassword);
  }

  /* Modal methods */
  openModal(type: 'login' | 'signup' | 'forgot') {
    this.authService.authMessage = '';
    this.activeModal = type;
    if (this.isBrowser) document.body.style.overflow = 'hidden';
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.dismissModal();
    }
  }

  switchModal(type: 'login' | 'signup' | 'forgot') {
    this.authService.authMessage = '';
    this.activeModal = type;
  }

  dismissModal() {
    this.activeModal = null;
    if (this.isBrowser) document.body.style.overflow = '';
  }

  handleLogin(): void {
    if (this.authService.login(this.loginEmail, this.loginPassword)) {
      this.loginEmail = '';
      this.loginPassword = '';
      this.dismissModal();
    }
  }

  handleSignup(): void {
    if (!this.acceptTerms) return;
    if (this.authService.signup(this.signupName, this.signupEmail, this.signupPassword, this.signupConfirm)) {
      this.signupName = '';
      this.signupEmail = '';
      this.signupPassword = '';
      this.signupConfirm = '';
      this.acceptTerms = false;
      this.dismissModal();
    }
  }

  handleForgot(): void {
    if (this.authService.forgotPassword(this.forgotEmail)) {
      this.forgotEmail = '';
    }
  }
}

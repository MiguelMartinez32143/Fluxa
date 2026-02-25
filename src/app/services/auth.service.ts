import { Injectable } from '@angular/core';
import { RegisteredUser } from '../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private loggedIn = false;
    private registeredUsers: RegisteredUser[] = [];
    private initializationTime: string = '';
    authMessage = '';

    constructor() {
        this.initializationTime = new Date().toLocaleString();

        this.registeredUsers.push({
            name: 'Usuario de Prueba',
            email: 'test@fluxa.com',
            password: 'Password123!'
        });
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }

    login(email: string, password: string): boolean {
        if (!email || !password) {
            this.authMessage = 'Email y contraseña son requeridos.';
            return false;
        }

        const user = this.registeredUsers.find(u => u.email === email);
        if (!user) {
            this.authMessage = 'No existe una cuenta con ese email. Regístrate primero.';
            return false;
        }
        if (user.password !== password) {
            this.authMessage = 'Contraseña incorrecta.';
            return false;
        }

        this.loggedIn = true;
        this.authMessage = '';
        return true;
    }

    signup(name: string, email: string, password: string, confirmPassword: string): boolean {
        if (!name || !email || !password) {
            this.authMessage = 'Todos los campos son requeridos.';
            return false;
        }
        if (this.registeredUsers.some(u => u.email === email)) {
            this.authMessage = 'Ya existe una cuenta con ese email.';
            return false;
        }
        if (password !== confirmPassword) {
            this.authMessage = 'Las contraseñas no coinciden.';
            return false;
        }
        if (this.calculatePasswordStrength(password) < 40) {
            this.authMessage = 'La contraseña es muy débil.';
            return false;
        }

        this.registeredUsers.push({ name, email, password });
        this.loggedIn = true;
        this.authMessage = '';
        return true;
    }

    forgotPassword(email: string): boolean {
        if (!email) {
            this.authMessage = 'El email es requerido.';
            return false;
        }
        if (!this.registeredUsers.some(u => u.email === email)) {
            this.authMessage = 'No existe una cuenta con ese email.';
            return false;
        }

        this.authMessage = 'Instrucciones enviadas a tu correo.';
        return true;
    }

    logout(): void {
        this.loggedIn = false;
        this.authMessage = '';
    }

    calculatePasswordStrength(password: string): number {
        if (!password) return 0;
        let score = 0;
        if (password.length >= 6) score += 20;
        if (password.length >= 10) score += 15;
        if (/[A-Z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 20;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;
        return Math.min(score, 100);
    }
}

import { Injectable } from '@angular/core';
import { ContactData } from '../models/contact.model';

@Injectable({
    providedIn: 'root',
})
export class ContactService {

    private config = {
        defaultFilename: 'contacto.json',
        initTimestamp: '',
        version: '1.0.0'
    };

    constructor() {
        this.config.initTimestamp = new Date().toLocaleString();
        console.log('[ContactService] Inicializado correctamente.');
        console.log(`[ContactService] Versión: ${this.config.version}`);
        console.log(`[ContactService] Timestamp: ${this.config.initTimestamp}`);
    }

    sendContact(data: ContactData): boolean {
        console.log('[ContactService] Procesando envío de datos:', data);
        this.downloadJson(data);
        return true;
    }

    private downloadJson(data: ContactData): void {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.config.defaultFilename;
        a.click();
        URL.revokeObjectURL(url);
    }
}

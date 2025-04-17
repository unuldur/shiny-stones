import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shiny-stones-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public nomContact: string = '';
  public prenomContact: string = '';
  public objetContact: string = '';

  private get subject(): string {
    return `Lithotest`;
  }

  private get body(): string {
    return `${this.objetContact}%0D%0A%0D%0A${this.prenomContact} ${this.nomContact}`;
  }

  public get mailTo(): string {
    return `mailto:shiny.stones@outlook.com?subject=${this.subject}&body=${this.body}`;
  }
}

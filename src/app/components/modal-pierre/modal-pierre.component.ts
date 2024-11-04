import { Component, inject } from '@angular/core';
import { Pierre } from '../../interfaces/pierre.interface';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'shiny-stones-modal-pierre',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, MatDialogClose],
  templateUrl: './modal-pierre.component.html',
  styleUrl: './modal-pierre.component.scss',
})
export class ModalPierreComponent {
  protected readonly pierre = inject<Pierre>(MAT_DIALOG_DATA);
}

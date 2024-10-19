import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GalerieComponent } from '../../components/galerie/galerie.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shiny-accueil',
  standalone: true,
  imports: [GalerieComponent, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  private readonly dataService = inject(DataService);

  protected readonly galerie$ = this.dataService.getGaleries();
}

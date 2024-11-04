import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GaleriePierreComponent } from '../../components/galerie-pierre/galerie-pierre.component';

@Component({
  selector: 'shiny-stones-pierres',
  standalone: true,
  imports: [CommonModule, GaleriePierreComponent],
  templateUrl: './pierres.component.html',
  styleUrl: './pierres.component.scss',
})
export class PierresComponent {
  private readonly dataService = inject(DataService);

  protected readonly galerie$ = this.dataService.getPierres();
}

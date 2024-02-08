import { Injectable } from '@angular/core';
import Vibrant from 'node-vibrant';
import { Swatch } from 'node-vibrant/lib/color';

@Injectable({
  providedIn: 'root'
})
export class DominantColorService {

  async getDominantColor(imageUrl: string): Promise<string> {
    const palette = await Vibrant.from(imageUrl).getPalette();
    let maxPopulation = -1;
    let bestSwatch: Swatch;
    let availablePalettes = [palette.Vibrant, palette.Muted, palette.DarkVibrant, palette.LightVibrant, palette.DarkMuted, palette.LightMuted];
    availablePalettes.forEach(p => {
      if (p && p.population > maxPopulation) {
        bestSwatch = p;
        maxPopulation = p.population;
      }
    });

    if (bestSwatch) {
      return bestSwatch.hex;
    } else {
      throw new Error('Unable to extract dominant color');
    }
  }
}

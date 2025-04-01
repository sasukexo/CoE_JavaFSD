import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(target: string): string {
    let terms=['thriller','must','watch','great','awesome','drama',
      'comedy','horror','excellent','movie','miss',
      'superb','writing','acting','direction','cinematography',
      'screenplay','dialogues','story','plot','character',	
      ]
  
      terms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        target = target.replace(regex, match => `'${match.toUpperCase()}'`);
      });
      return target;
    }

}
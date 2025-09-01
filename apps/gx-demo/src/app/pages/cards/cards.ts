import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GxAction, GxCard, IGxCard } from '@sanring/gx-card';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, GxCard],
  standalone: true,
  templateUrl: './cards.html',
  styleUrls: ['./cards.css']
})
export class Cards {
  cards: IGxCard[] = [
    {
      header: {
        image: {
          src:'../../assets/test_01.jpg'
        },
        title: 'Card Title',
        subtitle: 'Card Subtitle'
      },
      content: {
        image: {
          src:'../../assets/test_02.jpg'
        },
        title: 'Content Title',
        subtitle: 'Content Subtitle',
        description: 'Content Description'
      },
      footer: {
        actions: [
          { id: 'action-1', label: 'Action 1' },
          { id: 'action-2', label: 'Action 2', intent: 'secondary' }
        ]
      }
      }
  ];

  onCardAction(action: GxAction) {
    alert(`Card action clicked: ${action.label}`);
  }
}

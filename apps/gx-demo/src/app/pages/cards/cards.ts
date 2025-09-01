import { GxCard, GxAction, IGxCard } from '@sanring/gx-card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
      id: 'classic-card-1',
      shape: 'classic',
      variant: 'elevated',
      header: {
        cover: {
          src: '../../assets/test_01.jpg',
          alt: 'Card cover image',
          ratio: '16:9'
        },
        title: 'Classic Card Header',
        subtitle: 'Header subtitle description'
      },
      content: {
        title: 'Content Title',
        subtitle: 'Content Subtitle',
        description: 'This is a classic card shape with header, content, and footer sections. It demonstrates the basic structure of a card component.',
        image: {
          src: '../../assets/test_02.jpg',
          alt: 'Content image',
          ratio: '4:3'
        }
      },
      footer: {
        actions: [
          {
            id: 'primary-action',
            label: 'Primary Action',
            intent: 'primary'
          },
          {
            id: 'secondary-action',
            label: 'Secondary Action',
            intent: 'secondary'
          }
        ]
      }
    },
    {
      id: 'classic-card-2',
      shape: 'classic',
      variant: 'outlined',
      header: {
        avatar: {
          src: '../../assets/test_01.jpg',
          alt: 'User avatar',
          ratio: '1:1'
        },
        title: 'Avatar Card',
        subtitle: 'With user avatar in header'
      },
      content: {
        title: 'Another Classic Card',
        description: 'This card uses an avatar instead of a cover image and has an outlined variant style.'
      },
      footer: {
        actions: [
          {
            id: 'view-action',
            label: 'View Details',
            intent: 'primary'
          },
          {
            id: 'share-action',
            label: 'Share',
            intent: 'secondary'
          },
          {
            id: 'delete-action',
            label: 'Delete',
            intent: 'danger'
          }
        ]
      }
    },
    {
      id: 'classic-card-3',
      shape: 'classic',
      variant: 'flat',
      href: '#',
      target: '_self',
      ariaLabel: 'Navigate to product details',
      header: {
        cover: {
          src: '../../assets/test_02.jpg',
          alt: 'Product image',
          ratio: '1:1'
        },
        title: 'Interactive Card',
        subtitle: 'Click to navigate'
      },
      content: {
        title: 'Clickable Card',
        description: 'This entire card is clickable and will navigate to another page. It uses the flat variant style.'
      },
      footer: {
        actions: [
          {
            id: 'learn-more',
            label: 'Learn More',
            intent: 'primary'
          }
        ]
      }
    }
  ];

  onCardAction(action: GxAction) {
    console.log(`Card action clicked:`, action);
    alert(`Card action clicked: ${action.label} (${action.intent || 'default'})`);
  }
}

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
        avatar: {
          src: '/test_01.jpg',
          alt: 'Card avatar image',
          ratio: '16:9'
        },
        title: 'Classic Card',
        subtitle: 'Classic Card subtitle'
      },
      content: {
        description: 'This component represents a classic card style layout that is widely used in modern web applications and user interfaces. The card provides a clean and organized structure to display information in a compact yet visually appealing way. At the top of the card, there is typically an avatar or profile image, which helps to give context about the subject or the person represented in the card. Right next to or below the avatar, the card includes a main title that captures the user’s attention, often used for names, product titles, or key identifiers. Beneath the title, a subtitle is displayed to provide supporting information or secondary context in a lighter tone. Following this, the card contains a description area, where additional details, explanatory text, or other relevant content can be written. The card also includes an expand/collapse button, which allows the user to toggle between a brief overview and more detailed information, improving readability and conserving space. Finally, action buttons are placed at the bottom or side of the card, enabling users to perform tasks such as editing, deleting, sharing, or confirming actions directly from the card. Altogether, this design balances clarity, aesthetics, and functionality.',
        tags: [
          { id: 'tag-1', label: 'Tag1', removable: false },
          { id: 'tag-2', label: 'Tag2', removable: false},
        ]
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
          src: '/test_01.jpg',
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
        avatar: {
          src: '/test_02.jpg',
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

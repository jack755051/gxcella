import { GxCard, GxAction, IGxCard, GxMedia } from '@sanring/gx-card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, GxCard],
  standalone: true,
  templateUrl: './cards.html',
  styleUrls: ['./cards.css']
})
export class Cards {
  /**Card 範例資料 */
  cards: IGxCard[] = [
    //經典卡牌(簡單)
    {
      id: uuidv4(),
      shape: 'classic',
      variant: 'elevated',
      header: {
        title: 'Custom Card',
        subtitle: 'This is a base card without avatar or cover image'
      },
      content: {
        description: 'This is a custom card where you can put any content you want. It does not have an avatar or cover image, making it a versatile option for various use cases.',
      }
    },
    // 經典卡牌(包含頭像)
    {
      id: uuidv4(),
      shape: 'classic',
      variant: 'elevated',
      header: {
        avatar: {
          src: '/test_01.jpg',
          alt: 'Card avatar image',
          ratio: '16:9'
        },
        title: 'Classic Card With Avatar',
        subtitle: 'Classic Card subtitle'
      },
      content: {
        description: 'This is a custom card where you can put any content you want. It does not have an avatar or cover image, making it a versatile option for various use cases.',
      }
    },
    // 經典卡牌(包含長內容+沒有收合配置+頭像)
    {
      id: uuidv4(),
      shape: 'classic',
      variant: 'elevated',
      header: {
        avatar: {
          src: '/test_01.jpg',
          alt: 'Card avatar image',
          ratio: '16:9'
        },
        title: 'Classic Card With Avatar',
        subtitle: 'Classic Card subtitle'
      },
      content: {
        description: 'This component represents a classic card style layout that is widely used in modern web applications and user interfaces. The card provides a clean and organized structure to display information in a compact yet visually appealing way. At the top of the card, there is typically an avatar or profile image, which helps to give context about the subject or the person represented in the card. Right next to or below the avatar, the card includes a main title that captures the user’s attention, often used for names, product titles, or key identifiers. Beneath the title, a subtitle is displayed to provide supporting information or secondary context in a lighter tone. Following this, the card contains a description area, where additional details, explanatory text, or other relevant content can be written. The card also includes an expand/collapse button, which allows the user to toggle between a brief overview and more detailed information, improving readability and conserving space. Finally, action buttons are placed at the bottom or side of the card, enabling users to perform tasks such as editing, deleting, sharing, or confirming actions directly from the card. Altogether, this design balances clarity, aesthetics, and functionality.',
        tags: [
          { id: 'tag-1', label: '經典卡片', removable: false },
          { id: 'tag-2', label: '頭像', removable: false },
          { id: 'tag-2', label: '抬頭', removable: false },
          { id: 'tag-2', label: '標籤', removable: false },
          { id: 'tag-2', label: '文章', removable: false },
          { id: 'tag-2', label: '按鈕', removable: false },
        ],
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
    // 經典卡牌(包含長內容+啟用收合配置+頭像)
    {
      id: uuidv4(),
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
        description: 'This component represents a classic card style layout that is widely used in modern web applications and user interfaces. The card provides a clean and organized structure to display information in a compact yet visually appealing way. At the top of the card, there is typically an avatar or profile image, which helps to give context about the subject or the person represented in the card. Right next to or below the avatar, the card includes a main title that captures the user\'s attention, often used for names, product titles, or key identifiers. Beneath the title, a subtitle is displayed to provide supporting information or secondary context in a lighter tone. Following this, the card contains a description area, where additional details, explanatory text, or other relevant content can be written. The card also includes an expand/collapse button, which allows the user to toggle between a brief overview and more detailed information, improving readability and conserving space.',
        descriptionCollapse: {
          enabled: true,
          maxLines: 3,
          fontSize: 14,
          lineHeight: 20,
          expandText: '展開更多',
          collapseText: '收起內容'
        }
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
  ];

  description: string[] = [
    '經典卡牌(簡單)',
    '經典卡牌(包含頭像)',
    '經典卡牌(包含長內容+沒有收合配置+頭像)',
    '經典卡牌(包含長內容+啟用收合配置+頭像)',
  ]

  cardGroups:Array<{card:IGxCard,description:string}> = this.cards.map((card, index) => ({
    card,
    description: this.description[index]
  }));

  onCardAction(action: GxAction) {
    console.log(`Card action clicked:`, action);
    alert(`Card action clicked: ${action.label} (${action.intent || 'default'})`);
  }

  onAvatarClick(event: { avatarData: GxMedia | undefined, event: MouseEvent }) {
    console.log(`Avatar clicked:`, event);
    alert(`Avatar clicked: ${event.avatarData?.alt || 'No alt text'}`);
  }

  onTitleClick(event: { title: string, event: MouseEvent }) {
    console.log(`Title clicked:`, event);
    alert(`Title clicked: ${event.title}`);
  }

  onSubtitleClick(event: { subtitle: string, event: MouseEvent }) {
    console.log(`Subtitle clicked:`, event);
    alert(`Subtitle clicked: ${event.subtitle}`);
  }
}

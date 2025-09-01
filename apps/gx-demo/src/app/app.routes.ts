import { Routes } from '@angular/router';
import {IGxBreadCrumb} from '@sanring/gx-breadcrumb';
import { HouseIcon, Building2Icon, CctvIcon,PackageIcon,LoaderIcon,MousePointerClickIcon,TagIcon,WalletCardsIcon } from '../icons';

const gxBreadcrumb = {
  home:    { label: 'Home', link: '/home', iconImg: HouseIcon },
  about:   { label: 'About', link: '/about', iconImg:Building2Icon },
  product: { label: 'Product', link: '/product', iconImg: PackageIcon },
  button: { label: 'Button', link: '/product', iconImg: MousePointerClickIcon },
  tag: { label: 'Button', link: '/product', iconImg: TagIcon },
  cards:{ label: 'Cards', link: '/cards', iconImg: WalletCardsIcon },
  loading: { label: 'Loading', link: '/loading', iconImg: LoaderIcon }
} satisfies Record<string, IGxBreadCrumb>;


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadComponent:()=>import('./pages/home/home').then(m=>m.Home),
    data:{ breadcrumb: gxBreadcrumb.home }
  },
  {
    path: 'about',
    loadComponent:()=> import('./pages/about/about').then(m => m.About),
    data:{ breadcrumb: gxBreadcrumb.about}
  },
  {
    path: 'button',
    loadComponent:()=> import('./pages/button/button').then(m => m.Button),
    data:{ breadcrumb: gxBreadcrumb.button}
  },
  {
    path: 'tag',
    loadComponent:()=> import('./pages/tag/tag').then(m => m.Tag),
    data:{ breadcrumb: gxBreadcrumb.tag}
  },
  {
    path: 'cards',
    loadComponent:()=> import('./pages/cards/cards').then(m => m.Cards),
    data:{ breadcrumb: gxBreadcrumb.cards}
  },
  {
    path: 'product',
    data: { breadcrumb: gxBreadcrumb.product },
    children:[
      {
        path:'',
        loadComponent: () => import('./pages/product/product').then(m => m.Product),
        data: { breadcrumb: false }
      },
      {
        path:':id',
        loadComponent:()=>import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
        data: { breadcrumb: (r:any) => `#${r.paramMap.get('id')}` }
      }
    ]
  },
  {
    path: 'loading',
    loadComponent:()=> import('./pages/loading-demo/loading-demo').then(m => m.LoadingDemo),
    data:{ breadcrumb: gxBreadcrumb.loading}
  },

  /** 404 not found page*/
  { path: '**', loadComponent: () =>
      import('./pages/not-found/not-found').then(m => m.NotFound),
    data: { breadcrumb: false }
  }
];

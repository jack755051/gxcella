import { Routes } from '@angular/router';
import {GxBreadcrumb,IGxBreadCrumb} from '@sanring/gx-breadcrumb';

const gxBreadcrumb = {
  home:    { label: 'Home', link: '/home', icon: 'home' },
  about:   { label: 'About', link: '/about', icon: 'info' },
  product: { label: 'Product', link: '/product', icon: 'shopping_cart' }
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
    path: 'product' ,
    children:[
      {
        path:'',
        loadComponent: () => import('./pages/product/product').then(m => m.Product),
        data:{ breadcrumb: gxBreadcrumb.product },
      },
      {
        path:':id',
        loadComponent:()=>import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
        data: { breadcrumb: (r) => `#${r.paramMap.get('id')}` }
      }
    ]
  },

  /** 404 not found page*/
  { path: '**', loadComponent: () =>
      import('./pages/not-found/not-found').then(m => m.NotFound),
    data: { breadcrumb: false }
  }
];

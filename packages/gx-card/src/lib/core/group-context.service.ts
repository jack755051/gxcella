import { Injectable, signal } from "@angular/core";
import { GxCardLayout, GxCardVariant } from "../model/card.type";

@Injectable()
export class GxCardGroupContext { 
  readonly variant = signal<GxCardVariant>('elevated');
  readonly layout  = signal<GxCardLayout>('grid');
  readonly columns = signal<number>(3);   // 只有 grid 用得到
  readonly gap     = signal<string>('16px');
}
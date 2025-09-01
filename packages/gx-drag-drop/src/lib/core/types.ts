
export interface DragData {
    type: string;           // 'file' | 'tag' | 'card' | 自定義
    data: any;              // 實際資料
    source?: string;        // 來源標識
    effectAllowed?: string; // 'copy' | 'move' | 'link'
}
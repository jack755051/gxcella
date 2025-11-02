#!/bin/bash

# 用法: ./scripts/create-component.sh gx-table table-header

PACKAGE=$1
COMPONENT=$2

if [ -z "$PACKAGE" ] || [ -z "$COMPONENT" ]; then
  echo "用法: ./create-component.sh <package-name> <component-name>"
  echo "範例: ./create-component.sh gx-table table-header"
  exit 1
fi

PACKAGE_PATH="packages/$PACKAGE/src/lib"
COMPONENT_PATH="$PACKAGE_PATH/$COMPONENT"

# 創建目錄
mkdir -p "$COMPONENT_PATH"

# 將 kebab-case 轉為 PascalCase
COMPONENT_CLASS=$(echo "$COMPONENT" | sed -E 's/(^|-)(.)/\U\2/g')
COMPONENT_CLASS="Gx${COMPONENT_CLASS}"

# 創建 TypeScript 文件
cat > "$COMPONENT_PATH/gx-$COMPONENT.ts" <<EOF
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gx-$COMPONENT',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gx-$COMPONENT.html',
  styleUrls: ['./gx-$COMPONENT.css']
})
export class $COMPONENT_CLASS {
  // Component logic here
}
EOF

# 創建 HTML 文件
cat > "$COMPONENT_PATH/gx-$COMPONENT.html" <<EOF
<div class="gx-$COMPONENT">
  <ng-content></ng-content>
</div>
EOF

# 創建 CSS 文件
cat > "$COMPONENT_PATH/gx-$COMPONENT.css" <<EOF
.gx-$COMPONENT {
  /* Styles here */
}
EOF

echo "✅ 組件創建成功: $COMPONENT_PATH"
echo ""
echo "創建的文件:"
echo "  - gx-$COMPONENT.ts"
echo "  - gx-$COMPONENT.html"
echo "  - gx-$COMPONENT.css"
echo ""
echo "下一步:"
echo "  1. 在 public-api.ts 中導出組件"
echo "  2. 實現組件邏輯"

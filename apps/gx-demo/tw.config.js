export default {
  content: [
    "./src/**/*.{html,ts}",
    // 重要：加入 dist 路徑（從 apps/gx-demo 的角度）
    "../../dist/**/*.{mjs,js,html}",
    // 或更精確的路徑
    "../../dist/gx-breadcrumb/**/*.{mjs,js}",
    "../../dist/gx-styles/**/*.{mjs,js}",
  ],
  theme: { extend: {} },
  plugins: []
};

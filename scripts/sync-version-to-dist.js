// scripts/sync-version-to-dist.js
const fs = require("fs");
const path = require("path");

const pkgPath = process.argv[2] || "package.json";
const distDir = process.argv[3] || "dist";
const src = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const distPkgPath = path.join(path.dirname(pkgPath), distDir, "package.json");

if (!fs.existsSync(distPkgPath)) {
  console.error("dist package.json not found:", distPkgPath);
  process.exit(1);
}

const dist = JSON.parse(fs.readFileSync(distPkgPath, "utf8"));
dist.name = src.name;
dist.version = src.version;
// 可選同步一些中繼資料，避免 npm 警告
dist.repository = src.repository || dist.repository;
dist.publishConfig = src.publishConfig || dist.publishConfig;

// 移除 files 欄位，因為從 dist 發布時不需要指定 files
// ng-packagr 會把 source 的 files: ["dist"] 複製過來，但這會導致發布失敗
delete dist.files;

fs.writeFileSync(distPkgPath, JSON.stringify(dist, null, 2));
console.log(`[sync-version] ${distPkgPath} -> ${dist.version}`);
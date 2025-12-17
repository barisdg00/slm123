import fs from "fs";
import path from "path";

// ESM ortamında __dirname kullanılmaz; process.cwd() root için güvenli bir alternatiftir
const repoRoot = path.resolve(process.cwd());
const schemaPath = path.join(repoRoot, "shared", "schema.ts");

if (!fs.existsSync(schemaPath)) {
  console.error("❌ shared/schema.ts bulunamadı: ", schemaPath);
  process.exit(2);
}

const content = fs.readFileSync(schemaPath, "utf8");
const regex = /audioSrc:\s*["'`]?(\/audio\/[^"'\s,}]+)["'`]?/g;
const files = new Set<string>();
let m: RegExpExecArray | null;
while ((m = regex.exec(content)) !== null) {
  files.add(m[1]);
}

if (files.size === 0) {
  console.log("ℹ️ shared/schema.ts içinde audioSrc bulunamadı.");
  process.exit(0);
}

const missing: string[] = [];
for (const f of files) {
  const rel = f.replace(/^\//, "");
  const filePath = path.join(repoRoot, "client", "public", rel);
  if (!fs.existsSync(filePath)) missing.push(rel);
}

if (missing.length) {
  console.log("❌ Eksik ses dosyaları:");
  missing.forEach((s) => console.log(" -", s));
  console.log("\nLütfen eksik dosyaları `client/public/audio/` içine koyun ve tekrar çalıştırın: npm run check:audio");
  process.exit(1);
}

console.log("✅ Tüm ses dosyaları mevcut: ", Array.from(files).join(", "));
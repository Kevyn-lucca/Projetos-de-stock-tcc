// scripts/genDoc.js

import { parse } from "vue-docgen-api";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateDocForComponent(filePath) {
  const componentInfo = await parse(filePath);
  return componentInfo;
}

async function main() {
  const componentsDir = path.resolve(__dirname, "../components");
  const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith(".vue"));

  const docs = [];

  for (const f of files) {
    const fullPath = path.join(componentsDir, f);
    const info = await generateDocForComponent(fullPath);
    docs.push({
      name: info.displayName || f,
      props: info.props,
      emits: info.emits,
      slots: info.slots,
      description: info.description,
    });
  }

  // gerar JSON
  fs.writeFileSync(
    path.resolve(__dirname, "../docs/components.json"),
    JSON.stringify(docs, null, 2),
    "utf-8"
  );

  // gerar Markdown simples
  let md = "# Documentação de Componentes\n\n";
  for (const comp of docs) {
    md += `## ${comp.name}\n\n`;
    if (comp.description) {
      md += `${comp.description}\n\n`;
    }
    if (comp.props && comp.props.length > 0) {
      md += `### Props\n\n`;
      md += "| Nome | Tipo | Obrigatório | Padrão | Descrição |\n";
      md += "|------|------|-------------|--------|-------------|\n";
      for (const p of comp.props) {
        const def = p.defaultValue ? p.defaultValue.value : "-";
        const req = p.required ? "Sim" : "Não";
        md += `| ${p.name} | ${p.type.name} | ${req} | ${def} | ${
          p.description || "-"
        } |\n`;
      }
      md += `\n`;
    }
    if (comp.emits && comp.emits.length > 0) {
      md += `### Events (emits)\n\n`;
      md += "| Evento | Descrição |\n";
      md += "|--------|------------|\n";
      for (const e of comp.emits) {
        md += `| ${e.name} | ${e.description || "-"} |\n`;
      }
      md += `\n`;
    }
    if (comp.slots && comp.slots.length > 0) {
      md += `### Slots\n\n`;
      md += "| Slot | Descrição |\n";
      md += "|------|-------------|\n";
      for (const s of comp.slots) {
        md += `| ${s.name} | ${s.description || "-"} |\n`;
      }
      md += `\n`;
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../docs/components.md"),
    md,
    "utf-8"
  );

  console.log(
    "Documentação gerada em docs/components.json e docs/components.md"
  );
}

main().catch((err) => {
  console.error("Erro gerando documentação:", err);
  process.exit(1);
});

import PDFDocument from 'pdfkit';
import type { PdfResource } from '@/lib/resource-contents';

const NAVY = '#0b1f3a';
const RED = '#c8102e';
const GRAY = '#555555';
const LIGHT_GRAY = '#eeeeee';

/** Renders a PdfResource into a PDF document and returns it as a Buffer. */
export function buildPdfBuffer(resource: PdfResource): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 56, bottom: 56, left: 56, right: 56 },
      bufferPages: true,
      info: {
        Title: resource.title,
        Author: 'Hedge Resource Centre (HRC) Ghana',
        Subject: resource.title,
        Creator: 'Hedge Resource Centre Ghana',
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageHeight = doc.page.height;
    const marginBottom = 56;

    const ensureSpace = (needed: number) => {
      const y = doc.y + needed;
      if (y > pageHeight - marginBottom) {
        doc.addPage();
        doc.y = 56;
      }
    };

    /* ── Header banner ── */
    doc.rect(0, 0, doc.page.width, 96).fill(NAVY);
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(RED)
      .text('HEDGE RESOURCE CENTRE GHANA', 56, 24, { characterSpacing: 1 });
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#ffffff')
      .text('Quality Our Priority  |  hrcghana.com', 56, 42);
    doc
      .font('Helvetica-Bold')
      .fontSize(18)
      .fillColor('#ffffff')
      .text(resource.title, 56, 62, { width: doc.page.width - 112 });

    doc.y = 124;

    /* ── Intro ── */
    doc.font('Helvetica').fontSize(11).fillColor(GRAY).text(resource.intro, {
      align: 'justify',
      lineGap: 3,
    });

    /* ── Sections ── */
    for (const section of resource.sections) {
      ensureSpace(60);
      doc
        .font('Helvetica-Bold')
        .fontSize(13)
        .fillColor(NAVY)
        .text(section.title, { lineGap: 2 });
      doc.moveDown(0.25);

      if (section.paragraphs) {
        for (const p of section.paragraphs) {
          ensureSpace(30);
          doc.font('Helvetica').fontSize(10.5).fillColor('#333333').text(p, {
            align: 'justify',
            lineGap: 3,
          });
          doc.moveDown(0.35);
        }
      }

      if (section.bullets) {
        for (const b of section.bullets) {
          ensureSpace(20);
          doc
            .font('Helvetica')
            .fontSize(10.5)
            .fillColor('#333333')
            .text(`\u2022  ${b}`, { width: doc.page.width - 112, lineGap: 2 });
          doc.moveDown(0.2);
        }
      }

      if (section.checklist) {
        for (const item of section.checklist) {
          ensureSpace(20);
          doc
            .font('Helvetica')
            .fontSize(10.5)
            .fillColor('#333333')
            .text(`[ ]  ${item}`, { width: doc.page.width - 112, lineGap: 2 });
          doc.moveDown(0.2);
        }
      }

      if (section.table) {
        const { header, rows } = section.table;
        const colWidth = (doc.page.width - 112) / header.length;
        const rowHeight = 22;

        ensureSpace(header.length * rowHeight + 20);

        // Header row
        doc.rect(56, doc.y, doc.page.width - 112, rowHeight).fill(NAVY);
        header.forEach((h, i) => {
          doc
            .font('Helvetica-Bold')
            .fontSize(9)
            .fillColor('#ffffff')
            .text(h, 56 + i * colWidth + 6, doc.y + 7, { width: colWidth - 12 });
        });
        doc.y += rowHeight;

        // Body rows
        rows.forEach((row, ri) => {
          ensureSpace(rowHeight);
          if (ri % 2 === 1) {
            doc.rect(56, doc.y, doc.page.width - 112, rowHeight).fill(LIGHT_GRAY);
          }
          row.forEach((cell, ci) => {
            doc
              .font('Helvetica')
              .fontSize(9)
              .fillColor('#333333')
              .text(cell, 56 + ci * colWidth + 6, doc.y + 7, { width: colWidth - 12 });
          });
          doc.y += rowHeight;
        });
        doc.moveDown(0.5);
      }

      doc.moveDown(0.35);
    }

    /* ── Footer note ── */
    ensureSpace(50);
    doc.moveDown(1);
    doc
      .rect(0, doc.y - 6, doc.page.width, 1.5)
      .fillColor(RED)
      .fill();
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text(resource.footerNote, {
      align: 'left',
      width: doc.page.width - 112,
      lineGap: 3,
    });

    /* ── Page numbers + small print ── */
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc
        .font('Helvetica')
        .fontSize(8)
        .fillColor('#999999')
        .text(
          `Hedge Resource Centre (HRC) Ghana  -  hrcghana.com  |  Page ${i + 1} of ${range.count}`,
          56,
          doc.page.height - 36,
          { align: 'center', width: doc.page.width - 112 },
        );
    }

    doc.end();
  });
}
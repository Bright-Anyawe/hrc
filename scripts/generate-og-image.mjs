import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Brand colors
const HRC_RED = '#ed1c24';
const HRC_BLUE = '#002366';

async function generateOgImage() {
  const logoPath = join(projectRoot, 'public', 'HRC-logo.png');
  const outputPath = join(projectRoot, 'public', 'og-image.png');

  const WIDTH = 1200;
  const HEIGHT = 630;

  // 1. Create the gradient background using SVG
  const bgSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${HRC_BLUE};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#001a4d;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glow" cx="30%" cy="40%" r="60%">
          <stop offset="0%" style="stop-color:rgba(237,28,36,0.15);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,35,102,0);stop-opacity:1" />
        </radialGradient>
        <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${HRC_RED};stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(237,28,36,0);stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Base background -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
      <!-- Red glow accent -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
      <!-- Subtle pattern overlay -->
      <g opacity="0.03">
        <line x1="0" y1="0" x2="${WIDTH}" y2="${HEIGHT}" stroke="white" stroke-width="1" />
        <line x1="0" y1="100" x2="${WIDTH}" y2="${HEIGHT - 100}" stroke="white" stroke-width="1" />
        <line x1="0" y1="200" x2="${WIDTH}" y2="${HEIGHT - 200}" stroke="white" stroke-width="1" />
        <line x1="0" y1="-100" x2="${WIDTH}" y2="${HEIGHT + 100}" stroke="white" stroke-width="1" />
      </g>
      <!-- Accent line at the top -->
      <rect x="0" y="0" width="${WIDTH}" height="5" fill="${HRC_RED}" />
      <!-- Accent line at the bottom -->
      <rect x="0" y="${HEIGHT - 5}" width="${WIDTH}" height="5" fill="${HRC_RED}" />
      <!-- Decorative circle -->
      <circle cx="${WIDTH - 80}" cy="80" r="200" fill="none" stroke="${HRC_RED}" stroke-width="1" opacity="0.08" />
      <circle cx="${WIDTH - 80}" cy="80" r="300" fill="none" stroke="${HRC_RED}" stroke-width="0.5" opacity="0.05" />
    </svg>
  `;

  // 2. Create text overlay as SVG
  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <!-- Company name -->
      <text x="460" y="270" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="48" font-weight="800" fill="white" letter-spacing="1">
        <tspan>Hedge Resource</tspan>
      </text>
      <text x="460" y="320" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="48" font-weight="800" fill="white" letter-spacing="1">
        <tspan>Centre (HRC)</tspan>
      </text>
      <!-- Red accent bar -->
      <rect x="460" y="340" width="60" height="4" fill="${HRC_RED}" />
      <!-- Tagline -->
      <text x="460" y="375" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" font-weight="400" fill="rgba(255,255,255,0.85)" letter-spacing="3">
        <tspan>LEADER IN RESOURCE CONSULTING</tspan>
      </text>
      <!-- Since badge -->
      <rect x="460" y="400" width="120" height="28" rx="14" fill="${HRC_RED}" opacity="0.9" />
      <text x="520" y="419" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="white" text-anchor="middle" letter-spacing="1">
        SINCE 2004
      </text>

      <!-- URL at the bottom right -->
      <text x="${WIDTH - 40}" y="${HEIGHT - 25}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="13" font-weight="400" fill="rgba(255,255,255,0.5)" text-anchor="end" letter-spacing="2">
        HRCGHANA.COM
      </text>
    </svg>
  `;

  // 3. Resize the logo to fit nicely
  const logoSize = 220;
  const logoBuffer = await sharp(logoPath)
    .resize(logoSize, logoSize, {
      fit: 'inside',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  // 4. Compose everything
  const logoLeft = Math.round(460 / 2 - logoSize / 2) + 30; // Centered in the left half
  const logoTop = Math.round(HEIGHT / 2 - logoSize / 2);

  await sharp(Buffer.from(bgSvg))
    .png()
    .composite([
      // Logo
      {
        input: logoBuffer,
        top: logoTop,
        left: logoLeft,
      },
      // Text overlay
      {
        input: Buffer.from(textSvg),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✅ OG image generated: ${outputPath}`);
  console.log(`   Size: ${WIDTH}x${HEIGHT}`);
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});

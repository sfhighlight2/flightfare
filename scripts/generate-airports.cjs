/**
 * generate-airports.cjs
 * Downloads the OpenFlights airport dataset and converts it to a lean JSON file.
 * Only includes airports with valid IATA codes.
 *
 * Usage: node scripts/generate-airports.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_URL = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat';
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'airports.json');

function download(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return download(res.headers.location).then(resolve, reject);
            }
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(data));
            res.on('error', reject);
        }).on('error', reject);
    });
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += ch;
        }
    }
    result.push(current.trim());
    return result;
}

async function main() {
    console.log('Downloading OpenFlights airport data...');
    const raw = await download(DATA_URL);
    const lines = raw.split('\n').filter(l => l.trim());

    console.log(`Total rows: ${lines.length}`);

    const airports = [];

    for (const line of lines) {
        const cols = parseCSVLine(line);
        // Columns: 0=id, 1=name, 2=city, 3=country, 4=IATA, 5=ICAO, ...
        const iata = cols[4];
        const name = cols[1];
        const city = cols[2];
        const country = cols[3];

        // Skip entries without a valid IATA code
        if (!iata || iata === '\\N' || iata === '' || iata.length !== 3) continue;

        airports.push({
            code: iata,
            name,
            city,
            country
        });
    }

    // Sort by city for better UX
    airports.sort((a, b) => a.city.localeCompare(b.city));

    // Ensure output directory exists
    const outDir = path.dirname(OUTPUT_PATH);
    fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(airports));
    console.log(`Generated ${airports.length} airports → ${OUTPUT_PATH}`);
}

main().catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
});

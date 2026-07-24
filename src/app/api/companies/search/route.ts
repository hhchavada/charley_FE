import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache the companies in memory to avoid parsing the 79MB JSON on every request
let cachedCompanies: any[] | null = null;

function loadCompanies() {
  if (cachedCompanies && cachedCompanies.length > 0) return cachedCompanies;

  try {
    // Determine the path to the backend JSON file
    // process.cwd() will be the frontend root directory
    // Check multiple possible paths to support both local and live server folder structures
    const possiblePaths = [
      path.join(process.cwd(), '../backend/src/data/acra/corporate-entities.json'),
      path.join(process.cwd(), '../charley_BE/src/data/acra/corporate-entities.json')
    ];

    let foundPath = null;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        foundPath = p;
        break;
      }
    }
    
    if (foundPath) {
      const data = fs.readFileSync(foundPath, 'utf8');
      cachedCompanies = JSON.parse(data);
    } else {
      console.warn(`ACRA JSON dataset not found in any expected location.`);
      cachedCompanies = [];
    }
  } catch (error) {
    console.error('Error loading ACRA JSON dataset:', error);
    cachedCompanies = [];
  }
  
  return cachedCompanies;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const normalizedQuery = query.toLowerCase().trim();
  const companies = loadCompanies();

  // Search logic: case-insensitive partial match on entity_name
  // Limit to top 10 results
  const results = [];
  if (companies) {
    for (const company of companies) {
      if (company.entity_name && company.entity_name.toLowerCase().includes(normalizedQuery)) {
        results.push(company);
        if (results.length >= 10) break;
      }
    }
  }

  return NextResponse.json(results);
}

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
    const jsonPath = path.join(process.cwd(), '../backend/src/data/acra/corporate-entities.json');
    
    if (fs.existsSync(jsonPath)) {
      const data = fs.readFileSync(jsonPath, 'utf8');
      cachedCompanies = JSON.parse(data);
    } else {
      console.warn(`ACRA JSON dataset not found at ${jsonPath}`);
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
  for (const company of companies) {
    if (company.entity_name && company.entity_name.toLowerCase().includes(normalizedQuery)) {
      results.push(company);
      if (results.length >= 10) break;
    }
  }

  return NextResponse.json(results);
}

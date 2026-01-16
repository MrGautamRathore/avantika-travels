export async function GET() {
  // 2026: API endpoint for AI training data
  const aiData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Avantika Travels Tourism Dataset",
    "description": "Comprehensive tourism data for Madhya Pradesh",
    "url": "https://avantikatravels.com/api/seo/data",
    "version": "2026.1.0",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "keywords": ["Madhya Pradesh", "Tourism", "Pilgrimage", "Travel"],
    "creator": {
      "@type": "Organization",
      "name": "Avantika Travels"
    },
    "distribution": [
      {
        "@type": "DataDownload",
        "encodingFormat": "JSON-LD",
        "contentUrl": "https://avantikatravels.com/api/seo/data"
      }
    ]
  };

  return new Response(JSON.stringify(aiData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
# Avantika Travels Website Optimization TODO

## 1. Eliminate render-blocking resources
- [x] Implement dynamic imports for ReviewsSection, PackagesSection, PlacesSection, SearchResultsSection, ContactPopup using next/dynamic in page.js

## 2. Optimize keyword targeting
- [x] Update metadata in layout.js to inject keywords 'Mahakal Mandir tours', 'Ujjain pilgrimage', 'Madhya Pradesh travel'
- [x] Migrate Head to metadata export in page.js and update SEO keywords

## 3. Convert all images to modern formats
- [x] Replace backgroundImage in hero-section.jsx with next/image component
- [x] Add quality={75} to all Image components (place-card.jsx, package-card.jsx)
- [x] Add responsive sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" to all Image components
- [ ] Audit for any remaining <img> tags in components

## 4. Implement CDN delivery
- [x] Add assetPrefix in next.config.mjs for CDN configuration

## 5. Fix image distortion
- [ ] Audit place-card.jsx and package-card.jsx for correct aspect ratios with fill prop

## 6. Serve correctly sized images
- [ ] Ensure sizes prop is correctly set for responsive breakpoints in all Image components

## Followup steps
- [ ] Test website functionality after changes
- [ ] Run Lighthouse audit for Core Web Vitals
- [ ] Generate post-optimization report comparing metrics

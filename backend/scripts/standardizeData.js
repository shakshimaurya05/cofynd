// scripts/standardizeData.js
const fs = require('fs');

// Helper function to convert string prices to numbers
function convertPrice(price) {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price === 'string') {
    // Remove commas and convert to number
    return parseFloat(price.replace(/,/g, '')) || null;
  }
  return null;
}

// Read the current JSON file from the correct location
const rawData = JSON.parse(fs.readFileSync('./src/routes/gurgaon coworking.json', 'utf8'));

// Transform each entry to the standard format
const standardizedData = rawData.map(entry => {
  // Ensure all required fields exist
  return {
    companyName: entry.companyName || entry.CompanyName || entry['Company Name'] || '',
    city: entry.city || entry.City || 'Gurugram', // Default to Gurugram
    microLocation: entry.microLocation || entry['Micro Location'] || entry.micro_location || '',
    address: entry.address || entry.Address || '',
    pricing: {
      dedicatedSeat: convertPrice(entry.pricing?.dedicatedSeat || 
                   entry.pricing?.['dedicatedSeat'] || 
                   entry['Dedicated Seats'] || 
                   entry['Dedicated Seats '] || 
                   null),
      cabinSeat: convertPrice(entry.pricing?.cabinSeat || 
                entry.pricing?.['cabinSeat'] || 
                entry['Cabin Seats'] || 
                entry['Cabin Seats '] || 
                null)
    },
    images: entry.images || entry.Images || []
  };
});

// Write the standardized data back to the file in the correct location
fs.writeFileSync('./src/routes/gurgaon coworking.json', JSON.stringify(standardizedData, null, 2));

console.log('Data standardized successfully!');
console.log(`Processed ${standardizedData.length} entries`);
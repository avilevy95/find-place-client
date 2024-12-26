const israelCities = [
    // Major Cities
    { name: 'תל אביב-יפו', coordinates: { lat: 32.0853, lng: 34.7818 } },
    { name: 'ירושלים', coordinates: { lat: 31.7683, lng: 35.2137 } },
    { name: 'חיפה', coordinates: { lat: 32.7940, lng: 34.9896 } },
    { name: 'באר שבע', coordinates: { lat: 31.2461, lng: 34.7916 } },
    
    // Central District
    { name: 'רחובות', coordinates: { lat: 31.8935, lng: 34.8089 } },
    { name: 'נתניה', coordinates: { lat: 32.3340, lng: 34.8584 } },
    { name: 'ראשון לציון', coordinates: { lat: 31.9605, lng: 34.7930 } },
    { name: 'אשדוד', coordinates: { lat: 31.8048, lng: 34.6550 } },
    { name: 'הרצליה', coordinates: { lat: 32.1634, lng: 34.8412 } },
    { name: 'בני ברק', coordinates: { lat: 32.0850, lng: 34.8516 } },
    { name: 'רמת גן', coordinates: { lat: 32.0733, lng: 34.8167 } },
    { name: 'פתח תקווה', coordinates: { lat: 32.0881, lng: 34.8673 } },
    { name: 'כפר סבא', coordinates: { lat: 32.1848, lng: 34.9057 } },
    
    // Northern District
    { name: 'נצרת', coordinates: { lat: 32.7000, lng: 35.3000 } },
    { name: 'עפולה', coordinates: { lat: 32.6333, lng: 35.2833 } },
    { name: 'קרית שמונה', coordinates: { lat: 33.2067, lng: 35.5700 } },
    { name: 'נהריה', coordinates: { lat: 33.0030, lng: 35.0920 } },
    
    // Southern District
    { name: 'אילת', coordinates: { lat: 29.5577, lng: 34.9519 } },
    { name: 'דימונה', coordinates: { lat: 31.0667, lng: 34.9333 } },
    { name: 'ערד', coordinates: { lat: 31.2500, lng: 35.2167 } },
    
    // Haifa District
    { name: 'קרית ים', coordinates: { lat: 32.8300, lng: 35.0800 } },
    { name: 'חדרה', coordinates: { lat: 32.4333, lng: 34.9167 } },
    { name: 'קרית מוצקין', coordinates: { lat: 32.8167, lng: 35.0667 } },
    
    // Jerusalem District
    { name: 'ביתר עילית', coordinates: { lat: 31.7167, lng: 35.2167 } },
    { name: 'מודיעין-מכבים-רעות', coordinates: { lat: 31.8970, lng: 35.0050 } },
    
    // More cities can be added
  ].sort((a, b) => a.name.localeCompare(b.name, 'he'));
  
  export default israelCities;
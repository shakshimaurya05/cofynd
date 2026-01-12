const express = require('express');

const router = express.Router();
const space = require('../models/space');

//GET all spaces
router.get('/',async(req,res) => {
  try{
    const spaces = await space.find();
    res.json(spaces);
  }
  catch(err){
    res.status(500).json({
      message : err.message
    });
  }
});

//GET spaces by space type(coworking, coliving, virtual office)
router.get('/type/:type', async (req, res) => {
  try {
    const query = { spaceType: req.params.type };

    // If city is passed as query param, add it
    if (req.query.city) {
      query.city = req.query.city;
    }

    const spaces = await space.find(query);
    res.json(spaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//GET spaces by city
router.get('/city/:city', async(req,res) => {
  try{
    const spaces = await space.find({city : req.params.city});
    res.json(spaces);
  }
  catch(err){
    res.status(500).json({message : err.message});
  }
});

//GET a specific space by ID
router.get('/:id', async(req,res) => {
  try{
    const spaces = await space.findById(req.params.id);
    if(!spaces) {
      return res.json({
        message : 'Space not found'
      });
    }
    res.json(spaces);
  }
  catch(err){
    res.status(500).json({message : err.message});
  }
});




// POST route to add sample data (for testing purposes)
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await space.collection.deleteMany({});
    
    // Sample data based on  frontend listings
    const sampleSpaces = [
      {
        name: "WeWork Cyber Hub",
        description: "Premium coworking space in Cyber Hub",
        spaceType: "coworking",
        city: "gurgaon",
        location: "Cyber Hub",
        pricePerMonth: 32000,
        rating: 4.7,
        amenities: ["WiFi", "Meeting Rooms", "24x7 Access"],
        image: "cowork1.avif",
      },
      {
        name: "Awfis Udyog Vihar",
        description: "Modern coworking space for startups",
        spaceType: "coworking",
        city: "gurgaon",
        location: "Udyog Vihar",
        pricePerMonth: 22000,
        rating: 4.5,
        amenities: ["WiFi", "Cafe", "Parking"],
        image: "cowork2.avif",
      },
      {
        name: "91Springboard Sector 44",
        description: "Community-driven coworking space",
        spaceType: "coworking",
        city: "gurgaon",
        location: "Sector 44",
        pricePerMonth: 20000,
        rating: 4.4,
        amenities: ["WiFi", "Events", "Meeting Rooms"],
        image: "cowork3.avif",
      },
      {
        name: "Stanza Living DLF Phase 2",
        description: "Premium coliving with meals",
        spaceType: "coliving",
        city: "gurgaon",
        location: "DLF Phase 2",
        pricePerMonth: 18000,
        rating: 4.5,
        amenities: ["WiFi", "Meals", "Housekeeping"],
        image: "coliv1.avif",
      },
      {
        name: "Zolo Cyber City",
        description: "Affordable coliving near offices",
        spaceType: "coliving",
        city: "gurgaon",
        location: "Cyber City",
        pricePerMonth: 16000,
        rating: 4.3,
        amenities: ["WiFi", "Laundry", "Security"],
        image: "coliv2.avif",
      },
      {
        name: "Housr Sector 45",
        description: "Luxury coliving with gym",
        spaceType: "coliving",
        city: "gurgaon",
        location: "Sector 45",
        pricePerMonth: 20000,
        rating: 4.6,
        amenities: ["WiFi", "Gym", "Meals"],
        image: "coliv3.jpg",
      },
      {
        name: "Virtual Office Cyber Hub",
        description: "Business address in Cyber Hub",
        spaceType: "virtual-office",
        city: "gurgaon",
        location: "Cyber Hub",
        pricePerMonth: 2500,
        rating: 4.6,
        amenities: ["GST Registration", "Mail Handling"],
        image: "vir1.webp",
      },
      {
        name: "Virtual Office Udyog Vihar",
        description: "Virtual office for startups",
        spaceType: "virtual-office",
        city: "gurgaon",
        location: "Udyog Vihar",
        pricePerMonth: 2200,
        rating: 4.4,
        amenities: ["Business Address", "Reception"],
        image: "vir2.webp",
      },
      {
        name: "Virtual Office Sector 44",
        description: "Affordable virtual office",
        spaceType: "virtual-office",
        city: "gurgaon",
        location: "Sector 44",
        pricePerMonth: 2000,
        rating: 4.3,
        amenities: ["Mailing Address", "Compliance"],
        image: "vir3.webp",
      },
      {
        name: "WeWork Connaught Place",
        description: "Central Delhi coworking space",
        spaceType: "coworking",
        city: "delhi",
        location: "Connaught Place",
        pricePerMonth: 30000,
        rating: 4.6,
        amenities: ["WiFi", "Meeting Rooms", "Cafe"],
        image: "cowork4.avif",
      },
      {
        name: "Innov8 CP",
        description: "Creative coworking space",
        spaceType: "coworking",
        city: "delhi",
        location: "Connaught Place",
        pricePerMonth: 24000,
        rating: 4.4,
        amenities: ["WiFi", "Events", "Cafe"],
        image: "cowork5.avif",
      },
      {
        name: "Awfis Nehru Place",
        description: "Corporate coworking hub",
        spaceType: "coworking",
        city: "delhi",
        location: "Nehru Place",
        pricePerMonth: 22000,
        rating: 4.5,
        amenities: ["WiFi", "Parking", "Security"],
        image: "cowork6.avif",
      },
      {
        name: "Stanza Living North Campus",
        description: "Student-friendly coliving",
        spaceType: "coliving",
        city: "delhi",
        location: "North Campus",
        pricePerMonth: 15000,
        rating: 4.4,
        amenities: ["WiFi", "Meals", "Laundry"],
        image: "coliv4.jpg",
      },
      {
        name: "Zolo South Delhi",
        description: "Comfortable coliving for professionals",
        spaceType: "coliving",
        city: "delhi",
        location: "South Delhi",
        pricePerMonth: 17000,
        rating: 4.3,
        amenities: ["WiFi", "Housekeeping"],
        image: "coliv5.jpg",
      },
      {
        name: "Housr Saket",
        description: "Premium coliving space",
        spaceType: "coliving",
        city: "delhi",
        location: "Saket",
        pricePerMonth: 19000,
        rating: 4.6,
        amenities: ["WiFi", "Gym", "Meals"],
        image: "coliv6.jpg",
      },
      {
        name: "Virtual Office CP",
        description: "Prime Delhi business address",
        spaceType: "virtual-office",
        city: "delhi",
        location: "Connaught Place",
        pricePerMonth: 2600,
        rating: 4.7,
        amenities: ["GST Registration", "Mail Handling"],
        image: "vir4.jpg",
      },
      {
        name: "Virtual Office Nehru Place",
        description: "Affordable virtual office",
        spaceType: "virtual-office",
        city: "delhi",
        location: "Nehru Place",
        pricePerMonth: 2200,
        rating: 4.4,
        amenities: ["Business Address"],
        image: "vir5.jpg",
      },
      {
        name: "Virtual Office Saket",
        description: "Startup-friendly virtual office",
        spaceType: "virtual-office",
        city: "delhi",
        location: "Saket",
        pricePerMonth: 2000,
        rating: 4.3,
        amenities: ["Mailing Address"],
        image: "vir6.jpg",
      },
      {
        name: "91Springboard Sector 62",
        description: "Coworking for tech companies",
        spaceType: "coworking",
        city: "noida",
        location: "Sector 62",
        pricePerMonth: 20000,
        rating: 4.4,
        amenities: ["WiFi", "Meeting Rooms"],
        image: "cowork7.avif",
      },
      {
        name: "Awfis Sector 16",
        description: "Modern coworking in Noida",
        spaceType: "coworking",
        city: "noida",
        location: "Sector 16",
        pricePerMonth: 21000,
        rating: 4.5,
        amenities: ["WiFi", "Cafe"],
        image: "cowork8.avif",
      },
      {
        name: "Innov8 Sector 18",
        description: "Creative coworking hub",
        spaceType: "coworking",
        city: "noida",
        location: "Sector 18",
        pricePerMonth: 23000,
        rating: 4.6,
        amenities: ["WiFi", "Events"],
        image: "cowork9.avif",
      },
      {
        name: "Zolo Sector 62",
        description: "Affordable coliving in Noida",
        spaceType: "coliving",
        city: "noida",
        location: "Sector 62",
        pricePerMonth: 14000,
        rating: 4.2,
        amenities: ["WiFi", "Laundry"],
        image: "coliv7.jpg",
      },
      {
        name: "Stanza Living Sector 15",
        description: "Premium student coliving",
        spaceType: "coliving",
        city: "noida",
        location: "Sector 15",
        pricePerMonth: 16000,
        rating: 4.4,
        amenities: ["WiFi", "Meals"],
        image: "coliv8.jpg",
      },
      {
        name: "Housr Sector 18",
        description: "Luxury coliving space",
        spaceType: "coliving",
        city: "noida",
        location: "Sector 18",
        pricePerMonth: 18000,
        rating: 4.5,
        amenities: ["WiFi", "Gym"],
        image: "coliv9.jpg",
      },
      {
        name: "Virtual Office Sector 62",
        description: "Business address in Noida",
        spaceType: "virtual-office",
        city: "noida",
        location: "Sector 62",
        pricePerMonth: 2000,
        rating: 4.4,
        amenities: ["Mail Handling"],
        image: "vir7.jpg",
      },
      {
        name: "Virtual Office Sector 16",
        description: "Affordable virtual office",
        spaceType: "virtual-office",
        city: "noida",
        location: "Sector 16",
        pricePerMonth: 1800,
        rating: 4.3,
        amenities: ["Business Address"],
        image: "vir8.jpg",
      },
      {
        name: "Virtual Office Sector 18",
        description: "Startup-friendly virtual office",
        spaceType: "virtual-office",
        city: "noida",
        location: "Sector 18",
        pricePerMonth: 1900,
        rating: 4.4,
        amenities: ["Compliance Support"],
        image: "vir9.webp",
      },
      {
        name: "Awfis Knowledge Park",
        description: "Coworking near universities",
        spaceType: "coworking",
        city: "greater-noida",
        location: "Knowledge Park",
        pricePerMonth: 18000,
        rating: 4.3,
        amenities: ["WiFi", "Parking"],
        image: "cowork10.avif",
      },
      {
        name: "Innov8 Pari Chowk",
        description: "Creative coworking space",
        spaceType: "coworking",
        city: "greater-noida",
        location: "Pari Chowk",
        pricePerMonth: 19000,
        rating: 4.4,
        amenities: ["WiFi", "Cafe"],
        image: "cowork11.avif",
      },
      {
        name: "91Springboard Alpha",
        description: "Startup-focused coworking",
        spaceType: "coworking",
        city: "greater-noida",
        location: "Alpha",
        pricePerMonth: 17000,
        rating: 4.2,
        amenities: ["WiFi", "Events"],
        image: "cowork12.avif",
      },
      {
        name: "Zolo Knowledge Park",
        description: "Coliving for students",
        spaceType: "coliving",
        city: "greater-noida",
        location: "Knowledge Park",
        pricePerMonth: 13000,
        rating: 4.1,
        amenities: ["WiFi", "Laundry"],
        image: "coliv10.jpg",
      },
      {
        name: "Stanza Living Alpha",
        description: "Comfortable coliving space",
        spaceType: "coliving",
        city: "greater-noida",
        location: "Alpha",
        pricePerMonth: 15000,
        rating: 4.3,
        amenities: ["WiFi", "Meals"],
        image: "coliv11.jpg",
      },
      {
        name: "Housr Pari Chowk",
        description: "Premium coliving",
        spaceType: "coliving",
        city: "greater-noida",
        location: "Pari Chowk",
        pricePerMonth: 17000,
        rating: 4.5,
        amenities: ["WiFi", "Gym"],
        image: "coliv12.jpg",
      },
      {
        name: "Virtual Office Pari Chowk",
        description: "Affordable virtual office",
        spaceType: "virtual-office",
        city: "greater-noida",
        location: "Pari Chowk",
        pricePerMonth: 1700,
        rating: 4.2,
        amenities: ["Mail Handling"],
        image: "vir10.jpg",
      },
      {
        name: "Virtual Office Alpha",
        description: "Business address in Alpha",
        spaceType: "virtual-office",
        city: "greater-noida",
        location: "Alpha",
        pricePerMonth: 1800,
        rating: 4.3,
        amenities: ["Compliance Support"],
        image: "vir11.jpg",
      },
      {
        name: "Virtual Office Knowledge Park",
        description: "Startup-friendly virtual office",
        spaceType: "virtual-office",
        city: "greater-noida",
        location: "Knowledge Park",
        pricePerMonth: 1900,
        rating: 4.4,
        amenities: ["Business Address"],
        image: "vir12.jpg",
      }
    ];
    
    // Insert sample data
    await space.insertMany(sampleSpaces);
    
    res.status(201).json({ message: 'Sample data added successfully', count: sampleSpaces.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const Fountain = require('../models').Fountain;

var fs = require('fs').promises;

const searchDrinkingFountains = async (req, res) => {
  const latitude = parseFloat(req.params.lat);
  const longitude = parseFloat(req.params.lon);
  const radius = parseFloat(req.params.rad) // Default radius is 1 km

  // Calculate bounding box coordinates
  const latDelta = radius / 111.32;

  const lonDelta = Math.abs(Math.cos(latitude) * (radius / 111.32));

  const bbox1 = latitude - latDelta;
  const bbox2 = longitude - lonDelta;
  const bbox3 = latitude + latDelta;
  const bbox4 = longitude + lonDelta;

  // const bbox = `${(latitude - latDelta)},${(longitude - lonDelta)},${(latitude + latDelta)},${(longitude + lonDelta)}`;
  const bbox = `${bbox1},${bbox2},${bbox3},${bbox4}`;

  // Fetch drinking fountains from OpenStreetMap
  async function findDrinkingFountains(latitude, longitude, radius) {
    try {
      const response = await fetch(
        'https://maps.mail.ru/osm/tools/overpass/api/interpreter?'
        , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: `[out:json];node["amenity"="drinking_water"](${bbox});out;`
        })
      const data = await response.json()

      return data;
    } catch (error) {
      console.error('Error occurred while fetching drinking fountains:', error);
      throw error;
    }
  }
  const foundFountains = await findDrinkingFountains(latitude, longitude, radius)
  console.log(foundFountains, "foundFountains")
  createNewFountain(foundFountains)
  // Convert the response to JSON
  res.status(200).json(foundFountains)
}

async function createNewFountain(foundFountains) {
  foundFountains.elements?.map(async (fountain) => {
    try {
      const newFountain = await Fountain.create({
        id: parseInt(fountain.id),
        nodeId: parseInt(fountain.id),
        lat: parseFloat(fountain.lat),
        lon: parseFloat(fountain.lon),
        avgRating: 0,
        tags: fountain.tags,
        profileId: 0,
        name: '',
      })
      res.status(201).json(newFountain)
      // console.log(newFountain, "N E W F O U N T A I N")
    } catch (error) {
      console.log(error, "error")
    }
  })
}

async function index(req, res) {
  try {
    const fountains = await Fountain.findAll()
    res.json(fountains)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}


// Helper function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}
// Helper function to convert degrees to radians
const degToRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

async function getRatings(req, res) {
  try {
    const fountain = await Fountain
    const ratings = await fountain.getRatings() // Get all ratings for this fountain
    res.json(ratings)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}



async function show(req, res) {
  try {
    const fountain = await Fountain.findByPk(req.params.id)
    res.json(fountain)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const fountain = await Fountain.findByPk(req.params.id)
    await fountain.update(req.body)
    res.status(202).json(fountain)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function destroy(req, res) {
  try {
    const fountain = await Fountain.findByPk(req.params.id)
    await fountain.destroy()
    res.status(204).json(fountain)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { show, update, destroy, searchDrinkingFountains, index, createNewFountain, getRatings}
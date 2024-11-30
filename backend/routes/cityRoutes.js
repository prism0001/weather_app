import express from 'express';
import City from '../models/City.js';
import { getWeatherData } from '../services/weatherService.js';

const router = express.Router();

// Get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find().sort({ createdAt: -1 });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get weather for a specific city
router.get('/:id/weather', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    const weatherData = await getWeatherData(city.name);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new city
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    // First check if the city exists in OpenWeather
    await getWeatherData(name);
    
    // If weather check passes, save the city
    const city = new City({ name });
    const savedCity = await city.save();
    res.status(201).json(savedCity);
  } catch (error) {
    if (error.message === 'City not found') {
      res.status(404).json({ message: 'Invalid city name' });
    } else if (error.code === 11000) {
      res.status(400).json({ message: 'City already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete a city
router.delete('/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
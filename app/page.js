'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [weather, setWeather] = useState(null);
  const [cachedData, setCachedData] = useState(null);
  const [city, setCity] = useState('London');

  const fetchVisitorCount = async () => {
    console.log('📊 Fetching visitor count...');
    try {
      const res = await fetch('/api/counter');
      const data = await res.json();
      console.log('✅ Visitor count received:', data);
      setVisitorCount(data.visitorCount);
    } catch (error) {
      console.error('❌ Error fetching visitor count:', error);
    }
  };

  const fetchWeather = async () => {
    console.log('🌤️ Fetching weather for:', city);
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      console.log('✅ Weather data received:', data);
      setWeather(data);
    } catch (error) {
      console.error('❌ Error fetching weather:', error);
    }
  };

  const fetchCachedData = async () => {
    console.log('📡 Fetching cached data...');
    try {
      const res = await fetch('/api/cached-data');
      const data = await res.json();
      console.log('✅ Cached data received:', data);
      setCachedData(data);
    } catch (error) {
      console.error('❌ Error fetching cached data:', error);
    }
  };

  useEffect(() => {
    console.log('🔄 Initial page load - fetching visitor count');
    fetchVisitorCount();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">API Testing Dashboard</h1>
      
      <div className="space-y-8">
        {/* Visitor Counter */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Visitor Counter</h2>
          <p>Total Visitors: {visitorCount}</p>
          <button 
            onClick={fetchVisitorCount}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Refresh Count
          </button>
        </div>

        {/* Weather API */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Weather API</h2>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 mr-2"
            placeholder="Enter city name"
          />
          <button 
            onClick={fetchWeather}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Get Weather
          </button>
          {weather && (
            <div className="mt-2">
              <p>Temperature: {weather.temperature}°C</p>
              <p>Description: {weather.description}</p>
            </div>
          )}
        </div>

        {/* Cached Data */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Cached Data</h2>
          <button 
            onClick={fetchCachedData}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Fetch Cached Data
          </button>
          {cachedData && (
            <div className="mt-2">
              <p>From Cache: {cachedData.fromCache ? 'Yes' : 'No'}</p>
              <pre className="mt-2 bg-gray-100 p-2 rounded">
                {JSON.stringify(cachedData.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
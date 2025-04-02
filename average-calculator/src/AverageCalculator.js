import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://20.244.56.144/evaluation-service/numbers";

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState("p"); // Default to prime numbers
  const [bearerToken, setBearerToken] = useState("");
  const [average, setAverage] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState("");

  const fetchNumbers = async () => {
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/${numberType}`, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });

      setNumbers(response.data.numbers);
      setAverage(response.data.avg);
    } catch (err) {
      setError("Failed to fetch numbers. Check your token and input.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Average HTTP Calculator</h1>
      <input
        className="p-2 border mb-2 w-80"
        type="text"
        placeholder="Enter Bearer Token"
        value={bearerToken}
        onChange={(e) => setBearerToken(e.target.value)}
      />
      <select
        className="p-2 border mb-2 w-80"
        onChange={(e) => setNumberType(e.target.value)}
        value={numberType}
      >
        <option value="p">Prime Numbers</option>
        <option value="f">Fibonacci Numbers</option>
        <option value="e">Even Numbers</option>
        <option value="r">Random Numbers</option>
      </select>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchNumbers}
      >
        Calculate Average
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {average !== null && (
        <div className="mt-4 p-4 bg-green-100 border w-80 text-center">
          <h2 className="text-lg font-bold">Average: {average}</h2>
          <p>Numbers: {numbers.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
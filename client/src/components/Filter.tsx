// src/components/Filter.tsx
import React, { useState } from "react";

interface FilterProps {
  onApply: (filters: {
    searchTerm: string;
    genre: string;
    yearAfter: number | "";
    minMinutes: number | "";
    minimalRatings: number | "";
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onApply }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [yearAfter, setYearAfter] = useState<number | "">("");
  const [minMinutes, setMinMinutes] = useState<number | "">("");
  const [minimalRatings, setMinimalRatings] = useState<number | "">("");

  const handleApply = () => {
    onApply({
      searchTerm,
      genre,
      yearAfter,
      minMinutes,
      minimalRatings,
    });
  };

  return (
    <div className="mb-4 p-4 border rounded flex flex-col space-y-2">
      <div className="flex flex-col md:flex-row md:space-x-2">
        <input
          type="text"
          placeholder="Search by title or director"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          {/* Add other genres as needed */}
        </select>
        <input
          type="number"
          placeholder="Year (After)"
          value={yearAfter}
          onChange={(e) => setYearAfter(e.target.value ? parseInt(e.target.value) : "")}
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>
      <div className="flex flex-col md:flex-row md:space-x-2">
        <input
          type="number"
          placeholder="Min Minutes"
          value={minMinutes}
          onChange={(e) => setMinMinutes(e.target.value ? parseInt(e.target.value) : "")}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <input
          type="number"
          placeholder="Minimal Ratings"
          value={minimalRatings}
          onChange={(e) => setMinimalRatings(e.target.value ? parseInt(e.target.value) : "")}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white py-2 px-4 rounded md:w-1/3"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;

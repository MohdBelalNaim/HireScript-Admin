import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, X } from "lucide-react";

// Comprehensive list of major Indian cities with state information
const indianCities = [
  // Andhra Pradesh
  { name: "Visakhapatnam", state: "Andhra Pradesh" },
  { name: "Vijayawada", state: "Andhra Pradesh" },
  { name: "Guntur", state: "Andhra Pradesh" },
  { name: "Nellore", state: "Andhra Pradesh" },
  { name: "Kurnool", state: "Andhra Pradesh" },
  { name: "Rajahmundry", state: "Andhra Pradesh" },
  { name: "Tirupati", state: "Andhra Pradesh" },

  // Arunachal Pradesh
  { name: "Itanagar", state: "Arunachal Pradesh" },
  { name: "Naharlagun", state: "Arunachal Pradesh" },

  // Assam
  { name: "Guwahati", state: "Assam" },
  { name: "Silchar", state: "Assam" },
  { name: "Dibrugarh", state: "Assam" },
  { name: "Jorhat", state: "Assam" },
  { name: "Nagaon", state: "Assam" },
  { name: "Tinsukia", state: "Assam" },

  // Bihar
  { name: "Patna", state: "Bihar" },
  { name: "Gaya", state: "Bihar" },
  { name: "Bhagalpur", state: "Bihar" },
  { name: "Muzaffarpur", state: "Bihar" },
  { name: "Purnia", state: "Bihar" },
  { name: "Darbhanga", state: "Bihar" },
  { name: "Bihar Sharif", state: "Bihar" },

  // Chhattisgarh
  { name: "Raipur", state: "Chhattisgarh" },
  { name: "Bhilai", state: "Chhattisgarh" },
  { name: "Korba", state: "Chhattisgarh" },
  { name: "Bilaspur", state: "Chhattisgarh" },
  { name: "Durg", state: "Chhattisgarh" },

  // Goa
  { name: "Panaji", state: "Goa" },
  { name: "Vasco da Gama", state: "Goa" },
  { name: "Margao", state: "Goa" },

  // Gujarat
  { name: "Ahmedabad", state: "Gujarat" },
  { name: "Surat", state: "Gujarat" },
  { name: "Vadodara", state: "Gujarat" },
  { name: "Rajkot", state: "Gujarat" },
  { name: "Bhavnagar", state: "Gujarat" },
  { name: "Jamnagar", state: "Gujarat" },
  { name: "Junagadh", state: "Gujarat" },
  { name: "Gandhinagar", state: "Gujarat" },
  { name: "Anand", state: "Gujarat" },

  // Haryana
  { name: "Gurgaon", state: "Haryana" },
  { name: "Faridabad", state: "Haryana" },
  { name: "Panipat", state: "Haryana" },
  { name: "Ambala", state: "Haryana" },
  { name: "Yamunanagar", state: "Haryana" },
  { name: "Rohtak", state: "Haryana" },
  { name: "Hisar", state: "Haryana" },
  { name: "Karnal", state: "Haryana" },

  // Himachal Pradesh
  { name: "Shimla", state: "Himachal Pradesh" },
  { name: "Dharamshala", state: "Himachal Pradesh" },
  { name: "Solan", state: "Himachal Pradesh" },
  { name: "Mandi", state: "Himachal Pradesh" },
  { name: "Kullu", state: "Himachal Pradesh" },

  // Jharkhand
  { name: "Ranchi", state: "Jharkhand" },
  { name: "Jamshedpur", state: "Jharkhand" },
  { name: "Dhanbad", state: "Jharkhand" },
  { name: "Bokaro", state: "Jharkhand" },
  { name: "Deoghar", state: "Jharkhand" },

  // Karnataka
  { name: "Bengaluru", state: "Karnataka" },
  { name: "Mysore", state: "Karnataka" },
  { name: "Hubli", state: "Karnataka" },
  { name: "Mangalore", state: "Karnataka" },
  { name: "Belgaum", state: "Karnataka" },
  { name: "Gulbarga", state: "Karnataka" },
  { name: "Davangere", state: "Karnataka" },
  { name: "Ballari", state: "Karnataka" },
  { name: "Bijapur", state: "Karnataka" },

  // Kerala
  { name: "Kochi", state: "Kerala" },
  { name: "Thiruvananthapuram", state: "Kerala" },
  { name: "Kozhikode", state: "Kerala" },
  { name: "Thrissur", state: "Kerala" },
  { name: "Kollam", state: "Kerala" },
  { name: "Kannur", state: "Kerala" },
  { name: "Kottayam", state: "Kerala" },
  { name: "Palakkad", state: "Kerala" },

  // Madhya Pradesh
  { name: "Bhopal", state: "Madhya Pradesh" },
  { name: "Indore", state: "Madhya Pradesh" },
  { name: "Gwalior", state: "Madhya Pradesh" },
  { name: "Jabalpur", state: "Madhya Pradesh" },
  { name: "Ujjain", state: "Madhya Pradesh" },
  { name: "Sagar", state: "Madhya Pradesh" },
  { name: "Dewas", state: "Madhya Pradesh" },
  { name: "Satna", state: "Madhya Pradesh" },

  // Maharashtra
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Nagpur", state: "Maharashtra" },
  { name: "Thane", state: "Maharashtra" },
  { name: "Nashik", state: "Maharashtra" },
  { name: "Aurangabad", state: "Maharashtra" },
  { name: "Solapur", state: "Maharashtra" },
  { name: "Amravati", state: "Maharashtra" },
  { name: "Kolhapur", state: "Maharashtra" },
  { name: "Sangli", state: "Maharashtra" },
  { name: "Malegaon", state: "Maharashtra" },
  { name: "Akola", state: "Maharashtra" },

  // Manipur
  { name: "Imphal", state: "Manipur" },
  { name: "Thoubal", state: "Manipur" },

  // Meghalaya
  { name: "Shillong", state: "Meghalaya" },
  { name: "Tura", state: "Meghalaya" },

  // Mizoram
  { name: "Aizawl", state: "Mizoram" },
  { name: "Lunglei", state: "Mizoram" },

  // Nagaland
  { name: "Kohima", state: "Nagaland" },
  { name: "Dimapur", state: "Nagaland" },

  // Odisha
  { name: "Bhubaneswar", state: "Odisha" },
  { name: "Cuttack", state: "Odisha" },
  { name: "Rourkela", state: "Odisha" },
  { name: "Berhampur", state: "Odisha" },
  { name: "Sambalpur", state: "Odisha" },

  // Punjab
  { name: "Ludhiana", state: "Punjab" },
  { name: "Amritsar", state: "Punjab" },
  { name: "Jalandhar", state: "Punjab" },
  { name: "Patiala", state: "Punjab" },
  { name: "Bathinda", state: "Punjab" },
  { name: "Mohali", state: "Punjab" },
  { name: "Firozpur", state: "Punjab" },

  // Rajasthan
  { name: "Jaipur", state: "Rajasthan" },
  { name: "Jodhpur", state: "Rajasthan" },
  { name: "Kota", state: "Rajasthan" },
  { name: "Bikaner", state: "Rajasthan" },
  { name: "Udaipur", state: "Rajasthan" },
  { name: "Ajmer", state: "Rajasthan" },
  { name: "Bhilwara", state: "Rajasthan" },
  { name: "Alwar", state: "Rajasthan" },

  // Sikkim
  { name: "Gangtok", state: "Sikkim" },
  { name: "Namchi", state: "Sikkim" },

  // Tamil Nadu
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Coimbatore", state: "Tamil Nadu" },
  { name: "Madurai", state: "Tamil Nadu" },
  { name: "Tiruchirappalli", state: "Tamil Nadu" },
  { name: "Salem", state: "Tamil Nadu" },
  { name: "Tirunelveli", state: "Tamil Nadu" },
  { name: "Erode", state: "Tamil Nadu" },
  { name: "Vellore", state: "Tamil Nadu" },
  { name: "Thoothukudi", state: "Tamil Nadu" },

  // Telangana
  { name: "Hyderabad", state: "Telangana" },
  { name: "Warangal", state: "Telangana" },
  { name: "Nizamabad", state: "Telangana" },
  { name: "Khammam", state: "Telangana" },
  { name: "Karimnagar", state: "Telangana" },

  // Tripura
  { name: "Agartala", state: "Tripura" },
  { name: "Dharmanagar", state: "Tripura" },

  // Uttar Pradesh
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Kanpur", state: "Uttar Pradesh" },
  { name: "Ghaziabad", state: "Uttar Pradesh" },
  { name: "Agra", state: "Uttar Pradesh" },
  { name: "Varanasi", state: "Uttar Pradesh" },
  { name: "Meerut", state: "Uttar Pradesh" },
  { name: "Prayagraj", state: "Uttar Pradesh" },
  { name: "Bareilly", state: "Uttar Pradesh" },
  { name: "Aligarh", state: "Uttar Pradesh" },
  { name: "Moradabad", state: "Uttar Pradesh" },
  { name: "Saharanpur", state: "Uttar Pradesh" },
  { name: "Gorakhpur", state: "Uttar Pradesh" },
  { name: "Noida", state: "Uttar Pradesh" },

  // Uttarakhand
  { name: "Dehradun", state: "Uttarakhand" },
  { name: "Haridwar", state: "Uttarakhand" },
  { name: "Roorkee", state: "Uttarakhand" },
  { name: "Haldwani", state: "Uttarakhand" },
  { name: "Rudrapur", state: "Uttarakhand" },

  // West Bengal
  { name: "Kolkata", state: "West Bengal" },
  { name: "Howrah", state: "West Bengal" },
  { name: "Durgapur", state: "West Bengal" },
  { name: "Asansol", state: "West Bengal" },
  { name: "Siliguri", state: "West Bengal" },
  { name: "Malda", state: "West Bengal" },
  { name: "Kharagpur", state: "West Bengal" },

  // Union Territories
  { name: "New Delhi", state: "Delhi" },
  { name: "Delhi", state: "Delhi" },
  { name: "Chandigarh", state: "Chandigarh" },
  { name: "Puducherry", state: "Puducherry" },
  { name: "Port Blair", state: "Andaman and Nicobar Islands" },
  { name: "Kavaratti", state: "Lakshadweep" },
  { name: "Daman", state: "Dadra and Nagar Haveli and Daman and Diu" },
  { name: "Silvassa", state: "Dadra and Nagar Haveli and Daman and Diu" },
  { name: "Leh", state: "Ladakh" },
  { name: "Kargil", state: "Ladakh" },
  { name: "Srinagar", state: "Jammu and Kashmir" },
  { name: "Jammu", state: "Jammu and Kashmir" },
];

const CityAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter city name",
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [filteredCities, setFilteredCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = indianCities
        .filter(
          (city) =>
            city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            city.state.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 10); // Limit to 10 results
      setFilteredCities(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredCities([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleCitySelect = (city) => {
    const cityString = `${city.name}, ${city.state}`;
    setInputValue(cityString);
    onChange(cityString);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCities.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredCities.length) {
          handleCitySelect(filteredCities[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearInput = () => {
    setInputValue("");
    onChange("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul ref={listRef} className="py-1">
            {filteredCities.map((city, index) => (
              <li
                key={`${city.name}-${city.state}`}
                className={`px-3 py-2 cursor-pointer flex items-center space-x-2 ${
                  index === selectedIndex
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => handleCitySelect(city)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <MapPin className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-gray-500">{city.state}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;

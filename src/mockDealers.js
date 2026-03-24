export const MOCK_DEALERS = [
  {
    id: "d1", name: "Bike Arena Praha",
    address: "Vinohradská 120, Praha 2", phone: "+420 222 111 333",
    connected: true,
    stock: {
      "black-S": true,  "black-M": true,  "black-L": true,  "black-XL": false,
      "red-S":   false, "red-M":   true,  "red-L":   false, "red-XL":  false,
      "grey-S":  false, "grey-M":  false, "grey-L":  false, "grey-XL": true,
    },
  },
  {
    id: "d2", name: "Koloshop Brno",
    address: "Masarykova 25, Brno", phone: "+420 533 222 444",
    connected: true,
    stock: {
      "black-S": false, "black-M": true,  "black-L": false, "black-XL": true,
      "red-S":   false, "red-M":   false, "red-L":   true,  "red-XL":  false,
      "grey-S":  false, "grey-M":  false, "grey-L":  true,  "grey-XL": false,
    },
  },
  {
    id: "d3", name: "Bike Point Liberec",
    address: "Moskevská 8, Liberec", phone: "+420 485 555 777",
    connected: true,
    stock: {
      "black-S": false, "black-M": false, "black-L": false, "black-XL": false,
      "red-S":   false, "red-M":   false, "red-L":   false, "red-XL":  true,
      "grey-S":  true,  "grey-M":  false, "grey-L":  false, "grey-XL": false,
    },
  },
];

export const BIKE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const MANUFACTURED_SIZES = ["S", "M", "L", "XL"];
export const BIKE_COLORS = ["black", "red", "grey"];

export function getSizeAvailability(colorId, sizeId) {
  if (!MANUFACTURED_SIZES.includes(sizeId)) return "not-manufactured";
  const key = `${colorId}-${sizeId}`;
  const connected = MOCK_DEALERS.filter(d => d.connected);
  return connected.some(d => d.stock[key] === true) ? "in-stock" : "unknown";
}

export function getDealersForSelection(colorId, sizeId) {
  const key = `${colorId}-${sizeId}`;
  const connected = MOCK_DEALERS.filter(d => d.connected);
  const availableDealers = connected.filter(d => d.stock[key] === true);
  const allConnectedOutOfStock = connected.length > 0 && connected.every(d => d.stock[key] === false);
  return {
    dealers: availableDealers,
    allConnectedOutOfStock,
    hasNoDealerData: availableDealers.length === 0 && !allConnectedOutOfStock,
  };
}

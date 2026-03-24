export const MOCK_DEALERS = [
  {
    id: "d1", name: "Bike Arena Praha",
    address: "Vinohradská 120, Praha 2", phone: "+420 222 111 333", email: "info@bikearena.cz",
    connected: true,
    stock: {
      "red-S": false, "red-M": true, "red-L": true, "red-XL": false,
      "blue-S": false, "blue-M": false, "blue-L": false, "blue-XL": true,
    },
  },
  {
    id: "d2", name: "Koloshop Brno",
    address: "Masarykova 25, Brno", phone: "+420 533 222 444", email: "obchod@koloshop.cz",
    connected: true,
    stock: {
      "red-S": false, "red-M": true, "red-L": false, "red-XL": true,
      "blue-S": false, "blue-M": false, "blue-L": true, "blue-XL": false,
    },
  },
  {
    id: "d3", name: "Bike Point Liberec",
    address: "Moskevská 8, Liberec", phone: "+420 485 555 777", email: "prodej@bikepoint.cz",
    connected: true,
    stock: {
      "red-S": false, "red-M": false, "red-L": false, "red-XL": false,
      "blue-S": true, "blue-M": false, "blue-L": false, "blue-XL": false,
    },
  },
  {
    id: "d4", name: "Cykloservis Ostrava",
    address: "Nádražní 15, Ostrava", phone: "+420 599 333 555", email: "servis@cykloostrava.cz",
    connected: false, stock: {},
  },
  {
    id: "d5", name: "Superior Store Plzeň",
    address: "Americká 42, Plzeň", phone: "+420 377 444 666", email: "plzen@superior.cz",
    connected: false, stock: {},
  },
];

export const BIKE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const MANUFACTURED_SIZES = ["S", "M", "L", "XL"];

export function getSizeAvailability(colorId, sizeId) {
  if (!MANUFACTURED_SIZES.includes(sizeId)) return "not-manufactured";
  const key = `${colorId}-${sizeId}`;
  const connected = MOCK_DEALERS.filter(d => d.connected);
  return connected.some(d => d.stock[key] === true) ? "in-stock" : "unknown";
}

const AVAIL_ORDER = { available: 0, unknown: 1, unavailable: 2 };

export function getDealersForSelection(colorId, sizeId) {
  const key = `${colorId}-${sizeId}`;
  const connected = MOCK_DEALERS.filter(d => d.connected);
  const allConnectedOutOfStock = connected.length > 0 && connected.every(d => d.stock[key] === false);

  const dealerList = MOCK_DEALERS.map(dealer => ({
    ...dealer,
    availability: !dealer.connected ? "unknown" : dealer.stock[key] ? "available" : "unavailable",
  }));
  dealerList.sort((a, b) => AVAIL_ORDER[a.availability] - AVAIL_ORDER[b.availability]);

  return { dealers: dealerList, allConnectedOutOfStock };
}

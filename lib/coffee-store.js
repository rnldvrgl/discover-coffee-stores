// Get URL for Coffee Stores
const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

// Fetch Coffee Stores
export const fetchCoffeeStores = async () => {
    // API from Four Square
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY,
        }
    };

    // Add Await if the Response returns Promise
    const response = await fetch(getUrlForCoffeeStores('15.24%2C120.59', 'coffee%20stores', 6), options);

    const data = await response.json();

    return data.results;

    // .catch (err => console.error(err));
}
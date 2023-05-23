import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    // ...other fetch options
});

// Get URL for Coffee Stores
const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 30,
    });
    const unsplashResults = photos.response?.results || [];
    return unsplashResults.map((result) => result.urls["small"]);
};


// Fetch Coffee Stores
export const fetchCoffeeStores = async (
    latLong = '15.20498870578876%2C120.58003521272931',
    limit = 8
) => {

    const photos = await getListOfCoffeeStorePhotos();

    // API from Four Square
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        }
    };

    // Add Await if the Response returns Promise
    const response = await fetch(getUrlForCoffeeStores(latLong, 'coffee', limit), options);

    const data = await response.json();

    return data.results.map((result, idx) => { //idx is index
        return {
            id: result.fsq_id,
            name: result.name,
            address: result.location.formatted_address,
            imgUrl: photos.length > 0 ? photos[idx] : null,  //photos is an array as well so we can loop here
        };
    });

    // .catch (err => console.error(err));
}
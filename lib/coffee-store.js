import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

// Get URL for Coffee Stores
const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

const getListOfCoffeeStorePhotos = async () => {
    // API Search from Unplash
    const photos = await unsplash.search.getPhotos({
        query: 'coffee stores',
        page: 1,
        perPage: 30,
    });

    const unplashResults = photos.response.results;

    // Map the photos results to unsplashResults Variable
    return unplashResults.map(result => result.urls["small"]);

    console.log({ unplashResults })
}


// Fetch Coffee Stores
export const fetchCoffeeStores = async (latLong = '15.24,120.59') => {
    const photos = await getListOfCoffeeStorePhotos();

    // API from Four Square
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY,
        }
    };

    // Add Await if the Response returns Promise

    const response = await fetch(getUrlForCoffeeStores(latLong, 'coffee%20stores', 6), options);

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
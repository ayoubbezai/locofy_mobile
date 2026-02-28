import destinations from "../../assets/data/destinations.json";

export default async function DestinationServices({ search = '', perPage = 10, page = 1, filters = {} }) {
    const delay = search ? 600 : 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    let result = [...destinations];

    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(d => 
            d.city_name.toLowerCase().includes(searchLower) ||
            d.country.toLowerCase().includes(searchLower) ||
            d.flight_code.toLowerCase().includes(searchLower)
        );
    }

    if (filters.types) {
        result = result.filter(d => d.types && d.types.includes(filters.types));
    }

    const start = (page - 1) * perPage;
    const paginated = result.slice(start, start + perPage);

    return { data: paginated, total: result.length, page, perPage };
}
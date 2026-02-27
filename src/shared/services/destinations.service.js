import destinations from "../../../assets/data/destinations.json";
export default async function DestinationServices({ perPage = 10, page = 1, filters = {} }) {
    await new Promise(resolve => setTimeout(resolve, 1500));

    let result = [...destinations];

    if (filters.city_name) result = result.filter(d => d.city_name === filters.city_name);
    if (filters.country) result = result.filter(d => d.country === filters.country);
    if (filters.flight_code) result = result.filter(d => d.flight_code === filters.flight_code);
    if (filters.types?.length) result = result.filter(d => filters.types.includes(d.type));

    const start = (page - 1) * perPage;
    const paginated = result.slice(start, start + perPage);

    return { data: paginated, total: result.length, page, perPage };
}
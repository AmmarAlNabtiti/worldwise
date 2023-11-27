import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
    const { isLoading, cities: countries } = useCities();

    if (isLoading) return <Spinner />;
    if (!countries.length) return <Message message='Add your first city by clicking on city on the map' />;

    const uniqueCountries = new Set();
    const filteredCities = countries.filter((city) => {
        if (uniqueCountries.has(city.country)) {
            return false; // Skip duplicates
        }
        uniqueCountries.add(city.country);
        return true;
    });


    return (
        <ul className={styles.countryList}>
            {
                filteredCities.map((country) => <CountryItem key={country.id} country={country} />)
            }
        </ul>
    );
}

export default CountryList;

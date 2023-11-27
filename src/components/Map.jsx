import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import useURLPosition from '../hooks/useURLPosition';



function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { isLoading: isLoadingPostion, position: geolocationposition, getPosition } = useGeolocation();
    const { cities } = useCities();
    const [lat, lng] = useURLPosition();


    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng]);



    useEffect(() => {
        if (geolocationposition) setMapPosition([geolocationposition.lat, geolocationposition.lng]);
    }, [geolocationposition]);



    return (
        <div className={styles.mapContainer} >
            <Button onClick={getPosition} type="position" >
                {isLoadingPostion ? 'Loading...' : 'use your postion'}
            </Button>
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={7}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {cities.map((city) =>
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>)
                }
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>

        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}
function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: e => {


            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    });
}
export default Map;

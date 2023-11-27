import { useSearchParams } from 'react-router-dom';

function useURLPosition() {
    const [searchParam] = useSearchParams();
    const lat = searchParam.get('lat') || 0;
    const lng = searchParam.get('lng') || 0;

    return [lat, lng];
}

export default useURLPosition;

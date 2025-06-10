/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners";
import LocationMapComponent from "./LocationMapComponent";
import { locationService } from "../services/locationService";

interface LocationData {
    properties: {
        name: string;
        category: string;
    };
}

interface ListProps {
    searchValue: string;
    isDebounceCleaning: boolean;
}

function List({ searchValue, isDebounceCleaning }: ListProps) {
    const [responseData, setResponseData] = useState<LocationData[]>([]);
    const [responseLoading, setResponseLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (isDebounceCleaning) {
            setResponseData([]);
            return;
        }

        const fetchLocations = async () => {
            setResponseLoading(true);
            setError(null);
            
            try {
                const data = searchValue 
                    ? await locationService.searchLocations(searchValue)
                    : await locationService.getDefaultLocations();
                setResponseData(data);
            } catch (err) {
                setError('Failed to fetch locations');
            } finally {
                setResponseLoading(false);
            }
        };

        fetchLocations();
    }, [searchValue, isDebounceCleaning]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="List-responseData">
            {responseLoading ? (
                <div className="loading-container">
                    <ClipLoader />
                </div>
            ) : (
                responseData.map((data) => (
                    <div key={data.properties.name}>
                        <LocationMapComponent 
                            text={data.properties.name} 
                            category={data.properties.category} 
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export default List
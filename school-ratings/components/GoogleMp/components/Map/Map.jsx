import React, {useEffect, useRef, useState} from "react";

const MapComponent = ({center, zoom, children, type}) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center,
                zoom,
                mapTypeControl: false
            }));
        }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
            const transitLayer = new window.google.maps.TransitLayer();

            transitLayer.setMap(map);
        }
    }, [map])

    useEffect(() => {
        if (!map) return;

        map.setCenter(center);
    }, [center])

    useEffect(() => {
        if (!map) return;

        map.setMapTypeId(type);
    }, [type])


    return (<>
        <div ref={ref} id="map"/>
        {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {map});
            }
        })}
    </>);
}

export default MapComponent;
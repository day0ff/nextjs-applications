import React, {useEffect, useRef, useState} from "react";

const MapComponent = ({center, zoom, children}) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center,
                zoom,
            }));
        }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
            const transitLayer = new window.google.maps.TransitLayer();

            transitLayer.setMap(map);
        }
    }, [map])
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
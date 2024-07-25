import { useState, useCallback } from "react";
import { Button, Drawer } from "antd";
import searchLogo from "../utils/locationsearch.png";
import { useDispatch, useSelector } from "react-redux";
import { slelectCity } from "../utils/slices/locationSlice";
import { debounce } from "lodash";

const LocationDrawer = () => {
    const currentCity = useSelector((store) => store.location.cityName);
    const secondaryAddress=useSelector((store)=>store.location.secondaryAddress);

    const [searchText, setSearchText] = useState("");
    const [suggestedCities, setSuggestedCities] = useState([]);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const getSuggestedCities = async (value) => {
        if (!value) {
            setSuggestedCities([]);
            return;
        }
        // const res = await fetch(
        //     `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}&types=`
        // );
        const res = await fetch(
            `https://dine-dash-server-ten.vercel.app/api/suggestedPlaces?value=${value}`
        );
        const json = await res.json();
        setSuggestedCities(json.data);
    };

    const debouncedGetSuggestedCities = useCallback(debounce(getSuggestedCities, 300), []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        debouncedGetSuggestedCities(value);
    };

    const dispatch = useDispatch();

    const getCoordinates = async (place_id) => {
        // const res = await fetch(
        //     `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${place_id}`
        // );
        const res = await fetch(
            `https://dine-dash-server-ten.vercel.app/api/locationInfo?placeId=${place_id}`
        );
        const json = await res.json();
        return json.data[0].geometry.location;
    };

    const changeSelectedCity = async (city) => {
        const coordinates = await getCoordinates(city.place_id);
        const locationInfo = {
            ...coordinates,
            cityName: city.structured_formatting.main_text,
            secondaryAddress:city.structured_formatting.secondary_text,
        };
        dispatch(slelectCity(locationInfo));
        setOpen(false);
    };

    return (
        <>
            <div
                className="flex flex-col justify-start items-center p-4 bg-transparent"
                onClick={showDrawer}
            >
                <span className="pr-2 font-bold text-orange-500  hover:text-orange-400 cursor-pointer">{currentCity}</span>
                <span className="pr-2 text-orange-500  hover:text-orange-400 cursor-pointer">{secondaryAddress} ▾</span>
            </div>
            <Drawer
                title=""
                onClose={onClose}
                open={open}
                placement={"left"}
                style={{ width: 500 }}
            >
                <input
                    className="w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm my-2"
                    type="text"
                    value={searchText}
                    placeholder="Enter your location"
                    onChange={handleInputChange}
                />
                {suggestedCities.length ? (
                    <>
                        {suggestedCities.map((city) => (
                            <div
                                key={city.place_id}
                                className="cursor-pointer hover:bg-slate-100 transition duration-300"
                                onClick={() => {
                                    changeSelectedCity(city);
                                }}
                            >
                                <div className="flex items-center p-2">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/256/0/619.png"
                                        alt=""
                                        className="w-5 h-5"
                                    />
                                    <div>
                                        <p className="text-black m-2">
                                            {city.structured_formatting.main_text}
                                        </p>
                                        <p className="text-slate-500 m-2">
                                            {city.structured_formatting.secondary_text}
                                        </p>
                                    </div>
                                </div>
                                <hr className="border-dotted" />
                            </div>
                        ))}
                    </>
                ) : (
                    <img src={searchLogo} alt="" />
                )}
            </Drawer>
        </>
    );
};

export default LocationDrawer;

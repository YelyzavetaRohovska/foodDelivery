import Geocode from 'react-geocode';

export const emailError = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase()) ? "Please enter valid email" : "";
}

export const nameError = (name) => {
    if (name.trim().length < 4) {
        return "Too short name";
    }
}
export const addressError = async (addr) => {
    try {
        let response = {};
        const cords = await Geocode.fromAddress(addr, 'AIzaSyBkmkj1CyBLbR9m1K3qMvoGaLwAyd_6YmA');
        if (cords.results.length !== 1 || cords.results[0].types[0] !== 'street_address') {
            response.error = 'Address is not fulfilled';
        } else {
            const {formatted_address, geometry} = cords.results[0];
            response.address = {formatted_address, geometry}
        }
        return response;
    } catch (e) {
        return {
            error: 'Invalid address'
        }
    }
}


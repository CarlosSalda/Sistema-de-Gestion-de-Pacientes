import axios from "axios";

// const basicUrl = 'http://sistema-gestion-paciente.herokuapp.com/api';

export const altaPaciente = (obj) => {
    return axios.post(`/altaPaciente`, obj, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
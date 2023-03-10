import { useHttp } from "../hooks/http.hook";

export const useRickMortylService = () => {
    const {loading, request} = useHttp();
    const _apiBase = 'https://rickandmortyapi.com/api/';

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}character/${id}`);
        return res;
    }
    
    const getCharactersPage = async (page) => {
        const res = await request(`${_apiBase}character/?page=${page}`);
        return res.results;
    }


    return {loading,  getCharacter, getCharactersPage}
}


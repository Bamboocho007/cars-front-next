import axios from "axios";
import { environment } from "../../environment";
import { CityDto, SubdivisionWithCitiesDto } from "./subdivisionWithCitiesDto";

const subdivisions = async (): Promise<CityDto[]> => {
  const res = await axios.get<CityDto[]>(`${environment.backendApi}cities/subdivisions/`);
  return res.data;
}
const SUBDIVISIONS_KEY = 'cities/subdivisions'

const subdivisionsWithCities = async (): Promise<SubdivisionWithCitiesDto[]> => {
  const res = await axios.get<SubdivisionWithCitiesDto[]>(`${environment.backendApi}cities/subdivisionsWithCities/`);
  return res.data;
}
const SUBDIVISIONS_WITH_CITIES_KEY = 'cities/subdivisionsWithCities'

export const citiesApi = {
  subdivisions,
  SUBDIVISIONS_KEY,
  subdivisionsWithCities,
  SUBDIVISIONS_WITH_CITIES_KEY
}
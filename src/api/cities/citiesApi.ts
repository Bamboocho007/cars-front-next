import axios from "axios";
import { environment } from "../../environment";
import { CityDto, SubdivisionWithCitiesDto } from "./subdivisionWithCitiesDto";

const subdivisions = async (): Promise<CityDto[]> => {
  const res = await axios.get<CityDto[]>(`${environment.backendApi}cities/subdivisions/`);
  return res.data;
}

const subdivisionsWithCities = async (): Promise<SubdivisionWithCitiesDto[]> => {
  const res = await axios.get<SubdivisionWithCitiesDto[]>(`${environment.backendApi}cities/subdivisionsWithCities/`);
  return res.data;
}

export const citiesApi = {
  subdivisions,
  subdivisionsWithCities
}
export class CityDto {
  id: number;
  cityId: string;
  subdivision: string;
  isRegion: boolean;
}

export class SubdivisionWithCitiesDto extends CityDto {
  children: CityDto[];
}
//la description de la structure de l`objet photo basee sur API
export interface Image {
  id: number;
  webformatURL: string;
  tags: string;
  largeImageURL: string;
}

//la description de la structure de reponse complete de l`API(Pixabay)
export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: Image[];
}

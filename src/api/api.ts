import axios from "axios";
import { PixabayResponse } from "./apiTypes";

const BASE_URL = "https://pixabay.com/api/";

const serviceGetPhotos = async (
  value: string,
  page: number
): Promise<PixabayResponse> => {
  const { data } = await axios.get<PixabayResponse>(BASE_URL, {
    params: {
      key: "39898226-b5dd88d4a11b5ca39177fb963",
      q: `${value}`,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });
  return data;
};

export { serviceGetPhotos };

import { useQuery } from "@tanstack/react-query";
import { paragraphURL } from "../config";

export default function useFetchParagraph(paragraphCount : number){
    return useQuery({
    queryKey: ["paragraph", paragraphCount],
    queryFn: () =>
      fetch(paragraphURL(paragraphCount)).then((res) => res.text()),
    enabled: false,
  });
}
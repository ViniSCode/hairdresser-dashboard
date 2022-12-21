import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

export function useFilter() {
  return useContext(FilterContext);
}
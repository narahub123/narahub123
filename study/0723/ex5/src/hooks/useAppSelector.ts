import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Rootstate } from "../store";

export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;

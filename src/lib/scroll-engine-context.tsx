import { createContext, useContext } from "react";
import type { ScrollEngine } from "./scroll-engine";

const ScrollEngineContext = createContext<ScrollEngine | null>(null);

export const useScrollEngine = () => useContext(ScrollEngineContext);

export default ScrollEngineContext;

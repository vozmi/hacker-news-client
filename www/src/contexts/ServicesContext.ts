import { IApiAdapter } from "@/services";
import React, { useContext } from "react";

export type IServicesContext = {
    apiAdapter: IApiAdapter;
};

export const ServicesContext = React.createContext<IServicesContext>(
    {} as IServicesContext
);

export const useServices = () => {
    return useContext(ServicesContext);
};

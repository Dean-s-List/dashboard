import React, { createContext, useContext } from "react";
import UAParser from "ua-parser-js";

export interface IContext {
  os?: UAParser.IOS;
  device?: UAParser.IDevice;
  engine?: UAParser.IEngine;
  browser?: UAParser.IBrowser;
  cpu?: UAParser.ICPU;
}

export const Context = createContext<IContext>({});

interface IProvider {
  children: React.ReactNode;
  userAgent: string;
}

export const Provider = ({ children, userAgent }: IProvider) => {
  const value = React.useMemo(() => {
    const uaParser = new UAParser();
    uaParser.setUA(userAgent);
    return {
      os: uaParser.getOS(),
      browser: uaParser.getBrowser(),
      cpu: uaParser.getCPU(),
      device: uaParser.getDevice(),
      engine: uaParser.getEngine(),
    };
  }, [userAgent]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useUserAgent = (): IContext => {
  return useContext<IContext>(Context);
};

export const UserAgentProvider = Provider;

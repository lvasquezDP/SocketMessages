import React, {FC, createContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import { host } from '../utils/api/api';

interface colors {
  primary: string;
  secondary: string;
  border: string;
  backgroundColor: string;
}

interface contex extends colors {
  setColors?: React.Dispatch<React.SetStateAction<colors>>;
}

const primary = '#000000';
const secondary = '#FDFBF6';
const light = 'rgb(234,236,240)';
// const dark = 'rgb(12,25,60)';
const dark = 'rgb(34,36,40)';

const InitColors: colors = {
  primary: primary,
  secondary: secondary,
  border: 'rgb(234,236,240)',
  backgroundColor: light,
};
const InitContex: contex = {
  ...InitColors,
};

export const ColorsContex = createContext<contex>(InitContex);

export const ColorsContext: FC<{children: React.ReactNode}> = ({children}) => {
  const [colors, setColors] = useState(InitColors);
  const isDark = useColorScheme() == 'dark';

  useEffect(() => {
    setColors({
      ...colors,
      primary: isDark ? primary : secondary,
      secondary: isDark ? secondary : primary,
      backgroundColor: isDark ? dark : light,
    });
  }, [isDark]);

  return (
    <ColorsContex.Provider value={{...colors, setColors}}>
      {children}
    </ColorsContex.Provider>
  );
};

import React, { useState, useEffect } from 'react';

const RandomColors = () => {
  const [background, setBackground] = useState('');
  const [font, setFont] = useState('');

  const generateRandomColors = () => {
    const contrastRatio = 4.5;
    let newBackground, newFont;

    do {
      newBackground = getRandomColor();
      newFont = getRandomColor();
    } while (getContrastRatio(newBackground, newFont) < contrastRatio);

    setBackground(newBackground);
    setFont(newFont);

    document.body.style.backgroundColor = newBackground;
    document.body.style.color = newFont;
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const getContrastRatio = (color1, color2) => {
    const luminance1 = getRelativeLuminance(color1);
    const luminance2 = getRelativeLuminance(color2);

    if (luminance1 === 0 || luminance2 === 0) {
      return 0;
    }

    const contrastRatio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return contrastRatio.toFixed(2);
  };

  const getRelativeLuminance = (rgb) => {
    if (!rgb) {
      return 0;
    }

    const { r, g, b } = rgb;
    const sRGB = [r / 255, g / 255, b / 255];
    const sRGBAdjusted = sRGB.map((val) => {
      if (val <= 0.03928) {
        return val / 12.92;
      }
      return Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGBAdjusted[0] + 0.7152 * sRGBAdjusted[1] + 0.0722 * sRGBAdjusted[2];
  };

  useEffect(() => {
    generateRandomColors();

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      console.log('reached UseEffect');
    };
  }, []);

  return (
    <div>
      <button onClick={generateRandomColors}>Click for New Colors</button>
    </div>
  );
};


export default RandomColors;

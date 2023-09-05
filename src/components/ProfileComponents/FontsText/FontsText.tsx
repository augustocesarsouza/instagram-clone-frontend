import * as Styled from './styled';

interface FontsTextProps {
  openColors: boolean;
  openTextStory: boolean;
  handleColor: (color: string) => void;
  handleFontSelected: (font: string) => void;
}

const FontsText = ({
  openColors,
  openTextStory,
  handleColor,
  handleFontSelected,
}: FontsTextProps) => {
  return (
    <>
      {openTextStory ? (
        <>
          {openColors ? (
            <Styled.ContainerColorsMain>
              <Styled.ContainerColors>
                <Styled.ContainerWhite $coloropt="#e13232" onClick={() => handleColor('#e13232')}>
                  <Styled.ContainerColor $coloropt="#e13232"></Styled.ContainerColor>
                </Styled.ContainerWhite>
                <Styled.ContainerWhite $coloropt="#16cf16" onClick={() => handleColor('#16cf16')}>
                  <Styled.ContainerColor $coloropt="#16cf16"></Styled.ContainerColor>
                </Styled.ContainerWhite>
                <Styled.ContainerWhite $coloropt="#eea829" onClick={() => handleColor('#eea829')}>
                  <Styled.ContainerColor $coloropt="#eea829"></Styled.ContainerColor>
                </Styled.ContainerWhite>
                <Styled.ContainerWhite $coloropt="#2196f3" onClick={() => handleColor('#2196f3')}>
                  <Styled.ContainerColor $coloropt="#2196f3"></Styled.ContainerColor>
                </Styled.ContainerWhite>
              </Styled.ContainerColors>
            </Styled.ContainerColorsMain>
          ) : (
            <Styled.ContainerColorsMain>
              <Styled.ContainerFonts>
                <Styled.H1Font onClick={() => handleFontSelected('Caveat')} $fontchosen="Caveat">
                  Aa
                </Styled.H1Font>
              </Styled.ContainerFonts>
              <Styled.ContainerFonts>
                <Styled.H1Font onClick={() => handleFontSelected('Lobster')} $fontchosen="Lobster">
                  Aa
                </Styled.H1Font>
              </Styled.ContainerFonts>
              <Styled.ContainerFonts>
                <Styled.H1Font
                  onClick={() => handleFontSelected('Indie Flower')}
                  $fontchosen="Indie Flower"
                >
                  Aa
                </Styled.H1Font>
              </Styled.ContainerFonts>
              <Styled.ContainerFonts>
                <Styled.H1Font
                  onClick={() => handleFontSelected('Rubik Wet Paint')}
                  $fontchosen="Rubik Wet Paint"
                >
                  Aa
                </Styled.H1Font>
              </Styled.ContainerFonts>
            </Styled.ContainerColorsMain>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FontsText;

import Image from 'next/image';
import styled from 'styled-components';
import close from '../../public/assets/close.png';
import open from '../../public/assets/open.png';

const BlockCmpt = styled.div`
  position: absolute;
  .block-image {
    width: 100%;
    height: 100%;
  }
`;

export default function BlockComponent({
  index,
  zIndex = 99,
  state = 'close',
}: {
  index: number;
  zIndex: number;
  state: string;
}) {
  return (
    <BlockCmpt
      className="block-component block"
      id={`block-${index}`}
      style={{ zIndex: zIndex - index }}
    >
      <Image
        className="block-image"
        // src={`/assets/${state}.png?version=1.0.0`}
        src={state === 'close' ? close : open}
        alt="BLOCK"
        quality={100}
      />
    </BlockCmpt>
  );
}

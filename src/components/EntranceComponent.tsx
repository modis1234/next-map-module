import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const EntranceCmpt = styled.div`
  position: absolute;
`;

const EntranceComponent = ({
  fileName,
  style,
}: {
  fileName: string;
  style: {
    top: number;
    left: number;
    zIndex: number;
    width: number;
    height: number;
  };
}) => {
  return (
    <EntranceCmpt className="enterance-component" style={style}>
      <Image src={`/assets/${fileName}`} alt="" layout="fill" />
    </EntranceCmpt>
  );
};

export default EntranceComponent;

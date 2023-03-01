import React from 'react';
import styled from 'styled-components';
import BlockComponent from './BlockComponent';
// import BlockComponent from "./BlockComponent";

const TunnelCmpt = styled.div`
  position: relative;
  width: 100%;
  .local-area {
    width: 100%;
    position: absolute;
    .block-box {
      position: relative;
    }
  }
`;

interface LocalItemsProp {
  [key: number]: {
    top?: number;
    left?: number;
    blockAmount?: number;
    zIndex?: number;
    digType?: string;
  };
}

const TunnelComponent = ({
  localItems,
  localLimit,
  top,
  left,
}: {
  localItems: LocalItemsProp;
  localLimit: number;
  top?: number;
  left?: number;
}) => {
  const blockRender = ({
    top = 0,
    left = 0,
    blockAmount = 0,
    zIndex = 10,
    digType = 'forward',
    ...item
  }): JSX.Element | undefined => {
    if (!item) return;
    const tempItems = [...Array(blockAmount)];
    console.log('item->', item);
    const { local_plan_length: planLength, local_curr_length: currLength } =
      item;

    const blockLength = Math.ceil(planLength / blockAmount);

    return (
      <div
        key={item.local_index}
        className="local-area"
        // blockLength={blockLength}
        style={{
          top: top,
          left: left,
        }}
      >
        {tempItems.map((item, index, array) => {
          const length =
            digType === 'forward'
              ? Math.ceil(blockLength * index) // 정방향 블럭당 거리
              : Math.ceil(blockLength * (tempItems.length - 1 - index)); //역방향 블럭당 거리 거리

          console.log('length->', length);
          const isOpen = currLength > length ? true : false;

          return (
            <div
              key={index}
              className={`block-box forward`}
              style={{
                top: `-${30 * index}px`,
                left: `${52 * index}px`,
              }}
              // length={length}
            >
              <BlockComponent
                index={index}
                zIndex={zIndex}
                state={isOpen ? 'open' : 'close'}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <TunnelCmpt style={{ top, left }}>
      {Array.from({ length: localLimit }).map((item, idx) =>
        blockRender(localItems[idx + 1]),
      )}
    </TunnelCmpt>
  );
};

export default TunnelComponent;

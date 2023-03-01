import EntranceComponent from '@/components/EntranceComponent';
import TunnelComponent from '@/components/TunnelComponent';
import LocalItem from '@/types/local';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import EntranceComponent from '../components/EntranceComponent';
// import TunnelComponent from '../components/TunnelComponent';

const MapCmpt = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(../../assets/map_bg.png);
  background-repeat: no-repeat;

  .tag-button-box {
    width: 39px;
    height: 39px;
    color: #ffffff;
    background-color: #171717;
    font-size: 18px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 9px;
    top: 9px;
    &:hover {
      cursor: pointer;
      background-color: #000000;
    }
  }
  .tunnel-area {
    width: 100%;
    position: absolute;
  }
`;

interface LocalNumberItemsInter {
  [key: number]: {
    top?: number;
    left?: number;
    blockAmount?: number;
    zIndex?: number;
    digType?: string;
  };
}

export default function MapContainer({
  localItems,
}: {
  localItems: LocalItem[];
}) {
  const [localNumberItems, setLocalNumberItems] =
    useState<LocalNumberItemsInter | null>(null);

  const [initAccObj, setInitAccObj] = useState<LocalNumberItemsInter>({
    1: {
      top: 515,
      left: 38,
      blockAmount: 6,
      zIndex: 40,
    },
    2: {
      top: 315,
      left: 386,
      blockAmount: 3,
      zIndex: 30,
    },
    3: {
      top: 225,
      left: 543,
      blockAmount: 3,
      zIndex: 20,
    },
    4: {
      top: 89,
      left: 782,
      blockAmount: 1,
      zIndex: 10,
    },
  });

  useEffect(() => {
    if (localItems) {
      /**
       * @description // local_type=1이면 시점(역방향)방향, 2이면 종점(정방향)방향 굴진
       */
      const localNumberObj = localItems.reduce<LocalNumberItemsInter>(
        (acc, cur) => {
          if (cur) {
            const { local_number, local_type } = cur;
            if (!local_number) return acc;
            return {
              ...acc,
              [local_number]: {
                ...acc?.[local_number],
                ...cur,
                digType: local_type === 1 ? 'revers' : 'forward',
              },
            };
          }
          return acc;
        },
        initAccObj,
      );

      console.log('localNumberObj->', localNumberObj);
      setLocalNumberItems(localNumberObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localItems]);

  return (
    <MapCmpt className="map-component">
      <div
        className="tag-button-box"
        //   onClick={setOpenCheckBox}
      >
        <FontAwesomeIcon icon={faRectangleList} />
      </div>
      <div className="tunnel-area">
        {localNumberItems && (
          <>
            <TunnelComponent localItems={localNumberItems} localLimit={4} />
            <EntranceComponent
              fileName={'vent_s3.png'}
              style={{
                top: 283,
                left: 365,
                zIndex: 33,
                width: 109,
                height: 214,
              }}
            />
            <EntranceComponent
              fileName={'station_104.png'}
              style={{
                top: 38,
                left: 695,
                zIndex: 17,
                width: 200,
                height: 273,
              }}
            />

            <EntranceComponent
              fileName={'vent_s4.png'}
              style={{ top: 1, left: 850, zIndex: 9, width: 108, height: 220 }}
            />
          </>
        )}
      </div>
      {/* <div className="tunnel-area">
        {localNumberItems && (
          <TunnelComponent
            localItems={localNumberItems}
            top={100}
            left={200}
            localLimt={1}
          />
        )}
      </div> */}
    </MapCmpt>
  );
}

import MapContainer from '@/containers/MapContainer';
import LocalItem from '@/types/local';
import { GetStaticPropsContext } from 'next';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DashboardCmpt = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: ; */
  .map-area {
    width: 1023px;
    height: 704px;
  }
`;

//SSR
// export async function getServerSideProps(context: GetServerSideProps) {
export async function getServerSideProps(context: GetStaticPropsContext) {
  const locals = await fetch(
    `${process.env.API_SERVER}/api/local/locals?siteIndex=SITE05700`,
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log('data->>', data);
      return data;
    });
  // console.log('------->', locals);
  return {
    props: {
      locals: locals,
    },
  };
}

export default function Dashboard({ locals }: { locals: LocalItem[] }) {
  useEffect(() => {
    console.log('locals->', locals);
  }, []);

  const [localItems, setLocalItems] = useState<LocalItem[]>([
    {
      local_id: 53,
      local_index: 'LC03535',
      created_date: '2023-02-22T07:25:35.000Z',
      modified_date: null,
      local_name: '작업구#1',
      local_plan_length: 1862,
      local_curr_length: 1801,
      local_process: 3,
      local_description: '',
      local_used: 1,
      local_number: 1,
      monitor_number: 1,
      local_type: 1,
      ts_index: 'SITE05700',
    },
    {
      local_id: 54,
      local_index: 'LC02600',
      created_date: '2023-02-22T07:26:01.000Z',
      modified_date: null,
      local_name: '작업구#1',
      local_plan_length: 936,
      local_curr_length: 3112,
      local_process: 1,
      local_description: '',
      local_used: 1,
      local_number: 2,
      monitor_number: 2,
      local_type: 2,
      ts_index: 'SITE05700',
    },
    {
      local_id: 55,
      local_index: 'LC06925',
      created_date: '2023-02-22T07:26:26.000Z',
      modified_date: null,
      local_name: '104정거장',
      local_plan_length: 953,
      local_curr_length: 55,
      local_process: 5,
      local_description: '',
      local_used: 1,
      local_number: 3,
      monitor_number: 3,
      local_type: 1,
      ts_index: 'SITE05700',
    },
    {
      local_id: 56,
      local_index: 'LC06545',
      created_date: '2023-02-22T07:26:45.000Z',
      modified_date: '2023-02-27 11:05:41.347',
      local_name: '작업구#2',
      local_plan_length: 338,
      local_curr_length: 90,
      local_process: 11,
      local_description: '',
      local_used: 1,
      local_number: 4,
      monitor_number: 4,
      local_type: 1,
      ts_index: 'SITE05700',
    },
  ]);

  // useEffect(() => {
  //   axios
  //     .get('http://192.168.0.39:9096/api/local/locals?siteIndex=SITE05700')
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }, []);

  return (
    <DashboardCmpt>
      <div className="map-area">
        <MapContainer localItems={locals} />
      </div>
    </DashboardCmpt>
  );
}

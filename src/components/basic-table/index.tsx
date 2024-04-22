import { memo } from 'react';

import Table from '@mui/joy/Table';

type TProps = {
  headers: string[];
  rows: any[][];
  uidHeader?: string;
};

function BasicTable(props: TProps) {
  const { headers, rows, uidHeader } = props;

  return (
    <Table variant={'soft'}>
      <thead>
        <tr>
          {headers.map((header, index) =>
            uidHeader === header ? (
              <th style={{ width: '140px' }} key={index}>
                {header}&nbsp;
              </th>
            ) : (
              <th key={index}>{header}&nbsp;</th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((col, index) => (
              <td key={index}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default memo(BasicTable);

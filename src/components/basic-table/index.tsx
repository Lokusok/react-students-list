import { memo } from 'react';

import Table from '@mui/joy/Table';

type TProps = {
  headers: string[];
  rows: any[][];
  uidHeader?: string;
  renderItemOn?: string;
  renderItem?: (data: {
    id: number | string;
    title: string;
  }) => React.ReactNode;
};

function BasicTable(props: TProps) {
  const { headers, rows, uidHeader, renderItemOn, renderItem } = props;

  const indexOfUid = uidHeader && headers.indexOf(uidHeader);
  const indexOfRenderItem = renderItemOn && headers.indexOf(renderItemOn);

  console.log({ indexOfRenderItem });

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
            {row.map((col, index) =>
              index === indexOfRenderItem && renderItem ? (
                <td key={index}>
                  {renderItem({
                    id: row[indexOfUid || 0],
                    title: row[indexOfRenderItem],
                  })}
                </td>
              ) : (
                <td key={index}>{col}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default memo(BasicTable);

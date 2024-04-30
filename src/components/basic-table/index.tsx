import { memo } from 'react';

import Table from '@mui/joy/Table';
import { Box, Tooltip } from '@mui/material';

type TProps = {
  headers: string[];
  rows: any[][];
  uidHeader?: string;
  renderItemOn?: string;
  renderItem?: (data: {
    id: number | string;
    title: string;
  }) => React.ReactNode;
  onSelectRow?: (index: string) => void;
  selectedRows?: string[];
  disabled?: boolean;
};

function BasicTable(props: TProps) {
  const {
    headers,
    rows,
    uidHeader,
    renderItemOn,
    renderItem,
    selectedRows,
    onSelectRow,
    disabled,
  } = props;

  const indexOfUid = uidHeader && headers.indexOf(uidHeader);
  const indexOfRenderItem = renderItemOn && headers.indexOf(renderItemOn);

  return (
    <Box sx={{ maxWidth: { xs: 920, md: 'initial' }, overflowX: 'auto' }}>
      <Table
        sx={{ minWidth: 650, pointerEvents: disabled ? 'none' : 'all' }}
        variant={'soft'}
        stripe={'odd'}
      >
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
            <Box
              onClick={() => onSelectRow?.(row[indexOfUid || 0])}
              component={'tr'}
              sx={{
                opacity: selectedRows?.includes(row[indexOfUid || 0]) ? 0.3 : 1,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.7,
                },
                '&:active': {
                  opacity: 0.1,
                },
              }}
              key={index}
            >
              {row.map((col, index) =>
                index === indexOfRenderItem && renderItem ? (
                  <td key={index}>
                    {renderItem({
                      id: row[indexOfUid || 0],
                      title: row[indexOfRenderItem],
                    })}
                  </td>
                ) : index === indexOfUid && col.length > 3 ? (
                  <Tooltip title={col}>
                    <td key={index}>{col.slice(0, 3)}</td>
                  </Tooltip>
                ) : (
                  <td key={index}>
                    {col
                      ? col.length > 10
                        ? col.slice(0, 10) + '...'
                        : col
                      : '---'}
                  </td>
                )
              )}
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}

export default memo(BasicTable);

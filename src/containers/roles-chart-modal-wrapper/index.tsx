import { memo } from 'react';

import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from '@mui/joy';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import useStores from '@src/hooks/use-stores';
import convertToChartFormat from '@src/utils/convert-to-chart-format';
import { TCountRoles } from '@src/shared/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

type TRenderCustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index?: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: TRenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type TProps = {
  onClose?: () => void;
};

function RolesChartModalWrapper(props: TProps) {
  const { studentsStore } = useStores();

  const values = {
    data: convertToChartFormat(studentsStore.countRoles as TCountRoles, {
      withZeros: false,
    }),
  };

  return (
    <Modal open={true} onClose={() => props.onClose?.()}>
      <ModalDialog sx={{ maxWidth: 320 }}>
        <ModalClose onClick={() => props.onClose?.()} />
        <DialogTitle sx={{ justifyContent: 'center' }}>
          График ролей
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          Наведите, чтобы увидеть полную информацию
        </DialogContent>
        <DialogContent
          sx={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PieChart width={200} height={200}>
            <Pie
              data={values.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={false}
            >
              {values.data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default memo(RolesChartModalWrapper);

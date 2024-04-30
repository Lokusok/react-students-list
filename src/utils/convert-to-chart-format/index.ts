import { TCountRoles } from '@src/shared/types';

const mapConverter = {
  excellent: 'Отличник',
  good: 'Хорошист',
  normal: 'Троечник',
  bad: 'Двоечник',
};

type TStep = {
  name: string;
  value: number;
};

type TOptions = {
  withZeros: boolean;
};

/**
 * Конвертация формата с бэка в формат, подходящий для отображения графика
 */
function convertToChartFormat(obj: TCountRoles, options: TOptions) {
  const res = [];

  for (const key in obj) {
    const step: TStep = {
      name: mapConverter[key as keyof typeof mapConverter],
      value: Number(obj[key as keyof typeof obj]),
    };

    if (step.value === 0 && !options.withZeros) continue;

    res.push(step);
  }

  return res;
}

export default convertToChartFormat;

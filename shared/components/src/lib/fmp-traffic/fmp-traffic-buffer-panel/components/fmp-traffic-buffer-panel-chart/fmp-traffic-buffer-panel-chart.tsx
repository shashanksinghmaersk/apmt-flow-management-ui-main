import { useTranslation } from '@fes/shared-i18n';
import * as d3 from 'd3';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Typography } from '../../../../typography/typography';

import type { TrafficBufferChart } from '@fes/shared-types';

import './fmp-traffic-buffer-panel-chart.scss';

export type FmpBufferPanelChartProps = {
  data?: TrafficBufferChart[];
  height?: number;
  width?: number;
};

export const FmpBufferPanelChart = ({
  data,
  height = 100,
  width: _width = 300,
}: FmpBufferPanelChartProps) => {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement>(null);

  const margin = useMemo(
    () => ({ top: 10, right: 0, bottom: 8, left: 16 }),
    [],
  );
  const width = _width - margin.left - margin.right;
  const maxBarWidth = 16; // Maximum bar width

  const initD3 = useCallback(
    (svgElement: SVGSVGElement, _data: TrafficBufferChart[] = []) => {
      if (!_data || _data.length === 0) return;

      const svg = d3.select(svgElement);

      const x = d3
        .scaleBand()
        .domain(_data.map((d) => d.key))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const calculatedBarWidth = x.bandwidth();
      const barWidth = Math.min(calculatedBarWidth, maxBarWidth);

      const maxValue =
        d3.max(
          _data.map((d) => d.laden + d.unladen).filter((d) => d !== undefined),
        ) || 0;

      const y = d3
        .scaleLinear()
        .domain([0, maxValue * 1.2])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const xAxis = (g: any) =>
        g
          .attr('class', 'x-axis')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x).tickSize(0))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .call((g: any) => g.select('.domain').remove())
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .call((g: any) =>
            g
              .selectAll('.tick text')
              .style('font-size', '14px')
              .style(
                'font-family',
                'var(--mds_brand_typography_text_font-family), var(--mds_brand_typography_text_font-family-fallback)',
              ),
          );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const yAxis = (g: any) =>
        g
          .attr('class', 'y-axis')
          .attr('transform', `translate(${margin.left},0)`)
          .call(
            d3
              .axisLeft(y)
              .ticks(maxValue)
              .tickSize(-width - margin.right)
              .tickFormat(d3.format('d')),
          )
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .call((g: any) => g.select('.domain').remove())
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .call((g: any) =>
            g
              .selectAll('.tick text')
              .style('font-size', '12px')
              .style(
                'font-family',
                'var(--mds_brand_typography_text_font-family), var(--mds_brand_typography_text_font-family-fallback)',
              ),
          );

      // Clear any previous content
      svg.selectAll('*').remove();

      // Append the group element for the y-axis lines (grid lines)
      svg
        .append('g')
        .call(yAxis)
        .selectAll('.tick line')
        .attr('stroke', 'var(--mds_brand_appearance_neutral_weak_border-color)')
        .attr('x1', 4); // Add 4px margin-left

      // Append the group element for the bars
      const bars = svg.append('g');

      // Draw the unladen bars
      bars
        .selectAll('rect.unladen')
        .data(_data)
        .enter()
        .append('rect')
        .attr('class', 'unladen')
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .attr('x', (d) => x(d.key)! + (x.bandwidth() - barWidth) / 2)
        .attr('y', (d) => y(d.unladen))
        .attr('height', (d) => y(0) - y(d.unladen))
        .attr('width', barWidth)
        .attr('fill', 'var(--color-aqua-green)');

      // Draw the laden bars
      bars
        .selectAll('rect.laden')
        .data(_data)
        .enter()
        .append('rect')
        .attr('class', 'laden')
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .attr('x', (d) => x(d.key)! + (x.bandwidth() - barWidth) / 2)
        .attr('y', (d) => y(d.laden + d.unladen))
        .attr('height', (d) => y(0) - y(d.laden))
        .attr('width', barWidth)
        .attr(
          'fill',
          'var(--mds_brand_appearance_error_default_background-color)',
        );

      svg.append('g').call(xAxis);
    },
    [width, height, margin],
  );

  useEffect(() => {
    if (svgRef.current && data) {
      initD3(svgRef.current, data);
    }
  }, [data, initD3]);

  return (
    <div className="fmp-traffic-buffer-panel-chart">
      <Typography
        className="fmp-traffic-buffer-panel-chart__title"
        size="small"
        weight="bold"
      >
        {t('Minimum buffer use in last hours')}
      </Typography>
      <svg
        className="fmp-traffic-buffer-panel-chart__svg"
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      />
      <div className="fmp-traffic-buffer-panel-chart__legend">
        <div className="fmp-traffic-buffer-panel-chart__legend-item">
          <div className="fmp-traffic-buffer-panel-chart__legend-item--unladen" />
          <Typography size="small">{t('Unladen')}</Typography>
        </div>
        <div className="fmp-traffic-buffer-panel-chart__legend-item">
          <div className="fmp-traffic-buffer-panel-chart__legend-item--laden" />
          <Typography size="small">{t('Laden')}</Typography>
        </div>
      </div>
    </div>
  );
};

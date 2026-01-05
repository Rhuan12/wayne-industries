'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getTypeLabel } from '@/lib/utils'

interface ResourcesChartProps {
  data: {
    equipment: number
    vehicle: number
    security_device: number
  }
}

export function ResourcesChart({ data }: ResourcesChartProps) {
  const chartData = [
    {
      name: getTypeLabel('equipment'),
      total: data.equipment,
    },
    {
      name: getTypeLabel('vehicle'),
      total: data.vehicle,
    },
    {
      name: getTypeLabel('security_device'),
      total: data.security_device,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="name" 
          stroke="#9CA3AF"
          fontSize={12}
        />
        <YAxis 
          stroke="#9CA3AF"
          fontSize={12}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '0.5rem',
            color: '#F3F4F6',
          }}
        />
        <Bar 
          dataKey="total" 
          fill="#5779a1" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
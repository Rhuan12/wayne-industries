'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function AccessLogsChart() {
  const data = [
    { name: 'Seg', acessos: 45 },
    { name: 'Ter', acessos: 52 },
    { name: 'Qua', acessos: 38 },
    { name: 'Qui', acessos: 61 },
    { name: 'Sex', acessos: 48 },
    { name: 'Sáb', acessos: 12 },
    { name: 'Dom', acessos: 8 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
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
        <Line 
          type="monotone" 
          dataKey="acessos" 
          stroke="#5779a1" 
          strokeWidth={2}
          dot={{ fill: '#5779a1', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
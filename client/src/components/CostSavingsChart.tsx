import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { useInView } from 'react-intersection-observer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function CostSavingsLineChart() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const data = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
    datasets: [
      {
        label: 'Cumulative Savings',
        data: inView ? [5000, 15000, 28000, 45000, 62000, 78000, 95000, 110000, 125000, 138000, 148000, 156000] : Array(12).fill(0),
        borderColor: 'rgb(0, 102, 255)',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context: any) {
            return '$' + context.parsed.y.toLocaleString();
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + (value / 1000) + 'K';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div ref={ref} className="h-[300px] md:h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}

export function TimeAllocationCharts() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const beforeData = {
    labels: ['Paperwork', 'Resident Care'],
    datasets: [
      {
        data: inView ? [60, 40] : [0, 0],
        backgroundColor: ['rgba(255, 107, 107, 0.8)', 'rgba(200, 200, 200, 0.5)'],
        borderColor: ['rgb(255, 107, 107)', 'rgb(200, 200, 200)'],
        borderWidth: 2,
      },
    ],
  };

  const afterData = {
    labels: ['Paperwork', 'Resident Care'],
    datasets: [
      {
        data: inView ? [10, 90] : [0, 0],
        backgroundColor: ['rgba(200, 200, 200, 0.5)', 'rgba(0, 200, 100, 0.8)'],
        borderColor: ['rgb(200, 200, 200)', 'rgb(0, 200, 100)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      },
    },
  };

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-center font-semibold mb-4 text-red-600">Before Harmony</h4>
        <div className="h-[250px]">
          <Doughnut data={beforeData} options={options} />
        </div>
      </div>
      <div>
        <h4 className="text-center font-semibold mb-4 text-green-600">After Harmony</h4>
        <div className="h-[250px]">
          <Doughnut data={afterData} options={options} />
        </div>
      </div>
    </div>
  );
}

export function ROIBreakdownChart() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const data = {
    labels: ['Reduced Overtime', 'Fewer Errors', 'Compliance Savings', 'Improved Retention'],
    datasets: [
      {
        label: 'Annual Savings',
        data: inView ? [45000, 28000, 52000, 31000] : [0, 0, 0, 0],
        backgroundColor: [
          'rgba(0, 102, 255, 0.8)',
          'rgba(0, 200, 100, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgb(0, 102, 255)',
          'rgb(0, 200, 100)',
          'rgb(255, 159, 64)',
          'rgb(153, 102, 255)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1800,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return '$' + context.parsed.y.toLocaleString();
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + (value / 1000) + 'K';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div ref={ref} className="h-[300px] md:h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export function EfficiencyGauges() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const metrics = [
    { label: 'Documentation Time', value: 70, color: 'rgb(0, 102, 255)', reduction: true },
    { label: 'Compliance Accuracy', value: 100, color: 'rgb(0, 200, 100)', reduction: false },
    { label: 'Staff Satisfaction', value: 95, color: 'rgb(255, 159, 64)', reduction: false },
    { label: 'Revenue Capture', value: 30, color: 'rgb(153, 102, 255)', reduction: false },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="relative inline-block">
            <svg className="w-32 h-32 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={metric.color}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={inView ? `${2 * Math.PI * 56 * (1 - metric.value / 100)}` : `${2 * Math.PI * 56}`}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 1.5s ease-in-out',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: metric.color }}>
                {metric.reduction ? '-' : '+'}{metric.value}%
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm font-medium text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}

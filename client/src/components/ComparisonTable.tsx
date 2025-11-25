import { Card } from '@/components/ui/card';
import { Check, X, Minus } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface ComparisonRow {
  category: string;
  features: string[];
}

const comparisonData: ComparisonRow[] = [
  {
    category: 'Automation & AI',
    features: [
      'AI-powered documentation',
      'Automated compliance tracking',
      '24/7 autonomous agents',
      'Predictive analytics',
      'Natural language processing',
    ],
  },
  {
    category: 'Clinical Care',
    features: [
      'Real-time care plan updates',
      'Medication management with alerts',
      'Behavioral tracking & analysis',
      'Incident reporting automation',
      'Care coordination across teams',
    ],
  },
  {
    category: 'Compliance & Regulations',
    features: [
      '100% regulatory compliance',
      'Automated audit preparation',
      'Real-time compliance alerts',
      'Document version control',
      'State-specific regulation updates',
    ],
  },
  {
    category: 'Operations & Billing',
    features: [
      'Automated billing & invoicing',
      'Revenue cycle management',
      'Staff scheduling optimization',
      'Inventory management',
      'Financial reporting & analytics',
    ],
  },
  {
    category: 'Integration & Support',
    features: [
      'EHR/EMR integration',
      'API access for custom workflows',
      '24/7 technical support',
      'Dedicated onboarding team',
      'Regular feature updates',
    ],
  },
];

type FeatureStatus = 'full' | 'partial' | 'none';

const featureMatrix: Record<string, FeatureStatus> = {
  // Harmony (all full)
  'harmony-AI-powered documentation': 'full',
  'harmony-Automated compliance tracking': 'full',
  'harmony-24/7 autonomous agents': 'full',
  'harmony-Predictive analytics': 'full',
  'harmony-Natural language processing': 'full',
  'harmony-Real-time care plan updates': 'full',
  'harmony-Medication management with alerts': 'full',
  'harmony-Behavioral tracking & analysis': 'full',
  'harmony-Incident reporting automation': 'full',
  'harmony-Care coordination across teams': 'full',
  'harmony-100% regulatory compliance': 'full',
  'harmony-Automated audit preparation': 'full',
  'harmony-Real-time compliance alerts': 'full',
  'harmony-Document version control': 'full',
  'harmony-State-specific regulation updates': 'full',
  'harmony-Automated billing & invoicing': 'full',
  'harmony-Revenue cycle management': 'full',
  'harmony-Staff scheduling optimization': 'full',
  'harmony-Inventory management': 'full',
  'harmony-Financial reporting & analytics': 'full',
  'harmony-EHR/EMR integration': 'full',
  'harmony-API access for custom workflows': 'full',
  'harmony-24/7 technical support': 'full',
  'harmony-Dedicated onboarding team': 'full',
  'harmony-Regular feature updates': 'full',

  // Traditional Software (mixed)
  'traditional-AI-powered documentation': 'none',
  'traditional-Automated compliance tracking': 'partial',
  'traditional-24/7 autonomous agents': 'none',
  'traditional-Predictive analytics': 'partial',
  'traditional-Natural language processing': 'none',
  'traditional-Real-time care plan updates': 'partial',
  'traditional-Medication management with alerts': 'full',
  'traditional-Behavioral tracking & analysis': 'partial',
  'traditional-Incident reporting automation': 'partial',
  'traditional-Care coordination across teams': 'partial',
  'traditional-100% regulatory compliance': 'partial',
  'traditional-Automated audit preparation': 'partial',
  'traditional-Real-time compliance alerts': 'partial',
  'traditional-Document version control': 'full',
  'traditional-State-specific regulation updates': 'partial',
  'traditional-Automated billing & invoicing': 'full',
  'traditional-Revenue cycle management': 'partial',
  'traditional-Staff scheduling optimization': 'partial',
  'traditional-Inventory management': 'full',
  'traditional-Financial reporting & analytics': 'partial',
  'traditional-EHR/EMR integration': 'partial',
  'traditional-API access for custom workflows': 'partial',
  'traditional-24/7 technical support': 'partial',
  'traditional-Dedicated onboarding team': 'none',
  'traditional-Regular feature updates': 'partial',

  // Manual Process (mostly none)
  'manual-AI-powered documentation': 'none',
  'manual-Automated compliance tracking': 'none',
  'manual-24/7 autonomous agents': 'none',
  'manual-Predictive analytics': 'none',
  'manual-Natural language processing': 'none',
  'manual-Real-time care plan updates': 'none',
  'manual-Medication management with alerts': 'partial',
  'manual-Behavioral tracking & analysis': 'partial',
  'manual-Incident reporting automation': 'none',
  'manual-Care coordination across teams': 'partial',
  'manual-100% regulatory compliance': 'none',
  'manual-Automated audit preparation': 'none',
  'manual-Real-time compliance alerts': 'none',
  'manual-Document version control': 'partial',
  'manual-State-specific regulation updates': 'none',
  'manual-Automated billing & invoicing': 'none',
  'manual-Revenue cycle management': 'none',
  'manual-Staff scheduling optimization': 'none',
  'manual-Inventory management': 'partial',
  'manual-Financial reporting & analytics': 'partial',
  'manual-EHR/EMR integration': 'none',
  'manual-API access for custom workflows': 'none',
  'manual-24/7 technical support': 'none',
  'manual-Dedicated onboarding team': 'none',
  'manual-Regular feature updates': 'none',
};

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === 'full') {
    return <Check className="w-5 h-5 text-green-500" />;
  } else if (status === 'partial') {
    return <Minus className="w-5 h-5 text-orange-500" />;
  } else {
    return <X className="w-5 h-5 text-red-500" />;
  }
}

export function ComparisonTable() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Harmony
          </span>
          ?
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See how Harmony stacks up against traditional software and manual processes
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Harmony</div>
                  <div className="text-sm text-muted-foreground">AI-Native Platform</div>
                </div>
              </Card>
            </div>
            <div className="col-span-1">
              <Card className="p-6 bg-card border border-border">
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">Traditional Software</div>
                  <div className="text-sm text-muted-foreground">Legacy Systems</div>
                </div>
              </Card>
            </div>
            <div className="col-span-1">
              <Card className="p-6 bg-card border border-border">
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">Manual Process</div>
                  <div className="text-sm text-muted-foreground">Paper & Spreadsheets</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisonData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">{category.category}</h3>
              <div className="space-y-2">
                {category.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className={`grid grid-cols-4 gap-4 items-center p-4 rounded-lg transition-all ${
                      inView ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${(categoryIndex * 5 + featureIndex) * 50}ms` }}
                  >
                    <div className="col-span-1 text-sm font-medium">{feature}</div>
                    <div className="col-span-1 flex justify-center">
                      <StatusIcon status={featureMatrix[`harmony-${feature}`] || 'none'} />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <StatusIcon status={featureMatrix[`traditional-${feature}`] || 'none'} />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <StatusIcon status={featureMatrix[`manual-${feature}`] || 'none'} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="mt-8 flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground">Full Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="w-4 h-4 text-orange-500" />
              <span className="text-muted-foreground">Partial Support</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">Not Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

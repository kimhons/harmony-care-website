import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AnimatedCounter } from './AnimatedCounter';
import { DollarSign, Users, TrendingUp, Clock, Shield, Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface CalculatorResults {
  annualSavings: number;
  monthlySavings: number;
  timeReclaimed: number;
  complianceImprovement: number;
  staffRetention: number;
  revenueCapture: number;
  breakdowns: {
    reducedOvertime: number;
    fewerErrors: number;
    complianceSavings: number;
    improvedRetention: number;
  };
}

export function SavingsCalculator() {
  const [residents, setResidents] = useState(20);
  const [facilityType, setFacilityType] = useState<'group-home' | 'icf-id'>('group-home');
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Calculate ROI based on facility size and type
  useEffect(() => {
    const calculateROI = () => {
      // Base calculations per resident
      const baseOvertimeSavings = facilityType === 'group-home' ? 2250 : 2800;
      const baseErrorReduction = facilityType === 'group-home' ? 1400 : 1750;
      const baseComplianceSavings = facilityType === 'group-home' ? 2600 : 3250;
      const baseRetentionSavings = facilityType === 'group-home' ? 1550 : 1950;

      // Calculate total savings
      const reducedOvertime = baseOvertimeSavings * residents;
      const fewerErrors = baseErrorReduction * residents;
      const complianceSavings = baseComplianceSavings * residents;
      const improvedRetention = baseRetentionSavings * residents;

      const annualSavings = reducedOvertime + fewerErrors + complianceSavings + improvedRetention;
      const monthlySavings = Math.round(annualSavings / 12);

      // Calculate other metrics
      const timeReclaimed = Math.min(70, 50 + (residents / 100) * 20); // 50-70% based on size
      const complianceImprovement = 100; // Always 100%
      const staffRetention = Math.min(95, 75 + (residents / 50) * 20); // 75-95% based on size
      const revenueCapture = Math.min(30, 15 + (residents / 50) * 15); // 15-30% based on size

      setResults({
        annualSavings,
        monthlySavings,
        timeReclaimed,
        complianceImprovement,
        staffRetention,
        revenueCapture,
        breakdowns: {
          reducedOvertime,
          fewerErrors,
          complianceSavings,
          improvedRetention,
        },
      });
    };

    calculateROI();
  }, [residents, facilityType]);

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-card/50 border-2 border-primary/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            Calculate Your Savings
          </h3>
          <p className="text-muted-foreground text-lg">
            See how much Harmony can save your facility
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Facility Type Selector */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Facility Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFacilityType('group-home')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  facilityType === 'group-home'
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-semibold">Group Home</div>
                <div className="text-xs text-muted-foreground mt-1">1-10 residents</div>
              </button>
              <button
                onClick={() => setFacilityType('icf-id')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  facilityType === 'icf-id'
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-semibold">ICF-ID</div>
                <div className="text-xs text-muted-foreground mt-1">16-50+ residents</div>
              </button>
            </div>
          </div>

          {/* Residents Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold">Number of Residents</Label>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold text-primary">{residents}</span>
              </div>
            </div>
            <Slider
              value={[residents]}
              onValueChange={(value) => setResidents(value[0])}
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 resident</span>
              <span>100 residents</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-8">
            {/* Main Savings Display */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/30">
              <div className="text-center">
                <div className="text-sm font-semibold text-muted-foreground mb-2">
                  Estimated Annual Savings
                </div>
                <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                  {inView && (
                    <>
                      $<AnimatedCounter end={results.annualSavings} duration={1500} />
                    </>
                  )}
                </div>
                <div className="text-lg text-muted-foreground">
                  ${results.monthlySavings.toLocaleString()}/month
                </div>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-sm font-semibold">Reduced Overtime</div>
                </div>
                <div className="text-2xl font-bold text-blue-500">
                  ${results.breakdowns.reducedOvertime.toLocaleString()}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-sm font-semibold">Fewer Errors</div>
                </div>
                <div className="text-2xl font-bold text-green-500">
                  ${results.breakdowns.fewerErrors.toLocaleString()}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-sm font-semibold">Compliance Savings</div>
                </div>
                <div className="text-2xl font-bold text-orange-500">
                  ${results.breakdowns.complianceSavings.toLocaleString()}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-sm font-semibold">Improved Retention</div>
                </div>
                <div className="text-2xl font-bold text-purple-500">
                  ${results.breakdowns.improvedRetention.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-card border border-border rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">
                  {results.timeReclaimed.toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">Time Reclaimed for Care</div>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-xl">
                <div className="text-3xl font-bold text-green-500 mb-1">
                  {results.complianceImprovement}%
                </div>
                <div className="text-sm text-muted-foreground">Compliance Accuracy</div>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-xl">
                <div className="text-3xl font-bold text-orange-500 mb-1">
                  +{results.revenueCapture}%
                </div>
                <div className="text-sm text-muted-foreground">Revenue Capture</div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-6 border-t border-border">
              <p className="text-muted-foreground mb-4">
                Ready to start saving? Lock in founding member pricing today.
              </p>
              <button
                onClick={() => window.location.href = '/demo'}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
              >
                Get Your Personalized Quote
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

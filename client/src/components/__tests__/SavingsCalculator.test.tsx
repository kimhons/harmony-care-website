import { describe, it, expect } from 'vitest';

describe('Savings Calculator Logic', () => {
  // Test calculation formulas
  const calculateROI = (residents: number, facilityType: 'group-home' | 'icf-id') => {
    const baseOvertimeSavings = facilityType === 'group-home' ? 2250 : 2800;
    const baseErrorReduction = facilityType === 'group-home' ? 1400 : 1750;
    const baseComplianceSavings = facilityType === 'group-home' ? 2600 : 3250;
    const baseRetentionSavings = facilityType === 'group-home' ? 1550 : 1950;

    const reducedOvertime = baseOvertimeSavings * residents;
    const fewerErrors = baseErrorReduction * residents;
    const complianceSavings = baseComplianceSavings * residents;
    const improvedRetention = baseRetentionSavings * residents;

    const annualSavings = reducedOvertime + fewerErrors + complianceSavings + improvedRetention;

    return {
      annualSavings,
      reducedOvertime,
      fewerErrors,
      complianceSavings,
      improvedRetention,
    };
  };

  describe('Group Home Calculations', () => {
    it('should calculate correct savings for 10 residents', () => {
      const result = calculateROI(10, 'group-home');
      expect(result.reducedOvertime).toBe(22500);
      expect(result.fewerErrors).toBe(14000);
      expect(result.complianceSavings).toBe(26000);
      expect(result.improvedRetention).toBe(15500);
      expect(result.annualSavings).toBe(78000);
    });

    it('should calculate correct savings for 20 residents', () => {
      const result = calculateROI(20, 'group-home');
      expect(result.reducedOvertime).toBe(45000);
      expect(result.fewerErrors).toBe(28000);
      expect(result.complianceSavings).toBe(52000);
      expect(result.improvedRetention).toBe(31000);
      expect(result.annualSavings).toBe(156000);
    });

    it('should calculate correct savings for 50 residents', () => {
      const result = calculateROI(50, 'group-home');
      expect(result.reducedOvertime).toBe(112500);
      expect(result.fewerErrors).toBe(70000);
      expect(result.complianceSavings).toBe(130000);
      expect(result.improvedRetention).toBe(77500);
      expect(result.annualSavings).toBe(390000);
    });
  });

  describe('ICF-ID Calculations', () => {
    it('should calculate correct savings for 16 residents', () => {
      const result = calculateROI(16, 'icf-id');
      expect(result.reducedOvertime).toBe(44800);
      expect(result.fewerErrors).toBe(28000);
      expect(result.complianceSavings).toBe(52000);
      expect(result.improvedRetention).toBe(31200);
      expect(result.annualSavings).toBe(156000);
    });

    it('should calculate correct savings for 30 residents', () => {
      const result = calculateROI(30, 'icf-id');
      expect(result.reducedOvertime).toBe(84000);
      expect(result.fewerErrors).toBe(52500);
      expect(result.complianceSavings).toBe(97500);
      expect(result.improvedRetention).toBe(58500);
      expect(result.annualSavings).toBe(292500);
    });

    it('should calculate higher savings for ICF-ID vs Group Home with same resident count', () => {
      const groupHome = calculateROI(20, 'group-home');
      const icfId = calculateROI(20, 'icf-id');
      
      expect(icfId.annualSavings).toBeGreaterThan(groupHome.annualSavings);
      expect(icfId.reducedOvertime).toBeGreaterThan(groupHome.reducedOvertime);
      expect(icfId.fewerErrors).toBeGreaterThan(groupHome.fewerErrors);
      expect(icfId.complianceSavings).toBeGreaterThan(groupHome.complianceSavings);
      expect(icfId.improvedRetention).toBeGreaterThan(groupHome.improvedRetention);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum residents (1)', () => {
      const result = calculateROI(1, 'group-home');
      expect(result.annualSavings).toBe(7800);
    });

    it('should handle maximum residents (100)', () => {
      const result = calculateROI(100, 'group-home');
      expect(result.annualSavings).toBe(780000);
    });

    it('should scale linearly with resident count', () => {
      const result10 = calculateROI(10, 'group-home');
      const result20 = calculateROI(20, 'group-home');
      
      expect(result20.annualSavings).toBe(result10.annualSavings * 2);
    });
  });

  describe('Breakdown Components', () => {
    it('should have all breakdown components sum to total savings', () => {
      const result = calculateROI(25, 'group-home');
      const sum = result.reducedOvertime + result.fewerErrors + 
                  result.complianceSavings + result.improvedRetention;
      
      expect(sum).toBe(result.annualSavings);
    });

    it('should have compliance savings as largest component for group homes', () => {
      const result = calculateROI(20, 'group-home');
      
      expect(result.complianceSavings).toBeGreaterThan(result.reducedOvertime);
      expect(result.complianceSavings).toBeGreaterThan(result.fewerErrors);
      expect(result.complianceSavings).toBeGreaterThan(result.improvedRetention);
    });
  });
});

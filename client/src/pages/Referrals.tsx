import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Share2, Copy, Mail, Check, Trophy, Target, Users, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { REWARD_TIERS, getCurrentTier, getNextTier, getProgressToNextTier } from "@/../../shared/referralRewards";
import ShareTemplates from "@/components/ShareTemplates";
import type { ShareTemplateVariables } from "@/../../shared/shareTemplates";
import { MilestoneCelebration } from "@/components/MilestoneCelebration";

export default function Referrals() {
  const [, setLocation] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  const { data: referralData, isLoading } = trpc.referral.myReferrals.useQuery(undefined, {
    enabled: !!user,
  });
  
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<any>(null);
  
  // Fetch milestone notifications
  const { data: milestonesData } = trpc.referral.milestones.useQuery(undefined, {
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  
  const markViewedMutation = trpc.referral.markViewed.useMutation();
  const markSharedMutation = trpc.referral.markShared.useMutation();
  
  // Show unviewed milestones automatically
  useEffect(() => {
    if (milestonesData?.unviewed && milestonesData.unviewed.length > 0 && !activeMilestone) {
      setActiveMilestone(milestonesData.unviewed[0]);
    }
  }, [milestonesData, activeMilestone]);
  
  const handleMarkViewed = (id: number) => {
    markViewedMutation.mutate({ notificationId: id });
  };
  
  const handleMarkShared = (id: number) => {
    markSharedMutation.mutate({ notificationId: id });
  };
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      setLocation('/');
      toast.error('Please log in to view your referral dashboard');
    }
  }, [user, isLoading, setLocation]);
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Please log in to view your referral dashboard.</p>
        </div>
      </div>
    );
  }
  
  if (isLoading || !referralData) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto py-12">
          <div className="text-center">Loading your referral dashboard...</div>
        </div>
      </div>
    );
  }
  
  const { referralCode, totalReferrals, referredUsers } = referralData;
  const currentTier = getCurrentTier(totalReferrals);
  const nextTier = getNextTier(totalReferrals);
  const progress = getProgressToNextTier(totalReferrals);
  
  const baseUrl = window.location.origin;
  const referralLink = `${baseUrl}/signup?utm_source=referral&utm_medium=founding_member&utm_campaign=referral_program&ref=${referralCode}`;
  
  const copyToClipboard = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
    toast.success('Copied to clipboard!');
  };
  
  const shareViaEmail = () => {
    const subject = encodeURIComponent('Join HarmonyCare as a Founding Member');
    const body = encodeURIComponent(
      `Hi!\n\nI'm a founding member of HarmonyCare, an AI-powered care management platform that's transforming resident care facilities. As a founding member, I've locked in 56-65% off forever, and you can too!\n\nUse my referral code ${referralCode} when you sign up to join the exclusive founding member program. We'll both receive rewards!\n\nLearn more: ${referralLink}\n\nBest regards`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Referral Dashboard</h1>
          <p className="text-muted-foreground">Share HarmonyCare and earn exclusive rewards</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Referral Code</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">{referralCode}</div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-8 px-2"
                onClick={() => copyToClipboard(referralCode, 'code')}
              >
                {copiedCode ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalReferrals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Successful conversions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Tier</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {currentTier ? (
                <>
                  <div className="text-2xl font-bold">{currentTier.badge} {currentTier.name.split(' ')[1]}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentTier.name}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">Getting Started</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Make your first referral
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {nextTier ? (
                <>
                  <div className="text-2xl font-bold">{nextTier.referralsRequired - totalReferrals}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    referrals to {nextTier.name}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">🏆</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Max tier achieved!
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Progress to Next Tier */}
        {nextTier && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Progress to {nextTier.badge} {nextTier.name}</CardTitle>
              <CardDescription>
                {nextTier.referralsRequired - totalReferrals} more referral{nextTier.referralsRequired - totalReferrals > 1 ? 's' : ''} needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{currentTier ? currentTier.referralsRequired : 0} referrals</span>
                  <span className="font-semibold text-primary">{totalReferrals} current</span>
                  <span>{nextTier.referralsRequired} referrals</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Rewards you'll unlock:</h4>
                  <ul className="space-y-1">
                    {nextTier.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Share Your Referral Link */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Referral Link</CardTitle>
              <CardDescription>Copy and share this link to track your referrals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={() => copyToClipboard(referralLink, 'link')}
                  className="shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={shareViaEmail}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const text = `Join HarmonyCare as a founding member! Use my code ${referralCode} to lock in exclusive pricing forever. ${referralLink}`;
                    if (navigator.share) {
                      navigator.share({ title: 'Join HarmonyCare', text });
                    } else {
                      copyToClipboard(text, 'link');
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* All Reward Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Reward Tiers</CardTitle>
              <CardDescription>Unlock exclusive benefits as you refer more members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {REWARD_TIERS.map((tier) => {
                  const achieved = totalReferrals >= tier.referralsRequired;
                  return (
                    <div
                      key={tier.id}
                      className={`p-3 rounded-lg border-2 ${
                        achieved
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tier.badge}</span>
                          <div>
                            <div className="font-semibold text-sm">{tier.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {tier.referralsRequired} referral{tier.referralsRequired > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                        {achieved && (
                          <Badge variant="default" className="bg-green-600">
                            <Check className="h-3 w-3 mr-1" />
                            Achieved
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Share Templates */}
        <div>
          <h2 className="text-2xl font-bold mb-4">📣 Share Your Referral Code</h2>
          <ShareTemplates
            variables={{
              referralCode,
              referrerName: user.name || 'Founding Member',
              facilityName: referredUsers[0]?.facilityName || 'Your Facility',
              tier: currentTier?.name || 'Founding Member',
              totalReferrals,
              referralLink,
            } as ShareTemplateVariables}
          />
        </div>
        
        {/* Your Referrals */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referrals ({referredUsers.length})</CardTitle>
            <CardDescription>Founding members who joined using your code</CardDescription>
          </CardHeader>
          <CardContent>
            {referredUsers.length > 0 ? (
              <div className="space-y-3">
                {referredUsers.map((user: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.facilityName}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{user.tier}</Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No referrals yet</p>
                <p className="text-sm">Share your referral code to start earning rewards!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Milestone Celebration Modal */}
      <MilestoneCelebration
        milestone={activeMilestone}
        onClose={() => setActiveMilestone(null)}
        onMarkViewed={handleMarkViewed}
        onMarkShared={handleMarkShared}
        userInfo={{
          name: user.name || 'Founding Member',
          facilityName: referredUsers[0]?.facilityName || 'Your Facility',
          referralCode,
          totalReferrals,
        }}
      />
    </div>
  );
}

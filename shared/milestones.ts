/**
 * Referral Milestone Definitions and Celebration Content
 */

export interface Milestone {
  id: string;
  type: 'referral_count' | 'tier_upgrade' | 'leaderboard' | 'special';
  title: string;
  description: string;
  trigger: {
    referralCount?: number;
    tierName?: string;
    leaderboardPosition?: number;
  };
  badge: string; // Path to badge graphic
  celebrationMessage: string;
  socialPosts: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  confettiColor?: string;
}

export const MILESTONES: Milestone[] = [
  // First Referral
  {
    id: 'first-referral',
    type: 'referral_count',
    title: '🎉 First Referral!',
    description: 'You just made your first referral to HarmonyCare!',
    trigger: { referralCount: 1 },
    badge: '/milestones/first-referral-badge.png',
    celebrationMessage: 'Congratulations! You just helped your first care facility discover HarmonyCare. This is the beginning of something great!',
    socialPosts: {
      linkedin: `🎉 Milestone unlocked! Just made my first HarmonyCare referral!

I'm proud to help other care facilities discover this game-changing AI platform. If you manage a care facility and want to:
• Reduce paperwork by 60%
• Give caregivers their time back
• Provide 24/7 family support

Let's connect! I'd love to share my experience. #HarmonyCare #HealthcareInnovation #CareManagement`,
      twitter: `🎉 Just made my first @HarmonyCare referral! 

Helping other facilities discover AI-powered care management that actually works. 

Who's next? 🚀 #HealthTech #CareInnovation`,
      facebook: `🎉 Exciting milestone! I just made my first HarmonyCare referral!

It feels amazing to help other care facilities discover this incredible platform. If you manage a care facility and are tired of drowning in paperwork, let's chat!

HarmonyCare has transformed how we operate, and I'd love to help you experience the same transformation. 💙`,
    },
    confettiColor: '#667eea',
  },
  
  // Bronze Tier Achievement
  {
    id: 'bronze-tier',
    type: 'tier_upgrade',
    title: '🥉 Bronze Advocate!',
    description: 'You\'ve reached Bronze tier with 3 referrals!',
    trigger: { tierName: 'Bronze Advocate', referralCount: 3 },
    badge: '/milestones/bronze-tier-badge.png',
    celebrationMessage: 'Amazing! You\'ve reached Bronze tier and earned $25 in credits. You\'re officially a HarmonyCare advocate!',
    socialPosts: {
      linkedin: `🥉 Proud to announce: I've reached Bronze Advocate status with HarmonyCare!

3 referrals completed, and I'm just getting started. Each facility I've referred has seen:
✅ 60% reduction in caregiver paperwork
✅ Dramatic improvement in family satisfaction
✅ Streamlined compliance and documentation

The transformation is real, and I'm excited to help more facilities discover this platform.

Interested in learning how HarmonyCare can transform your facility? Let's connect! #HarmonyCare #HealthcareLeadership`,
      twitter: `🥉 Bronze Advocate unlocked! 

3 care facilities now using @HarmonyCare thanks to my referrals. Each one seeing 60% less paperwork and happier staff.

This is what healthcare innovation looks like. 🚀 #HealthTech`,
      facebook: `🥉 Milestone achieved! I've reached Bronze Advocate status with HarmonyCare!

I've now helped 3 care facilities discover this amazing platform, and each one is experiencing incredible results. The feedback from other administrators has been overwhelmingly positive.

If you're a care facility administrator struggling with paperwork, compliance, or family communication, I'd love to share my experience with you!`,
    },
    confettiColor: '#CD7F32',
  },
  
  // Silver Tier Achievement
  {
    id: 'silver-tier',
    type: 'tier_upgrade',
    title: '🥈 Silver Champion!',
    description: 'You\'ve reached Silver tier with 5 referrals!',
    trigger: { tierName: 'Silver Champion', referralCount: 5 },
    badge: '/milestones/silver-tier-badge.png',
    celebrationMessage: 'Incredible! You\'ve reached Silver tier and earned $100 in credits plus priority support. You\'re a true HarmonyCare champion!',
    socialPosts: {
      linkedin: `🥈 Thrilled to share: Silver Champion status achieved with HarmonyCare!

5 successful referrals, 5 transformed care facilities. The ripple effect of AI-powered care management is remarkable:

📊 Collective impact across my referrals:
• Hundreds of hours saved in paperwork monthly
• Thousands of families receiving better communication
• Countless caregivers focusing on care, not admin

This isn't just about technology—it's about giving caregivers their time back and improving resident care quality.

If you're ready to transform your facility, let's talk! #HealthcareTransformation #AIinHealthcare`,
      twitter: `🥈 Silver Champion status unlocked! 

5 care facilities transformed through @HarmonyCare. The collective impact is incredible:

📉 60% less paperwork
📈 Happier staff & families
🤖 AI working 24/7

Healthcare innovation in action. #HealthTech`,
      facebook: `🥈 Big milestone! I've reached Silver Champion status with HarmonyCare!

5 referrals completed, and each facility is experiencing transformational results. I'm so proud to be part of this movement to give caregivers their time back and improve resident care.

The best part? Seeing other administrators light up when they realize they don't have to drown in paperwork anymore.

Want to learn more? Reach out anytime! 💙`,
    },
    confettiColor: '#C0C0C0',
  },
  
  // Gold Tier Achievement
  {
    id: 'gold-tier',
    type: 'tier_upgrade',
    title: '🥇 Gold Ambassador!',
    description: 'You\'ve reached Gold tier with 8 referrals!',
    trigger: { tierName: 'Gold Ambassador', referralCount: 8 },
    badge: '/milestones/gold-tier-badge.png',
    celebrationMessage: 'Outstanding! You\'ve reached Gold tier and earned $250 in credits plus 1 month free. You\'re a HarmonyCare ambassador!',
    socialPosts: {
      linkedin: `🥇 Honored to announce: Gold Ambassador status with HarmonyCare!

8 care facilities transformed. This journey has been incredible:

🌟 The Impact:
• 8 facilities now operating with 60% less paperwork
• Hundreds of caregivers focusing on care, not admin
• Thousands of families receiving 24/7 AI-powered support
• Countless residents benefiting from better care quality

I've become a true believer in AI-powered care management—not because of the technology itself, but because of the human impact it enables.

To my fellow care facility leaders: If you're ready to transform operations and give your team their time back, I'd be honored to share my experience.

This is what healthcare innovation looks like when it's done right. #HealthcareLeadership #AITransformation #CareExcellence`,
      twitter: `🥇 Gold Ambassador unlocked! 

8 care facilities transformed with @HarmonyCare:

✨ 60% less paperwork
✨ 24/7 AI support
✨ Happier staff & families
✨ Better resident care

The future of care management is here. #HealthTech #Innovation`,
      facebook: `🥇 Incredible milestone! I've reached Gold Ambassador status with HarmonyCare!

8 referrals, 8 transformed facilities, countless improved lives. This journey has been one of the most rewarding experiences of my career.

Every administrator I've referred comes back to thank me for introducing them to HarmonyCare. That's the best reward—knowing I've helped make their jobs easier and their residents' care better.

If you manage a care facility and want to experience this transformation, let's connect! I'd love to help you discover what's possible. 💛`,
    },
    confettiColor: '#FFD700',
  },
  
  // Platinum Tier Achievement
  {
    id: 'platinum-tier',
    type: 'tier_upgrade',
    title: '💎 Platinum Partner!',
    description: 'You\'ve reached Platinum tier with 12 referrals!',
    trigger: { tierName: 'Platinum Partner', referralCount: 12 },
    badge: '/milestones/platinum-tier-badge.png',
    celebrationMessage: 'Phenomenal! You\'ve reached Platinum tier and earned $600 in credits plus 3 months free and VIP support. You\'re a HarmonyCare partner!',
    socialPosts: {
      linkedin: `💎 Incredibly proud to announce: Platinum Partner status with HarmonyCare!

12 successful referrals. 12 transformed care facilities. This milestone represents more than numbers—it represents a movement.

📊 Collective Transformation:
• 12 facilities operating with revolutionary efficiency
• 1,000+ caregivers spending 60% less time on paperwork
• 10,000+ families receiving better communication
• Countless residents benefiting from improved care quality

🎯 What I've Learned:
The best technology doesn't replace human care—it amplifies it. HarmonyCare gives caregivers their most precious resource: time with residents.

🤝 My Commitment:
I'm not just a user; I'm a partner in this mission to transform care management. If you're a care facility leader ready to revolutionize operations, I'm here to help.

Let's continue building the future of care together. #HealthcareInnovation #LeadershipExcellence #CareTransformation`,
      twitter: `💎 Platinum Partner status achieved! 

12 care facilities transformed with @HarmonyCare:

🚀 1,000+ caregivers freed from paperwork
🚀 10,000+ families with 24/7 support  
🚀 Countless residents receiving better care

This is healthcare innovation done right. #HealthTech #Leadership`,
      facebook: `💎 Milestone of a lifetime! I've reached Platinum Partner status with HarmonyCare!

12 referrals completed, and I'm overwhelmed with gratitude. Every single administrator I've referred has experienced transformational results, and many have become referrers themselves.

This isn't just about a product—it's about a movement to give caregivers their time back, improve resident care, and make families feel connected and informed.

I'm honored to be a Platinum Partner and committed to helping even more facilities discover this incredible platform.

If you're ready to transform your care facility, let's talk! 💎`,
    },
    confettiColor: '#E5E4E2',
  },
  
  // Diamond Elite Achievement
  {
    id: 'diamond-tier',
    type: 'tier_upgrade',
    title: '👑 Diamond Elite!',
    description: 'You\'ve reached Diamond Elite tier with 20 referrals!',
    trigger: { tierName: 'Diamond Elite', referralCount: 20 },
    badge: '/milestones/diamond-tier-badge.png',
    celebrationMessage: 'Legendary! You\'ve reached Diamond Elite tier and earned $1,500 in credits plus 6 months free, dedicated manager, and lifetime 10% discount. You\'re HarmonyCare royalty!',
    socialPosts: {
      linkedin: `👑 Humbled and honored: Diamond Elite status with HarmonyCare!

20 referrals. 20 transformed facilities. A movement that's changing care management forever.

📈 The Ripple Effect:
• 20 facilities operating at peak efficiency
• 2,000+ caregivers focusing on care, not paperwork
• 20,000+ families receiving exceptional communication
• Immeasurable improvement in resident care quality

💡 Reflections on This Journey:
When I first became a founding member, I believed in HarmonyCare's vision. Now, after helping 20 facilities transform their operations, I've witnessed that vision become reality—again and again.

The most rewarding part isn't the Diamond Elite status or the rewards. It's the messages from administrators saying "You changed our facility," from caregivers saying "I love my job again," and from families saying "We finally feel connected."

🌟 Looking Forward:
This is just the beginning. I'm committed to helping even more facilities discover what's possible when AI amplifies human care instead of replacing it.

To every care facility leader: The future of care management is here, and it's more human than ever.

Let's build it together. #HealthcareLeadership #Innovation #CareExcellence #DiamondElite`,
      twitter: `👑 Diamond Elite achieved! 

20 care facilities transformed with @HarmonyCare:

✨ 2,000+ caregivers freed from paperwork
✨ 20,000+ families with 24/7 AI support
✨ Countless lives improved

This is the future of healthcare. Join the movement. 🚀 #HealthTech`,
      facebook: `👑 I'm speechless! Diamond Elite status with HarmonyCare!

20 referrals. 20 transformed facilities. Thousands of improved lives.

This journey has been the most rewarding experience of my career. I've watched care facilities transform from overwhelmed and understaffed to efficient and empowered. I've seen caregivers rediscover their passion for care. I've heard families express gratitude for better communication.

This is what healthcare innovation should look like—technology that makes care more human, not less.

I'm honored to be Diamond Elite and committed to this mission for the long haul.

If you manage a care facility and want to be part of this transformation, reach out. Let's change care management together! 👑💙`,
    },
    confettiColor: '#B9F2FF',
  },
  
  // Top 10 Leaderboard
  {
    id: 'top-10-leaderboard',
    type: 'leaderboard',
    title: '🏆 Top 10 Referrer!',
    description: 'You\'re in the top 10 referrers!',
    trigger: { leaderboardPosition: 10 },
    badge: '/milestones/top-10-badge.png',
    celebrationMessage: 'Congratulations! You\'re in the top 10 HarmonyCare referrers. Your impact is extraordinary!',
    socialPosts: {
      linkedin: `🏆 Honored to share: I'm in the Top 10 HarmonyCare referrers!

Being recognized among the most active advocates for AI-powered care management is incredibly humbling. This achievement represents:

✅ Multiple facilities transformed
✅ Countless caregivers empowered
✅ Thousands of families better served
✅ A commitment to healthcare innovation

To my fellow top referrers: Let's keep pushing the boundaries of what's possible in care management.

To care facility leaders: If you're ready to join this movement, let's connect! #HealthcareLeadership #TopPerformer`,
      twitter: `🏆 Top 10 @HarmonyCare referrer! 

Honored to be among the leaders driving care management innovation.

The impact: Countless facilities transformed, thousands of lives improved.

Let's keep building the future of healthcare. 🚀 #HealthTech`,
      facebook: `🏆 Exciting news! I'm in the Top 10 HarmonyCare referrers!

This recognition means so much because it represents the collective impact we're making in care management. Every referral is a facility transformed, caregivers empowered, and families better served.

Thank you to everyone who trusted my recommendation and joined the HarmonyCare community. Let's keep this momentum going! 💙`,
    },
    confettiColor: '#FFD700',
  },
  
  // Top 3 Leaderboard
  {
    id: 'top-3-leaderboard',
    type: 'leaderboard',
    title: '🥇 Top 3 Referrer!',
    description: 'You\'re in the top 3 referrers!',
    trigger: { leaderboardPosition: 3 },
    badge: '/milestones/top-3-badge.png',
    celebrationMessage: 'Incredible! You\'re in the top 3 HarmonyCare referrers. You\'re a true leader in care management innovation!',
    socialPosts: {
      linkedin: `🥇 Thrilled and humbled: Top 3 HarmonyCare referrer!

This achievement represents more than personal success—it represents a commitment to transforming care management across the industry.

🌟 What This Means:
• Leading the charge in AI-powered care innovation
• Helping dozens of facilities transform operations
• Empowering thousands of caregivers
• Improving care for countless residents and families

💪 My Commitment:
I will continue advocating for technology that makes care more human, not less. HarmonyCare is proof that AI can amplify the best of human care.

To care facility leaders: Join us in this transformation. The future of care management is here. #HealthcareInnovation #Leadership #TopPerformer`,
      twitter: `🥇 Top 3 @HarmonyCare referrer! 

Leading the charge in care management innovation:

🚀 Dozens of facilities transformed
🚀 Thousands of caregivers empowered
🚀 Countless lives improved

The future is here. Join us. #HealthTech #Leadership`,
      facebook: `🥇 I'm overwhelmed with gratitude! Top 3 HarmonyCare referrer!

This recognition represents the collective impact of everyone who believed in this vision and joined the HarmonyCare community. Together, we're transforming care management and improving countless lives.

Thank you to every administrator, caregiver, and family member who's been part of this journey. Let's keep building the future of care together! 💙🥇`,
    },
    confettiColor: '#FFD700',
  },
];

/**
 * Get milestone by ID
 */
export function getMilestoneById(id: string): Milestone | undefined {
  return MILESTONES.find(m => m.id === id);
}

/**
 * Check if a referral count triggers any milestones
 */
export function checkReferralMilestones(referralCount: number): Milestone[] {
  return MILESTONES.filter(
    m => m.type === 'referral_count' && m.trigger.referralCount === referralCount
  );
}

/**
 * Check if a tier upgrade triggers any milestones
 */
export function checkTierMilestones(tierName: string, referralCount: number): Milestone[] {
  return MILESTONES.filter(
    m => m.type === 'tier_upgrade' && 
         m.trigger.tierName === tierName &&
         m.trigger.referralCount === referralCount
  );
}

/**
 * Check if a leaderboard position triggers any milestones
 */
export function checkLeaderboardMilestones(position: number): Milestone[] {
  return MILESTONES.filter(
    m => m.type === 'leaderboard' && 
         m.trigger.leaderboardPosition !== undefined &&
         position <= m.trigger.leaderboardPosition
  );
}

/**
 * Get all achieved milestones for a user
 */
export function getAchievedMilestones(
  referralCount: number,
  tierName: string,
  leaderboardPosition?: number
): Milestone[] {
  const achieved: Milestone[] = [];
  
  // Check referral count milestones
  MILESTONES.forEach(milestone => {
    if (milestone.type === 'referral_count' && 
        milestone.trigger.referralCount !== undefined &&
        referralCount >= milestone.trigger.referralCount) {
      achieved.push(milestone);
    }
    
    if (milestone.type === 'tier_upgrade' &&
        milestone.trigger.tierName === tierName) {
      achieved.push(milestone);
    }
    
    if (milestone.type === 'leaderboard' &&
        leaderboardPosition !== undefined &&
        milestone.trigger.leaderboardPosition !== undefined &&
        leaderboardPosition <= milestone.trigger.leaderboardPosition) {
      achieved.push(milestone);
    }
  });
  
  return achieved;
}

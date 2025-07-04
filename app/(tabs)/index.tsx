import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Leaf,
  Bell,
  Settings,
  ChevronRight
} from 'lucide-react-native';

const COLORS = {
  primary: '#4A90E2',
  secondary: '#68C9A3',
  accent: '#FF6B6B',
  background: '#F8F9FA',
  white: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  border: '#E5E5E7',
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.userName}>The Johnson Family</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Trip Card */}
        <View style={styles.currentTripCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400' }}
            style={styles.tripImage}
          />
          <View style={styles.tripOverlay}>
            <View style={styles.tripInfo}>
              <View style={styles.tripLocation}>
                <MapPin size={16} color={COLORS.white} />
                <Text style={styles.tripLocationText}>Tokyo, Japan</Text>
              </View>
              <Text style={styles.tripTitle}>Cherry Blossom Adventure</Text>
              <Text style={styles.tripDates}>March 15-25, 2024</Text>
            </View>
            <View style={styles.tripProgress}>
              <Text style={styles.tripDaysLeft}>12 days left</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <DollarSign size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>$3,450</Text>
            <Text style={styles.statLabel}>Budget Used</Text>
            <Text style={styles.statSubtext}>68% of total</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Calendar size={20} color={COLORS.secondary} />
            </View>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Activities</Text>
            <Text style={styles.statSubtext}>Planned</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Leaf size={20} color={COLORS.accent} />
            </View>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Eco Score</Text>
            <Text style={styles.statSubtext}>Great job!</Text>
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Insights</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <TrendingUp size={20} color={COLORS.primary} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Budget Optimization</Text>
              <Text style={styles.insightText}>
                Consider taking the JR Pass for train travel. You could save $240 compared to individual tickets.
              </Text>
            </View>
            <ChevronRight size={16} color={COLORS.textSecondary} />
          </View>
          
          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Leaf size={20} color={COLORS.secondary} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Eco-Friendly Suggestion</Text>
              <Text style={styles.insightText}>
                Walking tours in Shibuya will reduce carbon footprint by 45% vs taxi rides.
              </Text>
            </View>
            <ChevronRight size={16} color={COLORS.textSecondary} />
          </View>
        </View>

        {/* Family Members */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Family Members</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersScroll}>
            {familyMembers.map((member, index) => (
              <View key={index} style={styles.memberCard}>
                <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberAge}>{member.age}</Text>
                <View style={styles.memberInterests}>
                  {member.interests.map((interest, idx) => (
                    <Text key={idx} style={styles.interestTag}>{interest}</Text>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <DollarSign size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color={COLORS.secondary} />
              <Text style={styles.actionText}>Add Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color={COLORS.accent} />
              <Text style={styles.actionText}>Invite Family</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <MapPin size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Explore Nearby</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const familyMembers = [
  {
    name: 'Dad',
    age: '42',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    interests: ['History', 'Food']
  },
  {
    name: 'Mom',
    age: '38',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    interests: ['Art', 'Shopping']
  },
  {
    name: 'Emma',
    age: '12',
    avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100',
    interests: ['Animals', 'Games']
  },
  {
    name: 'Jake',
    age: '8',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100',
    interests: ['Sports', 'Tech']
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currentTripCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  tripImage: {
    width: '100%',
    height: '100%',
  },
  tripOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'space-between',
  },
  tripInfo: {
    flex: 1,
  },
  tripLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripLocationText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  tripTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  tripDates: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
  tripProgress: {
    alignItems: 'flex-end',
  },
  tripDaysLeft: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  progressBar: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  progressFill: {
    width: '68%',
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: 'Inter-Medium',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
    marginRight: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  membersScroll: {
    marginTop: 12,
  },
  memberCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  memberAge: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  memberInterests: {
    alignItems: 'center',
  },
  interestTag: {
    fontSize: 10,
    color: COLORS.primary,
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
    textAlign: 'center',
  },
});
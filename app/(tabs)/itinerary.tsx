import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, Users, Star, Plus, CreditCard as Edit3, Camera, Car, Brain as Train, Plane, Coffee, ChevronRight, MoveVertical as MoreVertical } from 'lucide-react-native';

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

const transportIcons: { [key: string]: any } = {
  'Flight': Plane,
  'Train': Train,
  'Car': Car,
  'Walk': Users,
};

export default function ItineraryScreen() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Tokyo Adventure</Text>
            <Text style={styles.headerSubtitle}>March 15-25, 2024 • 11 days</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit3 size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Trip Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Trip Progress</Text>
            <Text style={styles.progressDays}>Day 3 of 11</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Activities</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
          </View>
        </View>

        {/* Day Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.daySelector}
          contentContainerStyle={styles.daySelectorContent}
        >
          {itineraryDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCard,
                selectedDay === index && styles.selectedDayCard
              ]}
              onPress={() => setSelectedDay(index)}
            >
              <Text style={[
                styles.dayDate,
                selectedDay === index && styles.selectedDayText
              ]}>
                {day.date}
              </Text>
              <Text style={[
                styles.dayName,
                selectedDay === index && styles.selectedDayText
              ]}>
                {day.day}
              </Text>
              <View style={[
                styles.dayIndicator,
                selectedDay === index && styles.selectedDayIndicator
              ]} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Current Day Activities */}
        <View style={styles.activitiesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {itineraryDays[selectedDay]?.day} Activities
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {itineraryDays[selectedDay]?.activities.map((activity, index) => {
            const TransportIcon = transportIcons[activity.transport] || Car;
            
            return (
              <View key={index} style={styles.activityCard}>
                <View style={styles.activityTime}>
                  <Clock size={16} color={COLORS.textSecondary} />
                  <Text style={styles.timeText}>{activity.time}</Text>
                </View>
                
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <View style={styles.activityLocation}>
                        <MapPin size={14} color={COLORS.textSecondary} />
                        <Text style={styles.locationText}>{activity.location}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <MoreVertical size={16} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  {activity.image && (
                    <Image source={{ uri: activity.image }} style={styles.activityImage} />
                  )}

                  <View style={styles.activityDetails}>
                    <View style={styles.activityMeta}>
                      <View style={styles.metaItem}>
                        <Users size={14} color={COLORS.textSecondary} />
                        <Text style={styles.metaText}>{activity.participants}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Star size={14} color={COLORS.warning} />
                        <Text style={styles.metaText}>{activity.rating}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <TransportIcon size={14} color={COLORS.textSecondary} />
                        <Text style={styles.metaText}>{activity.duration}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                    
                    <View style={styles.activityActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Camera size={16} color={COLORS.primary} />
                        <Text style={styles.actionText}>Photos</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <MapPin size={16} color={COLORS.primary} />
                        <Text style={styles.actionText}>Directions</Text>
                      </TouchableOpacity>
                      <View style={styles.costBadge}>
                        <Text style={styles.costText}>${activity.cost}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Quick Add Activity */}
        <View style={styles.quickAddContainer}>
          <Text style={styles.sectionTitle}>Quick Add</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickAddButtons}>
              {quickAddOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <TouchableOpacity key={index} style={styles.quickAddButton}>
                    <Icon size={20} color={option.color} />
                    <Text style={styles.quickAddText}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Travel Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>AI Travel Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Weather Alert</Text>
            <Text style={styles.tipText}>
              Rain expected tomorrow afternoon. Consider moving outdoor activities to morning or rescheduling indoor alternatives.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Sustainable Choice</Text>
            <Text style={styles.tipText}>
              Taking the JR Yamanote Line instead of taxi will save 70% CO2 emissions and $15 per trip.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const itineraryDays = [
  {
    date: '15',
    day: 'Today',
    activities: [
      {
        time: '09:00',
        title: 'Senso-ji Temple Visit',
        location: 'Asakusa, Tokyo',
        image: 'https://images.pexels.com/photos/161401/senso-ji-temple-asakusa-tokyo-japan-161401.jpeg?auto=compress&cs=tinysrgb&w=400',
        participants: 'Family (4)',
        rating: '4.8',
        transport: 'Train',
        duration: '2h',
        description: 'Explore Tokyo\'s oldest temple and traditional Nakamise shopping street.',
        cost: 0
      },
      {
        time: '12:00',
        title: 'Traditional Lunch',
        location: 'Asakusa Restaurant',
        participants: 'Family (4)',
        rating: '4.5',
        transport: 'Walk',
        duration: '1h',
        description: 'Authentic Japanese cuisine experience with family-friendly options.',
        cost: 120
      },
      {
        time: '15:00',
        title: 'Tokyo Skytree',
        location: 'Sumida, Tokyo',
        image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=400',
        participants: 'Family (4)',
        rating: '4.9',
        transport: 'Train',
        duration: '3h',
        description: 'Visit the world\'s second-tallest tower with amazing city views.',
        cost: 80
      }
    ]
  },
  {
    date: '16',
    day: 'Tomorrow',
    activities: [
      {
        time: '10:00',
        title: 'Shibuya Crossing',
        location: 'Shibuya, Tokyo',
        participants: 'Family (4)',
        rating: '4.7',
        transport: 'Train',
        duration: '2h',
        description: 'Experience the world\'s busiest pedestrian crossing.',
        cost: 0
      }
    ]
  },
  {
    date: '17',
    day: 'Thu',
    activities: []
  }
];

const quickAddOptions = [
  { icon: Coffee, label: 'Restaurant', color: COLORS.accent },
  { icon: Camera, label: 'Attraction', color: COLORS.primary },
  { icon: Car, label: 'Transport', color: COLORS.secondary },
  { icon: Users, label: 'Meeting', color: '#9C27B0' },
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  editButton: {
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
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  progressDays: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    width: '27%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  daySelector: {
    marginBottom: 24,
  },
  daySelectorContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dayCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDayCard: {
    backgroundColor: COLORS.primary,
  },
  dayDate: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  dayName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  dayIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginTop: 8,
  },
  selectedDayIndicator: {
    backgroundColor: COLORS.white,
  },
  activitiesContainer: {
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
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  activityContent: {
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  activityLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
  activityImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityDetails: {
    gap: 12,
  },
  activityMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  activityActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  costBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  costText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold',
  },
  quickAddContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickAddButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  quickAddButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAddText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  tipCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
});
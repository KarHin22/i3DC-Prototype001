import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Users,
  Heart,
  Leaf,
  Camera,
  Utensils,
  Building,
  Gamepad2,
  Music,
  Mountain,
  Sparkles,
  TrendingUp
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
  success: '#28A745',
};

const categoryIcons: { [key: string]: any } = {
  'Attractions': Camera,
  'Food': Utensils,
  'Hotels': Building,
  'Entertainment': Gamepad2,
  'Nightlife': Music,
  'Nature': Mountain,
};

export default function DiscoverScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (index: number) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedItems(newLiked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover Tokyo</Text>
          <Text style={styles.headerSubtitle}>Personalized recommendations for your family</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search attractions, restaurants..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* AI Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightHeader}>
            <Sparkles size={20} color={COLORS.accent} />
            <Text style={styles.insightTitle}>AI Recommendations</Text>
          </View>
          <Text style={styles.insightText}>
            Based on your family preferences, we found 23 kid-friendly activities and 15 cultural experiences that match your interests.
          </Text>
          <View style={styles.insightStats}>
            <View style={styles.insightStat}>
              <TrendingUp size={16} color={COLORS.success} />
              <Text style={styles.insightStatText}>92% match rate</Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContent}>
              {categories.map((category, index) => {
                const Icon = categoryIcons[category] || Camera;
                const isSelected = selectedCategory === category;
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      isSelected && styles.selectedCategoryButton
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Icon 
                      size={16} 
                      color={isSelected ? COLORS.white : COLORS.textSecondary} 
                    />
                    <Text style={[
                      styles.categoryText,
                      isSelected && styles.selectedCategoryText
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Recommended for You */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.recommendationsContent}>
              {recommendations.map((item, index) => (
                <View key={index} style={styles.recommendationCard}>
                  <Image source={{ uri: item.image }} style={styles.recommendationImage} />
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => toggleLike(index)}
                  >
                    <Heart 
                      size={20} 
                      color={likedItems.has(index) ? COLORS.accent : COLORS.white}
                      fill={likedItems.has(index) ? COLORS.accent : 'none'}
                    />
                  </TouchableOpacity>
                  <View style={styles.recommendationContent}>
                    <Text style={styles.recommendationTitle}>{item.title}</Text>
                    <View style={styles.recommendationLocation}>
                      <MapPin size={12} color={COLORS.textSecondary} />
                      <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                    <View style={styles.recommendationMeta}>
                      <View style={styles.rating}>
                        <Star size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                      <Text style={styles.price}>${item.price}</Text>
                    </View>
                    <View style={styles.aiMatch}>
                      <Text style={styles.aiMatchText}>{item.matchPercentage}% AI match</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Sustainable Options */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Leaf size={20} color={COLORS.secondary} />
              <Text style={styles.sectionTitle}>Eco-Friendly Options</Text>
            </View>
          </View>
          
          {sustainableOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.sustainableCard}>
              <Image source={{ uri: option.image }} style={styles.sustainableImage} />
              <View style={styles.sustainableContent}>
                <View style={styles.sustainableHeader}>
                  <Text style={styles.sustainableTitle}>{option.title}</Text>
                  <View style={styles.ecoScore}>
                    <Leaf size={12} color={COLORS.secondary} />
                    <Text style={styles.ecoScoreText}>{option.ecoScore}</Text>
                  </View>
                </View>
                <View style={styles.sustainableLocation}>
                  <MapPin size={12} color={COLORS.textSecondary} />
                  <Text style={styles.locationText}>{option.location}</Text>
                </View>
                <Text style={styles.sustainableDescription}>{option.description}</Text>
                <View style={styles.sustainableMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={12} color={COLORS.textSecondary} />
                    <Text style={styles.metaText}>{option.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Users size={12} color={COLORS.textSecondary} />
                    <Text style={styles.metaText}>{option.groupSize}</Text>
                  </View>
                  <Text style={styles.savings}>Save ${option.savings}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular This Week */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular This Week</Text>
          {popularActivities.map((activity, index) => (
            <TouchableOpacity key={index} style={styles.popularCard}>
              <Image source={{ uri: activity.image }} style={styles.popularImage} />
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>#{index + 1}</Text>
              </View>
              <View style={styles.popularContent}>
                <Text style={styles.popularTitle}>{activity.title}</Text>
                <View style={styles.popularLocation}>
                  <MapPin size={12} color={COLORS.textSecondary} />
                  <Text style={styles.locationText}>{activity.location}</Text>
                </View>
                <View style={styles.popularMeta}>
                  <View style={styles.rating}>
                    <Star size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{activity.rating}</Text>
                  </View>
                  <Text style={styles.bookings}>{activity.bookings} bookings</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const categories = ['All', 'Attractions', 'Food', 'Hotels', 'Entertainment', 'Nature'];

const recommendations = [
  {
    title: 'Ueno Zoo',
    location: 'Ueno, Tokyo',
    image: 'https://images.pexels.com/photos/2252318/pexels-photo-2252318.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    price: 15,
    matchPercentage: 95
  },
  {
    title: 'TeamLab Borderless',
    location: 'Odaiba, Tokyo',
    image: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    price: 32,
    matchPercentage: 88
  },
  {
    title: 'Sushi Making Class',
    location: 'Shibuya, Tokyo',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    price: 75,
    matchPercentage: 92
  }
];

const sustainableOptions = [
  {
    title: 'Cycling Tour of East Tokyo',
    location: 'Starting from Asakusa',
    image: 'https://images.pexels.com/photos/2832434/pexels-photo-2832434.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Explore Tokyo\'s hidden gems while reducing your carbon footprint. Family-friendly electric bikes available.',
    duration: '3-4 hours',
    groupSize: 'Up to 6',
    ecoScore: '95%',
    savings: 45
  },
  {
    title: 'Public Transport Food Tour',
    location: 'Multiple districts',
    image: 'https://images.pexels.com/photos/4253021/pexels-photo-4253021.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Discover authentic local cuisine using Tokyo\'s efficient public transport system.',
    duration: '5-6 hours',
    groupSize: 'Up to 8',
    ecoScore: '88%',
    savings: 30
  }
];

const popularActivities = [
  {
    title: 'Shibuya Sky Observatory',
    location: 'Shibuya, Tokyo',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    bookings: '2.3k'
  },
  {
    title: 'Meiji Shrine',
    location: 'Shibuya, Tokyo',
    image: 'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    bookings: '1.8k'
  },
  {
    title: 'Tsukiji Outer Market',
    location: 'Chuo, Tokyo',
    image: 'https://images.pexels.com/photos/1907732/pexels-photo-1907732.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    bookings: '1.5k'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
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
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  insightsCard: {
    backgroundColor: '#F0F7FF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  insightText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  insightStats: {
    flexDirection: 'row',
  },
  insightStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightStatText: {
    fontSize: 12,
    color: COLORS.success,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  selectedCategoryText: {
    color: COLORS.white,
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
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: 'Inter-Medium',
  },
  recommendationsContent: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
  },
  recommendationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: 240,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recommendationImage: {
    width: '100%',
    height: 140,
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationContent: {
    padding: 16,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  recommendationLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  recommendationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  aiMatch: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  aiMatchText: {
    fontSize: 10,
    color: COLORS.secondary,
    fontFamily: 'Inter-Medium',
  },
  sustainableCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sustainableImage: {
    width: 120,
    height: 120,
  },
  sustainableContent: {
    flex: 1,
    padding: 16,
  },
  sustainableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sustainableTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    flex: 1,
    marginRight: 8,
  },
  ecoScore: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ecoScoreText: {
    fontSize: 10,
    color: COLORS.secondary,
    fontFamily: 'Inter-Medium',
    marginLeft: 2,
  },
  sustainableLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sustainableDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
    marginBottom: 8,
  },
  sustainableMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  savings: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondary,
    fontFamily: 'Inter-SemiBold',
  },
  popularCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  popularImage: {
    width: 80,
    height: 80,
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'Inter-Bold',
  },
  popularContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  popularLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookings: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
});
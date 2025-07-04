import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Languages,
  Camera,
  Mic,
  RotateCcw,
  Copy,
  Volume2,
  Star,
  Bookmark,
  ChevronDown,
  Globe,
  MessageCircle,
  MapPin,
  Clock
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

export default function TranslateScreen() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Japanese');
  const [isListening, setIsListening] = useState(false);

  const handleTranslate = () => {
    // Simulate translation
    if (sourceText.trim()) {
      setTranslatedText('こんにちは、助けてください');
    }
  };

  const swapLanguages = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
    
    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Translate</Text>
          <Text style={styles.headerSubtitle}>Communicate with confidence</Text>
        </View>

        {/* Language Selector */}
        <View style={styles.languageSelector}>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>{fromLanguage}</Text>
            <ChevronDown size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
            <RotateCcw size={20} color={COLORS.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>{toLanguage}</Text>
            <ChevronDown size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Translation Card */}
        <View style={styles.translationCard}>
          {/* Input Section */}
          <View style={styles.inputSection}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter text to translate..."
              value={sourceText}
              onChangeText={setSourceText}
              multiline
              maxLength={500}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity
                style={[styles.actionButton, isListening && styles.listeningButton]}
                onPress={() => setIsListening(!isListening)}
              >
                <Mic size={20} color={isListening ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Camera size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Output Section */}
          <View style={styles.outputSection}>
            <Text style={styles.translatedText}>
              {translatedText || 'Translation will appear here...'}
            </Text>
            {translatedText && (
              <View style={styles.outputActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Volume2 size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Copy size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Star size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Translate Button */}
        <TouchableOpacity 
          style={[styles.translateButton, !sourceText.trim() && styles.disabledButton]}
          onPress={handleTranslate}
          disabled={!sourceText.trim()}
        >
          <Languages size={20} color={COLORS.white} />
          <Text style={styles.translateButtonText}>Translate</Text>
        </TouchableOpacity>

        {/* Quick Phrases */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Phrases</Text>
          <View style={styles.phrasesContainer}>
            {quickPhrases.map((phrase, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.phraseCard}
                onPress={() => setSourceText(phrase.english)}
              >
                <View style={styles.phraseContent}>
                  <Text style={styles.phraseEnglish}>{phrase.english}</Text>
                  <Text style={styles.phraseTranslation}>{phrase.japanese}</Text>
                  <Text style={styles.phrasePronunciation}>{phrase.pronunciation}</Text>
                </View>
                <TouchableOpacity style={styles.phrasePlayButton}>
                  <Volume2 size={16} color={COLORS.primary} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Conversation Mode */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Conversation Mode</Text>
          <TouchableOpacity style={styles.conversationCard}>
            <View style={styles.conversationIcon}>
              <MessageCircle size={24} color={COLORS.primary} />
            </View>
            <View style={styles.conversationContent}>
              <Text style={styles.conversationTitle}>Start Live Conversation</Text>
              <Text style={styles.conversationDescription}>
                Real-time translation for face-to-face conversations
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Location-Based Phrases */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <MapPin size={20} color={COLORS.secondary} />
              <Text style={styles.sectionTitle}>Nearby Phrases</Text>
            </View>
          </View>
          <Text style={styles.sectionSubtitle}>Common phrases for your current location</Text>
          
          {locationPhrases.map((category, index) => (
            <View key={index} style={styles.locationCategoryCard}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryIcon}>
                  <category.icon size={20} color={category.color} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
              {category.phrases.map((phrase, phraseIndex) => (
                <TouchableOpacity 
                  key={phraseIndex} 
                  style={styles.locationPhrase}
                  onPress={() => setSourceText(phrase.english)}
                >
                  <Text style={styles.locationPhraseText}>{phrase.english}</Text>
                  <Text style={styles.locationPhraseTranslation}>{phrase.japanese}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Saved Translations */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Translations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          {savedTranslations.map((item, index) => (
            <TouchableOpacity key={index} style={styles.savedCard}>
              <View style={styles.savedIcon}>
                <Bookmark size={16} color={COLORS.primary} />
              </View>
              <View style={styles.savedContent}>
                <Text style={styles.savedEnglish}>{item.english}</Text>
                <Text style={styles.savedTranslation}>{item.translation}</Text>
                <View style={styles.savedMeta}>
                  <Clock size={12} color={COLORS.textSecondary} />
                  <Text style={styles.savedTime}>{item.timestamp}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.savedPlayButton}>
                <Volume2 size={16} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const quickPhrases = [
  {
    english: "Hello, can you help me?",
    japanese: "こんにちは、助けてください",
    pronunciation: "Konnichiwa, tasukete kudasai"
  },
  {
    english: "Where is the bathroom?",
    japanese: "トイレはどこですか？",
    pronunciation: "Toire wa doko desu ka?"
  },
  {
    english: "How much does this cost?",
    japanese: "これはいくらですか？",
    pronunciation: "Kore wa ikura desu ka?"
  },
  {
    english: "I don't speak Japanese",
    japanese: "日本語が話せません",
    pronunciation: "Nihongo ga hanasemasen"
  }
];

const locationPhrases = [
  {
    title: 'Restaurant',
    icon: MessageCircle,
    color: COLORS.accent,
    phrases: [
      { english: "Table for four, please", japanese: "4人用のテーブルをお願いします" },
      { english: "What do you recommend?", japanese: "何がおすすめですか？" },
      { english: "The check, please", japanese: "お会計をお願いします" }
    ]
  },
  {
    title: 'Transportation',
    icon: Globe,
    color: COLORS.secondary,
    phrases: [
      { english: "How do I get to Tokyo Station?", japanese: "東京駅にはどう行けばいいですか？" },
      { english: "One ticket, please", japanese: "切符を1枚ください" },
      { english: "What time does the train arrive?", japanese: "電車は何時に到着しますか？" }
    ]
  }
];

const savedTranslations = [
  {
    english: "Where is the nearest hospital?",
    translation: "一番近い病院はどこですか？",
    timestamp: "2 hours ago"
  },
  {
    english: "Can I pay with credit card?",
    translation: "クレジットカードで支払えますか？",
    timestamp: "Yesterday"
  },
  {
    english: "Is this vegetarian?",
    translation: "これはベジタリアン料理ですか？",
    timestamp: "2 days ago"
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
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  translationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputSection: {
    padding: 20,
  },
  textInput: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Regular',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  inputActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listeningButton: {
    backgroundColor: COLORS.accent,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
  },
  outputSection: {
    padding: 20,
  },
  translatedText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Regular',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  outputActions: {
    flexDirection: 'row',
    gap: 12,
  },
  translateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.5,
  },
  translateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
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
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    marginLeft: 28,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: 'Inter-Medium',
  },
  phrasesContainer: {
    gap: 12,
  },
  phraseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  phraseContent: {
    flex: 1,
  },
  phraseEnglish: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  phraseTranslation: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  phrasePronunciation: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
  },
  phrasePlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  conversationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  conversationContent: {
    flex: 1,
  },
  conversationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  conversationDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  locationCategoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  locationPhrase: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationPhraseText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  locationPhraseTranslation: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  savedCard: {
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
  savedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  savedContent: {
    flex: 1,
  },
  savedEnglish: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  savedTranslation: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  savedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedTime: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  savedPlayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DollarSign, TrendingUp, TrendingDown, Plus, CreditCard, Plane, Building, Utensils, Car, ShoppingBag, RefreshCw, CircleAlert as AlertCircle } from 'lucide-react-native';

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
  warning: '#FFC107',
};

const categoryIcons: { [key: string]: any } = {
  'Flights': Plane,
  'Hotels': Building,
  'Food': Utensils,
  'Transport': Car,
  'Shopping': ShoppingBag,
};

export default function BudgetScreen() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const totalBudget = 5000;
  const spentAmount = 3450;
  const remainingAmount = totalBudget - spentAmount;
  const spentPercentage = (spentAmount / totalBudget) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Budget Tracker</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <RefreshCw size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Budget Overview Card */}
        <View style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <Text style={styles.budgetTitle}>Total Budget</Text>
            <View style={styles.currencySelector}>
              <Text style={styles.currencyText}>{selectedCurrency}</Text>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.budgetAmount}>${totalBudget.toLocaleString()}</Text>
          
          <View style={styles.budgetProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${spentPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>{spentPercentage.toFixed(0)}% used</Text>
          </View>
          
          <View style={styles.budgetSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Spent</Text>
              <Text style={styles.summaryAmount}>${spentAmount.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Remaining</Text>
              <Text style={[styles.summaryAmount, { color: COLORS.secondary }]}>
                ${remainingAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* AI Budget Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightHeader}>
            <AlertCircle size={20} color={COLORS.warning} />
            <Text style={styles.insightTitle}>Budget Alert</Text>
          </View>
          <Text style={styles.insightText}>
            You're spending 15% faster than planned. Consider reducing dining expenses by $200 to stay on track.
          </Text>
        </View>

        {/* Currency Exchange */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Live Exchange Rates</Text>
          <View style={styles.exchangeCard}>
            <View style={styles.exchangeRow}>
              <Text style={styles.exchangeFrom}>1 USD</Text>
              <Text style={styles.exchangeRate}>=</Text>
              <Text style={styles.exchangeTo}>149.25 JPY</Text>
              <View style={styles.exchangeTrend}>
                <TrendingUp size={16} color={COLORS.success} />
                <Text style={styles.trendText}>+0.5%</Text>
              </View>
            </View>
            <View style={styles.exchangeRow}>
              <Text style={styles.exchangeFrom}>1 USD</Text>
              <Text style={styles.exchangeRate}>=</Text>
              <Text style={styles.exchangeTo}>0.92 EUR</Text>
              <View style={styles.exchangeTrend}>
                <TrendingDown size={16} color={COLORS.accent} />
                <Text style={styles.trendText}>-0.2%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Spending Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>
          {budgetCategories.map((category, index) => {
            const Icon = categoryIcons[category.name];
            const percentage = (category.spent / category.budget) * 100;
            
            return (
              <View key={index} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <View style={styles.categoryIcon}>
                      <Icon size={20} color={category.color} />
                    </View>
                    <View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryBudget}>
                        ${category.spent} / ${category.budget}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.categoryPercentage}>{percentage.toFixed(0)}%</Text>
                </View>
                <View style={styles.categoryProgress}>
                  <View style={[styles.categoryProgressFill, 
                    { width: `${Math.min(percentage, 100)}%`, backgroundColor: category.color }]} />
                </View>
              </View>
            );
          })}
        </View>

        {/* Quick Add Expense */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Add Expense</Text>
          <View style={styles.expenseForm}>
            <View style={styles.inputRow}>
              <View style={styles.amountInput}>
                <Text style={styles.inputLabel}>Amount</Text>
                <TextInput
                  style={styles.textInput}
                  value={newExpenseAmount}
                  onChangeText={setNewExpenseAmount}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Plus size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.categoryButtons}>
              {Object.keys(categoryIcons).slice(0, 3).map((category, index) => {
                const Icon = categoryIcons[category];
                return (
                  <TouchableOpacity key={index} style={styles.categoryButton}>
                    <Icon size={16} color={COLORS.textSecondary} />
                    <Text style={styles.categoryButtonText}>{category}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.map((transaction, index) => {
            const Icon = categoryIcons[transaction.category] || CreditCard;
            return (
              <View key={index} style={styles.transactionCard}>
                <View style={styles.transactionIcon}>
                  <Icon size={20} color={COLORS.primary} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={styles.transactionAmount}>-${transaction.amount}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const budgetCategories = [
  { name: 'Flights', budget: 1800, spent: 1650, color: COLORS.primary },
  { name: 'Hotels', budget: 1500, spent: 900, color: COLORS.secondary },
  { name: 'Food', budget: 800, spent: 520, color: COLORS.accent },
  { name: 'Transport', budget: 400, spent: 280, color: '#9C27B0' },
  { name: 'Shopping', budget: 500, spent: 100, color: '#FF9800' },
];

const recentTransactions = [
  { title: 'Hotel Booking - Tokyo', category: 'Hotels', amount: 450, date: 'Today' },
  { title: 'Dinner at Sushi Restaurant', category: 'Food', amount: 85, date: 'Yesterday' },
  { title: 'Taxi to Airport', category: 'Transport', amount: 45, date: '2 days ago' },
  { title: 'Souvenirs Shopping', category: 'Shopping', amount: 120, date: '3 days ago' },
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
  refreshButton: {
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
  budgetCard: {
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
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetTitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  changeText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: 'Inter-Medium',
  },
  budgetAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  budgetProgress: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  budgetSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  insightsCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
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
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  exchangeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exchangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  exchangeFrom: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  exchangeRate: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
    marginHorizontal: 12,
  },
  exchangeTo: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
    textAlign: 'center',
  },
  exchangeTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  trendText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  categoryBudget: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  categoryProgress: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  expenseForm: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  amountInput: {
    flex: 1,
    marginRight: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    paddingVertical: 8,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButtonText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  transactionDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
    fontFamily: 'Inter-Bold',
  },
});
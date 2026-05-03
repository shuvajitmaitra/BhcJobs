import React from 'react';
import { View } from 'react-native';
import { BriefcaseBusiness, Clock3, MapPin } from 'lucide-react-native';
import RNText from '../common/RNText';
import { TJob } from '../../types/jobTypes';
import { useThemeColors } from '../../hooks/useThemeColors';
import { withOpacity } from '../../utils/commonFunction';
import CardBadge from '../common/CardBadge';
import CardActionButton from '../common/CardActionButton';

type TrendingJobCardProps = {
  item: TJob;
  onPressView?: () => void;
  onPressApply?: () => void;
};

const toText = (value: unknown, fallback: string) => {
  return typeof value === 'string' && value.trim() ? value : fallback;
};

const toAmount = (value: unknown, fallback: string) => {
  return typeof value === 'number' || typeof value === 'string'
    ? String(value)
    : fallback;
};

const formatSalary = (item: TJob) => {
  if (
    typeof item.min_salary === 'number' &&
    typeof item.max_salary === 'number' &&
    item.currency
  ) {
    const range =
      item.min_salary === item.max_salary
        ? `${item.min_salary}`
        : `${item.min_salary}-${item.max_salary}`;
    const salaryType = toText(item.salary_type, 'monthly');

    return `${item.currency} ${range} ${salaryType}`;
  }

  return toAmount(item.salary, 'SAR 900 Monthly');
};

const formatFoodAllowance = (item: TJob) => {
  if (typeof item.food_amount === 'number' && item.currency) {
    return `${item.currency} ${item.food_amount}`;
  }

  if (typeof item.food_option === 'string' && item.food_option.trim()) {
    return item.food_option;
  }

  return toAmount(item.food_allowance, 'As per company policy');
};

const getStatus = (item: TJob) => {
  if (typeof item.status === 'string' && item.status.trim()) {
    return item.status;
  }

  if (item.expiry) {
    const expiryDate = new Date(item.expiry);
    const today = new Date();
    expiryDate.setHours(23, 59, 59, 999);
    today.setHours(0, 0, 0, 0);

    if (!Number.isNaN(expiryDate.getTime()) && expiryDate < today) {
      return 'Expired';
    }
  }

  return item.is_active === 1 ? 'Open' : 'Closed';
};

const TrendingJobCard = ({
  item,
  onPressView,
  onPressApply,
}: TrendingJobCardProps) => {
  const { colors } = useThemeColors();
  const title = toText(
    item.job_title ?? item.title ?? item.name,
    'Service Crew',
  );
  const company = toText(item.company_name ?? item.company?.name, "McDonald's");
  const status = getStatus(item);
  const category = toText(item.type, 'OVERSEAS')
    .replaceAll('_', ' ')
    .toUpperCase();
  const location = toText(
    item.country?.name ?? item.city?.name,
    'SAUDI ARABIA',
  ).toUpperCase();
  const salary = formatSalary(item);
  const salaryBdt = toAmount(item.salary_bdt, 'Equivalent BDT 29,700');
  const foodAllowance = formatFoodAllowance(item);
  const foodAllowanceBdt = toAmount(
    item.food_allowance_bdt,
    'Equivalent BDT 8,250',
  );
  const showSalaryBdt =
    typeof item.salary_bdt === 'number' ||
    (typeof item.salary_bdt === 'string' && item.salary_bdt.trim());
  const showFoodAllowanceBdt =
    typeof item.food_allowance_bdt === 'number' ||
    (typeof item.food_allowance_bdt === 'string' &&
      item.food_allowance_bdt.trim());

  return (
    <View
      style={{ backgroundColor: withOpacity(colors.primary, 0.2) }}
      className="relative rounded-2xl bg-card border border-border px-5 pb-6 mt-6"
    >
      <View className="flex-row justify-end -mt-6 ">
        <View className="flex-row items-center gap-3 rounded-lg bg-[#ffd9d6] px-3 py-2 shadow-soft">
          <Clock3 color="#ef4444" size={18} strokeWidth={2.1} />
          <RNText className="text-lg font-semibold text-black">{status}</RNText>
        </View>
      </View>

      <RNText className="text-2xl font-bold text-foreground">{title}</RNText>
      <RNText className="mt-1 text-xl font-bold text-muted-foreground">
        {company}
      </RNText>

      <View className="">
        <RNText className="text-lg font-extrabold text-foreground">
          {`Salary: ${salary}`}
        </RNText>
        {showSalaryBdt ? (
          <RNText className="text-lg font-extrabold text-foreground">
            {`(${salaryBdt})`}
          </RNText>
        ) : null}
        <RNText className="text-lg font-extrabold text-foreground">
          {`Food Allowance: ${foodAllowance}`}
        </RNText>
        {showFoodAllowanceBdt ? (
          <RNText className="text-xl font-extrabold text-foreground">
            {`(${foodAllowanceBdt})`}
          </RNText>
        ) : null}
      </View>

      <View className="mt-4 flex-row gap-4">
        <CardBadge icon={BriefcaseBusiness} text={category} />
        <CardBadge icon={MapPin} text={location} />
      </View>

      <View className="mt-4 flex-row gap-4">
        <CardActionButton
          label="View"
          onPress={onPressView}
          className="rounded-2xl border-primary bg-card"
        />
        <CardActionButton
          label="Apply Now"
          onPress={onPressApply}
          variant="solid"
          className="rounded-2xl"
        />
      </View>
    </View>
  );
};

export default TrendingJobCard;

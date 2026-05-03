import React from 'react';
import { Pressable, View } from 'react-native';
import { BriefcaseBusiness, Clock3, MapPin } from 'lucide-react-native';
import RNText from '../common/RNText';
import { TJob } from '../../types/jobTypes';

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
    <View className="relative rounded-[28px] bg-app-card border border-app-cardBorder px-5 pb-6 mt-6 pt-6">
      <View className="flex-row justify-end -mt-10 ">
        <View className="flex-row items-center gap-3 rounded-lg bg-[#ffd9d6] px-3 py-2 shadow-soft">
          <Clock3 color="#ef4444" size={18} strokeWidth={2.1} />
          <RNText className="text-lg font-semibold text-black">{status}</RNText>
        </View>
      </View>

      <RNText className="text-2xl font-bold text-app-text">{title}</RNText>
      <RNText className="mt-1 text-xl font-bold text-app-textMuted">
        {company}
      </RNText>

      <View className="">
        <RNText className="text-xl font-extrabold text-app-text">
          {`Salary: ${salary}`}
        </RNText>
        {showSalaryBdt ? (
          <RNText className="text-xl font-extrabold text-app-text">
            {`(${salaryBdt})`}
          </RNText>
        ) : null}
        <RNText className="text-xl font-extrabold text-app-text">
          {`Food Allowance: ${foodAllowance}`}
        </RNText>
        {showFoodAllowanceBdt ? (
          <RNText className="text-xl font-extrabold text-app-text">
            {`(${foodAllowanceBdt})`}
          </RNText>
        ) : null}
      </View>

      <View className="mt-4 flex-row gap-4">
        <View className="flex-row items-center gap-2 rounded-xl border border-brand-primary bg-brand-secondary px-2 py-2">
          <BriefcaseBusiness color="#4B84F6" size={20} strokeWidth={2.1} />
          <RNText className="text-base font-medium uppercase tracking-[0.4px] text-slate-800">
            {category}
          </RNText>
        </View>
        <View className="flex-row items-center gap-2 rounded-xl border border-brand-primary bg-brand-accent px-4 py-2">
          <MapPin color="#4B84F6" size={20} strokeWidth={2.1} />
          <RNText className="text-base font-medium uppercase tracking-[0.4px] text-slate-800">
            {location}
          </RNText>
        </View>
      </View>

      <View className="mt-4 flex-row gap-4">
        <Pressable
          onPress={onPressView}
          className="flex-1 items-center justify-center rounded-[14px] border border-brand-primary bg-white py-5"
        >
          <RNText className="text-[18px] font-extrabold text-brand-primary">
            View
          </RNText>
        </Pressable>
        <Pressable
          onPress={onPressApply}
          className="flex-1 items-center justify-center rounded-[14px] bg-brand-primary py-5"
        >
          <RNText className="text-[18px] font-extrabold text-white">
            Apply Now
          </RNText>
        </Pressable>
      </View>
    </View>
  );
};

export default TrendingJobCard;

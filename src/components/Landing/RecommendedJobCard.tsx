import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { BriefcaseBusiness, Clock3, MapPin, Star } from 'lucide-react-native';
import RNText from '../common/RNText';
import { TJob } from '../../types/jobTypes';
import env from '../../../env';
import { useThemeColors } from '../../hooks/useThemeColors';
import { withOpacity } from '../../utils/commonFunction';
import CardBadge from '../common/CardBadge';
import CardActionButton from '../common/CardActionButton';

type RecommendedJobCardProps = {
  item: TJob;
  salaryText: string;
  salaryApproxText?: string | null;
  foodText: string | null;
  foodApproxText?: string | null;
  deadlineText: string;
  onPressView?: () => void;
  onPressApply?: () => void;
};

const RecommendedJobCard = ({
  item,
  salaryText,
  salaryApproxText,
  foodText,
  foodApproxText,
  deadlineText,
  onPressView,
  onPressApply,
}: RecommendedJobCardProps) => {
  const { colors } = useThemeColors();
  const title = item.job_title ?? item.title ?? item.name ?? 'Service Crew';
  const companyName = item.company_name ?? item.company?.name ?? "McDonald's";
  const companyImage = item.company?.image
    ? `${env.STORAGE_BASE_URL}/company-image/${item.company.image}`
    : null;
  const category = (item.type ?? 'overseas').replaceAll('_', ' ').toUpperCase();
  const location = (item.country?.name ?? 'Saudi Arabia').toUpperCase();

  return (
    <View className="rounded-3xl border border-primary bg-card p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <RNText className="text-2xl font-bold text-card-foreground">{title}</RNText>
        </View>
        <Pressable className="h-12 w-12 items-center justify-center">
          <Star color={colors.primary} size={25} strokeWidth={2.2} />
        </Pressable>
      </View>

      <View className="flex-row items-center gap-3">
        <View
          style={{ overflow: 'hidden' }}
          className="h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-white p-1">
          {companyImage ? (
            <Image source={{ uri: companyImage }} resizeMode="contain" className="h-full w-full" />
          ) : (
            <BriefcaseBusiness color="#6366f1" size={30} strokeWidth={2.2} />
          )}
        </View>
        <RNText className="flex-1 text-2xl font-bold text-muted-foreground">{companyName}</RNText>
      </View>

      <View
        style={{ backgroundColor: withOpacity(colors.primary, 0.2) }}
        className="mt-3 rounded-2xl p-4">
        <RNText className="text-lg font-semibold text-card-foreground">
          {`Salary: ${salaryText}`}
          {salaryApproxText ? (
            <RNText className="text-lg font-semibold text-card-foreground">
              {` (${salaryApproxText} approx.)`}
            </RNText>
          ) : null}
        </RNText>

        {foodText && (
          <View
            style={{ backgroundColor: withOpacity(colors.primary, 0.2) }}
            className="mt-2 rounded-xl p-2">
            <RNText className="text-lg font-semibold text-primary">
              {`Food Allowance: ${foodText}`}
              {foodApproxText ? (
                <RNText className="text-lg font-semibold text-primary">
                  {` (${foodApproxText} approx.)`}
                </RNText>
              ) : null}
            </RNText>
          </View>
        )}
      </View>

      <View className="mt-4 flex-row gap-4">
        <CardBadge icon={BriefcaseBusiness} text={category} />
        <CardBadge icon={MapPin} text={location} />
      </View>

      <View className="mt-4 flex-row items-center gap-2">
        <Clock3 color="#ef4444" size={20} strokeWidth={2.2} />
        <RNText className="flex-1 text-lg font-semibold text-card-foreground">
          {`Application Deadline: ${deadlineText}`}
        </RNText>
      </View>

      <View className="mt-4 flex-row gap-4">
        <CardActionButton label="View" onPress={onPressView} />
        <CardActionButton label="Apply Now" onPress={onPressApply} variant="solid" />
      </View>
    </View>
  );
};

export default RecommendedJobCard;

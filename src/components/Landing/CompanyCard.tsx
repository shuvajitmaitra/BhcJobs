import React from 'react';
import { TCompany } from '../../types/companyTypes';
import env from '../../../env';
import InfoCard from './InfoCard';

type CompanyCardProps = {
  item: TCompany;
  onPress?: () => void;
};

const CompanyCard = ({ item, onPress }: CompanyCardProps) => {
  const { name, jobs_count, image } = item;
  const imageUri = `${env.STORAGE_BASE_URL}/company-image/${image}`;

  return (
    <InfoCard
      title={name}
      subtitle={`${jobs_count} Available Jobs`}
      imageUri={image ? imageUri : null}
      onPress={onPress}
      roundedImage
    />
  );
};

export default CompanyCard;

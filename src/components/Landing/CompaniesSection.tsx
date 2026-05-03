import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import HeaderTitle from '../common/HeaderTitle';
import { useApiCall } from '../../hooks/useApiCall';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { gGap } from '../../utils/Sizes';
import SeeMoreButton from '../common/SeeMoreButton';
import { getCompanies } from '../../services/companyService';
import { setCompanies } from '../../redux/slices/companySlice';
import { TCompany } from '../../types/companyTypes';
import CompanyCard from './CompanyCard';

const DEFAULT_VISIBLE_ITEMS = 4;

const CompaniesSection = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(state => state.company.companies);
  const [expanded, setExpanded] = useState(false);

  const { error, execute } = useApiCall(getCompanies, data => {
    dispatch(setCompanies(data));
  });

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleCompanies = useMemo(() => {
    if (expanded) {
      return companies;
    }

    return companies.slice(0, DEFAULT_VISIBLE_ITEMS);
  }, [expanded, companies]);

  if (error) {
    return;
  }

  const renderItem = ({ item }: { item: TCompany }) => {
    return <CompanyCard item={item} />;
  };
  return (
    <View className="px-3">
      <HeaderTitle title="Popular Companies" />
      <FlatList
        data={visibleCompanies}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />

      <SeeMoreButton
        expanded={expanded}
        hidden={companies.length <= DEFAULT_VISIBLE_ITEMS}
        onPress={() => setExpanded(current => !current)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    gap: gGap(10),
  },
  contentContainer: {
    gap: gGap(10),
  },
});

export default CompaniesSection;

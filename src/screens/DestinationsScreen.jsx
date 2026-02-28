import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../shared/theme';
import { useDestinations } from '../shared/hooks/useDestination';
import DestinationListCard from '../shared/components/DestinationListCard';
import DestinationListSkeleton from '../shared/components/DestinationListSkeleton';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/images/home/logo.svg';
import Profile from '../../assets/images/home/profile.jpg';

export default function DestinationsScreen() {
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 100);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        setPage(1);
        setAllData([]);
    }, [debouncedSearch, selectedFilter]);

    const filters = selectedFilter !== 'All' ? { types: selectedFilter } : {};
    
    const { data, isError, isLoading, refetch, isFetching } = useDestinations({ 
        perPage, 
        page, 
        search: debouncedSearch,
        filters 
    });

    useEffect(() => {
        if (data?.data && !isFetching) {
            if (page === 1) {
                setAllData(data.data);
            } else {
                setAllData(prev => {
                    const newItems = data.data.filter(
                        item => !prev.some(p => p.flight_code === item.flight_code)
                    );
                    return [...prev, ...newItems];
                });
            }
        }
    }, [data, isFetching]);

    const handleLoadMore = () => {
 
        const hasMoreData = data?.total && allData.length < data.total;
        const returnedFullPage = data?.data?.length === perPage;
        
        if (!isLoading && !isFetching && returnedFullPage && hasMoreData) {
            setPage(prev => prev + 1);
        }
    };

    const hasMore = data?.total ? allData.length < data.total : false;

    const filterOptions = ['All',  'Beach', 'Mountain', 'City'];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color={colors.blackColor} />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Logo width={152} height={28} />
                </View>

                <View style={styles.profileImageContainer}>
                    <Image style={styles.profileImage} source={Profile} />
                    <View style={styles.orangeDot} />
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={colors.lightGray} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search destinations..."
                            placeholderTextColor={colors.lightGray}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color={colors.lightGray} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.filterScroll}
                    >
                        {filterOptions.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterChip,
                                    selectedFilter === filter && styles.filterChipActive
                                ]}
                                onPress={() => setSelectedFilter(filter)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.filterTextActive
                                ]}>
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {isError ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Failed to load destinations.</Text>
                        <TouchableOpacity onPress={refetch} style={styles.retryButton}>
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : ((isLoading || isFetching) && page === 1) ? (
                    <FlatList
                        data={[...Array(5).keys()]}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => `skeleton-${item}`}
                        renderItem={() => <DestinationListSkeleton />}
                    />
                ) : (
                    <FlatList
                        data={allData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item.flight_code}-${index}`}
                        renderItem={({ item, index }) => <DestinationListCard item={item} index={index} />}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            (isLoading || isFetching) && page > 1 ? (
                                <View>
                                    <DestinationListSkeleton />
                                    <DestinationListSkeleton />
                                </View>
                            ) : !hasMore && allData.length > 0 ? (
                                <View style={styles.endContainer}>
                                    <Text style={styles.endText}>End of list</Text>
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={
                            !isLoading && !isFetching ? (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No destinations found</Text>
                                </View>
                            ) : null
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteBg,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.lg,
        backgroundColor: colors.whiteBg,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    profileImage: {
        borderRadius: 999,
        width: 36,
        height: 36,
    },
    profileImageContainer: {
        position: 'relative',
    },
    orangeDot: {
        position: 'absolute',
        backgroundColor: '#FFA007',
        width: 10,
        height: 10,
        right: 0,
        top: 0,
        borderRadius: 999,
    },
    content: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.xl,
    },
    searchSection: {
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.whiteBg,
        borderRadius: 12,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        gap: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: typography.md,
        fontFamily: typography.interRegular,
        color: colors.blackColor,
        padding: 0,
    },
    filterScroll: {
        flexGrow: 0,
        marginRight : -spacing.xl,
    },
    filterChip: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.whiteBg,
        borderRadius: 20,
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    filterChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    filterText: {
        fontSize: typography.sm,
        fontFamily: typography.interMedium,
        color: colors.blackColor,
    },
    filterTextActive: {
        color: colors.whiteBg,
        fontWeight: typography.bold,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xxl,
    },
    errorText: {
        color: 'red',
        fontSize: typography.md,
        fontFamily: typography.interRegular,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    retryButton: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    retryText: {
        color: colors.whiteBg,
        fontSize: typography.md,
        fontFamily: typography.interBold,
        fontWeight: typography.bold,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: typography.md,
        fontFamily: typography.interRegular,
        color: colors.lightGray,
    },
    emptyContainer: {
        padding: spacing.xxl,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: typography.md,
        fontFamily: typography.interRegular,
        color: colors.lightGray,
    },
    endContainer: {
        paddingVertical: spacing.xl,
        alignItems: 'center',
    },
    endText: {
        fontSize: typography.sm,
        fontFamily: typography.interRegular,
        color: colors.lightGray,
    },
});

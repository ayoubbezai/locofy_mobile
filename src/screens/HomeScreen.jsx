import  React ,{useState ,useEffect, useRef} from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ScrollView , Text, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '../../assets/images/home/logo.svg';
import Profile from '../../assets/images/home/profile.jpg';
import Paris from '../../assets/images/home/paris.png';
import Heart from '../../assets/icons/heart.svg';
import FlightExemple from '../../assets/images/home/flightExemple.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../shared/theme/color';
import { typography } from '../shared/theme/typography';
import { spacing } from '../shared/theme/spacing';
import { useDestinations } from '../shared/hooks/useDestination'
import DestinationCard from '../shared/components/DestinationCard'
import SkeletonCard from '../shared/components/SkeletonCard'
import TagList from '../shared/components/TagsList'

export default function HomeScreen() {
    const [page,setPage] = useState(1);
    const [perPage ] = useState(5);
    const carouselRef = useRef(null);
    const isScrollingRef = useRef(false)
    const [currentIndex, setCurrentIndex] = useState(0);


    // const [filters , setFilters] = useState({city_name : '' , country : '' , flight_code : '' , types : ''})
    const {data  ,  isError,isLoading , refetch} = useDestinations({perPage , page });
    const ITEM_WIDTH = 150;
    const CARD_WIDTH = ITEM_WIDTH + spacing.sm ;
console.log('isLoading:', isLoading);

    const onScrollEndDrag = () => {
        const timeout = setTimeout(()=>(
            isScrollingRef.current = false

        ),5000)
        return clearTimeout(timeout)
    }

    const onScrollEnd =(event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x ;
        const index = Math.round(contentOffsetX / CARD_WIDTH);
        setCurrentIndex(index);
    }
            
        useEffect(() => {
            if (!data?.data?.length) return;
            const interval = setInterval(() => {
                if (isScrollingRef.current) return;
                const nextIndex = (currentIndex + 1) % data.data.length;
                setCurrentIndex(nextIndex);
                carouselRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            }, 3000);
            return () => clearInterval(interval);
        }, [currentIndex, data]);
    

    // if (isLoading) return <Text>Loading...</Text>
    return (
        <SafeAreaView style={styles.container}  edges={["top"]}>
 

            <View style={styles.navBar}>
                <TouchableOpacity>
                    <Ionicons name="menu" size={32} color="black" style={styles.menu} />
                </TouchableOpacity>

                <View style={styles.logoContiner}>
                    <Logo width={152} height={28} />
                </View>

                <View style={styles.profileImageContiner}>
                    <Image style={styles.profileImage} source={Profile} />
                    <View style={styles.orangeDot} />
                </View>
            </View>
                    
    <ScrollView style={styles.scrollContiner}>

            <View style={styles.content} >
                
            <View  style={styles.heroImage}>
                <Image style={styles.backgroundImage} source={Paris} />
                    <View style={styles.overlay} />

                <Heart width={20} height={20} style={styles.heartIcon}/>
                <View style={styles.pricing}>
                    <View style={styles.priceTextContiner}>
                        <Text style={styles.parisText} >Paris</Text>
                    </View>
                    <View style={styles.rightPricing}>
                        <Text style={styles.fromText} >FROM</Text>
                        <Text style={styles.priceText} >$1299</Text>
                    </View>
                </View>

            </View>

            <View style={styles.secnedSection}>
                <View style={styles.upcomingFlight}>
                    <Text style={styles.titleText}>Upcoming Flight</Text>
                    <View style={styles.upcomingFlightExemple}>
                        <View style={styles.upcomingFlightFirstRow} >
                            <View style={styles.flightFirstElement}>
                                <Text style={styles.flightFirstElementAbrv}>SIN</Text>
                                <Text style={styles.flightFirstElementText}>Singgapore</Text>
                            </View>

                            <FlightExemple  />
                            {/* <View style={styles.flightFirstElement}>
                                <Text style={styles.flightFirstElementSinText}>SIN</Text>
                                <Text style={styles.flightFirstElementSingaporeText}>Singgapore</Text>
                            </View> */}
                                    <View style={styles.flightLastElement}>
                                <Text style={styles.flightFirstElementAbrv}>LAX</Text>
                                <Text style={styles.flightFirstElementText}>Los Angeles</Text>
                            </View>
                        </View>
                            <View style={styles.hr} />
                            <View style={styles.flightSecendElement} >
                                <Text style={styles.departsText}>Departs on: 1 May, 08:00 AM</Text>
                                <Text style={styles.departsText2}>
                                    <Text style={styles.daysText}>4 days </Text>
                                    <Text>to go</Text>
                                </Text>

                        </View>

                    </View>

                </View>
                <TagList/>
                <View style={styles.trendingDestinations}>
                    <View style={styles.destinationHeader}>
                       <Text style={styles.titleText}>Trending Destinations</Text>
                       <TouchableOpacity > <Text style={styles.seeAllButton}>
                        See All
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {isError ? (
                    <View style={{ padding: 16, alignItems: 'center' }}>
                        <Text style={{ color: 'red', marginBottom: 8 }}>Failed to load destinations.</Text>
                        <TouchableOpacity onPress={refetch}>
                        <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                    )
                    :isLoading?
                        (
                        <FlatList 
                        data={[...Array(5).keys()]} 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                         keyExtractor={(item) => `skeleton-${item}`}
                        ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
                        renderItem={() => <SkeletonCard />}
                        />
                    )
                    :
                        
                        (
                        <FlatList 
                          style={{  marginRight: -spacing.xxl  }}
                        data={data?.data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => item.id?.toString() || `destination-${index}`}
                        pagingEnabled={false}
                        decelerationRate="fast"
                        snapToAlignment="start"
                        scrollEventThrottle={16}
                        onMomentumScrollBegin={() => { isScrollingRef.current = true }}
                        onMomentumScrollEnd={(event) => {
                            isScrollingRef.current = false;
                            onScrollEnd(event); 
                        }}  
                        snapToInterval={CARD_WIDTH}
                        ref={carouselRef} 
                        onScrollBeginDrag={()=>{isScrollingRef.current = true}}
                        onScrollEndDrag={onScrollEndDrag}
                        
                        ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
                        renderItem={({ item, index }) => (
                            <DestinationCard item={item} index={index}/>
                        )}
                        />
                    )
                        

                    }

                    </View>

            </View>


            </View>
    </ScrollView>
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
        padding: 16,
        width: "100%",
        backgroundColor: colors.whiteBg,
    },
    profileImage: {
        borderRadius: 999,
        width: 36,
        height: 36,
    },
    profileImageContiner: {
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
        backgroundColor: colors.background,
        flex: 1,
        flexDirection: 'column',
        gap: spacing.xxl,
        paddingLeft :spacing.xxl ,
        paddingRight : spacing.xxl,
        paddingTop :spacing.xl ,
        paddingBottom : spacing.xxl
     },
    parisImage: {
        width: '100%',
        borderRadius: 8,
        height: 180,
        paddingLeft :spacing.xxl ,
        paddingRight : spacing.xxl,
        paddingTop :spacing.sm ,
        paddingBottom : spacing.sm,
        gap :82 ,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },

pricing: { 
    width : '100%'    ,     
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf : 'center',
},
rightPricing: {
    alignItems: 'flex-end',
},
heroImage: {
    position: 'relative',
    width: '100%',
    height: 190,
    borderRadius: 8,
    overflow: 'hidden', 
    paddingLeft : spacing.xxl,
    paddingRight : spacing.xxl,
    paddingTop :spacing.lg ,
    paddingBottom : spacing.lg,
    gap : 82,

},

backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width : undefined,
    height : undefined,
    resizeMode : 'cover',
    
},
parisText : {
    color : 'white',
    fontFamily: typography.balooBhai2Bold,
    fontWeight: '700',
    fontSize: typography.xl,
},
fromText : {
       color : 'white',
    fontFamily: typography.interRegular,
    fontWeight: typography.regular,
    fontSize: typography.sm, 
},
priceText : {
    color : 'white',
    fontFamily: typography.balooBhai2Bold,
    fontWeight: typography.bold,
    fontSize: typography.xxl,
},
heartIcon  : {
    alignSelf : 'flex-end',
},
overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'black',
    opacity: 0.2, 
    zIndex: 0,
},
secnedSection : {
    gap : spacing.xxxl,
},
titleText : {
    color : 'black',
    fontFamily: typography.interBold,
    fontWeight: typography.bold,
    fontSize: typography.md, 
    lineHeight : 24,
    color : colors.blackColor
},
upcomingFlight : {
    gap : spacing.lg
},
upcomingFlightExemple : {
    backgroundColor : colors.whiteBg,
    gap : spacing.xl,
    borderRadius : 8 ,
    shadowColor : '#000000',
    shadowOpacity : '0.08',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius : 15,
    elevation : 4
},
upcomingFlightFirstRow : {
    paddingTop : spacing.md,
    paddingRight : spacing.md,
    paddingLeft : spacing.md,
    gap : 18,
    flexDirection : 'row' , 
    justifyContent : 'space-between'
},
flightFirstElement : {
    gap : spacing.xxs ,
},
flightFirstElementAbrv : {
    color : colors.primary, 
    fontFamily : typography.interBold,
    fontSize : 20 ,
    fontWeight: typography.bold ,
},
flightFirstElementText :{
    color : colors.blackColor, 
    fontFamily : typography.interBold,
    fontSize : typography.sm ,
    fontWeight: typography.regular ,
},
    flightLastElement : {
        gap : spacing.xxs ,
        alignItems : 'flex-end'
        
    },
    hr : {
        borderBottomColor: '#F5F6F8',
        borderBottomWidth: 1,
    },

  flightSecendElement : {
    flexDirection : 'row',
    justifyContent : 'space-between',
     paddingBottom : spacing.md,
    paddingRight : spacing.md,
    paddingLeft : spacing.md,
  },
  departsText : {
    color : colors.lightGray,
    fontSize : 15 ,
    fontWeight : typography.regular ,
    fontFamily :typography.robotoRegular ,
  },
  departsText2 : {
        color : colors.lightGray,
    fontSize : 15 ,
    fontFamily :typography.interRegular ,
  },
  daysText : {
    fontFamily :typography.interBold ,
    fontSize : 15 ,

  }, 
  destinationHeader : {
    flexDirection : 'row', 
    justifyContent : 'space-between'
  }, 
  seeAllButton : {
    color : colors.primary, 
    fontFamily : typography.interRegular,
    fontWight : typography.regular,
  }, 
  trendingDestinations : { 
    gap : spacing.lg,
    flexDirection : 'column',

  },
  destinationsList : {
    width : '100%', 
    gap : spacing.sm,
    flexDirection : 'row', 
  },
  scrollContiner : {
  }
});

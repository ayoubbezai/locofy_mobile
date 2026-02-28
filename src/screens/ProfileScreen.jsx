import {useState} from 'react'
import { View , SafeAreaView, StyleSheet, Text , TextInput,Image, FlatList, TouchableOpacity } from "react-native"
import { colors , typography ,spacing } from '../theme';
import BGImage from '../../assets/images/profile/profile_background.jpg'
import Profile from '../../assets/images/home/profile.jpg'
import Card from '../../assets/images/profile/creadit_card.svg'
import Covid from '../../assets/images/profile/coivd.svg'
import Code from '../../assets/images/profile/code.svg'
import Settings from '../../assets/images/profile/settings.svg'
import Logout from '../../assets/images/profile/logout.svg'
import Question from '../../assets/images/profile/question.svg'
import Back from '../../assets/images/profile/back.svg'
import Pen from '../../assets/images/profile/pen.svg'
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default  function ProfileScreen  (){
    const navigation = useNavigation();
    const [name, setName] = useState("Ayoub Bezai");
    const [location, setLocation] = useState("Batna , Algeria");
    const [bio, setBio] = useState(
    "I like the beach, mountains, forest and everything about nature!"
    );
    const [isEditing,setIsEditing] = useState(false);

    const Items = [
        {id : 1 , name : 'Payment Details' , Icon : Card , isNew : false },
        {id : 2 , name : 'Covid Advisory' , Icon : Covid , isNew : false },
        {id : 3 , name : 'Referral Code' , Icon : Code , isNew : true },
        {id : 4 , name : 'Settings' , Icon : Settings , isNew : false },
        {id : 5 , name : 'Logout' , Icon : Logout , isNew : false },
    ];

    return (
        <SafeAreaView  style={styles.continer}>
                <Image style={styles.backgroundImage} source={BGImage} /> 
                <View style={styles.header}>
                    <View style={styles.headerIconContainer}>
                        <TouchableOpacity onPress={()=> navigation.goBack()}>

                        <Back width={24} height={24}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerIconContainer}>
                        <TouchableOpacity  onPress={() => setIsEditing(!isEditing)}>
                            {
                                isEditing ? 
                                
                                <Icon name="close" size={24} color="black" />
                                : 

                        <Pen width={24} height={24}/>
                            }
                        </TouchableOpacity>
                    </View>

                </View>

            <View style={styles.contentContainer}>
                <Image source={Profile} style={styles.profileImage}/>
                <View style={styles.profileDataContainer}>
                    <View style={styles.ProfileNameParentContainer}>
                        <View style={styles.ProfileNameContainer}>
                    {isEditing ? (
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={[styles.input, styles.nameInput]}
                    />
                    ) : (
                    <Text style={styles.NameText}>{name}</Text>
                    )}
                    {isEditing ? (
                    <TextInput
                        value={location}
                        onChangeText={setLocation}
                 style={[styles.input, styles.locationInput]}
                    />
            ) : (
            <Text style={styles.locationText}>{location}</Text>
            )}                        
            </View>
                    </View>
                {isEditing ? (
                <TextInput
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    style={[styles.input, styles.bioInput]}
                />
                ) : (
                <Text style={styles.profileBioText}>{bio}</Text>
                )}
                    <View style={styles.hr} />
                    <View style={styles.itemsContainer}>
                        <FlatList
                        data={Items}
                        keyExtractor={(item, index) => item.id?.toString() || `item-${index}`}
                        ItemSeparatorComponent={() => <View style={{ height: spacing.xxl }} />}
                        renderItem={({item})=>(
                            <View style={styles.itemCard}>
                                <item.Icon/>
                                {item.isNew ?
                                <View style={styles.newItemContainer}>
                                <Text style={styles.itemText}>
                                    {item.name}
                                </Text>
                                    <View style={styles.newContainer}>
                                        <Text style={styles.newText}>NEW</Text>

                                    </View>    
                                </View>
                            
                            :
                                <Text style={styles.itemText}>
                                    {item.name}
                                </Text>
                            }
            
                            </View>    
                            )}

                        />
                        <View style={styles.questionContainer}>
                            <Question width={22} height={22}/>
                            <Text style={styles.questionText}>Have questions? We are here to help</Text>

                        </View>

                    </View>

                </View>

            </View>        

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    continer :{
        flex : 1,
        backgroundColor : colors.background,
        justifyContent : 'center',
        alignItems : 'center',
        position: 'relative',
        width: '100%',
        overflow: 'hidden', 
        
    },
    text : {
        fontSize : typography.xl,
        fontFamily : typography.robotoBold,
        color : colors.blackColor,

    },
    backgroundImage: {
    position: "absolute",
    top: -40,        // move up
    left: 0,
    right: 0,
    width: "100%",
    height: 500,
    resizeMode: "cover",
    
},
contentContainer : {
    backgroundColor : '#fff',
    width : '100%',
    height : '75%',
    marginTop : 'auto',
    position: 'relative',
    borderTopLeftRadius: spacing.sm,
    borderTopRightRadius: spacing.sm,
    paddingHorizontal: 16,
    paddingVertical: 43,
    gap : spacing.sm,
    shadowColor : '#000000',
    shadowOpacity : '0.14',
    shadowOffset: { width: 0, height: -8 },
    shadowRadius : 20,
    elevation : 8

},
profileImage : {
    width : 87,
    height : 87,
    borderWidth : 3 ,
    borderColor : colors.whiteBg,
    borderRadius : 99,
    position : 'absolute',
    top : -40,
    left : 13,
},
profileDataContainer : {
    flex : 1,
    gap : spacing.xl ,
},
profileBioText : {
    fontFamily : typography.interRegular,
    fontSize : typography.sm,
    color : colors.blackColor,
    lineHeight : 24,
},
ProfileNameParentContainer : {
    gap : spacing.xl,
},
ProfileNameContainer : {
    gap : 2,

},
NameText : {
    fontSize : 24,
    fontFamily : typography.interBold,
},
locationText : {
    fontSize : typography.sm,
    fontFamily : typography.interRegular,
    color : colors.lightGray,
},
    hr : {
        borderBottomColor: '#E6E9F0',
        borderBottomWidth: 1,
    },
itemsContainer : {
    gap : spacing.xxl,
},
itemCard : {
    flexDirection : 'row',
    gap : spacing.xl,
    alignItems : 'center'
},
questionContainer : {
    flexDirection : 'row',
    backgroundColor : '#EAF5FF',
    padding : spacing.sm,
    borderRadius: 7,
    justifyContent : 'center',
    gap : spacing.xs,

},
questionText : {
    fontFamily : typography.interRegular,
    fontSize : typography.sm,
    color : '#1262AE',
    lineHeight : 24,
},
newItemContainer : {
    flexDirection : 'row',
    gap : spacing.sm,
    alignItems : 'center'
},
itemText : {
    fontSize : typography.md,
    fontFamily : typography.robotoMedium,
    color : colors.blackColor,
    lineHeight : 24,
},
newContainer : {
    backgroundColor : '#32D4AD',
    flexDirection : 'row',
    borderRadius: 5,
    gap : spacing.sm,
    paddingHorizontal : 7,
    paddingVertical: 2,


},
newText : {
    fontSize : 13,
    fontFamily : typography.robotoMedium,
    color : '#fff',
    lineHeight : 18,
},
header : {
    flexDirection : 'row',
    padding : spacing.xl,
    justifyContent : 'space-between',
    alignItems : 'center',
    position: "absolute",
    width : '100%',
    top : 78

},
headerIconContainer : {
        flexDirection : 'row',
    padding : 6,
    gap : spacing.sm,
    borderRadius: 24,
    backgroundColor : colors.whiteBg,
    shadowColor : '#000000',
    shadowOpacity : '0.08',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius : 12,
    elevation : 6

},
input: {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 6,
  backgroundColor: "#f9f9f9",
},

bioInput: {
  minHeight: 70,
  textAlignVertical: "top", 
}

})
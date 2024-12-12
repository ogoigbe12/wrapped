import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import Layer from "@/assets/svgs/Layer";
import ContactList from "../components/ContactList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const InviteFriendsScreen: React.FC = () => {
  const handleInvite = (id: string) => {
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Wrapped only works {"\n"} with friends</Text>
        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.greenButtonText}>Invite 5 best friends</Text>
        </TouchableOpacity>
        <View style={styles.layerText}>
          <Layer />
          <Text style={styles.subheading}>Why 5 friends?</Text>
        </View>
        <ContactList onInvite={handleInvite} />
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.blueButton}>
          <FontAwesome6 name="share-square" size={15} color={Colors.white} />
          <Text style={styles.blueButtonText}>Invite 5 friends </Text>
          <Text style={styles.numberCount}>0/5</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>🎉 Invited by Gift</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  greenButton: {
    width: "50%",
    backgroundColor: Colors.green,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  greenButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    color: Colors.green,
    textAlign: "center",
    marginBottom: 10,
  },
  layerText: {
    flexDirection: "row",
    marginLeft: 100,
    gap: 4,
    marginTop: 10,
    marginBottom: 15,
  },
  blueButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 32,
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  blueButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.gray,
  },
  numberCount: {
    color: Colors.white,
    borderWidth: 2,
    borderRadius: 50,
    borderStyle: "solid",
    borderColor: Colors.count,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 14,
    width: 25,
    height: 24,
    gap: 29,
  },
});

export default InviteFriendsScreen;

// import React, { useState } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// type Contact = {
//   id: string;
//   name: string;
//   invited: boolean;
// };

// const InviteFriendsScreen: React.FC = () => {
//   const [contacts, setContacts] = useState<Contact[]>([
//     { id: '1', name: 'Damola Adegoke', invited: false },
//     { id: '2', name: 'Freedom Chuks', invited: false },
//     { id: '3', name: 'Gift Chuks', invited: false },
//     { id: '4', name: 'Douglas Sandra', invited: false },
//   ]);

//   const [invitedCount, setInvitedCount] = useState(0);
//   const [invitedContacts, setInvitedContacts] = useState<(Contact | null)[]>(Array(5).fill(null));

//   const handleInvite = (id: string) => {
//     setContacts((prev) =>
//       prev.map((contact) => {
//         if (contact.id === id) {
//           if (!contact.invited && invitedCount < 5) {
//             const updatedInvitedContacts = [...invitedContacts];
//             updatedInvitedContacts[invitedCount] = contact;
//             setInvitedContacts(updatedInvitedContacts);
//             setInvitedCount((prevCount) => prevCount + 1);
//           } else if (contact.invited) {
//             const updatedInvitedContacts = invitedContacts.map((c) => (c?.id === id ? null : c));
//             setInvitedContacts(updatedInvitedContacts);
//             setInvitedCount((prevCount) => prevCount - 1);
//           }
//           return { ...contact, invited: !contact.invited };
//         }
//         return contact;
//       })
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Wrapped only works with friends</Text>
//       <TouchableOpacity style={styles.greenButton}>
//         <Text style={styles.greenButtonText}>Invite 5 best friends</Text>
//       </TouchableOpacity>
//       <View style={styles.avatarRow}>
//         {invitedContacts.map((contact, index) => (
//           <View key={index} style={styles.avatar}>
//             <Ionicons name="person-circle-outline" size={50} color={contact ? '#00C853' : '#E0E0E0'} />
//             <Text style={styles.avatarText}>
//               {contact ? contact.name : 'No friend\nInvited yet'}
//             </Text>
//           </View>
//         ))}
//       </View>
//       <Text style={styles.subheading}>Why 5 friends?</Text>
//       <TextInput
//         placeholder="Search contacts"
//         style={styles.searchInput}
//       />
//       <FlatList
//         data={contacts}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.contactRow}>
//             <Text style={styles.contactName}>{item.name}</Text>
//             <TouchableOpacity
//               style={[
//                 styles.inviteButton,
//                 item.invited ? styles.invitedButton : {},
//               ]}
//               onPress={() => handleInvite(item.id)}
//               disabled={!item.invited && invitedCount >= 5}
//             >
//               <Text style={styles.inviteButtonText}>
//                 {item.invited ? 'Invited' : 'Invite'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//       <TouchableOpacity style={styles.blueButton}>
//         <Text style={styles.blueButtonText}>
//           Invite 5 friends ({invitedCount}/5)
//         </Text>
//       </TouchableOpacity>
//       <Text style={styles.footerText}>🎉 Invited by Gift</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   greenButton: {
//     backgroundColor: '#00C853',
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   greenButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   avatarRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   avatar: {
//     alignItems: 'center',
//   },
//   avatarText: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#888888',
//     marginTop: 5,
//   },
//   subheading: {
//     fontSize: 16,
//     color: '#888888',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   searchInput: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//   },
//   contactRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   contactName: {
//     fontSize: 16,
//   },
//   inviteButton: {
//     backgroundColor: '#E0E0E0',
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//   },
//   invitedButton: {
//     backgroundColor: '#00C853',
//   },
//   inviteButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   blueButton: {
//     backgroundColor: '#1E88E5',
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   blueButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   footerText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#888888',
//   },
// });

// export default InviteFriendsScreen;

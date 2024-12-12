import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import Colors from "@/src/constants/colors";
import * as SMS from "expo-sms";
import InvitationCard from "@/assets/svgs/InvitationCard";

type Contact = {
  id: string;
  name: string;
  invited: boolean;
};

type TContactListProps = React.FC<{
  handleUpdateInviteCount: (updatedCount: number) => void;
}>;

const ContactList: TContactListProps = ({ handleUpdateInviteCount }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [invitedCount, setInvitedCount] = useState(0);
  const [invitedContacts, setInvitedContacts] = useState<(Contact | null)[]>(
    Array(5).fill(null)
  );

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        setPermissionStatus(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (data) {
          const contactList = data.map((contact) => ({
            id: contact.id || "",
            name: contact.name,
            invited: false,
          }));
          setContacts(contactList);
          setFilteredContacts(contactList);
        }
      } else {
        Alert.alert("Permission Denied", "We need access to your contacts.");
      }
    };
    fetchContacts();
  }, []);

  const handleInvite = async (id: string) => {
    // Update the contact's 'invited' status in the state
    setContacts((prev) =>
      prev.map((contact) => {
        if (contact.id === id) {
          const updatedContact = { ...contact, invited: !contact.invited };

          // Update the invited contacts array and invited count based on the new state
          if (!contact.invited && invitedCount < 5) {
            const updatedInvitedContacts = [...invitedContacts];
            updatedInvitedContacts[invitedCount] = updatedContact;
            setInvitedContacts(updatedInvitedContacts);
            setInvitedCount((prevCount) => prevCount + 1);
          } else if (contact.invited) {
            const updatedInvitedContacts = invitedContacts.map((c) =>
              c?.id === id ? null : c
            );
            setInvitedContacts(updatedInvitedContacts);
            setInvitedCount((prevCount) => prevCount - 1);
          }

          return updatedContact;
        }
        return contact;
      })
    );

    // Send SMS to the contact if invited
    const contact = contacts.find((contact) => contact.id === id);
    if (contact && !contact.invited) {
      const { result } = await SMS.sendSMSAsync(
        ["08165250973"],
        `Hello ${contact.name}, you're invited to Wrapped!`
      );
      handleUpdateInviteCount(1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  if (!permissionStatus) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: Colors.black }}>
          We need access to your contacts. Please grant the permission to
          continue.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.avatarRow}>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 10,
          }}
        >
          {invitedContacts.map((contact, index) => (
            <View key={index} style={styles.avatar}>
              <View style={styles.invitation}>
                {contact ? (
                  <Text style={styles.avatarText}>
                    {contact.name.charAt(0)}
                  </Text>
                ) : (
                  <InvitationCard />
                )}
              </View>
              <Text style={styles.avatarText}>
                {contact?.name || "No friend\nInvited yet"}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.searchInput}>
        <Ionicons name="search-outline" size={24} color={Colors.gray} />
        <TextInput
          placeholder="Search contacts"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        contentContainerStyle={{ gap: 15 }}
        nestedScrollEnabled={true}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactListItem item={item} handleInvite={handleInvite} />
        )}
      />
    </View>
  );
};

type TContactListItem = React.FC<{
  item: Contact;
  handleInvite: (id: string) => void;
}>;

const ContactListItem: TContactListItem = ({ item, handleInvite }) => (
  <View style={styles.contactRow}>
    <Text style={styles.contactName}>{item.name}</Text>
    <TouchableOpacity
      style={[styles.inviteButton, item.invited ? styles.invitedButton : {}]}
      onPress={() => handleInvite(item.id)}
    >
      {item.invited ? (
        <Ionicons name="heart-outline" size={10} color="black" />
      ) : (
        <Ionicons name="person-add-sharp" size={10} color={Colors.black} />
      )}
      <Text style={styles.inviteButtonText}>Invite</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  contactName: {
    fontSize: 16,
  },
  inviteButton: {
    flexDirection: "row",
    backgroundColor: Colors.medium,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 48,
    alignItems: "center",
    gap: 4,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  avatar: {
    alignItems: "center",
  },
  invitation: {
    backgroundColor: Colors.placeholder,
    borderRadius: 50,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: Colors.primary,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.black,
    marginTop: 5,
  },
  invitedButton: {
    backgroundColor: Colors.green,
  },
  inviteButtonText: {
    color: Colors.black,
    fontWeight: "bold",
  },
  searchInput: {
    flexDirection: "row",
    backgroundColor: Colors.light,
    borderRadius: 25,
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
  },
});

export default ContactList;

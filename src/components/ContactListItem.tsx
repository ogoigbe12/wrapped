import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Contact } from "./ContactList";
import colors from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";

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
        <Ionicons name="person-add-sharp" size={10} color={colors.black} />
      <Text style={styles.inviteButtonText}>Invite</Text>
    </TouchableOpacity>
  </View>
);

export default ContactListItem;

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
    backgroundColor: colors.medium,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 48,
    alignItems: "center",
    gap: 4,
  },

  invitedButton: {
    backgroundColor: colors.green,
  },
  inviteButtonText: {
    color: colors.black,
    fontWeight: "bold",
  },
});

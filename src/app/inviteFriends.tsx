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


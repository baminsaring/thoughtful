import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";

type DropdownItemType = {
  title: string;
  icon: string;
};

const menuData: DropdownItemType[] = [
  { title: "Edit", icon: "pencil-outline" },
  { title: "Delete", icon: "trash-outline" },
];

type Prop = {
  onPressIcon: (selectedItem: string) => void
}

export default function DropdownMenu({ onPressIcon}: Prop) {

  return (
    <View>
      <SelectDropdown
        data={menuData}
        onSelect={(selectedItem, index) => {
            //console.log(selectedItem, index);
            onPressIcon(selectedItem.title);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Ionicons name="ellipsis-vertical-outline" size={24} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Ionicons name={item.icon} size={14} style={styles.dropdownItemIconStyle} />
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 110,
    flexDirection: "row",
    justifyContent: 'flex-end'
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 22,
    marginRight: 8,
  },
});

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClubCreationStepOne from "../screens/ClubCreation/ClubCreationStepOne";
import ClubCreationStepTwo from "../screens/ClubCreation/ClubCreationStepTwo";
import ClubCreationStepThree from "../screens/ClubCreation/ClubCreationStepThree";
import { ClubCreationStackProps, RootStackParamList } from "../types/club";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const ClubCreationStack: React.FC<ClubCreationStackProps> = ({
  navigation: { navigate },
  route: { params: category },
}) => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        presentation: "card",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <NativeStack.Screen
        name="ClubCreationStepOne"
        component={ClubCreationStepOne}
        initialParams={category}
        options={{
          title: "모임 개설",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("Tabs", { screen: "Clubs" })}
            >
              <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <NativeStack.Screen
        name="ClubCreationStepTwo"
        component={ClubCreationStepTwo}
        options={{
          title: "모임 개설",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("ClubCreationStepOne", { category })}
            >
              <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <NativeStack.Screen
        name="ClubCreationStepThree"
        component={ClubCreationStepThree}
        options={({
          route: {
            params: { category1, category2 },
          },
        }) => ({
          title: "모임 개설",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigate("ClubCreationStepTwo", { category1, category2 })
              }
            >
              <Ionicons name="chevron-back" size={20} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </NativeStack.Navigator>
  );
};

export default ClubCreationStack;

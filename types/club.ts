import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated } from "react-native";
import { Club, CategoryResponse } from "../api";

// For Stack Navigation
export type RootStackParamList = {
  Clubs: {};

  ClubStack: {};
  ClubTopTabs: { clubData: Club };
  ClubHome: { clubData: Club };
  ClubFeed: {};

  ClubCreationStack: {};
  ClubCreationStepOne: { category: CategoryResponse };
  ClubCreationStepTwo: { category1: number; category2: number };
  ClubCreationStepThree: {
    category1: number;
    category2: number;
    clubName: string;
    clubMemberCount: number;
    approvalMethod: number;
    imageURI: string | null;
  };

  Tabs: {};
};

export type MainBottomTabParamList = {
  Home: {};
  Search: {};
  Clubs: {};
  Profile: {};
};

// For Screens
export type ClubListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Clubs"
>;

export type ClubStackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ClubStack"
>;

export type ClubHomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ClubHome"
>;

export type ClubCreationStackProps = NativeStackScreenProps<
  RootStackParamList,
  "ClubCreationStack"
>;

export type ClubCreationStepOneScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ClubCreationStepOne"
>;

export type ClubCreationStepTwoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ClubCreationStepTwo"
>;

export type ClubCreationStepThreeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ClubCreationStepThree"
>;

// ClubHome Param For Collapsed Scroll Animation
export interface ClubHomeParamList {
  scrollY: Animated.Value;
  headerDiff: number;
}

// ClubHome Header
export interface ClubHomeHaederProps extends ClubHomeParamList {
  imageURI: string | null;
  name: string;
  shortDesc: string | null;
  category1Name: string;
  category2Name: string | null;
  recruitStatus: string;
  heightExpanded: number;
  heightCollapsed: number;
}

// For TopTab Navigation
export type TopTabParamList = {
  ClubTopTabs: { clubData: Club };
};

export type ClubTopTabProps = MaterialTopTabScreenProps<
  TopTabParamList,
  "ClubTopTabs"
>;

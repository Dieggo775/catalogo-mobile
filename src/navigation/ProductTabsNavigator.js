import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductListScreen from "../screens/ProductListScreen";
import { MENS_CATEGORIES, WOMENS_CATEGORIES } from "../constants/categories";
import { colors } from "../theme/colors";

const Tab = createMaterialTopTabNavigator();

export default function ProductTabsNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarLabelStyle: { fontWeight: "700", fontSize: 12 },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="Produtos Masculinos">
        {() => <ProductListScreen categories={MENS_CATEGORIES} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="Produtos Femininos">
        {() => <ProductListScreen categories={WOMENS_CATEGORIES} navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

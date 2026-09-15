import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { colors } from "../theme/colors";

const menuItems = [
  { icon: "person-outline", label: "Meus dados" },
  { icon: "notifications-outline", label: "Notificações" },
  { icon: "help-circle-outline", label: "Central de ajuda" },
];

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [modalVisible, setModalVisible] = useState(false);

  const confirmLogout = () => {
    setModalVisible(false);
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://api.dicebear.com/7.x/initials/png?seed=" +
              encodeURIComponent(user?.email || "Usuario"),
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{user?.email?.split("@")[0] || "Usuário"}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={20} color={colors.text} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Sair da conta</Text>
            <Text style={styles.modalText}>
              Você tem certeza que deseja sair da sua conta?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirm]}
                onPress={confirmLogout}
              >
                <Text style={styles.modalConfirmText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 110,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: 70,
    backgroundColor: "#ddd",
  },
  body: {
    flex: 1,
    alignItems: "center",
    paddingTop: 52,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    textTransform: "capitalize",
  },
  email: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 24,
  },
  menu: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuLabel: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
  logoutButton: {
    width: "100%",
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  modalCancel: {
    backgroundColor: "#eee",
  },
  modalCancelText: {
    color: colors.text,
    fontWeight: "600",
  },
  modalConfirm: {
    backgroundColor: colors.danger,
  },
  modalConfirmText: {
    color: "#fff",
    fontWeight: "700",
  },
});

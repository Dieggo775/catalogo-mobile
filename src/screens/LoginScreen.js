import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { colors } from "../theme/colors";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // erro de "usuário ou senha inválidos"

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = () => {
    setLoginError("");
    const errors = {};

    // Tela "Tentativa de login" - validação de campos obrigatórios
    if (!username.trim()) {
      errors.username = "Campo obrigatório";
    } else if (!validateEmail(username)) {
      errors.username = "Informe um e-mail válido";
    }
    if (!password.trim()) {
      errors.password = "Campo obrigatório";
    } else if (password.length < 4) {
      errors.password = "A senha deve ter pelo menos 4 caracteres";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Login simulado: apenas "senha123" é aceita, para demonstrar a
    // tela de "Falha ao efetuar login" pedida no Figma
    if (password !== "senha123") {
      setLoginError("Usuário ou senha inválidos. Tente novamente.");
      return;
    }

    dispatch(login({ email: username }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.headerSubtitle}>
            Informe seus dados para acessar sua conta
          </Text>
        </View>

        <View style={styles.card}>
          {loginError ? (
            <View style={styles.loginErrorBox}>
              <Text style={styles.loginErrorText}>{loginError}</Text>
            </View>
          ) : null}

          <Text style={styles.label}>Usuário (e-mail)</Text>
          <TextInput
            style={[styles.input, fieldErrors.username && styles.inputError]}
            placeholder="seuemail@exemplo.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={username}
            onChangeText={setUsername}
          />
          {fieldErrors.username ? (
            <Text style={styles.fieldErrorText}>{fieldErrors.username}</Text>
          ) : null}

          <Text style={[styles.label, { marginTop: 14 }]}>Senha</Text>
          <View style={[styles.passwordRow, fieldErrors.password && styles.inputError]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Sua senha"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
          {fieldErrors.password ? (
            <Text style={styles.fieldErrorText}>{fieldErrors.password}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            Dica de demonstração: use qualquer e-mail válido e a senha{" "}
            <Text style={{ fontWeight: "700" }}>senha123</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    textAlign: "center",
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  label: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputError: {
    borderColor: colors.danger,
  },
  fieldErrorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  loginErrorBox: {
    backgroundColor: "#fdecec",
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
  },
  loginErrorText: {
    color: colors.dangerDark,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 22,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  hint: {
    marginTop: 16,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },
});

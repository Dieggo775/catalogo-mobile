import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory, getProductsByCategories } from "../services/api";
import { colors } from "../theme/colors";

export default function ProductListScreen({ categories, navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data =
        activeFilter === "all"
          ? await getProductsByCategories(categories)
          : await getProductsByCategory(activeFilter);
      setProducts(data);
    } catch (err) {
      setError("Não foi possível carregar os produtos. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, categories]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <FilterChip
          label="Todos"
          active={activeFilter === "all"}
          onPress={() => setActiveFilter("all")}
        />
        {categories.map((cat) => (
          <FilterChip
            key={cat}
            label={cat.replace(/^mens-|^womens-/, "")}
            active={activeFilter === cat}
            onPress={() => setActiveFilter(cat)}
          />
        ))}
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadProducts}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("ProductDetail", { id: item.id })}
            />
          )}
          contentContainerStyle={{ padding: 6, paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.errorText}>Nenhum produto encontrado.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

function FilterChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: "#fff",
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#eef1fb",
    marginHorizontal: 4,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 12,
    color: colors.primaryDark,
    textTransform: "capitalize",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
    color: colors.textMuted,
  },
  errorText: {
    color: colors.danger,
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});

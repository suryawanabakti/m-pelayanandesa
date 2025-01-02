import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6"; // Make sure to import the correct icon set

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#d9fdd3", dark: "#d9fdd3" }}
      headerImage={
        <ImageBackground
          source={{ uri: "https://example.com/village-background.jpg" }} // Replace with a rural-themed image URL
          style={styles.headerImageContainer}
        >
          <Text style={styles.headerText}>Selamat Datang</Text>
          <Text style={styles.headerSubText}>Aplikasi Pelayanan Desa</Text>
        </ImageBackground>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Icon
              size={43}
              name="file-text"
              color={"#4caf50"}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Permohonan</Text>
              <Text style={styles.cardDescription}>Diterima: 3</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Icon
              size={43}
              name="file-text"
              color={"#ffeb3b"}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Permohonan</Text>
              <Text style={styles.cardDescription}>Diproses: 3</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            onPress={() => router.push("/informations")}
            style={styles.card}
          >
            <Icon
              size={43}
              name="newspaper"
              color={"#2196f3"}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Daftar Informasi</Text>
              <Text style={styles.cardDescription}>
                Klik untuk melihat informasi, kegiatan, pengumuman desa.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            onPress={() => router.push("/permohonan")}
            style={styles.card}
          >
            <Icon
              size={43}
              name="file-text"
              color={"#8bc34a"}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Daftar Permohonan</Text>
              <Text style={styles.cardDescription}>
                Klik untuk membuat permohonan Anda.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            onPress={() => router.push("/documents")}
            style={styles.card}
          >
            <Icon
              size={43}
              name="file-pdf"
              color={"#f44336"}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Daftar Dokumen</Text>
              <Text style={styles.cardDescription}>
                Klik untuk melihat dan mengunduh dokumen.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  headerSubText: {
    fontSize: 18,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  titleContainer: {
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f1f8e9",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 8,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
});

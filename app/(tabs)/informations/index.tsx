import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { BACKEND_URL } from "@/config";

const Index = () => {
  const [dataInformasi, setDataInformasi] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const res = await axios.get(BACKEND_URL + "/informasi");

    setDataInformasi(res.data.data);
  };

  const handleDetail = async (id: string) => {
    alert(id);
  };
  const openPdf = async (uri: string) => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      const canOpen = await Sharing.isAvailableAsync();
      if (canOpen) {
        await Sharing.shareAsync(uri);
      } else {
        alert("Sharing not available");
      }
    }
  };

  const stripHTML = (html: any) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {dataInformasi.map((informasi: any) => {
        return (
          <View style={styles.card} key={informasi.id}>
            <Image
              src={`https://pelayanandesa.unitama.my.id/storage/${informasi.gambar}`}
              style={{ height: 200 }}
            />

            <Text style={styles.cardTitle}>{informasi.judul}</Text>
            <Text style={styles.cardDescription}>
              {stripHTML(informasi.isi)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e8f5e9", // Green countryside theme background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2d6a4f", // Dark green color for the title
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#d8f3dc", // Light green for buttons
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Index;

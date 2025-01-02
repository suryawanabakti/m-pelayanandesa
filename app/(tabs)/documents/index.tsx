import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { BACKEND_URL } from "../../../config";

const Index = () => {
  const [dataDokumen, setDataDokumen] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    const res = await axios.get(BACKEND_URL + "/dokumen");
    console.log(res.data.data);
    setDataDokumen(res.data.data);
  };

  const handleDownload = async (fileUrl: string) => {
    const fileUri = `${FileSystem.documentDirectory}sample.pdf`;
    setLoading(true);
    try {
      // Download the PDF from the URL
      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);
      setLoading(false);
      alert("Download Berhasil");

      // Optionally, share or open the file
      openPdf(uri);
    } catch (error) {
      setLoading(false);
      alert("Download Error");
      console.error(error);
    }
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {dataDokumen.map((dokumen: any) => {
        return (
          <View style={styles.card} key={dokumen.id}>
            <Text style={styles.cardTitle}>{dokumen.nama}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDownload(dokumen.file)}
            >
              <Text>Download File</Text>
            </TouchableOpacity>
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

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@/app/context/AuthContext";

const Create = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [text, setText] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<any>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleServiceTypeChange = (newServiceType: string) => {
    setServiceType(newServiceType);
  };
  const handlePickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Semua tipe file
      });
      console.log("RESULT", result.assets);
      setPdfFile(result.assets ? result.assets[0] : null); // Menyimpan dokumen yang dipilih
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("Jenis Pelayanan:", serviceType);
    const formattedDate = date.toISOString().split("T")[0];
    console.log("Tanggal:", formattedDate);
    console.log("Keterangan:", text);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("tanggal", formattedDate);
      formData.append("jenis_layanan", serviceType);
      formData.append("keterangan", text);
      if (pdfFile) {
        console.log("dataPdf", pdfFile);
        formData.append("file", {
          uri: pdfFile.uri,
          name: pdfFile.name,
          type: "application/pdf",
        } as any);
        console.log(formData);
      }

      const res = await axios.post(BACKEND_URL + "/permohonan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Berhasil tambah permohonan");
      console.log("INIRESPON", res);
      setDate(new Date());
      setText("");
      setServiceType("");
      setPdfFile(null);
      router.navigate("/permohonan");
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal mengirim permohonan");
      console.error("Error submitting:", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Title style={styles.title}>Buat Permohonan</Title>
        <Paragraph style={styles.paragraph}>
          Isi form berikut untuk membuat permohonan baru.
        </Paragraph>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Jenis Pelayanan</Text>
          <TextInput
            style={styles.input}
            value={serviceType}
            onChangeText={handleServiceTypeChange}
            placeholder="Masukkan jenis pelayanan"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tanggal</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {`Pilih Tanggal: ${date.toLocaleDateString()}`}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Keterangan</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={text}
            onChangeText={handleTextChange}
            placeholder="Masukkan keterangan"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Upload File PDF</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handlePickPdf}>
            <Text style={styles.uploadButtonText}>
              {pdfFile ? pdfFile.name : "Pilih File PDF"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Kirim Permohonan</Text>
          )}
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonDisabled: {
    backgroundColor: "#9bb8a4",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  dateButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Create;

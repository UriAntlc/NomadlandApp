// MyDocument.js
import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#4a90e2',
    padding: 10,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itineraryInfo: {
    marginBottom: 20,
  },
  itineraryText: {
    fontSize: 14,
    marginBottom: 5,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    width: '45%',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
});

const PDF = ({ itineraryName, date, columns }) => (
  <Document>
    <Page style={styles.page}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Itinerario de Viaje</Text>
      </View>

      {/* Información del Itinerario */}
      <View style={styles.itineraryInfo}>
        <Text style={styles.itineraryText}>Nombre del Itinerario: {itineraryName}</Text>
        <Text style={styles.itineraryText}>Fecha: {date}</Text>
      </View>

      {/* Columnas con imágenes e información */}
      <View style={styles.columnsContainer}>
        {/*
        {columns.map((column, index) => (
          <View style={styles.column} key={index}>
            <Image style={styles.image} src={column.image} />
            <Text style={styles.text}>{column.description}</Text>
          </View>
        ))}
        */}
      </View>
    </Page>
  </Document>
);

export default PDF;

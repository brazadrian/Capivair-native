import { Header } from "../../components/header";
import { View, Text, StatusBar, FlatList } from "react-native";
import api from "../../../services/api";
import React, { useEffect, useState } from "react";
import { Button, ListItem } from "@rneui/base";
import { Icon } from "@rneui/base";
import CustomModal from "../../components/CustomModal";

import { funcaoReadSensors } from "../../CRUD/crudSensores";

export default function Home({ navigation }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [sensorModal, setSensorModal] = useState();
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [visibleModal]); // Atualizar os sensores quando o modal for aberto ou fechado

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const reloadSensores = async () => {
    const sensor = await funcaoReadSensors();
    setSensores(sensor);
  };

  useEffect(() => {
    reloadSensores();
  });

  const renderSensor = ({ item: sensor }) => {
    return (
      <>
        <ListItem
          bottomDivider
          key={sensor.id}
          onLongPress={() => {
            setSensorModal(sensor);
            setVisibleModal(!visibleModal);
          }}
          onPress={() => {
            setSensorModal(sensor);
            setVisibleModal(!visibleModal);
          }}>
          {/* -> DAR UM JEITO PARA QUE OS ÍCONES MUDEM DE COR CONFORME O STATUS, E SEJAM POR DEFAULT O AZUL QUE TÁ*/}
          <Icon
            color="#0D6EFD"
            name="location-pin"
            onLongPress={() => {
              setSensorModal(sensor);
              setVisibleModal(!visibleModal);
            }}
            onPress={() => {
              setSensorModal(sensor);
              setVisibleModal(!visibleModal);
            }}
            size={40}
            type="material"
          />

          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {sensor.nome}
            </ListItem.Title>

            <ListItem.Subtitle>{sensor.tipo}</ListItem.Subtitle>
          </ListItem.Content>
          <Text>{sensor.id}</Text>
        </ListItem>
      </>
    );
  };

  const getData = async () => {
    const sensor = await funcaoReadSensors();
    setSensores(sensor);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="#225FD7" />
      <Header />
      <FlatList
        data={sensores}
        keyExtractor={(i) => `${i._id}`}
        renderItem={renderSensor}
      />
      <CustomModal
        isOpen={visibleModal}
        sensor={sensorModal}
        onModalClose={reloadSensores}
      />
    </View>
  );
}

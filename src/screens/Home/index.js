import { Header } from '../../components/header';
import { View, Text, StatusBar, FlatList } from "react-native";
import api from "../../../services/api";
import React, { useEffect, useState } from "react";
import { Button, ListItem } from "@rneui/base";
import { Icon } from "@rneui/base";
import CustomModal from "../../components/CustomModal";

import {funcaoReadSensors} from '../../CRUD/crudSensores';


export default function Home() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [sensorModal, setSensorModal] = useState();

  useEffect(() => {
    getData();
  }, []);

  const renderSensor = ({ item: sensor }) => {
    return (
      <>
        <ListItem
          bottomDivider
          key={sensor.id}
          onPress={() => {
            setSensorModal(sensor);
            setVisibleModal(!visibleModal);
          }}>
          {/* -> DAR UM JEITO PARA QUE OS ÍCONES MUDEM DE COR CONFORME O STATUS, E SEJAM POR DEFAULT O AZUL QUE TÁ*/}
          <Icon
            color="#0D6EFD"
            name="location-pin"
            onLongPress={() => console.log("onLongPress()")}
            onPress={() => {
              setSensorModal(sensor);
              setVisibleModal(!visibleModal);
              // console.warn("AA");
            }}
            size={40}
            type="material"
          />

          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {sensor.nome}
            </ListItem.Title>

            <ListItem.Subtitle>
              {sensor.tipo}
            </ListItem.Subtitle>
          </ListItem.Content>
          <Text>{sensor.id}</Text>
        </ListItem>
      </>
    );
  };





  //AYRTON -> chama funcao de outro arquivo para LER os sensores
  
  const [sensores, setSensores] = useState();
  const getData = async () => {
    const sensor = await funcaoReadSensors();
    setSensores(sensor);
    return sensor;
  }

  // console.log(sensores);
/*   const getData = async () => {
    var sensors = [];
    try {
      const response = await api.get("/sensor");

      sensors = response.data.sensor;

      setSensores(sensors);
    } catch (error) {
      console.error(error);
    }
    return sensors;
  }; */





  return (
    <View>
      <StatusBar style="auto" backgroundColor="#225FD7" />
      <Header />
      <FlatList
        data={sensores}
        keyExtractor={(i) => `${i.id}`}
        renderItem={renderSensor}
      />
      <CustomModal isOpen={visibleModal} sensor={sensorModal} />
    </View>
  );
}


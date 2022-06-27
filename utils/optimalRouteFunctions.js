import { Polygon } from "react-native-maps";
import GrafoMapaMurcia from "../constants/GrafoMapaMurcia.json";

const area = [
  {
    latitude: 37.997849,
    longitude: -1.144446,
  },
  {
    latitude: 37.997849,
    longitude: -1.113453,
  },
  {
    latitude: 37.975417,
    longitude: -1.113453,
  },
  {
    latitude: 37.975417,
    longitude: -1.144446,
  },
];

const earthRadius = 6371000;
const area1p1 = {
  latitud: 37.997849,
  longitud: -1.144446,
};
const area1p2 = {
  latitud: 37.975417,
  longitud: -1.113453,
};
const area2p1 = {
  latitud: 38.007886,
  longitud: -1.1579,
};
const area2p2 = {
  latitud: 37.974113,
  longitud: -1.102019,
};
//Renderizado del area limite de calculo de la ruta
function renderRouteLimit() {
  return (
    <Polygon
      coordinates={area}
      strokeColor={"red"}
      strokeWidth={2}
      fillColor={"rgba(127,255,212,0.15)"}
    ></Polygon>
  );
}

function isInsideArea1(lat, lng) {
  return (
    lat < area1p1.latitud &&
    lat > area1p2.latitud &&
    lng < area1p2.longitud &&
    lng > area1p1.longitud
  );
}

function isInsideArea2(lat, lng) {
  return (
    lat < area2p1.latitud &&
    lat > area2p2.latitud &&
    lng < area2p2.longitud &&
    lng > area2p1.longitud
  );
}

function calculateRoute(origin, destination) {
  const originCoords = {
    latitud: origin.latitude,
    longitud: origin.longitude,
  };
  const destinationCoords = {
    latitud: destination.latitude,
    longitud: destination.longitude,
  };
  
  const initialCoordinate = nearestPoint(originCoords, destinationCoords);
  const finalCoordinate = nearestPoint(destinationCoords, originCoords);

  const waypoints = calculateWaypoints(initialCoordinate, finalCoordinate);

  var currentPoint = finalCoordinate.idnodo;
  const result = [];
  while (currentPoint != initialCoordinate.idnodo) {
    var waypoint = {
      latitude: GrafoMapaMurcia.puntos[currentPoint].latitud,
      longitude: GrafoMapaMurcia.puntos[currentPoint].longitud,
    };
    result.unshift(waypoint);
    currentPoint = waypoints[currentPoint];
  }

  var ini = {
    latitude: GrafoMapaMurcia.puntos[initialCoordinate.idnodo].latitud,
    longitude: GrafoMapaMurcia.puntos[initialCoordinate.idnodo].longitud,
  };
  result.unshift(ini);
  return result;
}

//esto básicamente calcula la coordenada mas cercana a la ubicacion de origen actual teniendo en cuenta tb el destino para que no coja una cercana
//en sentido contrario, y lo mismo viceversa
function nearestPoint(p1, p2) {
  var minDistance = Infinity;
  var point = null;
  const totalDistance = calculateDistance(p1, p2);
  for (var currentPoint of GrafoMapaMurcia.puntos) {
    const currentp1Distance = calculateDistance(p1, currentPoint);
    const currentp2Distance = calculateDistance(p2, currentPoint);
    if (currentp1Distance < minDistance && currentp2Distance < totalDistance) {
      minDistance = currentp1Distance;
      point = currentPoint;
    }
  }
  return point;
}

function calculateDistance(origin, destination) {
  const dLat = ((destination.latitud - origin.latitud) * Math.PI) / 180;
  const dLon = ((destination.longitud - origin.longitud) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((origin.latitud * Math.PI) / 180) *
      Math.cos((destination.latitud * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;
  return d;
}

//Calculo de los waypoints de la ruta con menor contaminacion (Algoritmo de Dijkstra modificado)
function calculateWaypoints(origin, destination) {

  if (origin == null || destination == null) {
    return [];
  }

  let posicionesAbiertas = [];
  let posicionesCerradas = [];
  let costeAcumulado = new Array(GrafoMapaMurcia.puntos.length);
  let pointConnections = new Array(GrafoMapaMurcia.puntos.length);

  costeAcumulado.fill(0);
  posicionesAbiertas.push(origin.idnodo);

  //mientras que haya 1 posicion abierta para analizar
  while (posicionesAbiertas.length > 0) {
    //se analiza la primera de esas posiciones abiertas
    var currentpoint = posicionesAbiertas[0];
    var index = 0;
    for (var i = 1; i < posicionesAbiertas.length; i++) {
      /*
      Para todas las posiciones abiertas para analizar se guarda en 
      currentpoint aquella con menor coste
      */
      if (
        fCost(
          GrafoMapaMurcia.puntos[posicionesAbiertas[i]],
          costeAcumulado[posicionesAbiertas[i]],
          destination
        ) <
        fCost(
          GrafoMapaMurcia.puntos[currentpoint],
          costeAcumulado[currentpoint],
          destination
        )
      ) {
        currentpoint = posicionesAbiertas[i];
        index = i;
      }
    }
    
    /*Borramos el punto seleccionado con menor coste para 
      que no se pueda volver a seleccionar y lo metemos en las posiciones ya cerradas
    */
    posicionesAbiertas.splice(index, 1);
    posicionesCerradas.push(currentpoint);

    //Si ya hemos llegado al destino paramos el bucle while
    if (currentpoint == destination.idnodo) {
      break;
    }

    /*
    En este bloque for lo que se hace es analizar los vecinos del último punto seleccionado
    si están ya siendo analizados o han sido ya escogidos para la ruta no se analiza.
    Se analiza cuál sería el coste acumulado de cada vecino haciendo uso de la heurística
    y se añade cada vecino a las posiciones abiertas para analizar
    */
   
    for (var neighbour of GrafoMapaMurcia.puntos[currentpoint].vecinos) {
      if (
        !posicionesCerradas.includes(neighbour) &&
        !posicionesAbiertas.includes(neighbour)
      ) {
        costeAcumulado[neighbour] = costeAcumulado[currentpoint] +
          calculateDistance(
            GrafoMapaMurcia.puntos[currentpoint],
            GrafoMapaMurcia.puntos[neighbour]
          ) *
            GrafoMapaMurcia.puntos[neighbour].factori;
        pointConnections[neighbour] = currentpoint;
        posicionesAbiertas.push(neighbour);
      }
    }
  }
  return pointConnections;
}

function fCost(point, accumulateddistance, final) {
  return accumulateddistance + calculateDistance(point, final) * point.factori;
}

export { renderRouteLimit, isInsideArea1, isInsideArea2, calculateRoute, calculateDistance};

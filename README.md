# AirQualityMobile
El objetivo de mi proyecto de Trabajo de Fin de Grado es el de desarrollar e implementar una aplicación móvil llamada AireLocal que permita al usuario comprobar la calidad del aire y el nivel de contaminación de los principales contaminantes: Ozono
(O3), Monóxido de Carbono (CO), Dióxido de Azufre (SO2) , Dióxido de Nitrógeno (NO2) y Partículas PM10. Para realizar dicha comprobación el usuario únicamente debe activar
su ubicación GPS (la cual es solicitada por la aplicación) si lo que se desea es ver la
contaminación en el aire de la localización actual del usuario, si lo que se desea es ver la
calidad del aire en otra localización se proporciona un mapa con un buscador en el que
buscar direcciones concretas.

La aplicación proporcionará valores del aire para todo el mundo y una funcionalidad
adicional que permite obtener la ruta con menos contaminación atmosférica dentro de
cierta área en Murcia, para la zona de Murcia dará resultados más precisos gracias a
unos recursos provenientes del área de química, principalmente un mapa de
isoconcentración de benceno que permite estimar detalladamente los valores exactos de
cada contaminante para cada calle de un área de Murcia.

Debido a que mi sub-línea de TFG se especializaba en pacientes que tienen
problemas respiratorios se ha implementado un sistema de alertas que en caso de que
haya algunos valores peligrosos para dichos enfermos proporcione avisos y alertas que
hagan que estos actúen en consecuencia y un diario de síntomas que deben rellenar los
pacientes diariamente con valores médicos que se miden ellos mismos en casa, los
valores de los síntomas que el usuario declare serán subidos y almacenados en una
base de datos que podrá ser consultada por un doctor en cualquier momento usando la
propia aplicación con una sencilla interfaz, asimismo los valores de los síntomas serán
recibidos por el sistema de alertas para que este avise si hay algún síntoma fuera de lo
común y aconsejar al usuario para que actúe en consecuencia.

Los doctores pueden usar la aplicación con la misma funcionalidad que un paciente y
una funcionalidad extra que les permite comprobar los valores del diario de síntomas de
los pacientes para comprobar en caso de que un día el paciente se encontrase mal
poder observar cuál fueron sus síntomas ese día

En el directorio de Documentación y .apk se puede encontrar la aplicación para instalarla en un dispositivo Android (aunque también funciona en iOS) y una documentación mucho más extensa.

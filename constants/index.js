import icons from "./icons"
import images from "./images";
import { COLORS, SIZES, FONTS } from "./theme";


//Categorias del Indice de Calidad del Aire
const AQI_LEVEL = {
   
    good: 'Bueno', 
    moderate: 'Moderado',
    unhealthy_sensgrp: '  Poco saludable para \n     grupos sensibles',
    unhealthy: 'Poco saludable',
    very_unhealthy: 'Muy Poco Saludable',
    hazardous: 'Peligroso',
    unknown: 'Sin Datos'

};

const AQI_LEVEL_ELEMENT = {
    unhealthy_sensgrp: 'Poco saludable para grupos sensibles',
};

const AQI_FACE = {
   
    good: 'smile-beam', 
    moderate: 'smile',
    unhealthy_sensgrp: 'frown',
    unhealthy: 'sad-tear',
    very_unhealthy: 'sad-cry',
    hazardous: 'exclamation-triangle',
    unknown: 'question'

};

//Consejos de salud
const HEALTH_ADVICE = {

    activities_good: {
        id: 0,
        text: 'Es seguro realizar actividades al aire libre',
        icon: icons.activities,
        color: COLORS.good
    },
    window_good: {
        id: 1,
        text: 'Abra las ventanas para que el aire limpio ventile el interior',
        icon: icons.open_window,
        color: COLORS.good
    },
    activities_moderate: {
        id: 2,
        text: 'Los grupos sensibles deben reducir las actividades al aire libre',
        icon: icons.activities,
        color: COLORS.moderate
    },
    window_moderate: {
        id: 3,
        text: 'Cierre las ventanas para evitar el aire sucio del exterior',
        icon: icons.closed_window,
        color: COLORS.unhealthy
    },
    activities_unhealthy: {
        id: 4,
        text: 'Todo el mundo debe reducir las actividades al aire libre',
        icon: icons.no_activities,
        color: COLORS.unhealthy_sensgrp
    },
    mask: {
        id: 5,
        text: 'Los grupos sensibles deben llevar mascarilla en el exterior',
        icon: icons.mask,
        color: COLORS.unhealthy_sensgrp
    },
    purifier: {
        id: 6,
        text: 'Es recomendable usar un purificador de aire en interiores',
        icon: icons.purifier,
        color: COLORS.unhealthy_sensgrp
    },
    mask_all:{
        id: 7,
        text: 'Lleve mascarilla en el exterior',
        icon: icons.mask,
        color: COLORS.unhealthy
    },
    activities_hazardous: {
        id: 8,
        text: 'Evite las actividades al aire libre',
        icon: icons.no_activities,
        color: COLORS.unhealthy
    }
}


const AQI_ADVICES = {
    good: [HEALTH_ADVICE.activities_good, HEALTH_ADVICE.window_good],
    moderate: [HEALTH_ADVICE.activities_moderate, HEALTH_ADVICE.window_moderate],
    unhealthy_sensgrp: [HEALTH_ADVICE.activities_unhealthy, HEALTH_ADVICE.window_moderate, HEALTH_ADVICE.mask, HEALTH_ADVICE.purifier],
    unhealthy: [HEALTH_ADVICE.activities_hazardous, HEALTH_ADVICE.window_moderate, HEALTH_ADVICE.mask_all, HEALTH_ADVICE.purifier],
    very_unhealthy: [HEALTH_ADVICE.activities_hazardous, HEALTH_ADVICE.window_moderate, HEALTH_ADVICE.mask_all, HEALTH_ADVICE.purifier],
    hazardous: [HEALTH_ADVICE.activities_hazardous, HEALTH_ADVICE.window_moderate, HEALTH_ADVICE.mask_all, HEALTH_ADVICE.purifier],
    unknown: [],
}

//Modos de uso de la ventana Mapa
const MAP_MODE = {
    aqiMode: 'aqiMode',
    originRouteMode: 'originRouteMode',
    destinationRouteMode: 'destinationRouteMode'
}

//Informacion sobre la contaminacion atmosferica
const topics = {
    "airpollution" : [
        {
            "type": "image",
            "content": images.air_pollution
        },{
            "type": "title",
            "content": "La importancia de la contaminación del aire"
        },{
            "type": "text",
            "content": "La contaminación del aire es una mezcla de partículas sólidas y gases en el aire. Las emisiones de los automóviles, los compuestos químicos de las fábricas, el polvo, el polen y las esporas de moho pueden estar suspendidas como partículas."
        },{
            "type": "text",
            "content": "Algunos contaminantes del aire son tóxicos. Su inhalación puede aumentar las posibilidades de tener problemas de salud. Las personas con enfermedades del corazón o de pulmón, los adultos de más edad y los niños tienen mayor riesgo de tener problemas por la contaminación del aire. La polución del aire no ocurre solamente en el exterior: el aire en el interior de los edificios también puede estar contaminado y afectar su salud."
        },{
            "type": "header",
            "content": "El coste de reducir la contaminación del aire"
        },{
            "type": "text",
            "content": "El coste de reducir la contaminación del aire al cambiar de combustibles contaminantes como el carbón, el petróleo y el gas a fuentes de energía alternativas de cero emisiones como la eólica y la solar puede parecer alto. Pero los costes para la salud y los costes económicos de la contaminación del aire son claramente mucho más altos, y las fuentes de energía renovable como la eólica y la solar son en realidad cada vez más baratas que los combustibles fósiles contaminantes."
        },{
            "type": "text",
            "content": "Si nada cambia, los costos seguirán aumentando a medida que crece la población mundial y el cambio climático plantea nuevos riesgos que harán insostenible el capitalismo global en su forma actual. Las soluciones al problema mundial de la contaminación del aire están frente a nosotros. Las aplicaciones de energía renovable como los parques eólicos y los paneles solares ya han experimentado un inmenso crecimiento e inversión durante la última década."
        },{
            "type": "text",
            "content": "Afortunadamente, la inversión en energía renovable está ayudando a reemplazar gradualmente los costosos y letales combustibles fósiles por fuentes sostenibles más baratas de energía eólica, solar y otras energías renovables. Esto significa que nos estamos moviendo en la dirección correcta, pero aún nos queda un largo camino por recorrer."
        }
    ],
    "aqi": [
        {
            "type": "image",
            "content": images.aqi
        },{
            "type": "title",
            "content": "Indice de Calidad del Aire (AQI)"
        },{
            "type": "text",
            "content": "El AQI (por sus siglas en inglés) o Indice de Calidad del Aire, permite comprobar, en tiempo real y de forma sencilla, la calidad del aire que marcan las  estaciones de medición. El AQI incluye además recomendaciones sanitarias para la población general y la población sensible."
        },{
            "type": "header",
            "content": "¿Cómo funciona el AQI?"
        },{
            "type": "text",
            "content": "El indice del AQI varía de 0 a 500, donde los valores más altos indican mayores niveles de contaminación atmosférica y mayor preocupacion para la salud. Por ejemplo, un valor del AQI de 50 representa una buena calidad atmosférica con escaso potencial para afectar a la salud pública, pero un valor del AQI superior a 300 representa una calidad atmosférica peligrosa."
        },{
            "type": "text",
            "content": "El AQI se calcula de manera distinta en todo el mundo. El sistema más utilizado a nivel mundial es el de Estados Unidos, creado por la US EPA (Environmental Protection Agency). Este se calcula mediante la ponderación de cinco contaminantes atmosféricos principales reglamentados por la Ley de Aire puro (Ozono a nivel del suelo, contaminación por partículas, monóxido de carbono, dióxido de azufre y dióxido de nitrógeno). El sistema estadounidense se considera el más riguroso ya que otorga valores más altos para AQI por debajo de 200."
        },{
            "type": "text",
            "content": "Por lo general, los valores de AQI inferiores a 100 se consideran satisfactorios. Cuando los valores del AQI son superiores a 100, la calidad del aire se considera insalubre, en primer lugar, para ciertos grupos de personas sensibles, y luego para todos a medida que los valores del AQI aumentan."
        },{
            "type": "text",
            "content": "A fin de facilitar su interpretación, el AQI se divide en seis categorías. Cada categoría se corresponde con un nivel diferente de preocupación para la salud. La EPA ha asignado un color específico a cada categoría del AQI para ayudar a las personas a interpretar rápidamente si la contaminación del aire está llegando a niveles insalubres en sus comunidades."
        },{
            "type": "image",
            "content": images.aqitable
        }
    ],
    "so2": [
        {
            "type": "image",
            "content": images.so2
        },{
            "type": "title",
            "content": "Dióxido de Azufre (SO2)"
        },{
            "type": "header",
            "content": "¿Qué es el dióxido de azufre?"
        },{
            "type": "text",
            "content": "El Dióxido de azufre es un gas incoloro, irritante, con un olor penetrante que se comienza a percibir con 0,3 a 1,4 ppm y es perfectamente distinguible a partir de 3 ppm -partes por millón-. Su densidad es el doble que la del aire. No es un gas inflamable, ni explosivo y tiene mucha estabilidad, es muy soluble en agua y en contacto con ella se convierte en ácido sulfúrico. Consiste en un átomo de azufre y dos de oxígeno."
        },{
            "type": "text",
            "content": "Tanto la exposición a sulfatos como a los ácidos derivados del SO2, comportan graves riesgos para la salud ya que éstos pasan  directamente al sistema circulatorio humano a través de las vías respiratorias."
        },{
            "type": "header",
            "content": "¿Cómo se produce?"
        },{
            "type": "text",
            "content": "La principal fuente de emisión de dióxido de azufre a la atmósfera es la combustión de productos petrolíferos y la quema de carbón en centrales eléctricas y calefacciones centrales. Existen también algunas fuentes naturales, como es el caso de los volcanes. El SO2 también se emplea en la industria del papel como agente blanqueador."
        },{
            "type": "header",
            "content": "¿Qué efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "La contaminación del aire por SO2 causa los siguientes efectos: Dificultad para respirar, inflamación de las vías respiratorias, irritación ocular por formación de ácido sulfuroso sobre las mucosas húmedas, alteraciones psíquicas, edema pulmonar, paro cardíaco, colapso circulatorio y queratitis."
        },{
            "type": "text",
            "content": "El dióxido de azufre (SO2) también se ha asociado a problemas de asma y bronquitis crónica, aumentando la morbilidad y mortalidad en personas mayores y niños. Los asmáticos y las personas con enfermedades pulmonares obstructivas crónicas (EPOC) y con problemas cardíacos son los más sensibles a los efectos del SO2."
        },{
            "type": "header",
            "content": "Valores legislados para SO2"
        },{
            "type": "image",
            "content": images.so2values
        }
    ],
    "o3": [
        {
            "type": "image",
            "content": images.o3
        },{
            "type": "title",
            "content": "Ozono (O3)"
        },{
            "type": "header",
            "content": "¿Qué es el Ozono?"
        },{
            "type": "text",
            "content": "El ozono es un gas incoloro, formado por tres moléculas de oxígeno, que se encuentra de forma natural en la troposfera y la estratosfera. Se distinguen dos tipos en función de su ubicación: O3 troposférico y O3 estratosférico."
        },{
            "type": "text",
            "content": "El ozono presente en la estratosfera forma una capa que nos protege de las radiaciones ultravioletas; “La capa de Ozono”. Debido a la contaminación por actividades antropogénicas se ha generado uno de los mayores problemas ambientales “El agujero de la capa de Ozono” relacionado directamente con el Cambio Climático."
        },{
            "type": "text",
            "content": "Por otro lado, el ozono presente en la troposfera de forma natural es producto del transporte de éste desde la estratosfera y de diferentes reacciones químicas. Los precursores para la formación del ozono troposférico mediante dichas reacciones son los COV, CO y los NOx."
        },{
            "type": "header",
            "content": "¿Cómo se produce?"
        },{
            "type": "text",
            "content": "Normalmente el ozono no se produce de forma directa si no por la transformación de otros compuestos llamado precursores. La actividad antrópica ha generado un aumento de las concentraciones de estos precursores, especialmente NOx y los COV, generando un problema de contaminación atmosférica. Los NOx actúan como catalizadores y forman ozono a partir de los COV, por lo que el O3 es clasificado como un contaminante secundario."
        },{
            "type": "text",
            "content": "La contaminación por ozono troposférico está determinada por las concentraciones de los precursores y las condiciones meteorológicas, afectando especialmente durante la primavera y el verano en áreas suburbanas y rurales influenciadas por áreas urbanas. En los últimos años ha aumentado la importancia sobre este contaminantes por varios aspectos; la afección sobre la salud y el medio ambiente,  así como la dificultad para predecir las concentraciones de este contaminante  debido a su carácter de contaminante secundario."
        },{
            "type": "header",
            "content": "¿Qué efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "El ozono troposférico, es que tenemos en el aire que respiramos es especialmente nocivo y provoca entre otras envejecimiento y deterioro pulmonar, irritación de los ojos, la nariz o la garganta, tos, asma, dolores de cabeza y afecciones al sistema inmunológico son algunos de los efectos en la salud causados por la contaminación por Ozono.  Existen diferentes grupos de riesgo: enfermos crónicos, niños y adultos."
        },{
            "type": "text",
            "content": "Según un informe de Ecologistas en acción referente al 2018 la contaminación por ozono causa 1600 muertes prematuras al año. Un 24,6% de la población ha respirado aire que incumple el estándar legal vigente para el Ozono en el 2018 según el valor establecido por la Directiva 2008/50/CE y el Real Decreto 102/2011. Si se tiene en cuenta el valor recomendado por la OMS (más estricto) la población que ha respirado aire contaminado por el ozono con niveles superiores a la recomendación se eleva hasta el 85.3%."
        },{
            "type": "header",
            "content": "Impacto medioambiental"
        },{
            "type": "text",
            "content": "Con respecto a los efectos que genera el ozono en el medio ambiente, cabe destacar que está clasificado como el tercer gas de efecto invernadero, después del CO2 y el metano, y se ha calculado que contribuye un 25 % al calentamiento de la atmósfera."
        },{
            "type": "header",
            "content": "Valores legislados para el O3"
        },{
            "type": "image",
            "content": images.o3values
        }
    ],
    "no2": [
        {
            "type": "image",
            "content": images.no2
        },{
            "type": "title",
            "content": "Dióxido de Nitrogeno (NO2)"
        },{
            "type": "header",
            "content": "¿Qué es el dióxido de nitrogeno?"
        },{
            "type": "text",
            "content": "El dióxido de nitrógeno NO2 es un compuesto químico gaseoso de color marrón amarillento formado por la combinación de un átomo de nitrógeno y dos de oxígeno. Es un gas tóxico e irritante. El NO2 junto al NO-óxido nitroso- son conocidos como NOx y son algunos de los principales contaminantes en las ciudades."
        },{
            "type": "header",
            "content": "¿Cómo se produce?"
        },{
            "type": "text",
            "content": "En la naturaleza se produce por los incendios forestales o las erupciones volcánicas. También se produce de forma natural por la descomposición de nitratos orgánicos. El volumen total  que se produce de forma natural es infinitamente menor que el que se produce por efecto del hombre."
        },{
            "type": "text",
            "content": "La mayor parte tiene su origen en la oxidación del NO que se produce en la combustión de los motores de los vehículos, fundamentalmente los diesel. El NO emitido por los motores, una vez en la atmosfera, se oxida y se convierte en NO2. Es también un potenciador del material particulado, sobre todo de partículas finas PM2,5 que son las más perjudiciales. En su reacción con la luz UV del sol es un precursor de O3 ozono troposférico."
        },{
            "type": "header",
            "content": "¿Qué efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "La exposición continuada  NO2 se relaciona con diversas enfermedades de las vía respiratorias como disminución de la capacidad pulmonar, bronquitis agudas, asma y se considera el culpable de los procesos alérgicos, sobre todo en niños. Se ha relacionado las exposiciones crónicas a bajo nivel  con el enfisema pulmonar. Otros efectos menores son la irritación ocular y de las mucosas. Existen algunos estudios que apuntan a un incremento en la mortalidad aunque aún no está suficientemente bien establecido que la causa sea solamente la exposición a NO2."
        },{
            "type": "text",
            "content": "Se sabe que las personas con problemas previos de asma o alergias son más susceptibles a  sufrir problemas con exposiciones a menor concentración  de NO2 que personas sanas. También los niños y las mujeres embarazadas  son más vulnerables a concentraciones bajas de NO2."
        },{
            "type": "header",
            "content": "Valores legislados para NO2"
        },{
            "type": "image",
            "content": images.no2values
        }
    ],
    "co": [
        {
            "type": "image",
            "content": images.co
        },{
            "type": "title",
            "content": "Monóxido de Carbono (CO)"
        },{
            "type": "header",
            "content": "¿Qué es el monóxido de carbono?"
        },{
            "type": "text",
            "content": "El monóxido de carbono, conocido como el asesino silencioso, es un gas inodoro e incoloro producido por la combustión incompleta de combustibles fósiles (madera, petróleo, gas o carbón). Se produce cuando un aparato de gas está mal instalado, mal reparado o mal mantenido, o cuando los conductos de humos, las chimeneas o los respiraderos están obstruidos, lo que impide la circulación del aire."
        },{
            "type": "header",
            "content": "¿Cómo se produce?"
        },{
            "type": "text",
            "content": "El monóxido de carbono se produce cuando se queman combustibles fósiles. Cualquier aparato que queme combustibles fósiles puede ser potencialmente una fuente de monóxido de carbono. El monóxido de carbono suele estar asociado a aparatos que funcionan mal o están mal ventilados."
        },{
            "type": "header",
            "content": "¿Qué efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "Todo el mundo corre el riesgo de sufrir una intoxicación por monóxido de carbono, aunque los niños, los ancianos y las personas con enfermedades cardíacas crónicas, anemia o problemas respiratorios son más susceptibles de sufrir efectos adversos. Cuando el monóxido de carbono entra en el torrente sanguíneo, impide que las células sanguíneas transporten oxígeno. Esto provoca la aparición de síntomas similares a los de la falta de oxígeno, como dolores de cabeza, mareos, debilidad, malestar estomacal, vómitos, dolor en el pecho y confusión."
        },{
            "type": "text",
            "content": "Dado que estos síntomas son similares a los de la gripe, a menudo se ignoran o se diagnostican erróneamente. Aquí radica el peligro. Grandes cantidades de monóxido de carbono pueden hacer que la gente se desmaye, y sin la atención adecuada, puede ser difícil recuperarse de este estado."
        },{
            "type": "header",
            "content": "Valores legislados para el CO"
        },{
            "type": "image",
            "content": images.covalues
        }
    ],
    "pm10": [
        {
            "type": "image",
            "content": images.pm10
        },{
            "type": "title",
            "content": "Particulas PM10"
        },{
            "type": "header",
            "content": "¿Qué son las Particulas PM10?"
        },{
            "type": "text",
            "content": "Las PM10 son partículas en suspensión, sólidas o líquidas, con un diámetro de 10 micrómetros o menos. La diferencia entre las PM10 y las PM2,5 es sólo una cuestión de tamaño. Mientras que las PM2.5 son muy finas, las PM10 son más grandes y gruesas."
        },{
            "type": "header",
            "content": "¿Cómo se produce?"
        },{
            "type": "text",
            "content": "Las PM10 son todas las partículas presentes en el aire con un diámetro igual o inferior a 10 micrómetros, incluidos el humo, el polvo, el hollín, las sales, los ácidos y los metales. Las partículas también pueden formarse indirectamente cuando los gases emitidos por los vehículos de motor y las industrias sufren reacciones químicas en la atmósfera."
        },{
            "type": "text",
            "content": "Varias fuentes incluyen: polvo procedente de la construcción, los vertederos y la agricultura, polvo procedente de terrenos abiertos, incendios forestales y quema de residuos, fuentes industriales y vehículos de motor."
        },{
            "type": "header",
            "content": "Impacto medioambiental"
        },{
            "type": "text",
            "content": "Las PM10 reducen la visibilidad y, en algunos casos, tienen la capacidad de corroer los materiales orgánicos e inorgánicos. La deposición ácida resultante puede dañar los ecosistemas."
        },{
            "type": "header",
            "content": "Valores legislados para PM10"
        },{
            "type": "image",
            "content": images.pm10values
        }
    ]
}

const information = [
    {
        id: 0,
        title: 'La importancia de la contaminación del aire',
        img: images.air_pollution,
        content: topics.airpollution
    },
    {
        id: 1,
        title: 'Indice de Calidad del Aire (AQI)',
        img: images.aqi,
        content: topics.aqi
    },
    {
        id: 2,
        title: 'Dióxido de Azufre (SO2)',
        img: images.so2,     
        content: topics.so2
    },
    {
        id: 3,
        title: 'Ozono (O3)',
        img: images.o3,     
        content: topics.o3
    },
    {
        id: 4,
        title: 'Dióxido de Nitrogeno (NO2)',
        img: images.no2,   
        content: topics.no2
    },
    {
        id: 5,
        title: 'Monóxido de Carbono (CO)',
        img: images.co,   
        content: topics.co 
    },
    {
        id: 6,
        title: 'Particulas PM10',
        img: images.pm10,     
        content: topics.pm10
    },
]




export { icons, images,AQI_LEVEL_ELEMENT, COLORS, SIZES, AQI_FACE, FONTS, AQI_LEVEL, HEALTH_ADVICE, AQI_ADVICES, MAP_MODE, information };
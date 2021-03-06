import icons from "./icons"
import images from "./images";
import { COLORS, SIZES, FONTS } from "./theme";
import GOOGLE_API_KEY from "./maps"

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
            "content": "La importancia de la contaminaci??n del aire"
        },{
            "type": "text",
            "content": "La contaminaci??n del aire es una mezcla de part??culas s??lidas y gases en el aire. Las emisiones de los autom??viles, los compuestos qu??micos de las f??bricas, el polvo, el polen y las esporas de moho pueden estar suspendidas como part??culas."
        },{
            "type": "text",
            "content": "Algunos contaminantes del aire son t??xicos. Su inhalaci??n puede aumentar las posibilidades de tener problemas de salud. Las personas con enfermedades del coraz??n o de pulm??n, los adultos de m??s edad y los ni??os tienen mayor riesgo de tener problemas por la contaminaci??n del aire. La poluci??n del aire no ocurre solamente en el exterior: el aire en el interior de los edificios tambi??n puede estar contaminado y afectar su salud."
        },{
            "type": "header",
            "content": "El coste de reducir la contaminaci??n del aire"
        },{
            "type": "text",
            "content": "El coste de reducir la contaminaci??n del aire al cambiar de combustibles contaminantes como el carb??n, el petr??leo y el gas a fuentes de energ??a alternativas de cero emisiones como la e??lica y la solar puede parecer alto. Pero los costes para la salud y los costes econ??micos de la contaminaci??n del aire son claramente mucho m??s altos, y las fuentes de energ??a renovable como la e??lica y la solar son en realidad cada vez m??s baratas que los combustibles f??siles contaminantes."
        },{
            "type": "text",
            "content": "Si nada cambia, los costos seguir??n aumentando a medida que crece la poblaci??n mundial y el cambio clim??tico plantea nuevos riesgos que har??n insostenible el capitalismo global en su forma actual. Las soluciones al problema mundial de la contaminaci??n del aire est??n frente a nosotros. Las aplicaciones de energ??a renovable como los parques e??licos y los paneles solares ya han experimentado un inmenso crecimiento e inversi??n durante la ??ltima d??cada."
        },{
            "type": "text",
            "content": "Afortunadamente, la inversi??n en energ??a renovable est?? ayudando a reemplazar gradualmente los costosos y letales combustibles f??siles por fuentes sostenibles m??s baratas de energ??a e??lica, solar y otras energ??as renovables. Esto significa que nos estamos moviendo en la direcci??n correcta, pero a??n nos queda un largo camino por recorrer."
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
            "content": "El AQI (por sus siglas en ingl??s) o Indice de Calidad del Aire, permite comprobar, en tiempo real y de forma sencilla, la calidad del aire que marcan las  estaciones de medici??n. El AQI incluye adem??s recomendaciones sanitarias para la poblaci??n general y la poblaci??n sensible."
        },{
            "type": "header",
            "content": "??C??mo funciona el AQI?"
        },{
            "type": "text",
            "content": "El indice del AQI var??a de 0 a 500, donde los valores m??s altos indican mayores niveles de contaminaci??n atmosf??rica y mayor preocupacion para la salud. Por ejemplo, un valor del AQI de 50 representa una buena calidad atmosf??rica con escaso potencial para afectar a la salud p??blica, pero un valor del AQI superior a 300 representa una calidad atmosf??rica peligrosa."
        },{
            "type": "text",
            "content": "El AQI se calcula de manera distinta en todo el mundo. El sistema m??s utilizado a nivel mundial es el de Estados Unidos, creado por la US EPA (Environmental Protection Agency). Este se calcula mediante la ponderaci??n de cinco contaminantes atmosf??ricos principales reglamentados por la Ley de Aire puro (Ozono a nivel del suelo, contaminaci??n por part??culas, mon??xido de carbono, di??xido de azufre y di??xido de nitr??geno). El sistema estadounidense se considera el m??s riguroso ya que otorga valores m??s altos para AQI por debajo de 200."
        },{
            "type": "text",
            "content": "Por lo general, los valores de AQI inferiores a 100 se consideran satisfactorios. Cuando los valores del AQI son superiores a 100, la calidad del aire se considera insalubre, en primer lugar, para ciertos grupos de personas sensibles, y luego para todos a medida que los valores del AQI aumentan."
        },{
            "type": "text",
            "content": "A fin de facilitar su interpretaci??n, el AQI se divide en seis categor??as. Cada categor??a se corresponde con un nivel diferente de preocupaci??n para la salud. La EPA ha asignado un color espec??fico a cada categor??a del AQI para ayudar a las personas a interpretar r??pidamente si la contaminaci??n del aire est?? llegando a niveles insalubres en sus comunidades."
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
            "content": "Di??xido de Azufre (SO2)"
        },{
            "type": "header",
            "content": "??Qu?? es el di??xido de azufre?"
        },{
            "type": "text",
            "content": "El Di??xido de azufre es un gas incoloro, irritante, con un olor penetrante que se comienza a percibir con 0,3 a 1,4 ppm y es perfectamente distinguible a partir de 3 ppm -partes por mill??n-. Su densidad es el doble que la del aire. No es un gas inflamable, ni explosivo y tiene mucha estabilidad, es muy soluble en agua y en contacto con ella se convierte en ??cido sulf??rico. Consiste en un ??tomo de azufre y dos de ox??geno."
        },{
            "type": "text",
            "content": "Tanto la exposici??n a sulfatos como a los ??cidos derivados del SO2, comportan graves riesgos para la salud ya que ??stos pasan  directamente al sistema circulatorio humano a trav??s de las v??as respiratorias."
        },{
            "type": "header",
            "content": "??C??mo se produce?"
        },{
            "type": "text",
            "content": "La principal fuente de emisi??n de di??xido de azufre a la atm??sfera es la combusti??n de productos petrol??feros y la quema de carb??n en centrales el??ctricas y calefacciones centrales. Existen tambi??n algunas fuentes naturales, como es el caso de los volcanes. El SO2 tambi??n se emplea en la industria del papel como agente blanqueador."
        },{
            "type": "header",
            "content": "??Qu?? efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "La contaminaci??n del aire por SO2 causa los siguientes efectos: Dificultad para respirar, inflamaci??n de las v??as respiratorias, irritaci??n ocular por formaci??n de ??cido sulfuroso sobre las mucosas h??medas, alteraciones ps??quicas, edema pulmonar, paro card??aco, colapso circulatorio y queratitis."
        },{
            "type": "text",
            "content": "El di??xido de azufre (SO2) tambi??n se ha asociado a problemas de asma y bronquitis cr??nica, aumentando la morbilidad y mortalidad en personas mayores y ni??os. Los asm??ticos y las personas con enfermedades pulmonares obstructivas cr??nicas (EPOC) y con problemas card??acos son los m??s sensibles a los efectos del SO2."
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
            "content": "??Qu?? es el Ozono?"
        },{
            "type": "text",
            "content": "El ozono es un gas incoloro, formado por tres mol??culas de ox??geno, que se encuentra de forma natural en la troposfera y la estratosfera. Se distinguen dos tipos en funci??n de su ubicaci??n: O3 troposf??rico y O3 estratosf??rico."
        },{
            "type": "text",
            "content": "El ozono presente en la estratosfera forma una capa que nos protege de las radiaciones ultravioletas; ???La capa de Ozono???. Debido a la contaminaci??n por actividades antropog??nicas se ha generado uno de los mayores problemas ambientales ???El agujero de la capa de Ozono??? relacionado directamente con el Cambio Clim??tico."
        },{
            "type": "text",
            "content": "Por otro lado, el ozono presente en la troposfera de forma natural es producto del transporte de ??ste desde la estratosfera y de diferentes reacciones qu??micas. Los precursores para la formaci??n del ozono troposf??rico mediante dichas reacciones son los COV, CO y los NOx."
        },{
            "type": "header",
            "content": "??C??mo se produce?"
        },{
            "type": "text",
            "content": "Normalmente el ozono no se produce de forma directa si no por la transformaci??n de otros compuestos llamado precursores. La actividad antr??pica ha generado un aumento de las concentraciones de estos precursores, especialmente NOx y los COV, generando un problema de contaminaci??n atmosf??rica. Los NOx act??an como catalizadores y forman ozono a partir de los COV, por lo que el O3 es clasificado como un contaminante secundario."
        },{
            "type": "text",
            "content": "La contaminaci??n por ozono troposf??rico est?? determinada por las concentraciones de los precursores y las condiciones meteorol??gicas, afectando especialmente durante la primavera y el verano en ??reas suburbanas y rurales influenciadas por ??reas urbanas. En los ??ltimos a??os ha aumentado la importancia sobre este contaminantes por varios aspectos; la afecci??n sobre la salud y el medio ambiente,  as?? como la dificultad para predecir las concentraciones de este contaminante  debido a su car??cter de contaminante secundario."
        },{
            "type": "header",
            "content": "??Qu?? efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "El ozono troposf??rico, es que tenemos en el aire que respiramos es especialmente nocivo y provoca entre otras envejecimiento y deterioro pulmonar, irritaci??n de los ojos, la nariz o la garganta, tos, asma, dolores de cabeza y afecciones al sistema inmunol??gico son algunos de los efectos en la salud causados por la contaminaci??n por Ozono.  Existen diferentes grupos de riesgo: enfermos cr??nicos, ni??os y adultos."
        },{
            "type": "text",
            "content": "Seg??n un informe de Ecologistas en acci??n referente al 2018 la contaminaci??n por ozono causa 1600 muertes prematuras al a??o. Un 24,6% de la poblaci??n ha respirado aire que incumple el est??ndar legal vigente para el Ozono en el 2018 seg??n el valor establecido por la Directiva 2008/50/CE y el Real Decreto 102/2011. Si se tiene en cuenta el valor recomendado por la OMS (m??s estricto) la poblaci??n que ha respirado aire contaminado por el ozono con niveles superiores a la recomendaci??n se eleva hasta el 85.3%."
        },{
            "type": "header",
            "content": "Impacto medioambiental"
        },{
            "type": "text",
            "content": "Con respecto a los efectos que genera el ozono en el medio ambiente, cabe destacar que est?? clasificado como el tercer gas de efecto invernadero, despu??s del CO2 y el metano, y se ha calculado que contribuye un 25 % al calentamiento de la atm??sfera."
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
            "content": "Di??xido de Nitrogeno (NO2)"
        },{
            "type": "header",
            "content": "??Qu?? es el di??xido de nitrogeno?"
        },{
            "type": "text",
            "content": "El di??xido de nitr??geno NO2 es un compuesto qu??mico gaseoso de color marr??n amarillento formado por la combinaci??n de un ??tomo de nitr??geno y dos de ox??geno. Es un gas t??xico e irritante. El NO2 junto al NO-??xido nitroso- son conocidos como NOx y son algunos de los principales contaminantes en las ciudades."
        },{
            "type": "header",
            "content": "??C??mo se produce?"
        },{
            "type": "text",
            "content": "En la naturaleza se produce por los incendios forestales o las erupciones volc??nicas. Tambi??n se produce de forma natural por la descomposici??n de nitratos org??nicos. El volumen total  que se produce de forma natural es infinitamente menor que el que se produce por efecto del hombre."
        },{
            "type": "text",
            "content": "La mayor parte tiene su origen en la oxidaci??n del NO que se produce en la combusti??n de los motores de los veh??culos, fundamentalmente los diesel. El NO emitido por los motores, una vez en la atmosfera, se oxida y se convierte en NO2. Es tambi??n un potenciador del material particulado, sobre todo de part??culas finas PM2,5 que son las m??s perjudiciales. En su reacci??n con la luz UV del sol es un precursor de O3 ozono troposf??rico."
        },{
            "type": "header",
            "content": "??Qu?? efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "La exposici??n continuada  NO2 se relaciona con diversas enfermedades de las v??a respiratorias como disminuci??n de la capacidad pulmonar, bronquitis agudas, asma y se considera el culpable de los procesos al??rgicos, sobre todo en ni??os. Se ha relacionado las exposiciones cr??nicas a bajo nivel  con el enfisema pulmonar. Otros efectos menores son la irritaci??n ocular y de las mucosas. Existen algunos estudios que apuntan a un incremento en la mortalidad aunque a??n no est?? suficientemente bien establecido que la causa sea solamente la exposici??n a NO2."
        },{
            "type": "text",
            "content": "Se sabe que las personas con problemas previos de asma o alergias son m??s susceptibles a  sufrir problemas con exposiciones a menor concentraci??n  de NO2 que personas sanas. Tambi??n los ni??os y las mujeres embarazadas  son m??s vulnerables a concentraciones bajas de NO2."
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
            "content": "Mon??xido de Carbono (CO)"
        },{
            "type": "header",
            "content": "??Qu?? es el mon??xido de carbono?"
        },{
            "type": "text",
            "content": "El mon??xido de carbono, conocido como el asesino silencioso, es un gas inodoro e incoloro producido por la combusti??n incompleta de combustibles f??siles (madera, petr??leo, gas o carb??n). Se produce cuando un aparato de gas est?? mal instalado, mal reparado o mal mantenido, o cuando los conductos de humos, las chimeneas o los respiraderos est??n obstruidos, lo que impide la circulaci??n del aire."
        },{
            "type": "header",
            "content": "??C??mo se produce?"
        },{
            "type": "text",
            "content": "El mon??xido de carbono se produce cuando se queman combustibles f??siles. Cualquier aparato que queme combustibles f??siles puede ser potencialmente una fuente de mon??xido de carbono. El mon??xido de carbono suele estar asociado a aparatos que funcionan mal o est??n mal ventilados."
        },{
            "type": "header",
            "content": "??Qu?? efectos tiene en la salud?"
        },{
            "type": "text",
            "content": "Todo el mundo corre el riesgo de sufrir una intoxicaci??n por mon??xido de carbono, aunque los ni??os, los ancianos y las personas con enfermedades card??acas cr??nicas, anemia o problemas respiratorios son m??s susceptibles de sufrir efectos adversos. Cuando el mon??xido de carbono entra en el torrente sangu??neo, impide que las c??lulas sangu??neas transporten ox??geno. Esto provoca la aparici??n de s??ntomas similares a los de la falta de ox??geno, como dolores de cabeza, mareos, debilidad, malestar estomacal, v??mitos, dolor en el pecho y confusi??n."
        },{
            "type": "text",
            "content": "Dado que estos s??ntomas son similares a los de la gripe, a menudo se ignoran o se diagnostican err??neamente. Aqu?? radica el peligro. Grandes cantidades de mon??xido de carbono pueden hacer que la gente se desmaye, y sin la atenci??n adecuada, puede ser dif??cil recuperarse de este estado."
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
            "content": "??Qu?? son las Particulas PM10?"
        },{
            "type": "text",
            "content": "Las PM10 son part??culas en suspensi??n, s??lidas o l??quidas, con un di??metro de 10 micr??metros o menos. La diferencia entre las PM10 y las PM2,5 es s??lo una cuesti??n de tama??o. Mientras que las PM2.5 son muy finas, las PM10 son m??s grandes y gruesas."
        },{
            "type": "header",
            "content": "??C??mo se produce?"
        },{
            "type": "text",
            "content": "Las PM10 son todas las part??culas presentes en el aire con un di??metro igual o inferior a 10 micr??metros, incluidos el humo, el polvo, el holl??n, las sales, los ??cidos y los metales. Las part??culas tambi??n pueden formarse indirectamente cuando los gases emitidos por los veh??culos de motor y las industrias sufren reacciones qu??micas en la atm??sfera."
        },{
            "type": "text",
            "content": "Varias fuentes incluyen: polvo procedente de la construcci??n, los vertederos y la agricultura, polvo procedente de terrenos abiertos, incendios forestales y quema de residuos, fuentes industriales y veh??culos de motor."
        },{
            "type": "header",
            "content": "Impacto medioambiental"
        },{
            "type": "text",
            "content": "Las PM10 reducen la visibilidad y, en algunos casos, tienen la capacidad de corroer los materiales org??nicos e inorg??nicos. La deposici??n ??cida resultante puede da??ar los ecosistemas."
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
        title: 'La importancia de la contaminaci??n del aire',
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
        title: 'Di??xido de Azufre (SO2)',
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
        title: 'Di??xido de Nitrogeno (NO2)',
        img: images.no2,   
        content: topics.no2
    },
    {
        id: 5,
        title: 'Mon??xido de Carbono (CO)',
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




export { icons, images,AQI_LEVEL_ELEMENT, COLORS, SIZES, AQI_FACE, FONTS, GOOGLE_API_KEY, AQI_LEVEL, HEALTH_ADVICE, AQI_ADVICES, MAP_MODE, information };
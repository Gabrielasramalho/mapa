let mapaMalha;
let mapaDados;

// como a função carrega um arquivo, usamos o termo async
// para indicar que ela vai esperar o carregamento
async function loadMapData(){
    // endereço da malha da região norte, por município, na API do IBGE
    let mapaUrl='https://servicodados.ibge.gov.br/api/v3/malhas/regioes/1?formato=application/json&qualidade=intermediaria&intrarregiao=UF';
  
    // endereço dos dados da região norte, por município, na API do IBGE
    let dadosUrl='https://servicodados.ibge.gov.br/api/v1/localidades/regioes/N/estados?formato=application/json';
  
    // carrega o arquivo da malha
    mapaMalha = await d3.json(mapaUrl);
    // carrega o arquivo de dados municipais
    mapaDados = await d3.json(dadosUrl);
    //
    console.log(mapaDados);

    // usa a biblioteca d3.js para selecionar o svg com id #mapa 
    let svg = d3.select("#mapa");
    // escolha 
    let projecao = d3.geoMercator();
    let mapaPaths;
    let centerLatLng = [-57.71519350, -3.38173360];
    let width = 800, height=480;

    // attr é abreviação de 'attribute'
    svg.attr("width", width); 
    svg.attr("height", height);
    svg.attr("viewBox", "0 0 "+width+" "+ height);
    svg.attr("preserveAspectRatio", "xMidYMid meet");

    // centraliza o mapa
    projecao.translate([width/2, height/2]);

    // centraliza a projeção do mapa em Belo Horizonte
    projecao.center(centerLatLng);
    // altera a escala do mapa
    projecao.scale(1200);

    mapaPaths = d3.geoPath().projection(projecao)
    let geometrias = topojson.feature(mapaMalha, mapaMalha.objects.GR1UF).features;
    let grupo = svg.append("g");

    grupo.selectAll(".uf")
        .data(geometrias)
        .enter().append("path")
        .attr("d", mapaPaths)
        .attr("class", "uf")
        .attr("stroke-width", 1)
        .on("mouseover",function(event, data) {
            desmarcaUF(document.querySelector('path.ativo'));
            marcaUF(event.target, data);
        })
        .on("mouseout",function(event){
            desmarcaUF(event.target);
        });

    let area = svg.append("g");
    area.selectAll(".destaque")
        .data(areaDados)
        .enter().append("path")
        .attr("d", mapaPaths)
        .attr("class", "destaque");
}

function marcaUF(elemento, dados){
    let codigo = dados.properties.codarea;
    let dadosUF = mapaDados.filter(function(item){
        return item.id == codigo;
    });

    let nome = dadosUF[0].nome;
    let uf = dadosUF[0].sigla;
    d3.select(elemento).classed("ativo", true);    
    d3.select('#uf-titulo').node().textContent = nome + " (" + uf + ")";
}

function desmarcaUF(elemento){
    d3.select(elemento).classed("ativo", false)
}

loadMapData();


//////////
// dados a serem geolocalizados
let pontos = [
    {
        coord:[-51.2372899, 0.101772],
        nome: "Macapá, AP"
    },
    {
        coord:[-60.0373159, -3.0446598],
        nome: "Manaus, AM"
    }
]
let areaDados = [{
    type: "LineString", 
    coordinates: [
        [-51.9262408,-2.376151],
        [-52.0004039,-2.2965648],
        [-51.9647013,-2.1950233],
        [-52.0910405,-2.1675827],
        [-52.233858,-2.2883332],
        [-52.4206256,-2.3981046],
        [-52.6293658,-2.6395701],
        [-53.0248736,-2.8809887],
        [-53.2446002,-3.1662353],
        [-53.2775591,-3.495268],
        [-53.5576762,-3.6597131],
        [-53.6949983,-3.7583974],
        [-53.9037799,-3.8022612],
        [-53.9971706,-4.0378459],
        [-53.9367604,-4.1857554],
        [-53.931272,-4.4103658],
        [-53.8158893,-4.5692471],
        [-53.6401199,-4.6459273],
        [-53.4313677,-4.6568529],
        [-53.2761825,-4.6527751],
        [-53.1429806,-4.6048668],
        [-53.0372425,-4.5459915],
        [-52.993183,-4.4581125],
        [-52.8997078,-4.3647617],
        [-52.7786928,-4.3861635],
        [-52.7014604,-4.4289437],
        [-52.7117632,-4.5473439],
        [-52.7639537,-4.7416956],
        [-52.8394786,-4.9072737],
        [-52.9259967,-5.0181098],
        [-52.8932109,-5.2752822],
        [-52.7064777,-5.5625171],
        [-52.4979922,-5.9342186],
        [-52.382605,-6.0546064],
        [-52.3530689,-6.0812792],
        [-52.2521137,-6.1202342],
        [-52.1820318,-6.1366856],
        [-52.1420254,-6.1582043],
        [-52.1267358,-6.1824523],
        [-52.0934047,-6.2282152],
        [-52.0706797,-6.2869741],
        [-52.065678,-6.3453492],
        [-52.0853972,-6.4037242],
        [-52.1023726,-6.4443564],
        [-52.1248437,-6.4713417],
        [-52.1428187,-6.5205615],
        [-52.1800241,-6.550678],
        [-52.2242279,-6.5699773],
        [-52.2934127,-6.5485357],
        [-52.327721,-6.519814],
        [-52.3503744,-6.4843184],
        [-52.3592925,-6.4460934],
        [-52.4045893,-6.4187656],
        [-52.44022,-6.4240749],
        [-52.4680172,-6.4632653],
        [-52.5095506,-6.4724326],
        [-52.5249944,-6.5088907],
        [-52.5184662,-6.5508066],
        [-52.3708311,-6.7124019],
        [-52.3549702,-6.9176267],
        [-52.5305581,-7.0286032],
        [-52.640183,-7.1198296],
        [-52.8597584,-7.0841652],
        [-52.9914908,-7.1000503],
        [-53.1013525,-7.1973453],
        [-53.1894148,-7.261186],
        [-53.3657513,-7.1487962],
        [-53.4989352,-7.1855769],
        [-53.6997115,-7.193576],
        [-53.9037409,-7.1220406],
        [-54.0039831,-6.8694031],
        [-54.138613,-6.8000306],
        [-54.2982554,-6.8356348],
        [-54.4199432,-6.8412094],
        [-54.5533871,-6.7210942],
        [-54.6001391,-6.4804844],
        [-54.7376582,-6.4573635],
        [-54.8594062,-6.6511692],
        [-55.0156788,-6.8639472],
        [-55.0432413,-7.1150726],
        [-54.9008767,-7.3125085],
        [-54.924815,-7.7078191],
        [-54.7306378,-7.7364574],
        [-54.7601848,-7.8810746],
        [-54.7757163,-8.0181938],
        [-54.6750927,-8.1842281],
        [-54.6501115,-8.4081522],
        [-54.5925232,-8.6765099],
        [-54.4249106,-8.9448346],
        [-54.4225393,-9.0941241],
        [-54.5080933,-9.243409],
        [-54.4594683,-9.5202949],
        [-51.7031801,-9.7189489],
        [-51.6621512,-9.3560207],
        [-51.7351414,-8.6696333],
        [-51.7506433,-7.5732555],
        [-51.8357419,-6.998123],
        [-51.8438273,-6.4884106],
        [-51.8135211,-6.10341],
        [-51.7175006,-5.8274526],
        [-51.6295093,-5.586967],
        [-51.4537168,-5.4339216],
        [-51.2285006,-5.3081061],
        [-50.9374713,-5.1713107],
        [-50.6957721,-5.0947148],
        [-50.5419243,-4.9524071],
        [-50.4760177,-4.8046258],
        [-50.4760455,-4.6130514],
        [-50.4760455,-4.284455],
        [-50.256319,-4.0653116],
        [-50.256319,-3.8461086],
        [-50.2893164,-3.7035928],
        [-50.4101779,-3.5391435],
        [-50.5419944,-3.4843224],
        [-50.7397174,-3.4733359],
        [-50.9814166,-3.4733359],
        [-51.1571979,-3.4733359],
        [-51.3494712,-3.4733594],
        [-51.533493,-3.4569046],
        [-51.596651,-3.3636681],
        [-51.6076368,-3.2649517],
        [-51.5856646,-3.1662353],
        [-51.5307229,-3.0455622],
        [-51.3879108,-2.9468215],
        [-51.1626777,-2.8316117],
        [-51.0665442,-2.691692],
        [-51.0033893,-2.5298186],
        [-51.0033948,-2.3432096],
        [-51.0143809,-2.2553933],
        [-51.0912799,-2.1785534],
        [-51.2395965,-2.1456256],
        [-51.3988971,-2.1565964],
        [-51.5417149,-2.206003],
        [-51.6405963,-2.2663779],
        [-51.783413,-2.3816456],
        [-51.9262408,-2.376151]
    ]
},
{
    type: "LineString",
    coordinates: [
        [-69.968898,-6.4913577],
        [-69.9479027,-6.4561755],
        [-69.8664876,-6.4428212],
        [-69.8272542,-6.3751798],
        [-69.7488021,-6.3326922],
        [-69.7127682,-6.2368005],
        [-69.5971423,-6.1982364],
        [-69.5036395,-6.1680193],
        [-69.4294316,-6.1092109],
        [-69.3772136,-6.023085],
        [-69.3717052,-5.8755317],
        [-69.3662106,-5.7307128],
        [-69.3277751,-5.6132209],
        [-69.3250481,-5.4382228],
        [-69.3690039,-5.3178968],
        [-69.4266833,-5.2604704],
        [-69.4459031,-5.2003039],
        [-69.4252906,-5.1442399],
        [-69.4321452,-5.0772337],
        [-69.4966917,-4.9718673],
        [-69.4953031,-4.8610231],
        [-69.3936646,-4.7050171],
        [-69.2865544,-4.6639783],
        [-69.2343913,-4.5681798],
        [-69.3167987,-4.4477094],
        [-69.4541178,-4.4367508],
        [-69.728741,-4.5024883],
        [-69.8715983,-4.6776857],
        [-70.0473898,-4.7353641],
        [-70.1792335,-4.6656329],
        [-70.3549968,-4.6177678],
        [-70.5362534,-4.5054828],
        [-70.824614,-4.6299863],
        [-70.9633343,-4.571729],
        [-71.0526286,-4.4586573],
        [-71.2104844,-4.447752],
        [-71.3573653,-4.5134859],
        [-71.4988088,-4.7981616],
        [-71.6794441,-4.8665763],
        [-71.8271647,-4.9787373],
        [-71.8655522,-5.1018722],
        [-71.9795057,-5.2393374],
        [-72.137457,-5.3439516],
        [-72.2885905,-5.3343473],
        [-72.508313,-5.3015732],
        [-72.6401456,-5.3015628],
        [-72.7500163,-5.3562244],
        [-72.8433759,-5.4601056],
        [-72.8461276,-5.6268611],
        [-72.9038249,-5.7280128],
        [-73.0356452,-5.9247117],
        [-72.9917155,-6.1214072],
        [-72.9148597,-6.3288888],
        [-72.8818775,-6.4353465],
        [-72.9038249,-6.5199698],
        [-72.9868457,-6.5974305],
        [-73.11384,-6.6530419],
        [-73.3239311,-6.6987233],
        [-73.3926147,-6.8009743],
        [-73.3872233,-6.9291219],
        [-73.1812457,-6.948241],
        [-73.0191813,-7.0109105],
        [-72.7419381,-7.0029135],
        [-72.5812958,-7.1514389],
        [-72.363551,-7.2202271],
        [-72.1018229,-7.223493],
        [-71.8875632,-7.1418468],
        [-71.7584612,-7.0246149],
        [-71.5634928,-6.9945539],
        [-71.2888188,-6.8528947],
        [-71.0526059,-6.7819956],
        [-70.7724772,-6.7982309],
        [-70.4649077,-6.798316],
        [-70.2177006,-6.7165226],
        [-69.92653,-6.830957],
        [-69.8612263,-6.9761294],
        [-69.7958633,-7.2521436],
        [-69.5541641,-7.3284262],
        [-69.3673965,-7.1649477],
        [-69.1586563,-7.1104418],
        [-68.9225125,-7.2522492],
        [-68.7164952,-7.2140965],
        [-68.5104629,-7.2848378],
        [-68.2852244,-7.3176012],
        [-67.9941055,-7.2194471],
        [-67.7524063,-7.2194471],
        [-67.6316128,-7.3938126],
        [-67.4008438,-7.5027372],
        [-67.1371719,-7.7096407],
        [-67.1481437,-7.8130495],
        [-67.2690079,-7.8946792],
        [-67.4667618,-7.8402646],
        [-67.5436661,-8.0578213],
        [-67.4667618,-8.275378],
        [-67.4118301,-8.4927562],
        [-67.186628,-8.6069078],
        [-66.9174454,-8.5470816],
        [-66.7196915,-8.4166876],
        [-66.4779922,-8.1666437],
        [-66.1374161,-8.0470018],
        [-65.7199356,-8.1231417],
        [-65.6759903,-7.8946792],
        [-65.7968399,-7.5898666],
        [-65.6923508,-7.4702546],
        [-65.4204467,-7.5302232],
        [-65.1636466,-7.5274307],
        [-64.92892,-7.3502189],
        [-64.8520157,-7.0995398],
        [-65.0058727,-7.015006],
        [-65.0498168,-6.8650248],
        [-64.9948584,-6.704122],
        [-65.0277969,-6.5868627],
        [-65.2942342,-6.5105994],
        [-65.5606834,-6.608827],
        [-65.6952583,-6.5541954],
        [-65.7858536,-6.4558798],
        [-65.9780834,-6.4722656],
        [-66.0824844,-6.6632535],
        [-66.2582657,-6.4995446],
        [-66.5823884,-6.3795446],
        [-66.8625137,-6.4122113],
        [-67.0080674,-6.5650561],
        [-67.1756241,-6.5104602],
        [-67.3486824,-6.5200321],
        [-67.483285,-6.4422434],
        [-67.5107504,-6.2975558],
        [-67.5381729,-6.1391992],
        [-67.6233312,-6.0354329],
        [-67.7798721,-6.0190293],
        [-67.8855691,-6.0668034],
        [-67.9583283,-6.1473368],
        [-67.9665309,-6.275667],
        [-67.9981176,-6.3807759],
        [-68.0736682,-6.453124],
        [-68.2358047,-6.5322907],
        [-68.3174872,-6.5951117],
        [-68.4211577,-6.6142602],
        [-68.5468077,-6.6115598],
        [-68.6504788,-6.5870064],
        [-68.7974329,-6.685179],
        [-68.9038869,-6.6524035],
        [-69.0103408,-6.6850772],
        [-69.1114108,-6.8070142],
        [-69.2729424,-6.8089294],
        [-69.2773839,-6.7254702],
        [-69.2862442,-6.623986],
        [-69.4138002,-6.5519145],
        [-69.5810053,-6.5495778],
        [-69.7945585,-6.5665981],
        [-69.9092006,-6.5617296],
        [-69.968898,-6.4913577]
    ]
}]
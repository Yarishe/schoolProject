const
    mainPC = document.getElementById('PC'),
    device = document.getElementsByClassName('device'),
    returnBtn = document.getElementById('returnBtn'),

    infWindow = {
        elem: document.getElementById('infoWindow'),

        current: undefined,
        title: document.getElementById('title'),
        descr: document.getElementById('descr'),
        url: document.getElementById('url'),

        detailBtn: document.getElementById('detailBtn'),
        removeBtn: document.getElementById('removeBtn'),
        closeBtn: document.getElementById('windowCloseBtn')
    };

var
    currentDetailElem;



//Обработчики событий--------
returnBtn.addEventListener('click', function(){
    show(mainPC);
    hide(returnBtn);
    hide(currentDetailElem);
    clearInfWindow();
})

for (let i = 0; i < device.length; i++) {
    device[i].addEventListener('click', function() {
        genInfWindow(device[i]);
    })
}

infWindow.closeBtn.addEventListener('click', clearInfWindow);

infWindow.detailBtn.addEventListener('click', function(){
    let
        name = infWindow.current.dataset.name;

    currentDetailElem = document.getElementById(name + '-detailed');
    
    show(currentDetailElem);
    hide(mainPC);
    show(returnBtn);
    clearInfWindow();
})

infWindow.removeBtn.addEventListener('click', function() {
    let
        currentDevice = infWindow.current;
    
    if (currentDevice.classList.contains('remove')) {
        currentDevice.classList.remove('remove');
        removeBtn.innerHTML = 'Убрать';
        clearInfWindow();
    }
        else {
            currentDevice.classList.add('remove');
            removeBtn.innerHTML = 'Вернуть';
            clearInfWindow();
        }
})

//Генератор окон--------
function genInfWindow (currentDevice) {
    let
        name = currentDevice.dataset.name;
    
    infWindow.current = currentDevice;
    show(infWindow.elem);
    info = deviceList[name];

    infWindow.title.innerHTML = info.title;
    infWindow.descr.innerHTML = info.descr;
    infWindow.url.setAttribute('href', info.url);

    if (info.detail) {
        show(infWindow.detailBtn);
    }

    if (info.remove) {
        show(infWindow.removeBtn);
    }
}

function clearInfWindow () {
    hide(infWindow.elem);
    hide(infWindow.detailBtn);
    hide(infWindow.removeBtn);

    infWindow.title.innerHTML = '';
    infWindow.descr.innerHTML = '';
    infWindow.url.setAttribute('href', '');

}


//Прочее--------
function show (elem) {
    elem.classList.remove('hide');
}

function hide (elem) {
    elem.classList.add('hide');
}


//Инфа--------------------------------------------

// DEVICE: {
//     key: 'device',  | Ключ для записи в Session Storage, аналогичен id связанного элемента
//     title: 'Деталь', | Название детали
//     descr: 'Деталь такая-то, делает то-то', | Описание детали
//     url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D1%82%D0%B0%D0%BB%D1%8C', | Ссылка на статью в Интернете о детали
//     detail: false, | Есть ли детальный вид (показывать ли соотв. кнопку)
//     remove: false | Можно ли убрать (показывать ли соотв. кнопку)
// }

const
    deviceList = {
        motherBoard: {
            title: 'Материнская плата',
            descr: 'Матери́нская (систе́мная) пла́та — печатная плата, являющаяся основой построения модульного устройства, например — компьютера.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%BF%D0%BB%D0%B0%D1%82%D0%B0',
            detail: true,
            remove: false
        },

        powerSupply: {
            title: 'Блок питания',
            descr: 'Компьютерный блок питания — вторичный источник электропитания, предназначенный для снабжения узлов компьютера электроэнергией постоянного тока путём преобразования сетевого напряжения до требуемых значений.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%B1%D0%BB%D0%BE%D0%BA_%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F',
            detail: false,
            remove: false  
        },

        dataStorage: {
            title: 'Запоминающие устройства',
            descr: 'Запомина́ющее устро́йство — устройство, предназначенное для записи и хранения данных. В основе работы запоминающего устройства может лежать любой физический эффект, обеспечивающий приведение системы к двум или более устойчивым состояниям. Устройство, реализующее компьютерную память.',
            url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%BF%D0%BE%D0%BC%D0%B8%D0%BD%D0%B0%D1%8E%D1%89%D0%B5%D0%B5_%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE',
            detail: true,
            remove: false  
        },

        GPU: {
            title: 'Видеокарта',
            descr: 'Видеока́рта (также видеоада́птер, графический ада́птер, графи́ческая пла́та, графи́ческая ка́рта, графи́ческий ускори́тель) — устройство, преобразующее графический образ, хранящийся как содержимое памяти компьютера (или самого адаптера), в форму, пригодную для дальнейшего вывода на экран монитора.',
            url: 'https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%D0%BA%D0%B0%D1%80%D1%82%D0%B0',
            detail: false,
            remove: false 
        },

        CPU: {
            title: 'Центральный процессор',
            descr: 'Центра́льный проце́ссор — электронный блок, либо интегральная схема (микропроцессор), исполняющая машинные инструкции (код программ), главная часть аппаратного обеспечения компьютера или программируемого логического контроллера. Иногда называют микропроцессором или просто процессором.',
            url: 'https://ru.wikipedia.org/wiki/%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D1%80',
            detail: false,
            remove: false   
        },

        cooler: {
            title: 'Кулер',
            descr: 'Ку́лер или охладитель — совокупность вентилятора с радиатором, устанавливаемых на электронные компоненты компьютера с повышенным тепловыделением (обычно более 5 Вт): центральный процессор, графический процессор, микросхемы чипсета.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%83%D0%BB%D0%B5%D1%80_(%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%BE%D1%85%D0%BB%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F)',
            detail: false,
            remove: true
        },

        RAM: {
            title: 'Оперативная память',
            descr: 'Операти́вная па́мять или операти́вное запомина́ющее устро́йство (ОЗУ) — энергозависимая часть системы компьютерной памяти, в которой во время работы компьютера хранится выполняемый машинный код (программы), а также входные, выходные и промежуточные данные, обрабатываемые процессором.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F_%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C',
            detail: false,
            remove: false 
        },

        HDD: {
            title: 'Жёсткий диск',
            descr: 'Накопи́тель на жёстких магни́тных ди́сках, или НЖМД, жёсткий диск, винчестер — запоминающее устройство (устройство хранения информации) произвольного доступа, основанное на принципе магнитной записи. Является основным накопителем данных в большинстве компьютеров.',
            url: 'https://ru.wikipedia.org/wiki/%D0%96%D1%91%D1%81%D1%82%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B8%D1%81%D0%BA',
            detail: false,
            remove: false 
        },

        drive: {
            title: 'Дисковод',
            descr: 'Дисковод — устройство компьютера, позволяющее осуществить чтение и запись информации на съёмный носитель информации. Основное назначение дисковода в рамках концепции иерархии памяти — организация долговременной памяти.',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4',
            detail: false,
            remove: false 
        },

        SSD: {
            title: 'Твердотельный накопитель',
            descr: 'Твердотельный накопитель — компьютерное энергонезависимое немеханическое запоминающее устройство на основе микросхем памяти, альтернатива HDD. Наиболее распространённый вид твердотельных накопителей использует для хранения информации флеш-память',
            url: 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B2%D0%B5%D1%80%D0%B4%D0%BE%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C',
            detail: false,
            remove: false  
        }
    };
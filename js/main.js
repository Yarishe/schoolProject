const
    mainPC = document.getElementById('PC'),
    device = document.getElementsByClassName('device'),
    returnBtn = document.getElementById('returnBtn'),

    infWindow = {
        elem: document.getElementById('infoWindow'),
        wrapper: document.getElementById('iw-innerWrapper'),

        current: undefined,
        title: document.getElementById('title'),
        descr: document.getElementById('descr'),
        url: document.getElementById('url'),

        detailBtn: document.getElementById('detailBtn'),
        removeBtn: document.getElementById('removeBtn'),
        closeBtn: document.getElementById('windowCloseBtn'),

        setPosition: function(cords) {
            let
                left = cords[0],
                top = cords[1];
            this.elem.setAttribute('style', 'left: ' + left + '% ; top: ' + top + '% ;');
        },

        setBorder: function(pointerPos) {
            if (pointerPos != 'top') {
                this.wrapper.classList.remove('bottomBorder');
                this.wrapper.classList.add('topBorder');
            }
                else if (pointerPos != 'bottom') {
                    this.wrapper.classList.remove('topBorder');
                    this.wrapper.classList.add('bottomBorder');
                }
        }
    },

    bubblePointer = {
        elem: document.getElementById('bubblePointer'),
        context: function() {
            return this.elem.getContext('2d');
        }, 

        draw: function(pos) {
            let
                ctx = this.context(),
                width = 500,
                height = 50;

            ctx.lineWidth = 3;
            ctx.fillStyle = '#e0e0e0';

            if (pos == 'top') {
                ctx.beginPath();
                ctx.moveTo(1, height);
                ctx.lineTo(1, 3);
                ctx.lineTo(width + 15, height);
                ctx.fill();
                ctx.stroke();
            }

            if (pos == 'bottom') {
                ctx.beginPath();
                ctx.moveTo(1, 0);
                ctx.lineTo(1, height - 3);
                ctx.lineTo(width + 15, 0);
                ctx.fill();
                ctx.stroke();
            }
        },

        clear: function() {
            let
                ctx = this.context(),
                width = 500,
                height = 50;

            ctx.clearRect(0, 0, width, height);
        },

        setPosition: function(pos) {
            if (pos == 'top') {
                infWindow.elem.classList.remove('pointerAtBottom');
            }

            if (pos == 'bottom') {
                infWindow.elem.classList.add('pointerAtBottom');
            }
        },

        setHeading: function(heading) {
            if (heading == 'left') {
                this.elem.classList.remove('pointerReversed');
            }

            if (heading == 'right') {
                this.elem.classList.add('pointerReversed');
            }
        }
    };

var
    currentDetailElem;

//Event listeners--------
returnBtn.addEventListener('click', function(){
    show(mainPC);
    hide(returnBtn);
    hide(currentDetailElem);
    clearInfWindow();
})

for (let i = 0; i < device.length; i++) {
    device[i].addEventListener('click', function() {
        clearInfWindow();
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

//Info window generator--------
function genInfWindow (currentDevice) {
    let
        name = currentDevice.dataset.name;
    
    infWindow.current = currentDevice;
    show(infWindow.elem);
    info = deviceList[name];

    infWindow.title.innerHTML = info.title;
    infWindow.descr.innerHTML = info.descr;
    infWindow.url.setAttribute('href', info.url);

    bubblePointer.setPosition(info.bubblePointerPosition);
    bubblePointer.clear();
    bubblePointer.draw(info.bubblePointerPosition);
    bubblePointer.setHeading(info.bubblePointerHeading);

    infWindow.setPosition(info.infWindowCords);
    infWindow.setBorder(info.bubblePointerPosition); 

    if (info.detail) {
        show(infWindow.detailBtn);
    }

    if (info.remove) {
        show(infWindow.removeBtn);
        if (currentDevice.classList.contains('remove')) {
            infWindow.setPosition(info.infWindowCordsForRemoved);
        }
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


//Other--------
function show (elem) {
    elem.classList.remove('hide');
}

function hide (elem) {
    elem.classList.add('hide');
}

//Device info--------------------------------------------

// DEVICE: {
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
            remove: false,
            infWindowCords: [50, 66],
            bubblePointerPosition: 'top',
            bubblePointerHeading: 'left'
        },

        powerSupply: {
            title: 'Блок питания',
            descr: 'Компьютерный блок питания — вторичный источник электропитания, предназначенный для снабжения узлов компьютера электроэнергией постоянного тока путём преобразования сетевого напряжения до требуемых значений.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%B1%D0%BB%D0%BE%D0%BA_%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F',
            detail: false,
            remove: false,
            infWindowCords: [18, 35],
            bubblePointerPosition: 'bottom',
            bubblePointerHeading: 'left'
        },

        dataStorage: {
            title: 'Запоминающие устройства',
            descr: 'Запомина́ющее устро́йство — устройство, предназначенное для записи и хранения данных. В основе работы запоминающего устройства может лежать любой физический эффект, обеспечивающий приведение системы к двум или более устойчивым состояниям. Устройство, реализующее компьютерную память.',
            url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%BF%D0%BE%D0%BC%D0%B8%D0%BD%D0%B0%D1%8E%D1%89%D0%B5%D0%B5_%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE',
            detail: true,
            remove: false,
            infWindowCords: [31, 54],
            bubblePointerPosition: 'top',
            bubblePointerHeading: 'right' 
        },

        GPU: {
            title: 'Видеокарта',
            descr: 'Видеока́рта (также видеоада́птер, графический ада́птер, графи́ческая пла́та, графи́ческая ка́рта, графи́ческий ускори́тель) — устройство, преобразующее графический образ, хранящийся как содержимое памяти компьютера (или самого адаптера), в форму, пригодную для дальнейшего вывода на экран монитора.',
            url: 'https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%D0%BA%D0%B0%D1%80%D1%82%D0%B0',
            detail: false,
            remove: false,
            infWindowCords: [52, 38],
            bubblePointerPosition: 'bottom',
            bubblePointerHeading: 'left' 
        },

        CPU: {
            title: 'Центральный процессор',
            descr: 'Центра́льный проце́ссор — электронный блок, либо интегральная схема (микропроцессор), исполняющая машинные инструкции (код программ), главная часть аппаратного обеспечения компьютера или программируемого логического контроллера. Иногда называют микропроцессором или просто процессором.',
            url: 'https://ru.wikipedia.org/wiki/%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D1%80',
            detail: false,
            remove: false,
            infWindowCords: [47, 49],
            bubblePointerPosition: 'top',
            bubblePointerHeading: 'left' 
        },

        cooler: {
            title: 'Кулер',
            descr: 'Ку́лер или охладитель — совокупность вентилятора с радиатором, устанавливаемых на электронные компоненты компьютера с повышенным тепловыделением (обычно более 5 Вт): центральный процессор, графический процессор, микросхемы чипсета.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%83%D0%BB%D0%B5%D1%80_(%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%BE%D1%85%D0%BB%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F)',
            detail: false,
            remove: true,
            infWindowCords: [46, 2],
            infWindowCordsForRemoved: [46, -17],
            bubblePointerPosition: 'bottom',
            bubblePointerHeading: 'left' 
        },

        RAM: {
            title: 'Оперативная память',
            descr: 'Операти́вная па́мять или операти́вное запомина́ющее устро́йство (ОЗУ) — энергозависимая часть системы компьютерной памяти, в которой во время работы компьютера хранится выполняемый машинный код (программы), а также входные, выходные и промежуточные данные, обрабатываемые процессором.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F_%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C',
            detail: false,
            remove: false,
            infWindowCords: [29, 49],
            bubblePointerPosition: 'top',
            bubblePointerHeading: 'right' 
        },

        HDD: {
            title: 'Жёсткий диск',
            descr: 'Накопи́тель на жёстких магни́тных ди́сках, или НЖМД, жёсткий диск, винчестер — запоминающее устройство (устройство хранения информации) произвольного доступа, основанное на принципе магнитной записи. Является основным накопителем данных в большинстве компьютеров.',
            url: 'https://ru.wikipedia.org/wiki/%D0%96%D1%91%D1%81%D1%82%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B8%D1%81%D0%BA',
            detail: false,
            remove: false,
            infWindowCords: [29, 62],
            bubblePointerPosition: 'top',
            bubblePointerHeading: 'left' 
        },

        drive: {
            title: 'Дисковод',
            descr: 'Дисковод — устройство компьютера, позволяющее осуществить чтение и запись информации на съёмный носитель информации. Основное назначение дисковода в рамках концепции иерархии памяти — организация долговременной памяти.',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4',
            detail: false,
            remove: false,
            infWindowCords: [59, 67],
            bubblePointerPosition: 'top',
            bubblePointerHeading: 'left' 
        },

        SSD: {
            title: 'Твердотельный накопитель',
            descr: 'Твердотельный накопитель — компьютерное энергонезависимое немеханическое запоминающее устройство на основе микросхем памяти, альтернатива HDD. Наиболее распространённый вид твердотельных накопителей использует для хранения информации флеш-память',
            url: 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B2%D0%B5%D1%80%D0%B4%D0%BE%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C',
            detail: false,
            remove: false,
            infWindowCords: [21, 64],
            bubblePointerPosition: 'top',
            bubblePointerHeading: 'right' 
        }
    };
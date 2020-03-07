Object.prototype.hide = function() {
    this.classList.add('hide');
}

Object.prototype.show = function() {
    this.classList.remove('hide');
}

const
    device = document.getElementsByClassName('device'),
    infWindow = {
        main: document.getElementById('infoWindow'),
        currentDevice: undefined,
        pointer: {
            canv: document.getElementById('pointer'),
            ctx: function() {
                return this.canv.getContext('2d');
            },
            atTop: true,
            //Is it good idea ??
            placeAt: {
                top: function() {
                    infWindow.main.classList.remove('pointerAtBottom');
                    infWindow.pointer.atTop = true;
                },

                bottom: function() {
                    infWindow.main.classList.add('pointerAtBottom');
                    infWindow.pointer.atTop = false;
                }
            },
            draw: function(cursorPos) {
                const
                    canv = this.canv,
                    ctx = this.ctx(),
                    width = this.canv.offsetWidth,
                    height = this.canv.offsetHeight,
                    atTop = this.atTop;

                ctx.lineWidth = 3;
                ctx.fillStyle = '#fff';
                if (atTop) {
                    const
                        point = [
                            {
                                x: cursorPos[0],
                                y: cursorPos[1] + 3
                            },
                            {
                                x: cursorPos[0] + 20,
                                y: height
                            },
                            {
                                x: cursorPos[0] + 60,
                                y: height
                            },
                        ];

                    ctx.strokeStyle = "#000";
                    ctx.beginPath();
                    ctx.moveTo(point[0].x, point[0].y);
                    ctx.lineTo(point[1].x, point[1].y);
                    ctx.lineTo(point[2].x, point[2].y);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(point[2].x - 5, point[2].y);
                    ctx.lineTo(point[1].x + 1, point[1].y);
                    ctx.stroke();
                    ctx.fillRect(point[2].x - 5, point[2].y, 1, -1);
                }
                
                else {
                    const
                        point = [
                            {
                                x: cursorPos[0],
                                y: cursorPos[1] - 3
                            },
                            {
                                x: cursorPos[0] + 20,
                                y: 0
                            },
                            {
                                x: cursorPos[0] + 60,
                                y: 0
                            },
                        ];

                    ctx.strokeStyle = "#000";
                    ctx.beginPath();
                    ctx.moveTo(point[0].x, point[0].y);
                    ctx.lineTo(point[1].x, point[1].y);
                    ctx.lineTo(point[2].x, point[2].y);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(point[2].x - 5, point[2].y);
                    ctx.lineTo(point[1].x + 1, point[1].y);
                    ctx.stroke();
                    ctx.fillRect(point[2].x - 5, point[2].y, 1, 1);
                }
            },

            clear: function() {
                const
                    ctx = this.ctx();
                ctx.clearRect(0, 0, 520, 50);
            }
        },
        closeBtn: document.getElementById('infCloseBtn'),
        detailBtn: document.getElementById('detailBtn'),
        removeBtn: document.getElementById('removeBtn'),

        title: document.getElementById('title'),
        image: document.getElementById('smallImage'),
        descr: document.getElementById('descr'),
        url: document.getElementById('url'),

        setInfo: function(info) {
            this.title.innerHTML = info.title;
            // this.image.setAttribute('src', info.imgSrc);
            bigImage.img.setAttribute('src', info.imgSrc);
            this.descr.innerHTML = info.descr;
            this.url.setAttribute('href', info.url);
        
            if (info.detail) {
                this.detailBtn.show();
                this.detailBtn.setAttribute('href', info.detailedView);
            }
        
            if (info.removable) {
                this.removeBtn.show();
                removeDevice = info.remove;
            }
        },

        clearInfo: function() {
            this.detailBtn.hide();
            this.detailBtn.removeAttribute('href');
            this.removeBtn.hide();
            removeDevice = undefined;
        
            //is it necessary ?
            this.title.innerHTML = 'Нет информации';
            // this.image.removeAttribute('src');
            this.descr.innerHTML = 'Нет информации';
            this.url.removeAttribute('href');
        
            this.pointer.clear();
            this.pointer.placeAt.top(); //==============================================
        },

        setPosition: function(cords) {
            let
                left = cords[0],
                top = cords[1];
                this.main.setAttribute('style', 'left: ' + left + 'px; top: ' + top + 'px;');
        }

    },

    bigImage = {
        wrapper: document.getElementById('bgImgWrapper'),
        img: document.getElementById('bigImage'),
        closeBtn: document.getElementById('bgImgCloseBtn')
    },

    returnBtn = document.getElementById('returnBtn');

var
    cursorLeft = false;

function genInfWindow(currentDevice, event) {
    infWindow.clearInfo();
    
    let
        name = currentDevice.dataset.name,
        mousePos = [
            event.clientX,
            event.clientY
        ],
        windowPos;

    infWindow.currentDevice = name;
    infWindow.setInfo(deviceList[name]);
    infWindow.main.show();
    windowPos = getReadjustedWindowCords(mousePos, infWindow.main.offsetHeight);
    infWindow.setPosition(windowPos);

    // console.log('1.2: ' + infWindow.pointer.cursorPos); //==============================================
}

//rename this
function getReadjustedWindowCords(cords, infWindowHeight) {
    const
        margin = 20,
        //pointerSpace = 50, //==============================================
        infWindowWidth = infWindow.main.offsetWidth,
        height = document.documentElement.offsetHeight,
        width = document.documentElement.offsetWidth;

    if (cords[0] + infWindowWidth >= width) {
        let
            diff = infWindowWidth - (width - cords[0]);
        cords[0] -= diff + margin;
    } 
        else {
            cords[0] -= margin;
        }
    
    if (cords[1] + infWindowHeight >= height) {
        cords[1] -= infWindowHeight;
        infWindow.pointer.placeAt.bottom();
    }

    return cords;
}

for (let i = 0; i < device.length; i++) {
    device[i].addEventListener('click', function(e) {
        cursorLeft = false;
        genInfWindow(device[i], e);
    })
}

infWindow.pointer.canv.addEventListener('mouseover', function(e) {
    if (!cursorLeft) {
        infWindow.pointer.draw([e.offsetX, e.offsetY]);
    }
    // console.log('1: ' + [e.offsetX, e.offsetY]); //==============================================
})

infWindow.pointer.canv.addEventListener('mouseout', function() {
    cursorLeft = true;
})

infWindow.closeBtn.addEventListener('click', function() {
    infWindow.main.hide();
    infWindow.clearInfo();
})

infWindow.image.addEventListener('click', function() {
    infWindow.main.hide();
    bigImage.wrapper.show();
})

infWindow.removeBtn.addEventListener('click', function() {
    deviceList[infWindow.currentDevice].remove();
})

infWindow.detailBtn.addEventListener('click', function() {
    var
        next = deviceList[infWindow.currentDevice].detailedView,
        nextScreen = document.getElementById(next);

    // console.log(nextScreen);

    infWindow.main.hide();
    currentScreen.hide();
    nextScreen.show();

    if (currentScreen == mainScreen) {
        returnBtn.show();
    }

    currentScreen = nextScreen;
})

bigImage.closeBtn.addEventListener('click', function() {
    bigImage.wrapper.hide();
    infWindow.main.show();
})

returnBtn.addEventListener('click', function() {
    var
        parent = currentScreen.dataset.parent;
        parentScreen = document.getElementById(parent);

    infWindow.main.hide();
    currentScreen.hide();
    parentScreen.show();

    if (parentScreen == mainScreen) {
        returnBtn.hide();
    }

    currentScreen = parentScreen;
})

//Device and screen info--------------------------------------------

// part: {
//     title: 'Деталь', | Название детали
//     descr: 'Деталь такая-то, делает то-то', | Описание детали
//     url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D1%82%D0%B0%D0%BB%D1%8C', | Ссылка на статью в Интернете о детали,
//     imgSrc: '', | Картинка-иллюстрация
//     detail: false, | Есть ли детальный вид (показывать ли соотв. кнопку)
//     detailedView: 'motherboard', | ссылка на приближённый вид детали
//     removable: false, | Можно ли убрать (показывать ли соотв. кнопку)
//     remove: function() {...} | функция, которая будет выполняться при нажатии кнопки 'убрать'
// }

//вынести в отдельный файл!!!!
var
    mainScreen = document.getElementById('PC'),
    currentScreen = mainScreen;

const
    deviceList = {
        motherBoard: {
            title: 'Материнская плата',
            descr: 'Матери́нская (систе́мная) пла́та — печатная плата, являющаяся основой построения модульного устройства, например — компьютера.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%BF%D0%BB%D0%B0%D1%82%D0%B0',
            imgSrc: 'libs/img/Illustrations/Motherboard_illstr.jpg',
            detail: true,
            detailedView: 'Motherboard',
            removable: false
        },

        powerSupply: {
            title: 'Блок питания',
            descr: 'Компьютерный блок питания — вторичный источник электропитания, предназначенный для снабжения узлов компьютера электроэнергией постоянного тока путём преобразования сетевого напряжения до требуемых значений.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%B1%D0%BB%D0%BE%D0%BA_%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F',
            imgSrc: 'libs/img/Illustrations/Power_supply_illstr.jpg',
            detail: false,
            removable: false
        },

        //====!!!! ПЕРЕДЕЛАТЬ ТЕКСТ, тут могут стоять не только устр-ва связанные с памятью !!!====
        dataStorage: {
            title: 'Полки',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illum sit non maiores corrupti. Commodi animi corrupti, assumenda numquam beatae, obcaecati quis rem illo neque eum maxime expedita recusandae dicta?',
            url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%BF%D0%BE%D0%BC%D0%B8%D0%BD%D0%B0%D1%8E%D1%89%D0%B5%D0%B5_%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE',
            imgSrc: '',
            detail: true,
            detailedView: 'Data-storage',
            removable: false
        },

        GPU: {
            title: 'Видеокарта',
            descr: 'Видеока́рта (также видеоада́птер, графический ада́птер, графи́ческая пла́та, графи́ческая ка́рта, графи́ческий ускори́тель) — устройство, преобразующее графический образ, хранящийся как содержимое памяти компьютера (или самого адаптера), в форму, пригодную для дальнейшего вывода на экран монитора.',
            url: 'https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%D0%BA%D0%B0%D1%80%D1%82%D0%B0',
            imgSrc: 'libs/img/Illustrations/GPU_illstr.jpg',
            detail: true,
            detailedView: 'TEST_0',
            removable: false
        },

        CPU: {
            title: 'Центральный процессор',
            descr: 'Центра́льный проце́ссор — электронный блок, либо интегральная схема (микропроцессор), исполняющая машинные инструкции (код программ), главная часть аппаратного обеспечения компьютера или программируемого логического контроллера. Иногда называют микропроцессором или просто процессором.',
            url: 'https://ru.wikipedia.org/wiki/%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D1%80',
            imgSrc: 'libs/img/Illustrations/CPU_illstr.jpg',
            detail: false,
            removable: false 
        },

        cooler: {
            title: 'Кулер',
            descr: 'Ку́лер или охладитель — совокупность вентилятора с радиатором, устанавливаемых на электронные компоненты компьютера с повышенным тепловыделением (обычно более 5 Вт): центральный процессор, графический процессор, микросхемы чипсета.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9A%D1%83%D0%BB%D0%B5%D1%80_(%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%BE%D1%85%D0%BB%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F)',
            imgSrc: '',
            detail: false,
            removable: true,
            remove: function() {
                let
                    rCooler = document.getElementById('cooler'),
                    mbCooler = document.getElementById('mbCooler'),
                    motherBoard = document.getElementById('mbWithCooler');

                function isNOTRemoved() {
                    return !cooler.classList.contains('coolerRemoved');;
                }

                if(isNOTRemoved()) {
                    mbCooler.hide();
                    motherBoard.hide();
                    rCooler.show();

                    setTimeout(function() {
                        rCooler.classList.add('coolerRemoved');
                    }, 1);
                }
                    else {
                        cooler.classList.remove('coolerRemoved');

                        //I know I should use eventListener instead, but this method seems to be easier in this case
                        setTimeout(function() {
                            rCooler.hide();
                            motherBoard.show();
                            mbCooler.show();
                        }, 500)
                    }

                infWindow.main.hide();
                infWindow.clearInfo();
            }
        },

        RAM: {
            title: 'Оперативная память',
            descr: 'Операти́вная па́мять или операти́вное запомина́ющее устро́йство (ОЗУ) — энергозависимая часть системы компьютерной памяти, в которой во время работы компьютера хранится выполняемый машинный код (программы), а также входные, выходные и промежуточные данные, обрабатываемые процессором.',
            url: 'https://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F_%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C',
            imgSrc: 'libs/img/Illustrations/RAM_illstr.jpg',
            detail: false,
            removable: false
        },

        HDD: {
            title: 'Жёсткий диск',
            descr: 'Накопи́тель на жёстких магни́тных ди́сках, или НЖМД, жёсткий диск, винчестер — запоминающее устройство (устройство хранения информации) произвольного доступа, основанное на принципе магнитной записи. Является основным накопителем данных в большинстве компьютеров.',
            url: 'https://ru.wikipedia.org/wiki/%D0%96%D1%91%D1%81%D1%82%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B8%D1%81%D0%BA',
            imgSrc: 'libs/img/Illustrations/HDD_illstr.jpg',
            detail: false,
            removable: false
        },

        drive: {
            title: 'Дисковод',
            descr: 'Дисковод — устройство компьютера, позволяющее осуществить чтение и запись информации на съёмный носитель информации. Основное назначение дисковода в рамках концепции иерархии памяти — организация долговременной памяти.',
            url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4',
            imgSrc: '',
            detail: false,
            removable: false
        },

        SSD: {
            title: 'Твердотельный накопитель',
            descr: 'Твердотельный накопитель — компьютерное энергонезависимое немеханическое запоминающее устройство на основе микросхем памяти, альтернатива HDD. Наиболее распространённый вид твердотельных накопителей использует для хранения информации флеш-память',
            url: 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B2%D0%B5%D1%80%D0%B4%D0%BE%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C',
            imgSrc: '',
            detail: false,
            removable: false
        }
    };
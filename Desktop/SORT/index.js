function run() {
    document.querySelector('article').innerHTML = '<button-wrap />'
    document.querySelector('footer').innerHTML = ''
    var btn_left = document.createElement('member')
    var btn_right = document.createElement('member')
    var span_progress = document.createElement('p')
    span_progress.innerText = '0%'
    span_progress.style.color = '#000'
    span_progress.style.width = '10%'
    const obj = {
        a1: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        a2: [[, , ], [, , ], [, , ], [, , ], [, , ], [, , ], [, , ], [, , ], [], [], [], [], [], [], [], []],
        a3: [[, , , , ], [, , , , ], [, , , , ], [, , , , ], [, , ], [, , ], [, , ], [, , ]],
        a4: [[, , , , , , , , ], [, , , , , , , , ], [, , , , ], [, , , , ]],
        a5: [[, , , , , , , , , , , , , , , , ], [, , , , , , , , ]],
        a6: [[, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ]]
    };
    const queue = []
    var popped = []
    var progress = 0
    const data = [["안율", "AN YUL"], ["아유무", "AYUMU"], ["배재호", "BAE JAEHO"], ["차웅기", "CHA WOONGKI"], ["즈언", "CHIH EN"], ["다이스케", "DAISUKE"], ["에이토", "EITO"], ["허쥔진", "HE JUNJIN"], ["히로토", "HIROTO"], ["제임스", "JAMES"], ["장경호", "JANG KYUNGHO"], ["지앙판", "JIANG FAN"], ["진즈밍", "JIN ZIMING"], ["제이엘", "JL"], ["카이리", "KAIRI"], ["강준혁", "KANG JUNHYUK"], ["켄타", "KENTA"], ["금진호", "KEUM JINHO"], ["김대윤", "KIM DAEYUN"], ["김동윤", "KIM DONGYUN"], ["김기중", "KIM GIJOONG"], ["김효태", "KIM HYOTAE"], ["김주형", "KIM JOOHYOUNG"], ["구한서", "KOO HANSEO"], ["권희준", "KWON HEEJUN"], ["리쯔누오", "LI ZHINUO"], ["리쯔웨이", "LI ZHIWEI"], ["맥", "MAC"], ["남도윤", "NAM DOYOON"], ["박한", "PARK HAN"], ["박지훈", "PARK JIHUN"], ["박주원", "PARK JUWON"], ["박연준", "PARK YEONJUN"], ["로이스", "ROYCE"], ["서정우", "SEO JEONGWOO"], ["시린", "SIRIN"], ["스티븐", "STEVEN"], ["시에위신", "XIE YUXIN"], ["여강동", "YEO GANGDONG"], ["유이토", "YUITO"], ["젠젠", "ZEN ZEN"], ["장슈아이보", "ZHANG SHUAIBO"]];
    const init = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
    const temp = [...init];
    temp.sort(() => Math.random() - 0.5);
    obj.a6[0] = temp.slice(0, 42);

    for (let i = 0; i < 8; i++) {
        obj.a1[i].push(temp[3 * i]);
        obj.a1[i + 8].push(temp[3 * i + 1]);
        obj.a2[i + 8].push(temp[3 * i + 2]);
        queue.push(['a1', i, 0, 0]);
        queue.push(['a2', i, 0, 0]);
    }
    
    for (let i = 0; i < 4; i++) {
        queue.push(['a3', i, 0, 0]);
    }
    
    for (let i = 0; i < 2; i++) {
        queue.push(['a4', i, 0, 0]);
    }
    
    queue.push(['a5', 0, 0, 0]);
    
    // 'popping' 함수는 그대로 사용
    function popping() {
        if (queue.length == 0) {
            result();
            return 0;
        }
        const index = Math.floor(queue.length * Math.random());
        popped = queue[index];
        const arr = obj[popped[0]];
        const left = callData(arr[popped[1] * 2][popped[2]]);
        const right = callData(arr[popped[1] * 2 + 1][popped[3]]);
        if (left && right) {
            queue.splice(queue.indexOf(popped), 1);
            if (Math.random() < 0.7) { // 랜덤 확률을 더 높게 설정
                display(btn_left, left, select0);
                display(btn_right, right, select1);
            } else {
                display(btn_right, left, select0);
                display(btn_left, right, select1);
            }
            return 0;
        } else {
            return 1;
        }
    }

    function display(element, source, handler) {
        element.innerHTML = ''
        var img = document.createElement('img')
        img.src = source[4] + '.jpg';
        var span = document.createElement('span')
        span.innerText = source[language]
        element.style.background = '#' + source[2]
        element.style.color = '#' + source[3]
        element.append(img)
        element.append(span)
        element.addEventListener('click', handler)
        return 0
    }

    function callData(key) {
        if (typeof (key) == 'number')
            return data[key]
        if (!key) {
            return undefined
        }
        var d = String(obj[key.slice(0, 2)][parseInt(key.slice(2, 4))][parseInt(key.slice(4, 6))])
        if (d.startsWith('a')) {
            return callData(d)
        } else {
            return data[d]
        }
    }

    function select(num) {
        btn_left.removeEventListener('click', select0)
        btn_right.removeEventListener('click', select0)
        btn_left.removeEventListener('click', select1)
        btn_right.removeEventListener('click', select1)
        btn_left.innerHTML = `<p>Loading</p>`
        btn_right.innerHTML = `<p>Loading</p>`
        const arrkey = popped[0];
        const arr = obj[arrkey];
        const nextarrkey = arrkey[0] + (parseInt(arrkey[1]) + 1);
        const win = arrkey + String(popped[1] * 2 + num).padStart(2, '0') + String(popped[2 + num]).padStart(2, '0');
        
        const pushed = obj[nextarrkey][popped[1]]
        const index = pushed.filter(i => i).length
        pushed.splice(index, 0, win)
        pushed.pop()
        progress += 1
        if (arr[popped[1] * 2 + num].length == popped[2 + num] + 1) {
            for (var i = popped[3 - num]; i < arr[popped[1] * 2 + 1 - num].length; i++) {
                const index = pushed.filter(j => j).length
                const lose = arrkey + String(popped[1] * 2 + 1 - num).padStart(2, '0') + String(i).padStart(2, '0')
                pushed.splice(index, 0, lose)
                pushed.pop()
                progress += 1
            }
        } else {
            queue.push([popped[0], popped[1], popped[2] + 1 - num, popped[3] + num])
        }
        popped = []
        span_progress.innerText = (progress * 100 / 150).toFixed(1) + '%'
        span_progress.style.background = `linear-gradient(to right, #fff ${progress * 100 / 150}%, #fff ${progress * 100 / 150}%)`
        while (popping()) {}
        return 0
    }

    let counts = {}; // 각 사람의 등장 횟수를 기록
const minAppearances = 4; // 최소 등장 횟수 (게임 진행 시, 처음에는 모두 최소 1번씩 등장)
const maxRounds = 100; // 최대 판 수 설정 (필요시 더 추가 가능)

function result() {
    btn_left.remove();
    btn_right.remove();

    const seen = new Set();
    const final = [];
    
    // 중복을 확인하고 등장 횟수를 기록하여 최소 등장 횟수를 충족시키도록 처리
    obj.a6[0].forEach(v => {
        const person = callData(v);
        if (!seen.has(person[language]) && counts[person[language]] < minAppearances) {
            final.push(person);
            seen.add(person[language]);
            counts[person[language]] = (counts[person[language]] || 0) + 1;
        }
    });

    // 중복 처리 후 부족한 사람들을 추가
    const allPeople = obj.a6[0].map(v => callData(v));
    const totalPeople = allPeople.length;

    // 모든 사람이 최소 1번 등장하도록 추가
    allPeople.forEach(person => {
        if (!seen.has(person[language]) || counts[person[language]] < minAppearances) {
            final.push(person);
            seen.add(person[language]);
            counts[person[language]] = (counts[person[language]] || 0) + 1;
        }
    });

    const content = final
        .map((v, index) => `<tr><td>${index + 1}</td><td style="background:#${v[2]};color:#${v[3]}">${v[language]}</td></tr>`)
        .join('');

    var table = `<table><thead><tr><th>${language ? 'Rank' : '순위'}</th><th>${language ? 'Name' : '이름'}</th><tr></thead><tbody>${content}</tbody></table>`;
    span_progress.remove();
    document.querySelector('footer').remove();

    var btn_save = document.createElement('button');
    var btn_save_wrap = document.createElement('div');
    btn_save.addEventListener('click', () => {
        capture();
    });
    btn_save.innerHTML = language ? 'Save' : '저장';
    btn_save.style.cssText = 'margin:10px !important';
    btn_save_wrap.append(btn_save);

    var tablewrap = document.createElement('table-wrap');
    tablewrap.innerHTML = table;
    document.querySelector('article').append(btn_save_wrap);
    document.querySelector('article').append(tablewrap);
    document.querySelector('article').style.height = '';

    return 0;
}

async function capture() {
    var c = await html2canvas(document.querySelector('table-wrap'), {
        scale: 2
    });
    c.toBlob(async blob => {
        var downloadLink = document.createElement("a");
        downloadLink.download = 'UniverseLeague_sort_' + new Date() * 1;
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
    });
    return 0;
}

function popping() {
    if (queue.length == 0) {
        result();
        return 0;
    }
    const index = Math.floor(queue.length * Math.random());
    popped = queue[index];
    const arr = obj[popped[0]];
    const left = callData(arr[popped[1] * 2][popped[2]]);
    const right = callData(arr[popped[1] * 2 + 1][popped[3]]);

    if (left && right) {
        queue.splice(queue.indexOf(popped), 1);

        if (Math.random() < 0.7) {
            display(btn_left, left, select0);
            display(btn_right, right, select1);
        } else {
            display(btn_right, left, select0);
            display(btn_left, right, select1);
        }
        return 0;
    } else {
        return 1;
    }
}

function display(element, source, handler) {
    element.innerHTML = '';
    var img = document.createElement('img');
    img.src = source[4] + '.jpg';
    var span = document.createElement('span');
    span.innerText = source[language];
    element.style.background = '#' + source[2];
    element.style.color = '#' + source[3];
    element.append(img);
    element.append(span);
    element.addEventListener('click', handler);
    return 0;
}

function select(num) {
    btn_left.removeEventListener('click', select0);
    btn_right.removeEventListener('click', select0);
    btn_left.removeEventListener('click', select1);
    btn_right.removeEventListener('click', select1);
    btn_left.innerHTML = `<p>Loading</p>`;
    btn_right.innerHTML = `<p>Loading</p>`;
    const arrkey = popped[0];
    const arr = obj[arrkey];
    const nextarrkey = arrkey[0] + (parseInt(arrkey[1]) + 1);
    const win = arrkey + String(popped[1] * 2 + num).padStart(2, '0') + String(popped[2 + num]).padStart(2, '0');

    const pushed = obj[nextarrkey][popped[1]];
    const index = pushed.filter(i => i).length;
    pushed.splice(index, 0, win);
    pushed.pop();
    progress += 1;

    if (arr[popped[1] * 2 + num].length == popped[2 + num] + 1) {
        for (var i = popped[3 - num]; i < arr[popped[1] * 2 + 1 - num].length; i++) {
            const index = pushed.filter(j => j).length;
            const lose = arrkey + String(popped[1] * 2 + 1 - num).padStart(2, '0') + String(i).padStart(2, '0');
            pushed.splice(index, 0, lose);
            pushed.pop();
            progress += 1;
        }
    } else {
        queue.push([popped[0], popped[1], popped[2] + 1 - num, popped[3] + num]);
    }
    popped = [];
    span_progress.innerText = (progress * 100 / 112).toFixed(1) + '%';
    span_progress.style.background = `linear-gradient(to right, #fff ${progress * 100 / 112}%, #fff ${progress * 100 / 112}%)`;
    while (popping()) {}
    return 0;
}

function select0() {
    select(0);
    return 0;
}

function select1() {
    select(1);
    return 0;
}

// 판 진행에 따른 퍼센트 계산
function updateProgressBar() {
    const totalRounds = maxRounds;  // 전체 판 수
    const currentProgress = (progress * 100 / totalRounds).toFixed(1);  // 진행률 계산
    span_progress.innerText = currentProgress + '%';
    span_progress.style.background = `linear-gradient(to right, #fff ${currentProgress}%, #fff ${currentProgress}%)`;
}

while (popping()) {}

document.querySelector('button-wrap').append(btn_left);
document.querySelector('button-wrap').append(btn_right);
document.querySelector('footer').append(span_progress);

return 0; 
}

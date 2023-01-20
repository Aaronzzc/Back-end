import data from 'https://code.juejin.cn/api/raw/7190362060373852192?id=7190362060373868576';
// console.log(data);

function pick(numbers, limit = numbers.length - 1) {
  const picked = Math.floor(Math.random() * limit);
  [numbers[picked], numbers[limit]] = [numbers[limit], numbers[picked]];
  return numbers[limit];
}

function sleep(ms = 60) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function raffle(numbers, excludes = [], count = 1) {
  numbers = numbers.filter(item => !excludes.includes(item));
  const preview = document.querySelector('.main > div .preview');

  const ret = [];
  for(let i = 0; i < count; i++) {
    let previewCount = 10 + Math.floor(Math.random() * 10);
    while(previewCount--) {
      await sleep();
      const picked = pick(numbers, numbers.length - 1 - i);
      preview.innerHTML = picked;
    }
    result.appendChild(preview.cloneNode(true));
    ret.push(preview.innerHTML);
    preview.innerHTML = '';
  }
  return ret;
}

const winners = [20, 15, 10, 6, 5];
const storageKey = 'lucky-people';

(async function(i) {
  prize.className = `p${i}`;
  const excludes = localStorage.getItem(storageKey) || '[]';
  const luckyPeople = await raffle(data, JSON.parse(excludes), winners[i]);
  localStorage.setItem(storageKey, JSON.stringify([...excludes, ...luckyPeople]));
})(0);

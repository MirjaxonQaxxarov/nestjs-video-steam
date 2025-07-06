const video = document.getElementById('video');
const select = document.getElementById('videoSelect');
const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const modeSwitches = document.querySelectorAll('input[name="mode"]');

let currentMode = 'hls';
let videoMap = {};

async function fetchVideoList() {
  try {
    const res = await fetch(currentMode === 'hls' ? '/videos/list' : '/videos/list-mp4');
    const list = await res.json();

    select.innerHTML = '';
    videoMap = {};

    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.name;
      opt.textContent = item.name;
      select.appendChild(opt);
      videoMap[item.name] = item.url;
    });

    if (list.length) {
      loadVideo(videoMap[list[0].name]);
    } else {
      video.removeAttribute('src');
      video.load();
    }
  } catch (err) {
    alert("Serverdan video ro'yxatini olishda xatolik.");
    console.error(err);
  }
}

function loadVideo(src) {
  if (!src) return;
  if (currentMode === 'hls') {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      alert('Brauzeringiz HLS formatni qo‘llamaydi.');
    }
  } else {
    video.src = src;
  }
}

select.addEventListener('change', (e) => {
  const name = e.target.value;
  const url = videoMap[name];
  loadVideo(url);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (currentMode !== 'hls') {
    alert('Yuklash faqat HLS rejimida mavjud.');
    return;
  }

  const file = fileInput.files[0];
  if (!file) return alert("Fayl tanlang!");

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/videos/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('✅ Video yuklandi!');
      fileInput.value = '';
      await fetchVideoList();
    } else {
      alert('❌ Yuklashda xatolik.');
    }
  } catch (err) {
    alert("Tarmoqda xatolik.");
    console.error(err);
  }
});

modeSwitches.forEach(radio => {
  radio.addEventListener('change', async () => {
    currentMode = radio.value;
    await fetchVideoList();
    form.style.display = currentMode === 'hls' ? 'flex' : 'none';
  });
});

fetchVideoList();

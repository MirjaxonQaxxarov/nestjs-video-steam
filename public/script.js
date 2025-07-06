const video = document.getElementById('video');
const select = document.getElementById('videoSelect');
const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');

const videoMap = {};

async function fetchVideoList() {
  try {
    const res = await fetch('/videos/list');
    const list = await res.json();

    select.innerHTML = ''; // old ro‘yxatni tozalash

    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.name;
      opt.textContent = item.name;
      select.appendChild(opt);
      videoMap[item.name] = item.url;
    });

    if (list.length) {
      loadVideo(videoMap[list[0].name]);
    }
  } catch (err) {
    alert("Serverdan video ro'yxatini olishda xatolik.");
    console.error(err);
  }
}

function loadVideo(src) {
  if (!src) return;
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(video);
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = src;
  } else {
    alert('Brauzeringiz HLS formatni qo‘llamaydi.');
  }
}

select.addEventListener('change', (e) => {
  const name = e.target.value;
  const url = videoMap[name];
  loadVideo(url);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
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
      await fetchVideoList(); // ro‘yxatni yangilaymiz
    } else {
      alert('❌ Yuklashda xatolik.');
    }
  } catch (err) {
    alert("Tarmoqda xatolik.");
    console.error(err);
  }
});

fetchVideoList();

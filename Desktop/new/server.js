const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// 세션 설정 (기본, 필요하면 옵션 조절)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// 정답 비밀번호
const CORRECT_PASSWORD = 'owve';

// public 폴더 정적 서비스 (비디오 제외)
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// 비밀번호 확인 API
app.post('/api/check-password', (req, res) => {
  const { password } = req.body;

  if (password === CORRECT_PASSWORD) {
    req.session.authenticated = true;  // 인증 세션 저장
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// 인증된 사용자만 비디오 접근 허용
app.get('/video.mp4', (req, res) => {
  if (!req.session.authenticated) {
    return res.sendStatus(403);
  }
  const videoPath = path.join(__dirname, 'videos', 'video.mp4');
  res.sendFile(videoPath);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

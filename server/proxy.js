// import express from 'express'
// import axios from 'axios'
// import bodyParser from 'body-parser'

// const app = express()
// app.use(bodyParser.json())

// const N8N_URL = 'http://192.168.10.20:5678/webhook/legal-ai-webhook/chat'

// app.post('/api/chat', async (req, res) => {
//   try {
//     console.log('Proxy: /api/chat called')
//     console.log('Proxy: incoming body', req.body)

//     const n8nPayload = { chatInput: req.body.message ?? req.body.query ?? req.body.input ?? req.body.text }

//     const response = await axios.post(N8N_URL, n8nPayload, {
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//      // timeout: 30000,
//     })

//     const transformed = {
//       reply: response.data.output || response.data.response || response.data.reply || response.data.answer || response.data || 'No response from AI',
//       raw: response.data,
//     }

//     res.json(transformed)
//   } catch (err) {
//     console.error('Proxy error:', err?.message || err)
//     const code = err?.code || 'UNKNOWN_ERROR'
//     const status = err?.response?.status || 500
//     res.status(status).json({ error: 'Proxy failed', details: err?.message, code })
//   }
// })

// const port = process.env.PORT || 3001
// app.listen(port, () => console.log(`Proxy listening on http://localhost:${port}`))
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import multer from 'multer'; // if you handle file uploads for documents
import FormData from 'form-data';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Optional: configure multer if you handle file uploads
const upload = multer({ dest: 'uploads/' });

// -----------------------------
// Existing Document Upload API
// Example: /api/upload
app.post('/api/upload', upload.single('data'), async (req, res) => {
  try {
    const file = req.file;
    const name = req.body.name || 'Vijay';
    const email = req.body.email || 'vijaypvk001@gmail.com';

    // Forward to your n8n webhook
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('data', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });

    await axios.post('https://swot-ai25.app.n8n.cloud/webhook/upload-pqx92oa', formData, {
      headers: formData.getHeaders(),
    });

    res.json({ success: true, message: 'Document sent to n8n webhook' });
  } catch (err) {
    console.error('Upload error:', err.message || err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

// -----------------------------
// Add your /api/chat proxy endpoint
const N8N_CHAT_URL = 'http://localhost:5678/webhook/legal-ai-webhook/chat';

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Proxy: /api/chat called');
    console.log('Proxy: incoming body', req.body);

    const n8nPayload = {
      chatInput: req.body.message ?? req.body.query ?? req.body.input ?? req.body.text
    };

    const response = await axios.post(N8N_CHAT_URL, n8nPayload, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      // timeout: 30000,
    });

    const transformed = {
      reply: response.data.output || response.data.response || response.data.reply || response.data.answer || response.data || 'No response from AI',
      raw: response.data,
    };

    res.json(transformed);
  } catch (err) {
    console.error('Proxy error:', err?.message || err);
    const code = err?.code || 'UNKNOWN_ERROR';
    const status = err?.response?.status || 500;
    res.status(status).json({ error: 'Proxy failed', details: err?.message, code });
  }
});

// -----------------------------
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
